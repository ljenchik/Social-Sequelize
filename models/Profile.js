const { db } = require("./../db/connection");
const { DataTypes, Model } = require("sequelize");

class Profile extends Model {}

// Defines a table inside db
Profile.init(
    {
        bio: DataTypes.STRING,
        profilePicture: DataTypes.STRING,
        birthday: DataTypes.STRING,
    },
    {
        sequelize: db,
        modelName: "Profile",
    }
);

module.exports = Profile;
