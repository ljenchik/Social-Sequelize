const { db } = require("./../db/connection");
const { DataTypes, Model } = require("sequelize");

class Post extends Model {}

// Defines a table inside db
Post.init(
    {
        title: DataTypes.STRING,
        body: DataTypes.STRING,
        createdAt: DataTypes.STRING,
    },
    {
        sequelize: db,
        modelName: "Post",
    }
);

module.exports = Post;
