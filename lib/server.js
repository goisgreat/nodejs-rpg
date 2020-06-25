module.exports = function(createPlayer, { moveExecuter, unameChanger }) {
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
  io.on("connection", function() {
    // initialize player
    let stats = createPlayer()
    // setup uname changer
    socket.on("username", unameChanger(io, stats))
    // setup move executer
    socket.on("move", moveExecuter(socket, stats))
  })

  // return socket.io interface
  return io
}