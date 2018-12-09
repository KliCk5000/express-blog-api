const express = require("express");
const router = express.Router();

const { BlogPost } = require("./models");

// send back JSON representation of all blog posts
// on GET requests to root
router.get("/", (req, res) => {
  BlogPost.find()
    .then(posts => {
      return res.json(posts.map(post => post.serialize()));
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    });
});

// send back JSON rep of a single blog post
router.get("/:id", (req, res) => {
  BlogPost.findById(req.params.id)
    .then(post => {
      return res.json(post.serialize());
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    });
});

// create blog post
router.post("/", (req, res) => {
  // ensure `title`, `content` and `author` are in request body
  const requiredFields = ["title", "content", "author"];
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }
  BlogPost.create({
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  })
    .then(post => res.status(201).json(post.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    });
});

// delete a blog post
router.delete("/:id", (req, res) => {
  BlogPost.findByIdAndRemove(req.params.id)
    .then(() => {
      console.log(`Deleted blog post item \`${req.params.id}\``);
      res.status(200).json({ message: "success" });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    });
});

// update blog post
router.put("/:id", (req, res) => {
  if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
    res.status(400).json({
      error: "Request path id and request body id values must match"
    });
  }

  const toUpdate = {};
  const updateableFields = ["title", "content", "author"];

  updateableFields.forEach(field => {
    if (field in req.body) {
      toUpdate[field] = req.body[field];
    }
  });

  console.log(`Updating blog post item \`${req.params.id}\``);

  BlogPost.findByIdAndUpdate(req.params.id, { $set: toUpdate }, { new: true })
    .then(() => {
      res
        .status(200)
        .json({ message: `Succesfully updated \`${req.params.id}\`` });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    });
});

module.exports = router;
