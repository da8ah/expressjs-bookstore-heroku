import { Router } from 'express';
import * as authController from '../controllers/auth.controller'

const router = Router();

router.post("/signup", authController.signUp);
router.get("/signin", authController.signIn);
router.post("/signin", authController.logIn);

export default router;