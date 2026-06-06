const express = require("express");

const router = express.Router();

const authMiddleware = require(
  "../middleware/authMiddleware"
);

const {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  getMyPosts
} = require("../controllers/postController");

router.get("/", getAllPosts);

router.get("/my-posts",
  authMiddleware,
  getMyPosts
);

router.get("/:id", getPostById);

router.post("/",
  authMiddleware,
  createPost
);

router.put("/:id",
  authMiddleware,
  updatePost
);

router.delete("/:id",
  authMiddleware,
  deletePost
);

module.exports = router;