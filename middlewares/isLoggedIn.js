const userModel = require("../models/user-model");
const {verifyToken} = require("../utils/verifyToken");

module.exports = async (req, res, next) => {
    if (!req.cookies.token) {
        req.flash("message", "You need to login first!");
        return res.redirect("/");
    }

    try {
        let decoded = verifyToken(req.cookies.token);
        let user = await userModel.findOne({email: decoded.email}).select("-password");
        req.user = user;
        next();
    } catch (error) {
        return res.send("Error in login middleware: " + error.message);
    }
}