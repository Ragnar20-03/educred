import express, { Request, Response } from "express"
import { Account, User } from "../../db/schema";
export const router = express.Router()



router.get('/:uid', async (req: Request, res: Response) => {
    try {
        const uid = req.params.uid;

        // Find account first (since it links to User)
        const account = await Account.findOne({ uid: uid }).populate('uid'); // uid → User reference

        if (account) {
            return res.status(200).json({
                status: "success",
                account: account,        // Account details
                user: account.uid        // Populated User details
            });
        } else {
            return res.status(200).json({
                status: "success",
                msg: "No Account/User found",
                account: null,
                user: null
            });
        }

    } catch (err) {
        return res.status(500).json({
            status: "failed",
            msg: "Something went wrong!",
            error: err
        });
    }
});