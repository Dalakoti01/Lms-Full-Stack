
import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Module title is required"],
      trim: true,
      minlength: [3, "Title must contain at least 3 characters"],
      maxlength: [100, "Title cannot exceed 100 characters"],
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: [true, "Course reference is required"],
    },

    order: {
      type: Number,
      required: [true, "Module order is required"],
      min: [1, "Module order must be at least 1"],
    },
  },
  {
    timestamps: true,
  }
);

moduleSchema.index(
  { courseId: 1, order: 1 },
  { unique: true }
);

const Module = mongoose.model("Module", moduleSchema);

export default Module;
