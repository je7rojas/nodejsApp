const express = require("express");

const router = express.Router();

const posts = [
  { id: 1, title: "Post1", content: "some1", author: "Luis" },
  { id: 2, title: "Post2", content: "some2", author: "Juan" },
  { id: 3, title: "Post3", content: "some3", author: "Pedro" }
];

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};

  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) {
      newObj[el] = obj[el];
    }
  });

  return newObj;
};

// GET posts

router.get("/posts", (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      posts: posts
    }
  });
});

// Get posts by id
//https://ki7ghf.sse.codesandbox.io/posts/1

router.get("/posts/:id", (req, res) => {
  const { id } = req.params;
  const post = posts.find((post) => post.id === +id);

  if (!post) {
    res.status(404).json({
      status: "error",
      message: "not found"
    });
    return;
  }

  res.status(200).json({
    status: "success",
    data: {
      post: post
    }
  });
});

/*-----------------------------
  POST Create new ToDo
-----------------------------*/

router.post("/posts", (req, res) => {
  const { title, content } = req.body;

  const newPost = {
    id: Math.floor(Math.random() * 100),
    title,
    content
  };

  posts.push(newPost);

  res.status(201).json({
    status: "success",
    data: { newPost }
  });
});

/*-----------------------------
   PUT
-----------------------------*/

router.put("/posts/:id", (req, res) => {
  const { id } = req.params;
  const { title, content, author } = req.body;

  //validate data values
  if (
    !title ||
    !content ||
    !author ||
    title.length === 0 ||
    content.length === 0 ||
    author.length === 0
  ) {
    res.status(400).json({
      status: "error",
      mesage: "no data found"
    });
    return;
  }

  // Find post by id and get the index
  const postIndex = posts.findIndex((post) => post.id === +id);

  if (postIndex === -1) {
    res.status(404).json({
      status: "error",
      message: "invalid id"
    });
    return;
  }

  const updatePost = posts[postIndex];

  updatePost.title = title;
  updatePost.content = content;
  updatePost.author = author;

  posts[postIndex] = updatePost;

  res.status(204).json({
    status: "success"
  });
});

/*-----------------------------
   PATCH Update ToDo given an ID
-----------------------------*/

router.patch("/posts/:id", (req, res) => {
  const { id } = req.params;

  const data = filterObj(req.body, "title", "content", "author");

  const postIndex = posts.findIndex((post) => post.id === +id);

  if (postIndex === -1) {
    res.status(404).json({
      status: "error",
      message: "invalid id"
    });
    return;
  }

  let updatedPost = posts[postIndex];
  updatedPost = { ...updatedPost, ...data };

  posts[postIndex] = updatedPost;

  res.status(204).json({
    status: "success"
  });
});

/*-----------------------------
   DELETE Delete ToDo given an ID
-----------------------------*/

router.delete("/posts/:id", (req, res) => {
  const { id } = req.params;

  const postIndex = posts.findIndex((post) => post.id === +id);

  if (postIndex === -1) {
    res.status(404).json({
      status: "error",
      message: "invalid id given"
    });
    return;
  }

  //splice method
  posts.splice(postIndex, 1);

  res.status(204).json({
    status: "success"
  });
});

module.exports = { postsRouter: router };
