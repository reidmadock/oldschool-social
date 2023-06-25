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
            get: timestamp => formatDate(timestamp),
        },
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);
// Formatted Date getter.
// reactionSchema.createdAt.get(function (date) { return date.toISOString().split('T')[0]; });
function formatDate(date) {
    return date.toISOString().split('T')[0];
}

// Schema only, this does not have an instantiated model.

module.exports = reactionSchema;