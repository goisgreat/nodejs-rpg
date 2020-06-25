// display info about room
function info(socket, player) {
  // stuff
  socket.emit("text", {
    text: `You are in room ${player.room.id}.<br />${player.room.info}`
  })
}

// get rooms
const start = require("./lib/rooms.js")

// when called returns a new player
const createPlayer = () => ({
  // put player in room start
  room: start
})

// get socket.io interface
const io = require("./lib/server.js")(createPlayer, callbacks)  
// get move executer
const trigger = require("./lib/commands.js")(io, info)
// event stuff
const callbacks = require("./lib/callbacks.js")(trigger)