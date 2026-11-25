/**
 * Project model.
 * A project shown on the Projects page.
 */
import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: "Title is required",
  },
  category: {
    type: String,
    trim: true,
    required: "Category is required",
    enum: ["Client", "Personal", "School"],
  },
  // List of technologies used, e.g. ["React", "TypeScript"]
  tech: {
    type: [String],
    trim: true,
    required: "Tech is required",
  },
  // Path to an image in client/public, e.g. "images/my-project.jpg"
  image: {
    type: String,
    trim: true,
  },
  liveUrl: {
    type: String,
    trim: true,
  },
  codeUrl: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
    required: "Description is required",
  },
});

export default mongoose.model("Project", ProjectSchema);
