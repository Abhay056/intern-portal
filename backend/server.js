const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const uri = process.env.MONGO_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
    seedDatabase(); // Seed the database with dummy data
});

const Intern = require('./models/intern.model');

app.get('/api/interns/:id', async (req, res) => {
    try {
        const intern = await Intern.findById(req.params.id);
        if (!intern) return res.status(404).json('Intern not found');
        res.json(intern);
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

// GET: Fetch all interns for the leaderboard
app.get('/api/interns', async (req, res) => {
    try {
        const interns = await Intern.find().sort({ donationsRaised: -1 }); // Sort by donations descending
        res.json(interns);
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

async function seedDatabase() {
    const internCount = await Intern.countDocuments();
    if (internCount === 0) {
        console.log('No interns found, seeding database...');
        const interns = [
            { name: 'Alex Johnson', email: 'alex@example.com', referralCode: 'alex2025', donationsRaised: 1250 },
            { name: 'Maria Garcia', email: 'maria@example.com', referralCode: 'maria2025', donationsRaised: 2300 },
            { name: 'Sam Chen', email: 'sam@example.com', referralCode: 'sam2025', donationsRaised: 800 },
        ];
        await Intern.insertMany(interns);
        console.log('Database seeded!');
    } else {
        console.log('Database already contains data.');
    }
}