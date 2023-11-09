const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const userModel = require('./models/user');

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://rabi:YWhcvtNQiN1u6zVq@cluster0.8ip0w1v.mongodb.net/mega?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

// Get all users
app.get('/users', async (req, res) => {
    try {
        const users = await userModel.find();
        res.json(users);
    } catch (error) {
        res.status(500).send('Error fetching users');
    }
});

// Add a new user
app.post('/users', async (req, res) => {
    const { name, age, city } = req.body;

    try {
        const newUser = new userModel({ name, age, city });
        await newUser.save();
        res.json(newUser);
    } catch (error) {
        res.status(500).send('Error adding user');
    }
});



// Delete a user by ID
app.delete('/users/:id', async (req, res) => {
    const userId = req.params.id;

    try {
        const deletedUser = await userModel.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).send('User not found');
        }
        res.json(deletedUser);
    } catch (error) {
        res.status(500).send('Error deleting user');
    }
});

// Update a user by ID
app.put('/users/:id', async (req, res) => {
    const userId = req.params.id;
    const { name, age, city } = req.body;

    try {
        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            { name, age, city },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).send('User not found');
        }

        res.json(updatedUser);
    } catch (error) {
        res.status(500).send('Error updating user');
    }
});

// ... (Other existing routes)


app.listen(3001, () => {
    console.log('Server is working');
});
