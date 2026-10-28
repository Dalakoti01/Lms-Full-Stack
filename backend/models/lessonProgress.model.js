
import mongoose from "mongoose";

const lessonProgressSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Student reference is required"],
    },

    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: [true, "Course reference is required"],
    },

    lessonId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lesson",
      required: [true, "Lesson reference is required"],
    },

    isCompleted: {
      type: Boolean,
      default: false,
    },

    watchedDuration: {
      type: Number,
      default: 0,
      min: [0, "Watched duration cannot be negative"],
    },

    completedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

lessonProgressSchema.index(
  { studentId: 1, lessonId: 1 },
  { unique: true }
);

const LessonProgress = mongoose.model(
  "LessonProgress",
  lessonProgressSchema
);

export default LessonProgress;
