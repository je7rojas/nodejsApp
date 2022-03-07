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

/*-----------------------------
    Routers
-----------------------------*/

const { postsRouter } = require("./routes/posts.routes");

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

app.use(postsRouter);

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
