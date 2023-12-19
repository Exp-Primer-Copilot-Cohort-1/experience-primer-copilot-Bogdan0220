//Create web server
var express = require('express');
var app = express();
var path = require('path');

//Create database
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('comments.db');

//Create table
db.serialize(function() {
  db.run("CREATE TABLE IF NOT EXISTS comments (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, comment TEXT)");
  db.run("INSERT INTO comments (name, comment) VALUES ('John', 'Hello')");
});

//Get comments
app.get('/comments', function(req, res) {
  db.all("SELECT * FROM comments", function(err, rows) {
    res.json(rows);
  });
});

//Create comment
app.get('/comments/new', function(req, res) {
  db.run("INSERT INTO comments (name, comment) VALUES (?, ?)", req.query.name, req.query.comment, function(err, row) {
    res.json({id: this.lastID});
  });
});

//Delete comment
app.get('/comments/delete', function(req, res) {
  db.run("DELETE FROM comments WHERE id = ?", req.query.id, function(err, row) {
    res.json({id: req.query.id});
  });
});

//Start server
app.listen(3000, function() {
  console.log('Server listening on port 3000');
});