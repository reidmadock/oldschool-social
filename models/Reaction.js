const { Schema, Types } = require('mongoose');

/*
 !! The reaction is schema only, and will not be used as a model.
 it will be used as the reaction field's subdocment schema in hte Thought model.
*/
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // Use a getter method to format the timestamp on query.
        },
    }
);