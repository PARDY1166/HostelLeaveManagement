const express = require('express');
const router = express.Router();
const {signUp, signIn, studentDashboard,leaveApplication, addParent} = require("../controllers/studentController");
const authMiddleware = require("../controllers/middleware");

router.post('/signup',signUp);
router.post('/signin',signIn);
router.use(authMiddleware)
router.post('/dashboard',studentDashboard);
router.post("/leave",leaveApplication)
router.post('/addparent',addParent);

module.exports = router;