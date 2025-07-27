import mongoose, { Schema } from "mongoose";
import { MONGO_URL } from "../config/dotenv";

export const connect_mongo = async () => {
    mongoose.connect(MONGO_URL).then((res) => {
        console.log("Connection to mongoose succesfull !");
    }).catch((err) => {
        console.log("error occured while coonnceting to mongoose!");

    })
}


const accountScheam = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    uniqueID: { type: String, required: true, unique: true },
    uid: { type: mongoose.Schema.Types.ObjectId, ref: "user" }
})

const userSchema = new Schema({
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    email: { type: String, required: true },
    ph: { type: String, required: true },
    education: {
        type: {
            year: { type: String, required: true },
            branch: { type: String, required: true },
        },
        required: true
    },
    ecred: { type: Number, required: true },
    reputation: { type: Number, required: true },
    achivements: { type: String, required: true },
    walletAddress: { type: String, required: true, unique: true },
})

const achivementSchema = new Schema({
    achivementName: { type: String, required: true },
    submittedOn: { type: Date, default: Date.now },
    enum: [
        "hackathon",
        "seminar",
        "workshop",
        "competition",
        "certification-course",
        "paper-presentation",
        "internship",
        "event-volunteering",
        "club-participation",
        "open-source",
    ],
    isVerified: { type: Boolean, default: false },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    // certificate :  { type: String, required: true }, 
    certificate: { type: String, required: false },
    pointsAwarded: { type: Number, default: 0 }
})

