const Tutorial = require("../models/schema-former");
const mongoose = require("mongoose");

const createTutorial = (req, res) => {
    const body = req.body;
    if (!body) return res.status(400).json({ success: false, error: "Provide a body." });

    const new_tutorial = new Tutorial(body);
    if (!new_tutorial) res.status(418).json({ success: false, error: err });

    new_tutorial.save().then(() => {
            return res.status(201).json({
                success: true,
                id: new_tutorial._id,
                message: "Tutorial saved to the database mainframe. Hacked into the logistical algorithms and sent the article to the satellites."
            })
        }).catch((err) => {
            return res.status(400).json({
                error: err,
                message: "Something went wrong. Unexpected? Contact the website manager!"
            });
            console.log(err)
        })
}

const updateTutorial = async (req, res) => {
    const body = req.body;
    if (!body) return res.status(400).json({ success: false, error: "Provide a body." });

    await Tutorial.findOne({ _id: req.params["id"] }, (err, selection) => {
        if (err) return res.status(400).json({ success: false, error: err });

        selection.title = body.title;
        selection.date = new Date.now();
        selection.user = body.user;
        selection.content = body.content; //TODO: Convert md to HTML, don't accept pure HTML
        selection.summary = body.summary;
        selection.tags = body.tags;

        selection.save().then(() => {
            return res.status(200).json({ success: true, id: selection._id, message: "Post updated" }) //Make quirky message
        }).catch((err) => {
            return res.status(404).json({ success: false, error: err, message: "Post not updated" })
        })
    })
}

const deleteTutorial = async (req, res) => {
    console.log("was this executed or not please help")
    await Tutorial.findOneAndDelete({ _id: new mongoose.Types.ObjectId(req.params["id"].toString()) }, (err, selection) => {
        if (err) return res.status(400).json({ success: false, error: err });
        if (!selection) return res.status(404).json({ success: false, error: "Post not recognized" });

        return res.status(201).json({ success: true, data: selection, message: "Post deleted" });
    })
}

const getPostByID = async (req, res) => {
    await Tutorial.findOne({ _id: req.params["id"] }, (err, tutorial) => {
        if (err) return res.status(400).json({ success: false, error: err });
        if (!tutorial) return res.status(404).json({ success: false, error: "Post not found" });

        return res.status(200).json({ success: true, data: tutorial });
    })
}

const getPosts = async (req, res) => {
    await Tutorial.find({}, (err, tutorials) => {
        if (err) return res.status(400).json({ success: false, error: err })
        if (!tutorials.length) return res.status(404).json({ success: false, error: "Post(s) not found" })

        return res.status(200).json({ success: true, data: tutorials })
    }).catch((err) => {
        console.error(err)
    })
}

module.exports = {
    createTutorial,
    updateTutorial,
    deleteTutorial,
    getPostByID,
    getPosts
}