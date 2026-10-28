
import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Lesson title is required"],
      trim: true,
      minlength: [3, "Title must contain at least 3 characters"],
      maxlength: [150, "Title cannot exceed 150 characters"],
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    moduleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Module",
      required: [true, "Module reference is required"],
    },

    videoUrl: {
      type: String,
      trim: true,
      default: "",
    },

    content: {
      type: String,
      default: "",
    },

    resources: [
      {
        title: {
          type: String,
          required: true,
          trim: true,
        },

        url: {
          type: String,
          required: true,
          trim: true,
        },
      },
    ],

    duration: {
      type: Number,
      default: 0,
      min: [0, "Duration cannot be negative"],
    },

    order: {
      type: Number,
      required: [true, "Lesson order is required"],
      min: [1, "Lesson order must be at least 1"],
    },

    isPreview: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

lessonSchema.index(
  { moduleId: 1, order: 1 },
  { unique: true }
);

const Lesson = mongoose.model("Lesson", lessonSchema);

export default Lesson;
