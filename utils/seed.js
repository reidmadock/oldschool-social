const connection = require('../config/connection');
const { User, Thought } = require('../models');
const {
    genRandomReactions,
    genRandomThought,
    genRandomIndex,
    genRandomUsername,
    genNewUsername,
    genRandomEmail
} = require('./data');

console.time('--- SEEDING DATABASE ---');

connection.once('open', async () => {
    // Empty database, to work with a clean one.
    await User.deleteMany({});
    await Thought.deleteMany({});

    // Empty arrays to store randomly generated values
    const users = [];
    const thoughts = [];
    const reactions = [...genRandomReactions(10)];

    /*
     * Step one: Set up functions.
    */

    // Generate a 'thinker' which is just a fun thing to call the user, cause I have already
    // Used the word 'user' far too much. Adds to user array.
    const generateThinker = () => {
        let meta = genRandomEmail(); // Ensure username and email somewhatmatch
        users.push({
            username: genNewUsername(meta.split('@')[0]),
            email: meta,
        });
    };

    // Populate thought will generate the thought text, and give it some random reactions
    const populateThought = (name, fillerText) => {
        thoughts.push({
            thoughtText: fillerText,
            username: name,
            reactions: [reactions[genRandomIndex(reactions)]]
        });
    };

    // Loop to make x amount of user objects
    const createUsers = (int) => {
        for(let i = 0; i < int; i++) {
            generateThinker();
        }
    };

    // Connect some people together,
    const makeFriends  = (user, arr) => {
        let randomFriend = arr[genRandomIndex(arr)];
        // console.log('Random friend: ', randomFriend);
        return (randomFriend == user) ? [] : randomFriend;
    };

    /*
     * Step two: Start creating users, then thoughts, then comments.
    */

    // Create 5 User Objects.
    createUsers(5);

    // Create a 10 word thought associated with each user.
    users.forEach((user) => {
        populateThought(user.username, genRandomThought(10));
    });

    // Inset the thoughts array into Thought
    await Thought.collection.insertMany(thoughts);

    // Assign the user their generated Thought.
    users.forEach((user, index) => {
        user.thoughts = [thoughts[index]._id];
        user.friends = []; // make sure there's an area for friends
    });

    // Insert the users into User
    await User.collection.insertMany(users);

    // Give each User two random friends, cannot be themselves.
    users.forEach(async (user, index) => {
        const randomFriends = users
        .filter((friend) => friend !== user) // Exclude the current user from potential friends
        // .map((friend) => friend._id); // Map the friend objects to their _id values

        user.friends = [randomFriends[0]._id, randomFriends[1]._id]; // Assign the random friends to the user
        // const doc = await user.save();
        // console.log('Saved user: ', doc);'
    });

    // await User.updateMany({friends: users.friends});    

    console.timeEnd('--- SEEDING COMPLETE ---');
    console.table(users);
    console.table(thoughts);
    process.exit(0);
});