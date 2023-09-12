const socket = io('https://live-chat-server.up.railway.app')
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

const Name = prompt('What is your name?')
appendMessage('You joined')
socket.emit('new-user', Name)

socket.on('chat-message', data => {
    appendMessage(`${data.name}: ${data.message}`)
    messageContainer.scrollTop = messageContainer.scrollHeight
})

socket.on('user-connected', name => {
    appendMessage(`${name} connected`)
    messageContainer.scrollTop = messageContainer.scrollHeight
})

socket.on('user-disconnected', name => {
    appendMessage(`${name} disconnected`)
    messageContainer.scrollTop = messageContainer.scrollHeight
})

messageForm.addEventListener('submit', e => {
    e.preventDefault()
    const message = messageInput.value
    appendMessage(`You: ${message}`)
    socket.emit('send-chat-message', message)
    messageContainer.scrollTop = messageContainer.scrollHeight
    messageInput.value = ''     
})

function appendMessage(message) {
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageContainer.append(messageElement)
}
