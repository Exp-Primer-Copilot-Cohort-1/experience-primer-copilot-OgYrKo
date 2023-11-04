// Create web server

// Require modules
const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

// Get comments
router.get('/', function(req, res) {
    // Read comments file
    let comments = fs.readFileSync(path.join(__dirname, '../data/comments.json'));
    // Convert comments to JSON
    comments = JSON.parse(comments);
    // Send comments
    res.send(comments);
});

// Post comment
router.post('/', function(req, res) {
    // Read comments file
    let comments = fs.readFileSync(path.join(__dirname, '../data/comments.json'));
    // Convert comments to JSON
    comments = JSON.parse(comments);
    // Create new comment
    let comment = {
        id: comments.length,
        name: req.body.name,
        comment: req.body.comment,
        date: new Date()
    }
    // Add comment to comments
    comments.push(comment);
    // Write comments to file
    fs.writeFileSync(path.join(__dirname, '../data/comments.json'), JSON.stringify(comments));
    // Send comments
    res.send(comments);
});

// Delete comment
router.delete('/:id', function(req, res) {
    // Read comments file
    let comments = fs.readFileSync(path.join(__dirname, '../data/comments.json'));
    // Convert comments to JSON
    comments = JSON.parse(comments);
    // Remove comment from comments
    comments = comments.filter(function(comment) {
        return comment.id != req.params.id;
    });
    // Write comments to file
    fs.writeFileSync(path.join(__dirname, '../data/comments.json'), JSON.stringify(comments));
    // Send comments
    res.send(comments);
});

module.exports = router;