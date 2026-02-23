import express from "express";
import {
  createBlog,
  deleteBlog,
  getBlogById,
  getBlogBySearch,
  getBlogsByRole,
  updateBlog,
} from "../controller/blog.js";

const router = express.Router();

router.get("/search", getBlogBySearch);
router.get("/role", getBlogsByRole);

router.post("/", createBlog);
router.get("/:id", getBlogById);
router.put("/:id", updateBlog);
router.delete("/:id", deleteBlog);

export default router;
