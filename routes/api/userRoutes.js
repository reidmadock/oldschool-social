const router = require('express').Router();
const {User, Thought } = require('../../models');

// Get all users
router.get('/', async (req, res) => {
    try {
        const dbUserData = await User.find().select('-__v');
        res,json(dbUserData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Create new user
router.post('/', async (req, res) => {
    try {
        const dbUserData = await User.create(req.body);
        res.json(dbUserData);
    } catch (err) {
        res.status(500).json(err);
    }
});

/**
* TODO: get single user, update user, delete user.
*/
// Get a user by their ID
router.get('/:userId', async (req, res) => {
    try {
        const dbUserData = await User.findOne({ _id: req.params.userId }).select('-__v')
            .populate('friends')
            .populate('thoughts');
        
        if (!dbUserData) {
            return res.status(404).json({ message: 'No user found with this ID.' });
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// Update a user
router.put('/:userId', async (req, res) => {
    try {
        const dbUserData = await User.findOneAndUpdate({ _id: req.params.userId }, 
            {
                $set: req.body
            },
            {
                runValidators: true,
                new: true
            }
        );

        if (!dbUserData) {
            return res.status(404).json({ message: 'Could not update user' });
        }

        res.json(dbUserData);        
    } catch (err) {
        res.status(500).json(err);
    }
});

// Delete a User
router.delete('/:userId', async (req, res) => {
    try {
        const dbUserData = await User.findOneAndDelete({ _id: req.params.userId });

        if (!dbUserData) {
            return res.status(404).json({ message: 'Could not delete user' });
        } else {
            // Delete the users thoughts if a user was found
            await Thought.deleteMany({ _id: { $in: dbUserData.thoughts }});        
        }

        res.json({ message: 'User deleted'});
    } catch (err) {
        res.status(500).json(err);
    }
});

/**
 * TODO: get single friend, delete friend.
 */
router.post('/:userId/friends/:friendId', async (req, res) => {
    try {
        const dbUserData = await User.findOneAndUpdate({ _id: req.params.userId }, 
            {
                $addToSet: { friends: req.params.friendId }
            },
            {
                new: true
            }
        );

        if (!dbUserData) {
            return res.status(404).json({ message: 'No user found at this ID'});
        }

        res.josn(dbUserData);
    } catch (err) {
        res.status(500).json(err);
    }
});
router.delete('/:userId/friends/:friendId', async (req, res) => {
    try {
        const dbUserData = await User.findOneAndUpdate({ _id: req.params.userId }, 
            {
                $pull: { friends: req.params.friendId }
            },
            {
                new: true
            }
        );

        if (!dbUserData) {
            return res.status(404).json({ message: 'No user found at this ID'});
        }

        res.josn(dbUserData);
        
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;