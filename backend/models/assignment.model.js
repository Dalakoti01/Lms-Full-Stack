
import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Assignment title is required"],
      trim: true,
      minlength: [3, "Title must contain at least 3 characters"],
      maxlength: [150, "Title cannot exceed 150 characters"],
    },

    description: {
      type: String,
      required: [true, "Assignment description is required"],
      trim: true,
    },

    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: [true, "Course reference is required"],
    },

    moduleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Module",
      default: null,
    },

    instructorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Instructor reference is required"],
    },

    dueDate: {
      type: Date,
      default: null,
    },

    totalMarks: {
      type: Number,
      required: [true, "Total marks are required"],
      min: [1, "Total marks must be at least 1"],
    },

    allowedSubmissionTypes: {
      type: [String],
      enum: ["text", "link", "file"],
      default: ["text", "link"],
    },

    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
  },
  {
    timestamps: true,
  }
);

const Assignment = mongoose.model("Assignment", assignmentSchema);

export default Assignment;
