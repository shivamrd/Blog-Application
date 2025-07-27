import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    selectedFile: {
        type: String
    },
    tags: {
        type: [String], // ✅ Correct way to define an array of strings
        required: false
    }
});

export default mongoose.model("Blog", blogSchema);
