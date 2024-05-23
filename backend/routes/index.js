const express = require('express');
const router = express.Router();
const studentRouter = require('./student');
const parentRouter = require('./parent');
const wardenRouter = require('./warden');

router.use('/student',studentRouter);
router.use('/parent',parentRouter);
router.use('/warden',wardenRouter);


module.exports = router;