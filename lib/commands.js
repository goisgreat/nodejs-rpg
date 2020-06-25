// trigeer move
module.exports = (io, info) =>
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