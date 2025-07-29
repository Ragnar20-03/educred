import express, { Request, Response } from "express"
import { User } from "../../db/schema";
export const router = express.Router()



router.get('/:uid', async (req: Request, res: Response) => {
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




