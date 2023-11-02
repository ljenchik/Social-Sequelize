const { db } = require("./../db/connection");
const { DataTypes, Model } = require("sequelize");

class Comment extends Model {}

// Defines a table inside db
Comment.init(
    {
        body: DataTypes.STRING,
        createdAt: DataTypes.STRING,
    },
    {
        sequelize: db,
        modelName: "Comment",
    }
);

module.exports = Comment;
