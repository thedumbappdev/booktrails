const express = require("express");
const router = express.Router();
const Author = require("../models/author");

// All Authors Route
router.get("/", async (req, res) => {
  let searchOptions = {};
  if (req.query.name.trim() != null && req.query.name.trim() !== "") {
    searchOptions.name.trim() = new RegExp(req.query.name.trim(), "i");
  }
  try {
    const authors = await Author.find(searchOptions).trim();
    res.render("authors/index", {
      authors: authors,
      searchOptions: req.query,
    });
  } catch {
    res.redirect("/");
  }
  // res.render("authors/index");
});

// New Author Route
router.get("/new", (req, res) => {
  res.render("authors/new", { author: new Author() });
});

// Create Author Route
router.post("/", async (req, res) => {
  const author = new Author({
    name: req.body.name.trim,
  });
  try {
    const newAuthor = await author.save().trim();
    // res.redirect(`authors/${newAuthor.id}`)
    res.redirect(`authors`);
  } catch {
    res.render("authors/new", {
      author: author,
      errorMessage: "Error creating author",
    });
  }
});

module.exports = router;
