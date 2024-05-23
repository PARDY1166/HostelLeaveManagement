const express = require('express');
const { signUp, signIn, parentDashboard } = require('../controllers/parentController');
const authMiddleware = require('../controllers/middleware');

const router = express.Router();

router.post('/signup',signUp);
router.post('/signin',signIn)
router.use(authMiddleware);
router.get('/dashboard',parentDashboard);

module.exports = router;