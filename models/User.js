const { db } = require("./../db/connection");
const { DataTypes, Model } = require("sequelize");

class User extends Model {}

// Defines a table User inside db
User.init(
    {
        username: DataTypes.STRING,
        email: DataTypes.STRING,
    },
    {
        sequelize: db,
        modelName: "User",
    }
);

module.exports = User;
