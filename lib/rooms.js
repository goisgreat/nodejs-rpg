// link two rooms via given direction
function link(room0, direction, room1) {
  // if no exits, define them
  room0.exits || (room0.exits = {})
  // add exit
  room0.exits[direction] = room1
}

// define rooms
let start = {
  id: "start",
  info: "Goodjob<br />exits: north, south"
}
let mid = {
  id: "mid",
  info: "exits: north"
}
let end = {
  id: "end",
  info: "Goodjob<br />exits: south"
}
let secondRoom = {
  id: "secondRoom",
  info: "Goodjob<br />exits: north"
}
// link rooms
link(start, "south", secondRoom)
link(secondRoom, "north", start)
link(start, "north", mid)
link(mid, "south", start)
link(mid, "north", end)
link(end, "south", mid)

// export starting rooms
module.exports = start