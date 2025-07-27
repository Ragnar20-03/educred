import express from "express"
import { OTP } from "../../service/otp";
import { sendOTP } from "../../service/email";

export const router = express.Router();


router.post('/get-otp', async (req, res) => {
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

router.post('/verify-otp', async (req, res) => {
    const { email, otp } = req.body
    let otpInstance = OTP.getInstance()
    if (await otpInstance?.validateOtp(email, otp)) {

        return res.status(200).json({
            status: "success",
            msg: "OTP verify Succesfully , Account created"
        })
    }
    else {
        return res.status(200).json({
            status: "failed",
            msg: "Invalid Otp !"
        })
    }
})

router.post('/wallet', async (req, res) => {

})

router.post('/login', async (req, res) => {
    return res.status(200).json({
        status: "success",
        msg: "Login Succesful"
    })
})