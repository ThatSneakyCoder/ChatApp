const eventBus = require('../eventBus');
const messageModel = require("../../models/message-model");

module.exports = (io) => {
    io.on("connection", (socket) => {
        socket.on("chat-message", async ({sender, receiver, message}) => {
            // console.log("Message received from client in \"Chat Message\":", message);
            eventBus.emit("new-chat-message", {message, sender, receiver});

            try {
                const savedMsg = await messageModel.create({
                    sender,
                    receiver,
                    text: message
                });
                return savedMsg;
            } catch (error) {
                console.error("Database Error:", error);
                throw error;
            }
        });

        socket.on("disconnect", () => {
            // console.log("The user disconnected");
        });
    });
}