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
        const allLikes = await Like.bulkCreate(likes);
    });

    // User-Profile
    describe("tests 1 to 1 user-profile association", () => {
        test("user associates with profile", async () => {
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

    // User-Post
    describe("tests 1 to many user-posts association", () => {
        test("user associates with many posts", async () => {
            const foundUser = await User.findOne({
                where: { username: "alice_wonderland" },
            });
            const post1 = await Post.findOne({
                where: { title: "Hiking in Yosemite" },
            });
            const post2 = await Post.findOne({
                where: { title: "London Street Photography" },
            });

            await foundUser.setPosts([post1, post2]);

            const userWithPosts = await User.findOne({
                where: { username: "alice_wonderland" },
                include: Post,
            });
            console.log(JSON.stringify(userWithPosts, null, 2));
            expect(userWithPosts.Posts.length).toEqual(2);
            let test = await userWithPosts.getPosts();
            expect(test[0] instanceof Post).toBe(true);
            expect(test[1] instanceof Post).toBe(true);
        });
    });

    // User-Like
    describe("tests many to many users-likes association", () => {
        test("user associates with many likes", async () => {
            const foundUser = await User.findOne({
                where: { username: "alice_wonderland" },
            });
            const like1 = await Like.findByPk(1);
            const like2 = await Like.findByPk(2);

            await foundUser.addLikes([like1, like2]);
            const userLikes = await foundUser.getLikes();
            expect(userLikes.length).toBe(2);
            expect(userLikes[0] instanceof Like).toBe(true);
        });

        test("like associates with many users", async () => {
            const foundLike = await Like.findByPk(3);
            const user1 = await User.findByPk(1);
            const user2 = await User.findByPk(2);

            await foundLike.addUsers([user1, user2]);
            const likeUsers = await foundLike.getUsers();
            expect(likeUsers.length).toBe(2);
            expect(likeUsers[0] instanceof User).toBe(true);
        });
    });
});
