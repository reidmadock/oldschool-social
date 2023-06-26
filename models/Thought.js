const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => formatDate(timestamp)
            // Use a getter method to format the timestamp on query.
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema], // Array of nested documents created with the reaction schema.
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false,
    }
);

function formatDate(date) {
    return date.toISOString().split('T')[0];
}

// Create a virtual called reactionCount that retrieves the length of the Thought's reactions array field on query.
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

// Initialize Thought model
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;