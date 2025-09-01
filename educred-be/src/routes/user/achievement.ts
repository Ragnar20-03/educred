import express, { Request, Response } from "express";
import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import multer from "multer";
import path from "path";
import { Account, Achievement, User } from "../../db/schema";
import { log } from "console";
import { calculateCoins, calculateReputation } from "../../service/reward";




export const router = express.Router();
const upload = multer({ dest: "uploads/" });




router.post('/:uid', upload.single("file"), async (req: Request, res: Response) => {
    const uid = req.params.uid;
    const file = req.file;
    const { achievementName, achievementInfo } = req.body
    if (!file) {
        return res.status(400).json({ message: "Missing file or name fields." });
    }

    try {
        // Find account for UID
        const account = await Account.findOne({ uid: uid });
        if (!account) {
            if (file?.path) fs.unlinkSync(file.path);
            return res.status(404).json({ message: "Account not found." });
        }

        // Prepare form for ML service
        const form = new FormData();
        form.append("file", fs.createReadStream(file.path), file.originalname);
        form.append("fname", account.fname);
        form.append("lname", account.lname);

        // Call Flask ML backend
        const flaskRes = await axios.post("http://ml:5200/predict", form, {
            headers: form.getHeaders(),
            timeout: 10000,
        });

        // Cleanup uploaded file
        fs.unlinkSync(file.path);

        // ML result
        const result: any = flaskRes.data;

        // === Identification check ===
        if (!result.name_match || result.name_match === "not_found") {
            return res.status(400).json({
                uid,
                status: "verification_failed",
                message: "Identification failed: certificate does not belong to this user",
            });
        }
        console.log("result from first ML is :   ", result)
        // call that(check /: uid route) here if same achievement has been uploaded previously
        axios.post(`http://backend:5100/api/v1/user/achievement/check/${uid}`, { description: result.ocr_text },
            {
                headers: {
                    //     Authorization: req.headers.authorization, // forward user's Bearer token
                    Cookie: `token=${req.cookies['token']}` // forward cookie manually
                },
                withCredentials: true
            }
        ).then(async (res1: any) => {
            console.log("response is : from ml :  ", res1.data)
            if (res1.data.status == "failed") {
                return res.status(501).json({
                    status: "failed",
                    msg: "Duplicate Certification Found ! , failed"
                })
            }
            else if (res1.data.status == "unique") {
                const session = await Achievement.startSession();
                session.startTransaction();

                try {
                    // ✅ Calculate reward values
                    let coins = calculateCoins(result.predicted_category, "none");
                    let reputation = calculateReputation(result.predicted_category, "none");

                    // ✅ Create achievement (inside session)
                    const newAchievement = new Achievement({
                        achievementName: achievementName || "",
                        achievementInfo: achievementInfo,
                        achievementCategory: result.predicted_category || "extracurricular",
                        achievementDescription: result.ocr_text || "No OCR text extracted",
                        issuedDate: result.issued_date || null,
                        isVerified: true,
                        user: account.uid,
                        coinsAwarded: coins,
                        reputationAwarded: reputation,
                    });

                    await newAchievement.save({ session });

                    // ✅ Link achievement to user (inside session)
                    await User.findByIdAndUpdate(
                        account.uid,
                        { $push: { achievements: newAchievement._id } },
                        { session }
                    );

                    // ✅ Send EDUCred tokens (external API call)
                    const reward_educred = await axios.post(
                        "http://backend:5100/api/v1/user/transaction/send-educred",
                        {
                            to: account.wallet?.walletAddress,
                            amount: coins,
                        }
                    );
                    console.log("reward_edcured is ; : : : : ", reward_educred)
                    //@ts-ignore
                    if (reward_educred.data.status !== "success") {
                        throw new Error("Token transfer failed");
                    }

                    // ✅ Commit transaction if everything passed
                    await session.commitTransaction();
                    session.endSession();

                    return res.status(200).json({
                        uid,
                        status: "success",
                        message: "Achievement saved successfully",
                        achievement: newAchievement,
                        predicted_output: res1.data,
                    });

                } catch (err: any) {
                    // ❌ Rollback all DB changes
                    await session.abortTransaction();
                    session.endSession();

                    console.error("Transaction failed:", err.message);

                    return res.status(500).json({
                        status: "failed",
                        msg: "Transaction failed, rolled back all changes",
                        error: err.message,
                    });
                }
            }
            else if (res1.data.status == "duplicate") {
                return res.status(501).json({
                    status: "failed",
                    msg: "Duplicate Certification Found ! , duplicate",
                    predicted_output: res1.data
                })
            }
            console.log("inside achievement/:uid , ")
        }).catch((err) => {
            console.log("inside achievement/:uid , ", err)
        })


    } catch (err: any) {
        if (file?.path) fs.unlinkSync(file.path); // cleanup on error
        console.error("Error calling Flask service:", err.message);
        return res.status(500).json({ message: "Failed to process achievement" });
    }
});

router.post("/check/:uid", async (req: Request, res: Response) => {
    const uid = req.params.uid;
    const { description } = req.body;

    if (!description) {
        return res.status(400).json({
            status: "error",
            message: "Missing issued_date or description",
        });
    }

    try {
        // Get user + their past achievements
        const account = await Account.findOne({ uid: uid });
        if (!account) {
            return res.status(404).json({ message: "Account not found." });
        }

        const user = await User.findById(account.uid).populate("achievements");
        if (!user) {
            return res.status(404).json({
                status: "failed",
                msg: "Account not found : check/:uid"
            }
            );
        }

        // Format past achievements for ML backend
        const pastCertificates = (user.achievements || []).map((a: any) => ({

            description: a.achievementDescription || "",
        }));

        // Call Flask duplicate check service
        const flaskRes = await axios.post("http://ml:5200/check_duplicate", {
            description,
            past_certificates: pastCertificates,
        });

        const result: any = flaskRes.data;

        // Pass result directly from ML backend
        return res.status(200).json({
            uid,
            status: result.status,
            message: result.message,
            matched_certificate: result.matched_certificate || null,
        });

    } catch (err: any) {
        console.error("Error calling Flask check_duplicate:", err.message);
        return res.status(500).json({
            status: "failed",
            message: " Something went wrong ! Failed to check for duplicates , check/:uid",
        });
    }
});


router.get('/:uid', async (req: Request, res: Response) => {
    try {
        const uid = req.params.uid;

        // Find user and populate achievements
        const user = await User.findById(uid)
            .populate("achievements"); // 👈 populate achievements array

        if (!user) {
            return res.status(404).json({
                status: "failed",
                msg: "User not found"
            });
        }

        return res.status(200).json({
            status: "success",

            achievements: user.achievements // all previous achievements
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            status: "failed",
            msg: "Something went Wrong"
        });
    }
});