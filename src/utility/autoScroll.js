export default function autoScroll() {
    const chatArea = document.querySelector('.chat-body');
    chatArea.scrollTo({
        top: chatArea.scrollHeight, // scrollHeight ensures you scroll to the bottom of the chat
        behavior: 'smooth'
    });
}