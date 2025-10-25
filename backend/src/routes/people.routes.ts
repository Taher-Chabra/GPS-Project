import express from 'express';
import { loginUser, sendCaptchaCode, registerUser } from '../controllers/people.controller.js';
import { registerValidationRules } from "@/middlewares/validation.middleware.js";

const router: express.Router = express.Router();

router.route('/captcha').get(sendCaptchaCode);

router.route('/login').post(loginUser);

router.route('/register').post(registerValidationRules, registerUser);

export default router;