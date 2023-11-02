const { db } = require("./../db/connection");
const { DataTypes, Model } = require("sequelize");

class Like extends Model {}

// Defines a table inside db
Like.init(
    {
        reactionType: DataTypes.STRING,
        createdAt: DataTypes.STRING,
    },
    {
        sequelize: db,
        modelName: "Like",
    }
);

module.exports = Like;
