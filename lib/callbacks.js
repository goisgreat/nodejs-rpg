module.exports = function(trigger) {
  // returns uname change listener
  function unameChanger(io, stats) {
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

  // return defined functions
  return {
    unameChanger,
    moveExecuter
  }
}