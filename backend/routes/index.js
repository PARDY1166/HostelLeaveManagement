const express = require('express');
const router = express.Router();
const studentRouter = require('./student');
const parentRouter = require('./parent');
const wardenRouter = require('./warden');
const {getType} = require('../controllers/generalController');

router.use('/student',studentRouter);
router.use('/parent',parentRouter);
router.use('/warden',wardenRouter);
router.post('/general',getType)


module.exports = router;