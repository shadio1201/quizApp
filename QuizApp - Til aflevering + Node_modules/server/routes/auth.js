const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

router.post('/register',
body('username').not().isEmpty().trim().escape().withMessage('Username not provided!'),
body('email').isEmail().normalizeEmail().withMessage('Invalid email'),
body('password').not().isEmpty().isLength({ min: 8 }).escape().withMessage('Provide a password longer than 8 characters'),

require('../controllers/auth/register'));

router.post('/signin', 
body('email').not().isEmpty().isEmail().escape().withMessage('Incorrect password or email'),
body('password').not().isEmpty().escape().withMessage('Incorrect password or email'),
require('../controllers/auth/signin'))

router.post('/signout', require('../controllers/auth/signout'))

router.post('/refresh', require('../controllers/auth/refresh'))

module.exports = router