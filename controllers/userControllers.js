const Users = require('../models/users');

// Create or Post a user
const createName = async (req, res) => {
    try {
        const { username, phone, email } = req.body;

        // Validate input
        if (!username || !phone || !email) {
            return res.status(400).json({ message: 'Username, phone, and email are required' });
        }

        // Check for duplicate entries
        const existingUser = await Users.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email or username already exists' });
        }

        // Create a new user document
        const dataFields = new Users({
            username,
            phone,
            email
        });

        // Save to the database
        await dataFields.save();
        res.status(201).json(dataFields);
    } catch (err) {
        console.error('Error:', err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await Users.find();
        res.json(users);
    } catch (err) {
        console.log('Error:', err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get a user by ID
const getUserById = async (req, res) => {
    try {
        const user = await Users.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        console.log('Error:', err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update user by ID
const updateUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email, phone } = req.body;
        const updatedUser = await Users.findByIdAndUpdate(
            id,
            { username, email, phone },
            { new: true, runValidators: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(updatedUser);
    } catch (err) {
        console.error('Error updating user:', err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete user by ID
const deleteUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await Users.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        console.error('Error deleting user:', err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { createName, getAllUsers, getUserById, updateUserById, deleteUserById };
