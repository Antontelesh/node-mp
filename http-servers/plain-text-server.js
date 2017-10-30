const http = require("http");
const port = 7878;

const server = http.createServer((req, res) => {
  res.end("Hello World");
});

server.listen(port, err => {
  if (err) {
    console.log("Oops!", err);
  } else {
    console.log(`listening on port ${port}`);
  }
});
