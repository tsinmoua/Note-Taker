const express = require("express");
const path = require("path");

var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "notes.html"));
    console.log(`/notes on http://localhost:${PORT}/notes`);

});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/api/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "db.json"));
    console.log(`/api/notes on http://localhost:${PORT}/api/notes`);
  });


app.listen(PORT, function() {
    console.log("Server listening on: http://localhost:" + PORT);
  });