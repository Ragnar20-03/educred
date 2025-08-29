import express from "express"
import { OTP } from "../../service/otp";
import { sendOTP } from "../../service/email";
import { Account, User } from "../../db/schema";
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../../config/dotenv";
import { M_AuthMiddleware } from "../../middlewares/authMiddleware";
export const router = express.Router();


router.post('/get-otp', M_AuthMiddleware, async (req, res) => {
    const { email } = req.body;
    let otp = OTP.getInstance();
    let currentOtp = await otp?.generateOTP(email)
    await sendOTP(email, currentOtp)
    console.log("sedning");

    return res.status(200).json({
        status: "success",
        otp: currentOtp
    })
})

router.post('/verify-otp', M_AuthMiddleware, async (req, res) => {
    try {
        const { institueEmail, otp, password, fname, lname, ph, wallet } = req.body;

        // Step 1: Validate all required inputs
        if (!institueEmail || !otp || !password || !fname || !lname || !ph || !wallet?.walletAddress || !wallet?.walletName) {
            return res.status(400).json({
                status: "failed",
                msg: "All fields including walletAddress and walletName are required.",
            });
        }

        // Step 2: Validate OTP using your OTP class
        const otpInstance = OTP.getInstance();
        const isOtpValid = await otpInstance?.validateOtp(institueEmail, otp);

        if (!isOtpValid) {
            return res.status(400).json({
                status: "failed",
                msg: "Invalid or expired OTP",
            });
        }

        // Step 3: Create User document
        const userDoc = await User.create({}); // empty for now, can add education later

        // Step 4: Create Account and reference User
        const accountDoc = await Account.create({
            institueEmail,
            password,
            email: institueEmail, // optional: duplicate if needed
            fname,
            lname,
            ph,
            uid: userDoc._id,
            wallet: {
                walletAddress: wallet.walletAddress,
                walletName: wallet.walletName,
            }
        });

        return res.status(201).json({
            status: "success",
            msg: "Account and user created successfully!",
            accountId: accountDoc._id,
            userId: userDoc._id,
        });

    } catch (err) {
        console.error("Error in /verify-otp:", err);
        return res.status(500).json({
            status: "failed",
            msg: "Internal server error",
        });
    }
});



router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        Account.findOne(
            {
                $or: [{ institueEmail: email }, { email: email }]
                , password: password
            }
        ).then((res1) => {
            console.log("res1 is : ", res1)
            if (res1) {
                let token = jwt.sign({ uid: res1.uid, aid: res1._id }, JWT_SECRET)
                res.cookie('token', token);
                return res.status(200).json({
                    status: "success",
                    token: token,
                    msg: "Login Succesful!"
                })
            }
            else {
                return res.status(501).json({
                    status: "failed",
                    msg: "Invalid Details"
                })
            }
        })
    } catch (err) {
        return res.status(500).json({
            status: "failed",
            msg: "Something went wrong!"
        })
    }

})