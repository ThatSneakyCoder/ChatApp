import socket from "../config/initSocketClient.js";

let form = document.getElementById("form");
let input = document.getElementById("input");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    let userId = window.location.pathname.split("/")[2];
    let receiverId = window.getReceiverId();  // Get the receiver ID

    if (!receiverId) {
        alert("Select a user to chat with first!");
        return;
    }
    
    if (input.value) {
        socket.emit("chat-message", {sender: userId, receiver: receiverId, message: input.value});
        input.value = "";
    }
});