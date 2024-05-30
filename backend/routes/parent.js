const express = require('express');
const { signUp, signIn, parentDashboard, approveLeave,rejectLeave, profile, profileUpdate } = require('../controllers/parentController');
const authMiddleware = require('../controllers/middleware');

const router = express.Router();

router.post('/signup',signUp);
router.post('/signin',signIn)
router.use(authMiddleware);
router.post('/dashboard',parentDashboard);
router.post('/approveleave',approveLeave);
router.post('/rejectleave',rejectLeave);
router.post('/profile',profile);
router.post('/profile/update',profileUpdate);

module.exports = router;