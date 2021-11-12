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

const Users = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true }
})

module.exports = { Tutorial: mongoose.model('tutorials', Tutorials), Users: mongoose.model('users', Users) };