const { Server } = require("socket.io");
const receivedChatHandler = require("../controllers/socketControllers/receivedChatsHandler");
const sentChatHandler = require("../controllers/socketControllers/sendChatsHandler");

let ioInstance;

module.exports = {
    init: (server) => {
        ioInstance = new Server(server);

        // Include socket controllers here
        receivedChatHandler(ioInstance);
        sentChatHandler(ioInstance);

        return ioInstance;
    },
    getIO: () => {
        if (!ioInstance) {
            console.error("IO instance not created: ", error);
        }

        return ioInstance;
    }
}