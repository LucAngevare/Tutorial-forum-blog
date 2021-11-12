const express = require("express");
const controller = require("../controllers/tutorial-controller");
const router = express.Router();

router.post("/post", controller.createTutorial);
router.put("/posts/:id", controller.updateTutorial);
router.delete("/posts/:id", controller.deleteTutorial);
router.get("/post/:id", controller.getPostByID);
router.get("/posts", controller.getPosts);
router.post("/user/check", controller.checkUser);
router.get("/user/all", controller.getUsernames);
router.get("/user/:id", controller.findUser);
router.post("/user/signup", controller.signUp);
router.get("/posts/user/:id", controller.getPostsFromUser);

module.exports = router;