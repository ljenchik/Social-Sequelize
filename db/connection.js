// Creates a database named db.sqlite
const { Sequelize } = require("sequelize"); // imported library, class
const path = require("path"); // Creates corrcet path for different type of computer

const db = new Sequelize({
    // created a new connection, instance of the class
    dialect: "sqlite",
    storage: path.join(__dirname, "db.sqlite"),
});

module.exports = { db };
