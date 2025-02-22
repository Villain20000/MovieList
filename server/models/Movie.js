const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    genre: {
        type: String,
        required: true,
        trim: true
    },
    releaseYear: {
        type: Number,
        required: true
    },
    imdbRating: {
        type: Number,
        min: 0,
        max: 10,
        default: 0
    },
    posterUrl: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        trim: true,
        default: ''
    },
    status: {
        type: String,
        enum: ['Watched', 'Pending'],
        default: 'Pending'
    },
    watchedDate: {
        type: Date,
        default: null
    },
    personalRating: {
        type: Number,
        min: 1,
        max: 5,
        default: null
    },
    personalNotes: {
        type: String,
        trim: true,
        default: ''
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update the updatedAt timestamp before saving
movieSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Movie', movieSchema);
