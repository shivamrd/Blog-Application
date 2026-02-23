// import Blog from "../models/blog.js";


// /* =======================
//    CREATE BLOG
// ======================= */
// export const createBlog = async (req, res) => {
//   try {
//     const blog = new Blog(req.body);
//     await blog.save();
//     res.status(201).json({ blog });
//   } catch (error) {
//     res.status(500).json({ message: "Create failed" });
//   }
// };

// /* =======================
//    GET BLOGS BY ROLE
// ======================= */
// export const getBlogsByRole = async (req, res) => {
//   const { userId, role } = req.query;

//   try {
//     const blogs =
//       role === "admin"
//         ? await Blog.find({}).populate("author", "name email role")
//         : await Blog.find({ author: userId }).populate("author", "name email");

//     res.status(200).json({ blogs });
//   } catch (error) {
//     res.status(500).json({ message: "Fetch failed" });
//   }
// };

// /* =======================
//    GET SINGLE BLOG
// ======================= */
// export const getBlogById = async (req, res) => {
//   try {
//     const blog = await Blog.findById(req.params.id).populate(
//       "author",
//       "name email role"
//     );

//     if (!blog) {
//       return res.status(404).json({ message: "Blog not found" });
//     }

//     res.status(200).json({ blog });
//   } catch (error) {
//     res.status(500).json({ message: "Fetch failed" });
//   }
// };

// /* =======================
//    SEARCH BLOGS
// ======================= */
// export const getBlogBySearch = async (req, res) => {
//   const { searchQuery, tags } = req.query;

//   try {
//     let query = {};

//     if (searchQuery) {
//       query.title = { $regex: searchQuery, $options: "i" };
//     }

//     if (tags) {
//       query.tags = { $in: tags.split(",") };
//     }

//     const blogs = await Blog.find(query).populate("author", "name email");
//     res.status(200).json({ blogs });
//   } catch (error) {
//     res.status(500).json({ message: "Search failed" });
//   }
// };

// /* =======================
//    UPDATE BLOG
// ======================= */
// export const updateBlog = async (req, res) => {
//   try {
//     const updatedBlog = await Blog.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );

//     res.status(200).json({ updatedBlog });
//   } catch (error) {
//     res.status(500).json({ message: "Update failed" });
//   }
// };

// /* =======================
//    DELETE BLOG
// ======================= */
// export const deleteBlog = async (req, res) => {
//   try {
//     await Blog.findByIdAndDelete(req.params.id);
//     res.status(200).json({ message: "Deleted" });
//   } catch (error) {
//     res.status(500).json({ message: "Delete failed" });
//   }
// };




import Blog from "../models/blog.js";

/* =======================
   CREATE BLOG
======================= */
export const createBlog = async (req, res) => {
  try {
    const blog = new Blog(req.body);
    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    // console.error("Create Blog Error:", error);
    res.status(500).json({ message: "Create failed" });
  }
};

/* =======================
   GET BLOGS BY ROLE
======================= */
export const getBlogsByRole = async (req, res) => {
  const { userId, role } = req.query;

  try {
    // console.log("ROLE:", role, "USER:", userId);

    const blogs =
      role === "admin"
        ? await Blog.find({})
            .populate("author", "name email role")
            .sort({ createdAt: -1 })
        : await Blog.find({ author: userId })
            .populate("author", "name email")
            .sort({ createdAt: -1 });

    res.status(200).json(blogs);
  } catch (error) {
    // console.error("Get Blogs Error:", error);
    res.status(500).json({ message: "Fetch failed" });
  }
};

/* =======================
   GET SINGLE BLOG
======================= */
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate(
      "author",
      "name email role"
    );

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json(blog);
  } catch (error) {
    // console.error("Get Blog Error:", error);
    res.status(500).json({ message: "Fetch failed" });
  }
};

/* =======================
   SEARCH BLOGS
======================= */
export const getBlogBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;

  try {
    let query = {};

    if (searchQuery) {
      query.title = { $regex: searchQuery, $options: "i" };
    }

    if (tags) {
      query.tags = { $in: tags.split(",") };
    }

    const blogs = await Blog.find(query)
      .populate("author", "name email role")
      .sort({ createdAt: -1 });

    res.status(200).json(blogs);
  } catch (error) {
    // console.error("Search Error:", error);
    res.status(500).json({ message: "Search failed" });
  }
};

/* =======================
   UPDATE BLOG
======================= */
export const updateBlog = async (req, res) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedBlog);
  } catch (error) {
    // console.error("Update Error:", error);
    res.status(500).json({ message: "Update failed" });
  }
};

/* =======================
   DELETE BLOG
======================= */
export const deleteBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    // console.error("Delete Error:", error);
    res.status(500).json({ message: "Delete failed" });
  }
};
