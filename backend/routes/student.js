const express = require('express');
const router = express.Router();
const {signUp, signIn, studentDashboard,leaveApplication, addParent, checkStatus,history, profile, profileUpdate} = require("../controllers/studentController");
const authMiddleware = require("../controllers/middleware");

router.post('/signup',signUp);
router.post('/signin',signIn);
router.use(authMiddleware)
router.post('/dashboard',studentDashboard);
router.post("/leave",leaveApplication)
router.post('/addparent',addParent);
router.post("/status",checkStatus);
router.post('/history',history);
router.post('/profile',profile);
router.post('/profile/update',profileUpdate);

module.exports = router;