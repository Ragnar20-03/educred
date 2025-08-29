import { NextFunction, Request, Response } from "express";
import { Account } from "../db/schema";


export const M_AuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    try {
        if (!req.body.institueEmail) {
            return res.status(401).json({
                status: "failed",
                msg: "institute email is necessary"
            })

        }
        let query = await Account.findOne({ institueEmail: req.body.institueEmail })
        console.log("query is : ", query);

        if (!query) {
            next();
        }
        else {
            return res.status(401).json({
                status: "failed",
                msg: "Already Registerd with this account"
            })
        }
    } catch (err) {
        return res.status(500).json({
            status: "failed",
            msg: "Something went wrong ! (_M_AuthMiddleware)"
        })
    }

}