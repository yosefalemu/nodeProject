const express = require("express");
const router = express.Router();
const { login, dashBoard } = require("../controllers/main");
const handleAuthentication = require("../middleware/auth");

router.route("/dashboard").get(handleAuthentication, dashBoard);
router.route("/login").post(login);

module.exports = router;
