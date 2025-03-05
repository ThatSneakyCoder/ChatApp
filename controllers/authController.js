const userModel = require("../models/user-model");
const {genToken} = require("../utils/genToken");
const bcrypt = require("bcrypt");

module.exports.registerUser = async (req, res) => {
    let { name, email, password, passwordCheck } = req.body;

    try {
        if (!name || !email || !password || !passwordCheck) {
            req.flash("message", "one of the fields is empty");
            return res.redirect("/");
        }
    } catch (error) {
        return res.send("Error Message through Catch block: " + error.message);
    }

    try {
        const user = await userModel.findOne({ email });

        if (user) {
            req.flash("message", "user already exists in db");
            return res.redirect("/");
        }
    } catch (error) {
        return res.send("Error Message through Catch block: " + error.message);
    }

    try {
        if (password !== passwordCheck) {
            req.flash("message", "The passwords don't match");
            return res.redirect("/");
        }
    } catch (error) {
        return res.send("Error Message through Catch block: " + error.message);
    }

    try {

        await bcrypt.hash(password, 10).then(function(hash) {
            const user = userModel.create({
                name,
                email,
                password: hash
            });

        });

        req.flash("message", "User created Successfully");
        return res.redirect("/");
    } catch (error) {
        res.send("Error Message through Catch block: " + error.message);
    }
}

module.exports.loginUser = async (req, res) => {
    let {email, password} = req.body;

    try {
        if (!email || !password) {
            req.flash("message", "Some fields are empty.");
            return res.redirect("/");
        }
        
        const user = await userModel.findOne({email});

        if (!user) {
            req.flash("message", "User does not exist. Create an account");
            return res.redirect("/");
        }

        bcrypt.compare(password, user.password).then(function(result) {
            if (result) {
                const token = genToken(user);
                res.cookie("token", token);
                res.redirect(`/user/${user._id}`);
            } else {
                req.flash("message", "Invalid credentials");
                return res.redirect("/");
            }
        });
    } catch (error) {
        res.send("Error Message through Catch block: " + error.message);
    }
}

module.exports.logoutUser = async (req, res) => {
    req.flash("message", "You have been successfully logged out");
    res.cookie("token", "");
    res.redirect("/");
}
