import nodemailer from 'nodemailer';
import { APP_EMAIL, APP_PASS } from './dotenv';

export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: APP_EMAIL,
        pass: APP_PASS
    }
})