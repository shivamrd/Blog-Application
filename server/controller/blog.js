import Blog from "../models/blog.js";
import user from '../models/user.js';


export const createBlog = async (req, res) => {
  const { title, description, author, selectedFile, tags } = req.body;

  try {
    const existing_user = await user.findById(author);

    if (!existing_user) {
      return res.status(404).json({ mssg: "User doesn't exist" });
    }

    const blog = new Blog({
      title,
      description,
      author,
      selectedFile,
      tags: Array.isArray(tags)
        ? tags
        : typeof tags === "string"
        ? tags.split(",").map((t) => t.trim())
        : [],
    });

    await blog.save();

    return res.status(201).json({ mssg: "Blog created successfully", blog });
  } catch (error) {
    return res.status(500).json({ mssg: "Something went wrong" });
  }
};


export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({});

        return res.status(200).json({ blogs });
    }
    catch (error) {
        return res.status(500).json({ mssg: "Something went wrong" })
    }
}

export const getBlogById = async (req, res) => {
    const { id } = req.params

    try {
        const blog = await Blog.findById(id)

        if (!blog) {
            return res.status(404).json({ mssg: "Blog not foun" })
        }
        return res.status(200).json({ blog });
    }
    catch (error) {

        return res.status(500).json({ mssg: "Something went wrong" })

    }

}


export const getBlogBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;

  try {
    let query = {};

    // 🔎 Title search
    if (searchQuery && searchQuery.trim()) {
      query.title = { $regex: searchQuery.trim(), $options: 'i' };
    }

    // 🏷 Tag search
    if (tags && tags.trim()) {
      const tagsArray = tags
        .split(',')
        .map(tag => tag.trim())
        .filter(Boolean)
        .map(tag => (tag.startsWith('#') ? tag : `#${tag}`));

      // ✅ MATCH ANY tag
      query.tags = { $in: tagsArray };
    }

    // ❌ Block empty search (VERY IMPORTANT)
    if (Object.keys(query).length === 0) {
      return res.status(400).json({ blogs: [] });
    }

    const blogs = await Blog.find(query);

    return res.status(200).json({ blogs });
  } catch (error) {
    console.error("🔥 getBlogBySearch Error:", error);
    return res.status(500).json({ message: "Search failed" });
  }
};







export const updateBlog = async(req,res) => {
    const { id } = req.params
    const { title, description, selectedFile, tags } = req.body;
   
    try{
       const updatedBlog = await Blog.findByIdAndUpdate(id, {title,description,selectedFile,tags}, {new: true})

       return res.status(200).json({updatedBlog})
    }
    catch(error){
        return res.status(500).json({ mssg: "Something went wrong" })
    }
}

 export const  deleteBlog = async(req,res) => {
        const {id} = req.params;
    try{
      await Blog.findByIdAndDelete(id);

      return res.status(200).json({mssg: "Blog deleted sucessfully"})
    }
    catch(error) {
        return res.status(500).json({ mssg: "Something went wrong" })
    }
 }