const express = require("express");

// Create server Express

// Define endpoint for ToDos
// GET fetch all ToDos
// POST Create new ToDo
// PATCH Update ToDo given an ID
// DELETE Delete ToDo given an ID (destroy or soft delete)

// Establish a connection with a Database (Postgress)

// Create ToDo model
// Use the model to interact with the controller functions

// Must structure project with routes, controllers and models folders (util)

// IMPORTANT: Prettier format

// Install cors library (npm i cors)
// app.use(cors())
//data

const posts = [
  { id: 1, title: "Post1", content: "some1", author: "Luis" },
  { id: 2, title: "Post2", content: "some2", author: "Juan" },
  { id: 3, title: "Post3", content: "some3", author: "Pedro" }
];

const users = [
  { name: "Max", age: 23 },
  { name: "John", age: 50 },
  { name: "Jill", age: 10 }
];

//data

// Init express app // allows json

const app = express();
app.use(express.json());

/*-----------------------------
  Define endpoint for ToDos
-----------------------------*/

// https://544gu7.sse.codesandbox.io/users

/*-----------------------------
   GET fetch all ToDos
-----------------------------*/

app.get("/users", (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      users: users
    }
  });
});

// GET posts
app.get("/posts", (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      posts: posts
    }
  });
});

// Get posts by id
//https://ki7ghf.sse.codesandbox.io/posts/1

app.get("/posts/:id", (req, res) => {
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

app.post("/posts", (req, res) => {
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

app.put("/posts/:id", (req, res) => {
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

app.patch("/posts/:id", (req, res) => {
  const { id } = req.params;

  const filterObj = (obj, ...allowedFields) => {
    const newObj = {};

    Object.keys(obj).forEach((el) => {
      if (allowedFields.includes(el)) {
        newObj[el] = obj[el];
      }
    });

    return newObj;
  };

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

app.delete("/posts/:id", (req, res) => {
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

//SERVER

app.listen(4000, () => {
  console.log("runnig express task 01");
});

//Routers
//prueba inicial
//Utils

const { sequelize } = require("./util/database");

// 2** -> success
// 3** -> miscellaneous
// 4** -> client error
// 5** -> server error

/*-----------------------------
  Establish a connection with a Database (Postgress)
-----------------------------*/

sequelize
  .authenticate()
  .then(() => console.log("Database authenticated"))
  .catch((err) => console.log(err));
