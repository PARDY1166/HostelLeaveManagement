const express = require('express');
const router = express.Router();
const {signUp,signIn,wardenDashboard} = require("../controllers/wardenController");
const authMiddleware = require('../controllers/middleware');

router.post('/signup',signUp);
router.post('/signin',signIn)
router.use(authMiddleware);
router.post('/dashboard',wardenDashboard);

module.exports = router;