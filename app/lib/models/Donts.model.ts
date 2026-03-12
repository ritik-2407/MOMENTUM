import mongoose from "mongoose";

interface Donts {
    dont : string;
    userId : string;
}

const dontsSchema = new mongoose.Schema<Donts>({
    dont: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
})

const Donts = mongoose.models.Donts || mongoose.model("Donts", dontsSchema);
export default Donts;