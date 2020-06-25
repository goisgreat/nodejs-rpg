// connect to server
let socket = io.connect("https://TrivialSeparateSphere--isaacfritz1.repl.co")

function changeUsername(uname) {
  // tell server about new username
  socket.emit("username", {
    username: uname
  })
}

// execute this code when the page loads
$(document).ready(function() {
  // get first box element
  let box0 = $("#inpt0")
  // get second box element
  let box1 = $("#inpt1")
  // get game text div
  let gameText = $("#text")
  // execute this code upon a "text" event
  socket.on("text", function(data) {
    // append parameters to game text
    gameText.append(data.text + "<br />")
  })
  // execute this code upon an "error" event
  socket.on("err", function(data) {
    // append errror to game text
    gameText.append("error" + "<br />")
  })
  // execute this code upon key press
  $(document).keypress(function(key) {
    // execute this code if enter is pressed and if box0 is in focus
    if(key.which === 13) {
      // execute this code if box0 in focus
      if(box0.is(":focus")) {
        // tell server about the move
        socket.emit("move", {
          move: box0.val()
        })
        // reset box 0
        box0.val("")
      } /* execute this code if box1 is in focus*/ else if(box1.is(":focus")) {
        // see changeUsername()
        changeUsername(box1.val())
      }
    }
  })
})