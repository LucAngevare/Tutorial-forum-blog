const { Tutorial, Users } = require("../models/schema-former");
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
            success: false,
            error: err,
            message: "Something went wrong. Unexpected? Contact the website manager!"
        });
    })
}

const findUser = (req, res) => {
    Users.findOne({_id: req.params["id"]}, function(err, user) {
        if (err) return res.status(400).json({ success: false, error: err });
        if (!user) return res.status(404).json({ success: false, error: "User not found" });

        return res.status(200).json({ success: true, data: {_id: user._id, username: user.username} }); //Security, wouldn't want to leak the password, although it wouldn't matter that much as it is still encoded in MD5 ¯\_(ツ)_/¯
    })
}

const checkUser = (req, res) => {
    const body = req.body;
    if (!body) return res.status(400).json({ success: false, error: "Provide a body" });
    if (!body["username"]) {
        Users.findOne({ email: body["email"], password: body["password"] }, function (err, selection) {
            if (err) return res.status(401).json({ success: false, error: "Not a user", error: err })
            res.status(200).json({ success: true, ID: selection._id });
        }).catch(function(err) { //Still hate not being able to use ES6 arrow syntax
            res.status(401).json({ success: false, error: "Not a user", error: err })
        });
    } else {
        Users.findOne({ username: body["username"], password: body["password"] }, function (err, selection) {
            if (err || !selection) {
                return res.status(401).json({ success: false, error: "Not a user" })
            } else {
                res.status(200).json({ success: true, ID: selection._id });
            }
        })
    }
}

const signUp = (req, res) => {
    const body = req.body;
    if (!body) return res.status(400).json({ success: false, error: "Provide a body." });

    const new_user = new Users({
        username: body["username"],
        password: body["password"],
        email: body["email"] 
    })
    if (!new_user) return res.status(418).json({success: false, error: "no advice for this one"})

    new_user.save().then(() => {
        return res.status(201).json({
            success: true,
            ID: new_user._id,
            message: "Yer a new user harry"
        })
    }).catch((err) => {
        res.status(400).json({
            success: false,
            error: err,
            error: "No idea what happened, turn to the bible and pray I guess"
        })
    })
}

const getPostsFromUser = (req, res) => {
    Tutorial.find({ "user.ID": req.params["id"] }, function(err, selection) {
        if (err) return res.status(400).json({ success: false, error: err });
        res.status(200).json({
            success: true,
            data: selection
        })
    })
}

const getUsernames = (req, res) => {
    Users.find({}, {"username": 1}, function(err, selection) {
        if (err) return res.status(400).json({ success: false });
        res.status(200).json({
            success: true,
            data: selection
        })
    })
}

const updateTutorial = (req, res) => {
    const body = req.body;
    if (!body) return res.status(400).json({ success: false, error: "Provide a body." });

    Tutorial.findOne({ _id: req.params["id"] }, function (err, selection) {
        if (err) return res.status(400).json({ success: false, error: err });

        selection.title = body.title;
        selection.date = Date.now();
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
    findUser,
    checkUser,
    getPostsFromUser,
    getUsernames,
    signUp,
    updateTutorial,
    deleteTutorial,
    getPostByID,
    getPosts
}