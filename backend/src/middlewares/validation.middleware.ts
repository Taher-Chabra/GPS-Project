import { body } from 'express-validator';

const registerValidationRules = [
  // email
  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email')
    .isLength({ min: 8 }).withMessage('Email must be at least 8 characters long')
    .isLength({ max: 64 }).withMessage('Email must be at most 64 characters long')
    .normalizeEmail(),

  // password
  body('password')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
    .matches(/^[A-Z0-9_]*$/).withMessage('Password must contain only uppercase letters, numbers, and underscores'),
];

export { registerValidationRules };