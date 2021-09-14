const express = require("express");
const controller = require("../controllers/tutorial-controller");
const router = express.Router();

router.post("/post", controller.createTutorial);
router.put("/posts/:id", controller.updateTutorial);
router.delete("/posts/:id", controller.deleteTutorial);
router.get("/post/:id", controller.getPostByID);
router.get("/posts", controller.getPosts);

module.exports = router;