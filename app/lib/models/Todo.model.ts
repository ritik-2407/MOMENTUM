import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
    {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    todo: {
      type: String,
      required: true,
      trim: true
    },
    
    tier: {
      type: String,
      enum: ["A", "B", "C"],  // like your tier system
      default: "B"
    },
    status: {
      type: Boolean,
      default: false
    },
   
  },
  { timestamps: true }
);

export default mongoose.models.Todo || mongoose.model("Todo", todoSchema);