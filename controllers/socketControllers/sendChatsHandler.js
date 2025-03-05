const eventBus = require('../eventBus');

module.exports = (io) => {
    let userSocketsMap = new Map();

    io.on("connection", (socket) => {
        socket.on("register", (userId) => {
            userSocketsMap.set(userId, socket.id);
        })

        socket.on("disconnect", () => {
            userSocketsMap.forEach((socketId, userId) => {
                if (socketId === socket.id) {
                    userSocketsMap.delete(userId);
                }
            });
        });
    });

    eventBus.on("new-chat-message", ({message, sender, receiver}) => {
        const receiverSocketId = userSocketsMap.get(receiver);
        const senderSocketId = userSocketsMap.get(sender);
        
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("chat-message", {message, sender});
        }

        if (senderSocketId) {
            io.to(senderSocketId).emit("chat-message", {message, sender});
        }
    });
}   