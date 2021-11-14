const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const env = require("dotenv").config();
const postRouter = require("./routers/post-router")
const db = require("./db");

const app = express();
const apiPort = process.env.PORT ?? 3355;

app.use(bodyParser.urlencoded({ extended: true }));
app.use("/static", express.static("userIcons"))
app.use(cors()); //If there's something I hate more than anything in life, it's CORS errors, so I'll just fix it now before it even comes up.
app.use(bodyParser.json());

db.on("error", console.error.bind(console, "MongoDB connection error: "));

app.get("/", (req, res) => {
    res.send("heya");
});

app.use("/api", postRouter);

app.listen(apiPort, () => console.log(`Server running on ${apiPort}`));
