const { Schema, Types } = require('mongoose');

const userSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        username: {
            type: String,
            required: true,
            // unique
            // trimmed
        },
        email: {
            type: String,
            required: true,
            // unique
            // must match valid email address
        },
        thoughts: {
            // Array of _id values referencing the Thought model
        },
        friends: {
            // Array of _id values reference the User model (self-reference);
        }
        /*
         TODO: Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
        */
    }
)