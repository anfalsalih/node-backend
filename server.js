const http = require("http");

let items = [];  
let id = 1;       

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");

  if (req.method === "POST" && req.url === "/create") {
    let body = "";
    req.on("data", chunk => body += chunk);
    req.on("end", () => {
      const data = JSON.parse(body);        
      const newItem = { id: id++, ...data };
      items.push(newItem);
      res.end(JSON.stringify(newItem));
    });

  } else if (req.method === "GET" && req.url === "/items") {
    res.end(JSON.stringify(items));

  } else if (req.method === "PUT" && req.url.startsWith("/update/")) {
    const itemId = parseInt(req.url.split("/")[2]);
    let body = "";
    req.on("data", chunk => body += chunk);
    req.on("end", () => {
      const data = JSON.parse(body);
      let item = items.find(i => i.id === itemId);
      if (item) {
        Object.assign(item, data);  
        
        res.end(JSON.stringify(item));
      } else {
        res.end(JSON.stringify({ error: "Item not found" }));
      }
    });

  } else if (req.method === "DELETE" && req.url.startsWith("/delete/")) {
    const itemId = parseInt(req.url.split("/")[2]);
    items = items.filter(i => i.id !== itemId);
    res.end(JSON.stringify({ message: "Item deleted" }));

  } else {
    res.end(JSON.stringify({ error: "Not found" }));
  }
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});