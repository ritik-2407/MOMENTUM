import mongoose from 'mongoose';

const progressSchema = new mongoose.Schema(
    {
        userId: {

            type: mongoose.Schema.Types.ObjectId ,
            ref: "User",
            required: true

        },

        streak : {
            type: Number,
            default: 0
        },

        lastUpdated : {
            type: Date,
            default: null
        },

        completedDays: [
            {
                date: {type: Date},
            }
        ],
    },
    {timestamps: true}
);

export default mongoose.models.Progress || mongoose.model("Progress" , progressSchema);