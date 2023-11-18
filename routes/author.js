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
    res.redirect("authors");
  } catch {
    res.render("authors/new", {
      author: author,
      errorMessage: "Error creating the Author",
    });
  }
  // author.save().then((err, newAuthor)=>{
  //     if(err){
  //         res.render('authors/new', {
  //             author: author,
  //             errorMessage: 'Error has happend'
  //         })
  //     }
  //     else{
  //         // res.redirect(`authors/${newAuthor.id}`)
  //         res.redirect(`authors`)
  //     }
  // })
});

router.get("/:id", (req, res) => {
  //   res.send("show author", req.params.id);
  res.status(200).send(req.params.id.toString());
});

router.get("/:id/edit", (req, res) => {
  res.send("edit author", req.params.id);
  res.status(200).send("edit", req.params.id.toString());
});

router.put("/:id", (req, res) => {
  res.send("update author", req.params.id);
  res.status(200).send("update", req.params.id.toString());
});

router.delete("./:id", (req, res) => {
  res.send("delete author", req.params.id);
});

module.exports = router;
