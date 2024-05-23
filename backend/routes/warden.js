const express = require('express');
const router = express.Router();
const {signUp,signIn,wardenDashboard} = require("../controllers/wardenController");
const authMiddleware = require('../controllers/middleware');

router.post('/signup',signUp);
router.post('/signin',signIn)
router.use(authMiddleware);
router.get('/dashboard',wardenDashboard);

module.exports = router;