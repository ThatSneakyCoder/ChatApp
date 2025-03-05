const {registerUser, loginUser} = require("../controllers/authController");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    let message = req.flash("message");
    res.render("index", {flashMsg: message});
});

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
