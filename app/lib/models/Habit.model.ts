import mongoose from "mongoose";

const habitSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      
    },
    habit: {
      type: String,
      required: true,
      trim: true
    },
    
    status: {
      type: Boolean,
      default: false
    },
  },
  { timestamps: true }
);

export default mongoose.models.Habit || mongoose.model("Habit", habitSchema);
