const express = require("express");
const router = express.Router();


// Post Route
// INDEX - get all posts
router.get("/", (req, res) => {
  res.send("GET for posts");
});

// SHOW - get post by id
router.get("/:id", (req, res) => {
  res.send("GET for post id");
});

// CREATE - add new post
router.post("/", (req, res) => {
  res.send("POST for posts");
});

// DELETE - delete post by id
router.delete("/:id", (req, res) => {
  res.send("DELETE for post id");
});


module.exports = router;