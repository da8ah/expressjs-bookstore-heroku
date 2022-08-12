import { Router } from 'express';
import passport from 'passport';
import * as payment from '../../controllers/payment.controller';

const router = Router();

router.get("/payment", passport.authenticate("jwt", { session: false }), payment.payment);
router.post("/payment/checkout", passport.authenticate("jwt", { session: false }), payment.checkout);

export default router;