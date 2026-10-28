
import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema(
  {
    assignmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Assignment",
      required: [true, "Assignment reference is required"],
    },

    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Student reference is required"],
    },

    textAnswer: {
      type: String,
      trim: true,
      default: "",
    },

    submissionUrl: {
      type: String,
      trim: true,
      default: "",
    },

    status: {
      type: String,
      enum: ["submitted", "graded", "resubmissionRequired"],
      default: "submitted",
    },

    marksObtained: {
      type: Number,
      default: null,
      min: [0, "Marks obtained cannot be negative"],
    },

    feedback: {
      type: String,
      trim: true,
      default: "",
    },

    submittedAt: {
      type: Date,
      default: Date.now,
    },

    gradedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

submissionSchema.index(
  { assignmentId: 1, studentId: 1 },
  { unique: true }
);

const Submission = mongoose.model("Submission", submissionSchema);

export default Submission;
