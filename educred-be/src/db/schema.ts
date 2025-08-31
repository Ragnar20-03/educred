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
    },
    clubAccount: { type: Boolean, required: false },
    eduCred: { type: Number, default: 0 },
    reputation: { type: Number, default: 0 },
})
const educationSchema = new Schema({
    institute: { type: String, required: true },
    degree: { type: String, required: true },
    duration: { type: String, required: true },
    percentage: { type: String, required: true },
    certificate: { type: String, required: false },
})
const userSchema = new Schema({
    education: [{ type: mongoose.Schema.Types.ObjectId, ref: "education" }],
    // ecred: { type: Number, default: 0 },
    // reputation: { type: Number, default: 0 },   
    achievements: [{ type: mongoose.Schema.Types.ObjectId, ref: "achievement" }],
    nft: [{ type: mongoose.Schema.Types.ObjectId, ref: "nft" }]

})

const achievementSchema = new Schema({
    achievementName: { type: String, required: false },
    achievementInfo: { type: String, required: false },
    achievementDescription: { type: String, required: false },
    issuedDate: { type: String, required: false },
    submittedOn: { type: Date, default: Date.now },
    achievementCategory: {
        type: String,
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
            "extracurricular"
        ],
        required: true
    },
    achievementPosition: {
        type: String,
        enum: ["winner", "runner-up", "third", "participant", "none"],
        required: false,
        default: "none"
    },

    isVerified: { type: Boolean, default: false },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    // certificate :  { type: String, required: false }, 
    url: { type: String, required: false },
    coinsAwarded: { type: Number, default: 0 },
    reputationAwarded: { type: Number, default: 0 }
})

const nftSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, requierd: true },
    category: {
        type: String,
        enum: [
            'rare',
            "common",
            "epic",
            "legendary"
        ]
    },
    price: { type: Number, required: true, default: 0 }
})

export const Account = model("account", accountScheam);
export const User = model("user", userSchema);
export const NFT = model('nft', nftSchema);
export const Education = model('education', educationSchema);
export const Achievement = model("achievement", achievementSchema);