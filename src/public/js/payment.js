function amountNumberToStripeFormat(HTMLElement) {
    const userValue = HTMLElement.value;
    let amount = null;
    if (userValue.includes(".")) amount = userValue.split(".");
    if (userValue.includes(",")) amount = userValue.split(",");
    if (amount) amount = amount[0] + amount[1];
    return amount;
}

async function postCheckout() {

    // When the payment is submitted...
    const payment = document.getElementById('payment');
    let paymentSubmitted = false;
    // Disable double submission of the form
    if (paymentSubmitted) return;
    paymentSubmitted = true;
    document.getElementById('checkout-submit').disabled = true;

    const amount = amountNumberToStripeFormat(document.getElementById('amount'));
    // Load the publishable key from the server. The publishable key
    // is set in your .env file.
    const { publishableKey, clientSecret } = await fetch("payment/checkout", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            amount: amount,
            paymentMethodType: "card",
        }),
    }).then(async (res) => { return await res.json() });

    if (!publishableKey) {
        document.getElementById('checkout-submit').disabled = false;
        return alert("Stripe:No Publishable Key");
    }
    if (!clientSecret) {
        document.getElementById('checkout-submit').disabled = false;
        return alert("Stripe:No Client Secret");
    }

    // CHECKOUT
    const stripe = Stripe(publishableKey, {
        apiVersion: '2020-08-27'
    });

    // Set up Stripe.js and Elements to use in checkout form, passing the client secret obtained in step 2
    const elements = stripe.elements();

    // Create and mount the Payment Element
    const card = elements.create("card");
    card.mount('#card-element');

    // When the form is submitted...
    const form = document.getElementById('payment-form');
    form.querySelector('button').disabled = false;
    let submitted = false;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Disable double submission of the form
        if (submitted) { return; }
        submitted = true;
        form.querySelector('button').disabled = true;

        // Confirm the card payment given the clientSecret
        // from the payment intent that was just created on
        // the server.
        const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card
                }
            }
        );

        if (stripeError) {
            // reenable the form.
            submitted = false;
            form.querySelector('button').disabled = false;
            return;
        }

        console.log(paymentIntent);
        form.querySelector('button').disabled = true;
        return alert("¡Pago completado con éxito!");
    });

    document.getElementById('checkout-submit').disabled = false;
}
