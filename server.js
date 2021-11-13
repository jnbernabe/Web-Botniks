const http = require("http");
var debug = require("debug");
var app = require("./server/config/app");

const host = "localhost";
const port = 3000;

app.set("port", port);

var server = http.createServer(app);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
server.on("error", onError);
server.on("listening", onListening);

// const requestListener = function (req, res) {
//   res.setHeader("Content-Type", "application/json");
//   res.writeHead(200);
//   res.end(`{"message": "This is a JSON response"}`);
// };

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  var addr = server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
}
