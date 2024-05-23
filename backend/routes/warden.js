const { wardenRegister } = require("../controllers/wardenController");

const router = require("express").Router();

router.post("/register",wardenRegister);

module.exports = router;