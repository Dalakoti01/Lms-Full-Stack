
import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    questionText: {
      type: String,
      required: [true, "Question text is required"],
      trim: true,
    },

    options: {
      type: [
        {
          type: String,
          required: true,
          trim: true,
        },
      ],
      validate: {
        validator: (options) => options.length >= 2,
        message: "A question must have at least two options",
      },
    },

    correctOptionIndex: {
      type: Number,
      required: [true, "Correct option is required"],
      min: 0,
    },

    marks: {
      type: Number,
      default: 1,
      min: [1, "Marks must be at least 1"],
    },
  },
  { _id: true }
);

const quizSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Quiz title is required"],
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

    moduleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Module",
      default: null,
    },

    duration: {
      type: Number,
      required: [true, "Quiz duration is required"],
      min: [1, "Duration must be at least 1 minute"],
    },

    passingMarks: {
      type: Number,
      required: [true, "Passing marks are required"],
      min: [0, "Passing marks cannot be negative"],
    },

    questions: {
      type: [questionSchema],
      validate: {
        validator: (questions) => questions.length > 0,
        message: "A quiz must contain at least one question",
      },
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

const Quiz = mongoose.model("Quiz", quizSchema);

export default Quiz;
