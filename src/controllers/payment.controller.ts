import { RequestHandler } from 'express';
import { toJSON } from 'flatted';
import Stripe from 'stripe';
import config from '../config/config';

const stripe = require('stripe')(config.stripeSecKey);

export const payment: RequestHandler = function (req, res) {
    try {
        const headers = [
            {
                header:
                {
                    tag: "script",
                    property: "src",
                    value: config.stripeFrontend
                }
            }, {
                header: {
                    tag: "script",
                    property: "src",
                    value: '/js/payment.js'
                }
            }];
        return res.status(200).render('payment', { title: "Checkout", headers });
    } catch (error) {
        return res.status(500).json(toJSON(error));
    }
};

export const checkout: RequestHandler = async function (req, res) {
    try {
        const { amount, paymentMethodType }:
            { amount: number, paymentMethodType: string } = req.body;

        // Create a PaymentIntent with the order amount and currency.
        const params: Stripe.PaymentIntentCreateParams = {
            amount,
            currency: "usd",
            payment_method_types: [paymentMethodType],
        };

        const paymentIntent: Stripe.PaymentIntent = await stripe.paymentIntents.create(
            params
        );

        // Send publishable key and PaymentIntent client_secret to client.
        res.status(200).json({
            publishableKey: config.stripePubKey,
            clientSecret: paymentIntent.client_secret
        });
    } catch (error) {
        return res.status(500).json(toJSON(error));
    }
};