// routes/posts.js
const express = require("express");
const router = express.Router();

// in-memory "database" for now, mongoDB comes in sprint 10
let blogPosts = [
  { id: 1, title: "Welcome to The Data Hub", content: "First seeded post for testing." },
];

let nextId = 2; // simple auto-increment, resets on server restart (that's fine for this sprint)

// GET /posts - get everything
router.get("/", (req, res) => {
  res.json(blogPosts);
});

// GET /posts/:id - get one post
router.get("/:id", (req, res) => {
  const post = blogPosts.find((p) => p.id === parseInt(req.params.id));

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  res.json(post);
});

// POST /posts - create a new post
router.post("/", (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "title and content are required" });
  }

  const newPost = {
    id: nextId++,
    title,
    content,
  };

  blogPosts.push(newPost);
  res.status(201).json(newPost);
});

// PUT /posts/:id - update an existing post
router.put("/:id", (req, res) => {
  const post = blogPosts.find((p) => p.id === parseInt(req.params.id));

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  const { title, content } = req.body;
  if (title) post.title = title;
  if (content) post.content = content;

  res.json(post);
});

// DELETE /posts/:id - remove a post
router.delete("/:id", (req, res) => {
  const exists = blogPosts.some((p) => p.id === parseInt(req.params.id));

  if (!exists) {
    return res.status(404).json({ message: "Post not found" });
  }

  blogPosts = blogPosts.filter((p) => p.id !== parseInt(req.params.id));
  res.json({ message: "Post deleted" });
});

module.exports = router;
