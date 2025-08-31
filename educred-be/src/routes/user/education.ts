import { Router, Request, Response } from "express";
import { User, Education } from "../../db/schema";

export const router = Router();

router.post('/:uid', async (req: Request, res: Response) => {
    try {
        const uid = req.params.uid;
        // const { institute, degree, place, duration, percentage, certificate } = req.body;
        const { institute, degree, place, duration, percentage } = req.body;

        if (!uid || !institute || !degree || !place || !duration || !percentage) {
            return res.status(400).json({
                status: "failed",
                msg: "All fields including uid are required!",
            });
        }


        // Find the user
        const user = await User.findById(uid);
        if (!user) {
            return res.status(404).json({
                status: "failed",
                msg: "User not found",
            });
        }

        // Create new Education document
        const educationEntry = new Education({
            institute,
            degree,
            place,
            duration,
            percentage,
            // certificate,
        });

        await educationEntry.save();

        // Push reference to user
        user.education.push(educationEntry._id);
        await user.save();

        return res.status(200).json({
            status: "success",
            msg: "Education added successfully!",
            education: educationEntry,
            user,
        });
    } catch (err) {
        console.error("Error adding education:", err);
        return res.status(500).json({
            status: "failed",
            msg: "Internal server error",
        });
    }
});
