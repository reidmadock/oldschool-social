const router = require('express').Router();
const {User, Thought } = require('../../models');
const { findOneAndUpdate } = require('../../models/User');

/** 
 * Tested: get all Thoughts
 * Works
 * Tested: post new Thought
 * Works
 */

// Get all thoughts
router.get('/', async (req, res) => {
    try {
        const dbThoughtData = await Thought.find().sort({ createdAt: -1 });
        
        res.json(dbThoughtData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Post a new thought
router.post('/', async (req, res) => {
    try {
        const { thoughtText, username, reactions } = req.body;
        const { userId } = req.body; // Seperate destructuring, incase I ever want to switch to signed-in user
        // Create the thought
        const dbThoughtData = await Thought.create({thoughtText, username, reactions});
        
        // Update the User data to inlude the newely created Thought
        const dbUserData = await User.findOneAndUpdate({ _id: userId },
            {
                $push: { thoughts: dbThoughtData._id }
            },
            {
                new: true
            } 
        );
        
        if (!dbUserData) {
            return res.status(404).json({ message: 'No user was found at this ID' });
        }

        res.json({ message: 'Thought posted succesfully', thoughtId: dbThoughtData._id, userId: dbUserData._id });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }

});

/**
* ! Get single thought, update thought, delete thought.
*/

// Get a single thought by ID
router.get('/:thoughtId', async (req, res) => {
    try {
        const dbThoughtData = await Thought.findOne({ _id: req.params.thoughtId });

        if (!dbThoughtData) {
            return res.status(404).json({ message: 'No thought at this ID.' });
        }
    
        res.json(dbThoughtData);
    } catch (err) {
        res.status(500).json(err);
    }

});

// Update a thought
router.post('/:thoughtId', async (req, res) => {
    try {
        const dbThoughtData = await Thought.findOneAndUpdate({ _id: req.params.thoughtId },
            {
                $set: req.body
            },
            {
                runValidators: true,
                new: true
            }
        );

        // Check thought was found
        if (!dbThoughtData) {
            return res.status(404).json({ message: 'No thought was found at this ID.' });
        }

        res.json(dbThoughtData);
    } catch (err) {
        res.status(500).json(err);
    }

});

// Delete a thought
router.delete('/:thoughtId', async (req, res) => {
    try {
        // Find and delete the thought
        const dbThoughtData = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

        // Check thought was found
        if (!dbThoughtData) {
            return res.status(404).json({ message: 'No thought was found at this ID.' });
        }
    
        // Find User Thought belongs to and remove from User.
        const dbUserData = await User.findOneAndUpdate({ _id: req.body.userId },
            {
                $pull: { thoughts: dbThoughtData._id }
            },
            {
                new: true
            } 
        );

        // Check that User was found
        if (!dbUserData) {
            return res.status(404).json({ message: 'No user was found at this ID.' });
        }
        
        res.json({ message: 'Thought deleted successfully', thoughtId: dbThoughtData._id, userId: dbUserData._id });
    } catch (err) {
        res.status(500).json(err);
    }

});

/**
 * ! Add reaction, delete reaction.
 * Add Reaction to a Thought: Works
 * Delete Reaction from a Thought: Works
 */

// Add reactions to a thought
router.post('/:thoughtId/reactions', async (req, res) => {
    try {
        const dbThoughtData = await Thought.findOneAndUpdate({ _id: req.params.thoughtId },
            {
                $addToSet: { reactions: req.body }                
            },
            {
                runValidators: true,
                new: true
            }
        );

        if (!dbThoughtData) {
            return res.status(404).json({ message: 'Cannot add reaction, no thought found'});
        }
    
        res.json(dbThoughtData);
    } catch (err) {
        res.status(500).json(err);
    }

});

// Delete a reaction from a thought
router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
    try {
        const dbThoughtData = await Thought.updateOne({ _id: req.params.thoughtId },
            {
                $pull: { reactions: { reactionId: req.params.reactionId } }                
            },
            {
                runValidators: true,
                new: true
            }
        );

        if (!dbThoughtData) {
            return res.status(404).json({ message: 'Cannot delete reaction, no thought found'});
        }

        res.json({ message: 'Reaction deleted successfully', thoughtId: dbThoughtData._id });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }

});

module.exports = router;