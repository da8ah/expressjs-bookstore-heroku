import { config } from 'dotenv';

config();

export default {
    jwtSecret: process.env.JWT_SECRET || "token",
    stripePubKey: process.env.STRIPE_PUB_KEY,
    stripeSecKey: process.env.STRIPE_SEC_KEY,
    stripeFrontend: process.env.STRIPE_FRONTEND || 'https://js.stripe.com/v3/',
    PORT: process.env.PORT || 5000,
    MONGO_URI: process.env.DBURI,
    MONGO_DATABASE: process.env.DATABASE || "bookstoredb",
    MONGO_USER: process.env.DBUSER || "admin",
    MONGO_PASS: process.env.DBPASS || "admin",
    MONGO_HOST: process.env.DBHOST || "localhost"
}