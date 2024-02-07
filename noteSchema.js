const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const noteSchema = new Schema({
    title: {
        type: String, required: true
    },
    author: {
        type: String, required: true
    },
    body: { type: String, required: true },
}, { timestamps: true });

module.exports = model('Note', noteSchema)