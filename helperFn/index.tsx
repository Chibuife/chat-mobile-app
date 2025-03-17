const ws = new WebSocket('ws://localhost:8080');

// ws.onopen = () => {
//     console.log('Connected to server');
//     ws.send(JSON.stringify({ type: 'register', userId: 'personA' }));
// };

// Send private message
// export function sendMessage(toUserId, message, fromUserId) {
//     ws.send(JSON.stringify({
//         type: 'private_message',
//         from: fromUserId,
//         to: toUserId,
//         text: message
//     }));
// }

// Get chat history
// export function getChatHistory(toUserId, userId) {
//     ws.send(JSON.stringify({
//         type: 'get_history',
//         userId: userId,
//         to: toUserId
//     }));
// }

// // Listen for messages
ws.onmessage = (event) => {
    const data = JSON.parse(event.data); 
    if (data.type === 'history') {
        console.log('Chat history:', data.messages);
    } else {
        console.log(`Message from ${data.from}: ${data.message}`);
    }
};

// Example Usage
setTimeout(() => {
    // sendMessage('personB', 'Hello, Person B!');
    // getChatHistory('personB');
}, 3000);
