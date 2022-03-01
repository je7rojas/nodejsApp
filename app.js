const express = require("express");

// DATA

const posts = [
  { id: 1, title: "Post1", content: "some1" },
  { id: 2, title: "Post2", content: "some2" },
  { id: 3, title: "Post3", content: "some3" }
];

//Routers

//Utils
const { sequelize } = require("./util/database");

//Init express app
const app = express();

const users = [
  { name: "Max", age: 23 },
  { name: "John", age: 50 },
  { name: "Jill", age: 10 }
];
// 2** -> success
// 3** -> miscellaneous
// 4** -> client error
// 5** -> server error

app.get("/users", (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      users: users
    }
  });
});

//conexion de base de datos
sequelize
  .authenticate()
  .then(() => console.log("Database authenticated"))
  .catch((err) => console.log(err));

app.listen(4000, () => {
  console.log("Express app running 2.0");
});
