
import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Course title is required"],
      trim: true,
      minlength: [3, "Title must contain at least 3 characters"],
      maxlength: [100, "Title cannot exceed 100 characters"],
    },

    description: {
      type: String,
      required: [true, "Course description is required"],
      trim: true,
      minlength: [20, "Description must contain at least 20 characters"],
    },

    instructorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Instructor is required"],
    },

    thumbnailUrl: {
      type: String,
      default: "",
    },

    category: {
      type: String,
      required: [true, "Course category is required"],
      trim: true,
    },

    level: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      default: "beginner",
    },

    price: {
      type: Number,
      default: 0,
      min: [0, "Price cannot be negative"],
    },

    status: {
      type: String,
      enum: ["draft", "pending", "published", "rejected"],
      default: "draft",
    },

    rejectionReason: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.model("Course", courseSchema);

export default Course;
