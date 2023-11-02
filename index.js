const { Comment, Like, Post, Profile, User } = require("./models/index");

// 1:1
User.hasOne(Profile);
Profile.belongsTo(User);

// 1:many
User.hasMany(Post);
Post.belongsTo(User);

//1:many
Post.hasMany(Comment);
Comment.belongsTo(Post);

//many:many
User.belongsToMany(Like, { through: "user-like" });
Like.belongsToMany(User, { through: "user-like" });

module.exports = {
    Comment,
    Like,
    Post,
    Profile,
    User,
};
