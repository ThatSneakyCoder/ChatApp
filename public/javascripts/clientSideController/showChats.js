document.addEventListener("DOMContentLoaded", () => {
    const userDivs = document.querySelectorAll(".user-div");
    let chatContainer = document.querySelector(".chat ul.messages");
    let messageBar = document.querySelector(".send-msg");
    const userId = window.location.pathname.split("/")[2];

    let receiverId = null;

    userDivs.forEach(userDiv => {
        userDiv.addEventListener("click", async () => {
            messageBar.style.display = "inline";
            messageBar.style.color = "white";
            receiverId = userDiv.dataset.id;
            const friendName = userDiv.querySelector("h1").textContent;

            chatContainer.innerHTML = `<h1 class="text-3xl">${friendName}</h1>`;

            try {
                const response = await fetch(`/user/${userId}/chat/${receiverId}`);
                const data = await response.json();

                if (data.success) {
                    data.messages.forEach((message) => {
                        let timeStamp = new Date(message.createdAt);
                        if (message.sender !== userId && message.receiver !== userId) return;

                        const isSender = message.sender === userId;
                        const messageClass = isSender ? "h-full w-8/10 bg-violet-500 rounded-t-lg rounded-l-lg mt-2 px-3 py-2 ml-auto" : "h-full w-8/10 bg-blue-500 rounded-r-lg rounded-b-lg mt-2 px-3 py-2";

                        chatContainer.innerHTML += `
                                    <li>
                                        <div class="${messageClass}">
                                            <div class="person-message">
                                                <p class="text-md tracking-tighter">
                                                    ${message.text}
                                                </p>
                                                <p style="font-size: small; margin-top: 5px;">
                                                    Sent at: ${timeStamp.getHours()}:${timeStamp.getMinutes()}
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                        `
                    });
                } else {
                    chatContainer.innerHTML += `<p class="text-white">Error loading messages.</p>`;
                }
            } catch (error) {
                console.error("Error fetching data", error);
            }
        });
    })

    window.getReceiverId = () => receiverId;
});