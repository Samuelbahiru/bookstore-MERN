const express = require("express");
const router = express.Router();
const Author = require("../models/author");
// All Authors Routes

router.get("/", async (req, res) => {
  let searchOptions = {};
  if (req.query.name != null && req.query.name !== "") {
    searchOptions.name = new RegExp(req.query.name);
  }

  try {
    console.log("Searchoptions", searchOptions.name);
    const authors = await Author.find(searchOptions);
    console.log("authors", authors);
    res.render("authors/index", { authors: authors, searchOptions: req.query });
  } catch {
    res.redirect("/");
  }
});

// New Auhtor Role

router.get("/new", (request, res) => {
  res.render("authors/new", { author: new Author() });
});

// creating author

router.post("/", async (req, res) => {
  const author = new Author({
    name: req.body.name,
  });
  try {
    const newAuthor = await author.save(); //this is beacuse everything in mongodb is done asynchronusly
    //  res.redirect(`authors/${newAuthor.id}`)
    res.redirect(`authors/${newAuthor.id}`);
  } catch {
    res.render("authors/new", {
      author: author,
      errorMessage: "Error creating the Author",
    });
  }
});

router.get("/:id", (req, res) => {
  res.status(200).send(req.params.id.toString());
});

router.get("/:id/edit", async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    res.render("authors/edit", { author: author });
  } catch {
    res.redirect("/authors");
  }
});

router.put("/:id", async (req, res) => {
  let author;
  try {
    author = await Author.findById(req.params.id);
    author.name = req.body.name;
    console.log("author name", author.name);
    await author.save();
    res.redirect(`/authors/${author.id}`);
  } catch {
    if (author == null) {
      res.redirect("/");
    } else {
      res.render("/authors/edit", {
        author: author,
        errorMessage: "Error updating the Author",
      });
    }
  }
});

router.delete("/authors/:id", async (req, res) => {
  let author;
  try {
    author = await Author.findById(req.params.id);
    author.remove();
    res.redirect(`/authors`);
  } catch {
    if (author == null) {
      res.redirect("/");
    } else {
      res.redirect(`/authors/${author.id}`);
    }
  }
});

module.exports = router;
