const ChatHandler = require('./chatHandler');

class WebsocketHandler {
  constructor(io) {
    this.io = io;

    this.clients = {};

    this.chatHandler = new ChatHandler(this);

    this.io.on('connection', (socket) => {
      socket.on('send_message', (data) => this.chatHandler.onIncomingChat(socket, data));

      socket.on('disconnect', () => {
        // ...
      });
    });
  }

  sendMessage = ({socket, room, eventName, data}) => {
    console.debug(Object.keys(this.clients));

    if(room) {
      socket.to(room).emit(eventName, data);
    } else {
      socket.broadcast.emit(eventName, data);
    }
  }
};

module.exports = WebsocketHandler;