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
  const { searchQuery = '', tags = '' } = req.query;

  try {
    const title = new RegExp(searchQuery, 'i');
    const tagsArray = tags && tags !== 'none' ? tags.split(',').map(tag => tag.trim()) : [];

    let blogs;

    if (tagsArray.length > 0) {
      blogs = await Blog.find({
        $or: [
          { title },
          { tags: { $in: tagsArray } }
        ]
      });
    } else {
      blogs = await Blog.find({ title });
    }

    return res.status(200).json({ blogs });
  } catch (error) {
    console.error("🔥 getBlogBySearch Error:", error.message);
    return res.status(500).json({ mssg: "Search failed", error: error.message });
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