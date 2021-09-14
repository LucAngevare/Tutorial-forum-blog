const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/how-to-blog", { useNewUrlParser: true }).catch((err) => {
    console.error("connection error", err)
});

const db = mongoose.connection;

module.exports = db;