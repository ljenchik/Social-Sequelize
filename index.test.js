const { Comment, Like, Post, Profile, User } = require("./index");
const { db } = require("./db/connection.js");
const users = require("./seed/users.json");
const profiles = require("./seed/profiles.json");
const posts = require("./seed/posts.json");
const comments = require("./seed/comments.json");
const likes = require("./seed/likes.json");

describe("Social Sequelzie Test", () => {
    /**
     * Runs the code prior to all tests
     */
    beforeAll(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the test suite is run
        await db.sync({ force: true });
        await User.bulkCreate(users);
        await Profile.bulkCreate(profiles);
        await Post.bulkCreate(posts);
        await Comment.bulkCreate(comments);
        await Like.bulkCreate(likes);
    });

    // Write your tests here

    test("finds a user in User table", async () => {
        const foundUser = await User.findOne({
            where: { username: "alice_wonderland" },
        });
        const profile = await Profile.findOne({
            where: { birthday: "1990-06-15" },
        });
        expect(foundUser.username).toBe("alice_wonderland");
        expect(foundUser.email).toBe("alice_wonderland@example.com");
        expect(profile.birthday).toBe("1990-06-15");

        await foundUser.setProfile(profile);

        const userWithProfile = await User.findOne({
            where: { username: "alice_wonderland" },
            include: Profile,
        });
        //console.log(JSON.stringify(userWithProfile, null, 2));
        expect(userWithProfile).toEqual(
            expect.objectContaining({
                Profile: expect.objectContaining({
                    id: 1,
                    bio: "I'm a software engineer",
                    UserId: 4,
                }),
            })
        );
        const associatedProfile = await foundUser.getProfile();
        console.log(JSON.stringify(associatedProfile, null, 2));
        expect(associatedProfile instanceof Profile).toBe(true);
    });
});
