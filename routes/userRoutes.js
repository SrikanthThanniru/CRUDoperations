const express = require('express');
const { createName, getAllUsers, getUserById, updateUserById, deleteUserById } = require('../controllers/userControllers');

const router = express.Router();

// POST or CREATE users
router.post('/user', createName);  

// GET ALL users
router.get('/getUsers', getAllUsers);

// GET user BY ID
router.get('/getUser/:id', getUserById);

// UPDATE user by ID
router.put('/update/:id', updateUserById);

// DELETE user by ID
router.delete('/delete/:id', deleteUserById);

module.exports = router;
