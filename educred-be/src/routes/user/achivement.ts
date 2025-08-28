import express, { Request, Response } from "express";
import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import multer from "multer";
import path from "path";
import { Account, Achivement, User } from "../../db/schema";



export const router = express.Router();
const upload = multer({ dest: "uploads/" });




router.post('/:uid', upload.single("file"), async (req: Request, res: Response) => {
    const uid = req.params.uid;
    const file = req.file;
    const { achivementName } = req.body
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

        // call that(check /: uid route) here if same achivement has been uploaded previously
        axios.post(`http://backend:5100/api/v1/user/achivement/check/${uid}`, { description: result.ocr_text }).then(async (res1: any) => {
            if (res1.data.status == "failed") {
                return res.status(501).json({
                    status: "failed",
                    msg: "Duplicate Certification Found ! , failed"
                })
            }
            else if (res1.data.status == "unique") {
                // ✅ Save achievement if verification success
                const newAchievement = new Achivement({
                    achivementName: achivementName || "",
                    achivementCategory: result.expected_category || "Uncategorized",
                    achivementDescription: result.ocr_text || "No OCR text extracted", // OCR text goes here
                    issuedDate: result.issued_date || null,
                    enum: result.category || "extracurricular", // fallback category
                    isVerified: true,
                    user: account.uid,
                    pointsAwarded: result.points || 10, // you can assign based on category/logic
                });

                await newAchievement.save();

                // Link achievement to user
                await User.findByIdAndUpdate(account.uid, {
                    $push: { achivements: newAchievement._id }
                });

                return res.status(200).json({
                    uid,
                    status: "success",
                    message: "Achievement saved successfully",
                    achievement: newAchievement,
                    predicted_output: res1.data
                });

            }
            else if (res1.data.status == "duplicate") {
                return res.status(501).json({
                    status: "failed",
                    msg: "Duplicate Certification Found ! , duplicate",
                    predicted_output: res1.data
                })
            }
            console.log("inside achivement/:uid , ")
        }).catch((err) => {
            console.log("inside achivement/:uid , ", err)
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

        const user = await User.findById(account.uid).populate("achivements");
        if (!user) {
            return res.status(404).json({
                status: "failed",
                msg: "Account not found : check/:uid"
            }
            );
        }

        // Format past achievements for ML backend
        const pastCertificates = (user.achivements || []).map((a: any) => ({

            description: a.achivementDescription || "",
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
