import socket from "../config/initSocketClient.js";

socket.on("connect", () => {
    const userId = window.location.pathname.split("/")[2]; // Replace with actual user ID logic
    socket.emit("register", userId);
});