const express = require('express');
const router = express.Router();
const {signUp} = require("../controllers/studentController");

router.post('/login',signUp);

module.exports = router;