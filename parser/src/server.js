const fs = require("fs");
const path = require("path");
const express = require("express");
const cors = require("cors"); 

const app = express();
const port = 8002;

app.use(cors()); 

app.get("/map", (req, res) => {
  const filePath = path.join(__dirname, "..", "map.json");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      res.status(500).json({ error: "Failed to read file" });
    } else {
      res.json(JSON.parse(data));
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});