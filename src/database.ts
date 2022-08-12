import mongoose from 'mongoose';
import config from './config/config';

(async () => {
    try {
        const db = await mongoose.connect(`${config.MONGO_URI}`);
        console.log(`Database connected to ${db.connection.name.toUpperCase()}`);
    } catch (error) {
        console.error(error);
    }
})();