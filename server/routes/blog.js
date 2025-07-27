// import express from "express";
// import { createBlog, deleteBlog, getAllBlogs, getBlogById, getBlogBySearch, updateBlog } from "../controller/blog.js";

// const router = express.Router()

// router.post('/', createBlog)
// router.get('/', getAllBlogs);
// router.get('/', getBlogBySearch); 
// router.get('/:id',getBlogById)
// router.put('/:id',updateBlog)
// router.delete('/:id',deleteBlog)


// export default router;

import express from "express";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getBlogById,
  getBlogBySearch,
  updateBlog
} from "../controller/blog.js";

const router = express.Router();

// ✅ Must go before "/"
router.get('/search', getBlogBySearch);
router.get('/', getAllBlogs);

router.post('/', createBlog);
router.get('/:id', getBlogById);
router.put('/:id', updateBlog);
router.delete('/:id', deleteBlog);

export default router;
