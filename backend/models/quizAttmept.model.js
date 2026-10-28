
import mongoose from "mongoose";

const answerSchema = new mongoose.Schema(
  {
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    selectedOptionIndex: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: false }
);

const quizAttemptSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Student reference is required"],
    },

    quizId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
      required: [true, "Quiz reference is required"],
    },

    answers: {
      type: [answerSchema],
      default: [],
    },

    score: {
      type: Number,
      default: 0,
      min: [0, "Score cannot be negative"],
    },

    totalMarks: {
      type: Number,
      required: [true, "Total marks are required"],
      min: [0, "Total marks cannot be negative"],
    },

    isPassed: {
      type: Boolean,
      default: false,
    },

    startedAt: {
      type: Date,
      default: Date.now,
    },

    submittedAt: {
      type: Date,
      default: null,
    },

    status: {
      type: String,
      enum: ["inProgress", "submitted", "evaluated"],
      default: "inProgress",
    },
  },
  {
    timestamps: true,
  }
);

quizAttemptSchema.index({ studentId: 1, quizId: 1 });

const QuizAttempt = mongoose.model("QuizAttempt", quizAttemptSchema);

export default QuizAttempt;
