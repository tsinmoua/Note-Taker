const express = require("express");
const path = require("path");
const fs = require("fs");


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./db/db.json"));
});

app.post("/api/notes", function (req, res) {
    const newNote = req.body;

    console.log(newNote);

    fs.readFile('./db/db.json', 'utf8', function readFileCallback(err, data) {
        if (err) {
            console.log(err);
        } else {
            obj = JSON.parse(data);
            console.log(obj);
            obj.push(newNote);
            fs.writeFile('./db/db.json', JSON.stringify(obj), 'utf8', function (err) {
                if (err) {
                    return console.log(err);
                }
                console.log("Success!");
            });
        };
    });

    // fs.appendFile("./db/db.json", JSON.stringify(newNote) + '\n', function (err) {

    //     if (err) {
    //         console.log(err);
    //     }
    //     else {
    //         console.log("Commit logged!");
    //     }
    // });

});

app.use(express.static("public"));

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.listen(PORT, function () {
    console.log("Server listening on: http://localhost:" + PORT);
});