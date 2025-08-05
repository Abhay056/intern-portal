const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const internSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    referralCode: {
        type: String,
        required: true,
        unique: true
    },
    donationsRaised: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

const Intern = mongoose.model('Intern', internSchema);

module.exports = Intern;