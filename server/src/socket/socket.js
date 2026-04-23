const app = require('../app')
const { createServer } = require("http");
const { Server } = require("socket.io");
const { ChatEventEnum } = require('../constant/index')


const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: process.env.CLIENT_URL,
    }
});

const onlineUsers = {}

io.on(ChatEventEnum.CONNECTED_EVENT, (socket) => {

    const userId = socket.handshake.query?.userId;
    if (userId) socket.join(userId);


    // Check online
    onlineUsers[userId] = socket.id;
    
    io.emit(ChatEventEnum.CHECK_ONLINE, Object.keys(onlineUsers))

    socket.on(ChatEventEnum.DISCONNECT_EVENT, () => {
        delete onlineUsers[userId]
        io.emit(ChatEventEnum.CHECK_ONLINE, Object.keys(onlineUsers))
    });


    // Check Typing
    socket.on(ChatEventEnum.START_TYPING, (chatId) => {
        socket.to(chatId).emit(ChatEventEnum.IS_TYPING, { userId, isTyping: true })
    });

    socket.on(ChatEventEnum.STOP_TYPING, (chatId) => {
        socket.to(chatId).emit(ChatEventEnum.IS_TYPING, { userId, isTyping: false })
    });


});

app.set("io", io)


module.exports.server = httpServer;