const Tutorial = require("../models/schema-former");
const mongoose = require("mongoose");
const showdown = require("showdown");
const converter = new showdown.Converter();

converter.setOption("parseImgDimensions", true);
converter.setOption("tables", true);
converter.setOption("ghCodeBlocks", true);
converter.setOption("tasklists", true);
converter.setOption("simpleLineBreaks", true);
converter.setOption("backslashEscapesHTMLTags", true);
converter.setOption("emoji", true);

const createTutorial = (req, res) => {
    const body = req.body;
    if (!body) return res.status(400).json({ success: false, error: "Provide a body." });
    body.content = converter.makeHtml(req.body.content)

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

const updateTutorial = (req, res) => {
    const body = req.body;
    if (!body) return res.status(400).json({ success: false, error: "Provide a body." });

    Tutorial.findOne({ _id: req.params["id"] }, function (err, selection) {
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

const deleteTutorial = (req, res) => {
    Tutorial.findOneAndDelete({ _id: new mongoose.Types.ObjectId(req.params["id"].toString()) }, function (err, selection) {
        if (err) return res.status(400).json({ success: false, error: err });
        if (!selection) return res.status(404).json({ success: false, error: "Post not recognized" });

        return res.status(201).json({ success: true, data: selection, message: "Post deleted" });
    })
}

const getPostByID = (req, res) => {
    Tutorial.findOne({ _id: req.params["id"] }, function (err, tutorial) {
        if (err) return res.status(400).json({ success: false, error: err });
        if (!tutorial) return res.status(404).json({ success: false, error: "Post not found" });

        return res.status(200).json({ success: true, data: tutorial });
    })
}

const getPosts = (req, res) => {
    Tutorial.find({}, function(err, tutorials) {
        if (err) return res.status(400).json({ success: false, error: err })
        if (!tutorials.length) return res.status(404).json({ success: false, error: "No posts found!" })

        return res.status(200).json({ success: true, data: tutorials })
    })
}

module.exports = {
    createTutorial,
    updateTutorial,
    deleteTutorial,
    getPostByID,
    getPosts
}