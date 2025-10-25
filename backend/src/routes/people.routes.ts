import express from 'express';
import { loginClient, sendCaptchaCode, registerClient, logoutClient } from '../controllers/people.controller.js';
import { registerValidationRules } from "@/middlewares/validation.middleware.js";

const router: express.Router = express.Router();

router.route('/captcha').get(sendCaptchaCode);

router.route('/login').post(loginClient);

router.route('/register').post(registerValidationRules, registerClient);

router.route('/logout').post(logoutClient);

export default router;