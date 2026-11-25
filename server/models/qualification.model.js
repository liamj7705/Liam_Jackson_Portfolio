/**
 * Qualification model.
 * An education entry shown on the Education page.
 */
import mongoose from "mongoose";

const QualificationSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: "Title is required",
  },
  institution: {
    type: String,
    trim: true,
    required: "Institution is required",
  },
  // Years are optional
  startYear: {
    type: Number,
    min: 1900,
    max: 2100,
  },
  endYear: {
    type: Number,
    min: 1900,
    max: 2100,
  },
  status: {
    type: String,
    required: "Status is required",
    enum: ["Completed", "In progress"],
  },
  // Bullet points shown under the qualification
  highlights: [String],
});

export default mongoose.model("Qualification", QualificationSchema);
