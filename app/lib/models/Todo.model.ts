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
    dayBucket: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

// Optimizes todo-stats query by matching filter and range scan order.
todoSchema.index({ userId: 1, status: 1, updatedAt: -1 });

// Fast lookup for "today's todos"
todoSchema.index({ userId: 1, dayBucket: -1 });

export default mongoose.models.Todo || mongoose.model("Todo", todoSchema);