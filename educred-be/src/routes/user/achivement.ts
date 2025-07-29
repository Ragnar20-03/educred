import express, { Request, Response } from "express";
import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import multer from "multer";
import path from "path";
import { Account, User } from "../../db/schema";



export const router = express.Router();
const upload = multer({ dest: "uploads/" });


router.post('/:uid', upload.single("file"), async (req: Request, res: Response) => {
    const uid = req.params.uid;
    const file = req.file;

    // const { fname, mname = "", lname } = req.body;

    if (!file) {
        return res.status(400).json({ message: "Missing file or name fields." });
    }


    try {

        let account = await Account.findOne({ uid: uid })
        const form = new FormData();
        form.append("file", fs.createReadStream(file.path), file.originalname);
        form.append("fname", account?.fname);
        // form.append("mname", );
        form.append("lname", account?.lname);

        // Send to Flask API (assuming it's running on port 5200)
        const flaskRes = await axios.post("http://ml:5200/predict", form, {
            headers: form.getHeaders(),
            timeout: 10000, // optional timeout
        });

        // Cleanup uploaded file
        fs.unlinkSync(file.path);

        // Process response from Flask
        const result = flaskRes.data;

        // You can now store `result` in MongoDB or forward it
        return res.status(200).json({
            uid,
            result
        });

    } catch (err: any) {
        if (file?.path) fs.unlinkSync(file.path); // cleanup on error
        console.error("Error calling Flask service:", err.message);
        return res.status(500).json({ message: "Failed to process achievement" });
    }
});
