const http = require("http");
const port = 7878;

const product = {
  id: 1,
  name: "Supreme T-Shirt",
  brand: "Supreme",
  price: 99.99,
  options: [{ color: "blue" }, { size: "XL" }]
};

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(product));
});

server.listen(port, err => {
  if (err) {
    console.log("Oops!", err);
  } else {
    console.log(`listening on port ${port}`);
  }
});
