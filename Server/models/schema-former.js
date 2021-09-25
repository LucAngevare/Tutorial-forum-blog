const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Tutorials = new Schema({
    title: { type: String, required: true },
    date: { type: Date, required: true },
    user: { type: Schema.Types.Mixed, required: true }, //Object datatype for more information on user, account profile link, etc.
    content: { type: String, required: true },
    summary: { type: String, required: true },
    tags: { type: Schema.Types.Mixed, required: true } //Object datatype for use of arrays.
}, {timestamps: true});

module.exports = mongoose.model('tutorials', Tutorials);