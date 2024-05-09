const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
    name: String,
    photo: String,
    place: String,
    email: String,
    phone: String,
    education: String,
    address: String,
    city: String,
    state: String,
    zip: String,
    skills: String,
    experiences: String
});

const Resumemodel = mongoose.model('users', ResumeSchema); // Use ResumeSchema here
module.exports = Resumemodel;
