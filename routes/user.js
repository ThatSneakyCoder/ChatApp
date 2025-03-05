const router = require("express").Router();
const { logoutUser } = require("../controllers/authController");
const isLoggedIn = require("../middlewares/isLoggedIn");
const userModel = require("../models/user-model");
const messageModel = require("../models/message-model");

router.get("/:id/chat/:friendId", isLoggedIn, async (req, res) => {
    try {
        const user = req.user;
        const friendId = req.params.friendId;

        const messages = await messageModel.find({
            $or: [
                {sender: user._id, receiver: friendId},
                {sender: friendId, receiver: user._id}
            ]
        }).sort({createdAt: 1}); // Sort by time (oldest first)

        // console.log(messages);

        res.json({success: true, messages});
    } catch (error) {
        console.error("Some error happened fetching the database", error);
        res.status(500).json({success: false, error: "Server error"});
    }
});

router.get("/:id", isLoggedIn, async (req, res) => {
    const user = await req.user.populate("friends"); ;
    const friends = user.friends;
    let message = req.flash("user-message")[0];

    let payload = {
        user,
        friends,
        flashMsg: message
    }

    res.render("user", payload);
});

router.post("/:id/add-friend", isLoggedIn, async (req, res) => {
    const user = req.user;
    let { email } = req.body;
    const friend = await userModel.findOne({ email: email });

    try {
        // if friend doesn't exist in database
        if (!friend) {
            req.flash("user-message", "Friend does not exist");
            return res.redirect(`/user/${user._id}`);
        }

        // if friend already exists in friendslist
        if (user.friends.includes(friend._id)) {
            req.flash("user-message", "Friend already added to friends List");
            return res.redirect(`/user/${user._id}`);
        }

        user.friends.push(friend._id);
        await user.save();
        res.redirect(`/user/${user._id}`);
    } catch (error) {
        console.error("Error happened: ", error);
        res.send("Error");
    }
})

router.get("/:id/logout", isLoggedIn, logoutUser);

module.exports = router;