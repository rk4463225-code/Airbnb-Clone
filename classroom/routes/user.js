const express = require("express");
const router = express.Router();

// Index - users
router.get("/", (req, res) => {
  res.send("GET for users");
});

// SHOW - user by id
router.get("//:id", (req, res) => {
  res.send("GET for user id");
});

// POST - create user
router.post("/", (req, res) => {
  res.send("POST for users");
});

// DELETE - delete user by id
router.delete("/:id", (req, res) => {
  res.send("DELETE for user id");
});

module.exports = router;