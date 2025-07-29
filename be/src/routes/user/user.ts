import express, { Request, Response } from "express"
import { User } from "../../db/schema";
export const router = express.Router()



router.get('/details/:uid', async (req: Request, res: Response) => {
    try {
        let uid = req.params.uid;

        User.findOne({ _id: uid }).then((res1) => {
            return res.status(200).json({
                status: "success",
                user: res1
            })
        }).
            catch((err) => {
                return res.status(500).json({
                    status: "failed",
                    msg: "somthing went wrong !"
                })
            })
    }
    catch (err) {
        return res.status(500).json({
            status: "failed",
            msg: "somthing went wrong !"
        })
    }
})


router.post('/education/:uid', async (req: Request, res: Response) => {
    let uid = req.params.uid
    const { collegeName, degree, place, duration, percentage } = req.body;

    // Validate required fields
    if (!uid || !collegeName || !degree || !place || !duration || !percentage) {
        return res.status(400).json({
            status: "failed",
            msg: "All fields including uid are required!",
        });
    }

    try {
        // Find the user by ID
        const user = await User.findById(uid);
        if (!user) {
            return res.status(404).json({
                status: "failed",
                msg: "User not found",
            });
        }

        // Push new education entry
        user.education.push({ collegeName, degree, place, duration, percentage });
        await user.save();

        return res.status(200).json({
            status: "success",
            msg: "Education added successfully!",
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
