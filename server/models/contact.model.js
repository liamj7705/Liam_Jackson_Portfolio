/**
 * Contact model.
 * A message sent through the contact form.
 */
import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: "Name is required",
  },
  email: {
    type: String,
    trim: true,
    required: "Email is required",
    match: [/.+\@.+\..+/, "Please enter a valid email address"],
  },
  message: {
    type: String,
    trim: true,
    required: "Message is required",
    maxlength: [2000, "Message must be 2000 characters or less"],
  },
  // Whether the admin has read the message
  read: {
    type: Boolean,
    default: false,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Contact", ContactSchema);
