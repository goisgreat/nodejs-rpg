// import express
const express = require("express")
const socket = require("socket.io")

// create app
let app = express()
// initialize middleware
let client = express.static(`${__dirname}/client`)

// rout clients to /client folder
app.use(client)

// start app
let server = app.listen(3000)
// get socket io interface
let io = socket(server)

// exectute this code when a client connects to socket
io.on("connection", function(socket) {
  // initialize player
  let stats = createPlayer()
  // info
  info(socket, stats)
  // setup uname changer
  socket.on("username", unameChanger(io, stats))
  // setup move executer
  socket.on("move", moveExecuter(socket, stats))
})

// display info about room
function info(socket, { room }) {
  // stuff
  socket.emit("text", {
    text: `You are in room ${room.id}.<br />${room.info}`
  })
}

// execute move
function trigger(data, socket, stats) {
  // for debugging purposes...
  console.log(socket.id, data.move)
  // execute move
  switch(data.move) {
    // movement
    case "north": case "south": case "east": case "west":
      // if exit not available, emit error
      if(!stats.room.exits[data.move]) return socket.emit("err")
      // change room
      stats.room = stats.room.exits[data.move]
      // see info()
      info(socket, stats)
      // inform everyone else
      io.sockets.emit("text", {
        text: `${stats.username || "anonymous"} has moved to room ${stats.room.id}`
      })
      break
    // error
    default:
      socket.emit("err")
  }
}

// returns uname change listener
function unameChanger(stats) {
  return function(data) {
    // get previous username
    let username = stats.username
    // change username
    stats.username = data.username
    // tell everyone
    io.sockets.emit("text", {
      text: `${username || "anonymous"} has changed there username to ${stats.username}.`
    })
  }
}
// returns move executer
function moveExecuter(socket, stats) {
  return function(data) {
    // trigger move
    trigger(data, socket, stats)
  }
}

// get rooms
const start = require("./rooms.js")

// when called returns a new player
const createPlayer = () => ({
  // put player in room start
  room: start
})