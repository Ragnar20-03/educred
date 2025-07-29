import mongoose, { model, Mongoose, Schema } from "mongoose";
import { MONGO_URL } from "../config/dotenv";

export const connect_mongo = async () => {
    mongoose.connect(MONGO_URL).then((res) => {
        console.log("Connection to mongoose succesfull !");
    }).catch((err) => {
        console.log("error occured while coonnceting to mongoose!");

    })
}


const accountScheam = new Schema({
    institueEmail: { type: String, required: false, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: false, unique: false },
    fname: { type: String, required: false },
    lname: { type: String, required: false },
    ph: { type: String, required: false },
    uid: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    wallet: {
        type: {
            walletAddress: { type: String, required: true },
            walletName: { type: String, required: true }
        }
    }

})

const userSchema = new Schema({
    education: [
        {
            collegeName: {
                type: String,

            },
            degree: {
                type: String
            },
            place: {
                type: String,
            },
            duration: {
                type: String,
            },
            percentage: {
                type: String,
            }
        }
    ],
    ecred: { type: Number, default: 0 },
    reputation: { type: Number, default: 0 },
    achivements: [{ type: mongoose.Schema.Types.ObjectId, ref: "achivement" }],

})

const achivementSchema = new Schema({
    achivementName: { type: String, required: false },
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
    // certificate :  { type: String, required: false }, 
    url: { type: String, required: false },
    pointsAwarded: { type: Number, default: 0 }
})


export const Account = model("account", accountScheam);
export const User = model("user", userSchema);
export const Achivement = model("achivement", achivementSchema);
