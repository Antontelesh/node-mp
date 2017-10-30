const http = require("http");
const port = 7878;
const pug = require("pug");
const path = require("path");
const template = pug.compileFile(path.resolve(__dirname, "../views/index.pug"));

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.end(template({ message: "Hello World!" }));
});

server.listen(port, err => {
  if (err) {
    console.log("Oops!", err);
  } else {
    console.log(`listening on port ${port}`);
  }
});
