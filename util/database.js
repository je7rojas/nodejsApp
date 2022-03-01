const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  host: "ec2-44-193-188-118.compute-1.amazonaws.com",

  username: "gufswfhimufafi",

  password: "9c54fbd4de7dd49515abe1415487dcc4f00f92e92d172127fa44f8d1fee6136a",

  port: 5432,

  database: "dfv16hro8flt2m",

  dialect: "postgres",

  dialectOptions: {
    ssl: {
      require: true,

      rejectUnauthorized: false
    }
  }
});

module.exports = { sequelize };
