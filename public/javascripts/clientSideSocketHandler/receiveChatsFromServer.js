import socket from "../config/initSocketClient.js";

socket.on("chat-message", ({message, sender}) => {
    let newText = document.createElement("div");
    let listItem = document.createElement("li");
    let newTime = document.createElement("p");
    let parent = document.getElementById("chats-ul");
    const userId = window.location.pathname.split("/")[2];
    let chatContainer = document.getElementById("chat");

    let myMessageTailwindClasses = (userId == sender) ? "h-full w-8/10 bg-violet-500 rounded-t-lg rounded-l-lg mt-2 px-3 py-2 ml-auto" : "h-full w-8/10 bg-blue-500 rounded-r-lg rounded-b-lg mt-2 px-3 py-2";

    newText.setAttribute("class", myMessageTailwindClasses);
    newText.textContent = message;

    const now = new Date();
    newTime.textContent = `Sent at: ${now.getHours()}:${now.getMinutes()}`;
    newTime.setAttribute("class", "chat-timestamp-client-side");
    newTime.style.fontSize = 'small';
    newTime.style.marginTop = '5px';

    listItem.appendChild(newText);
    parent.appendChild(listItem);
    newText.appendChild(newTime);
    
    setTimeout(() => {
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }, 100);
});