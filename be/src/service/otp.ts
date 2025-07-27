import crypto from "crypto";

interface IUsersOTP {
    email: string;
    otp: string;
    createdAt: number;
}

export class OTP {
    users_otps: IUsersOTP[] = [];
    private static instance: OTP | null = null
    constructor() {
        this.users_otps = [];
    }
    static getInstance() {
        if (!this.instance) {
            OTP.instance = new OTP();
        }
        return OTP.instance;
    }
    private checkExistingOtp = (otp: string) => {
        return this.users_otps.some(user => user.otp === otp);
    };

    generateOTP = async (email: string) => {
        this.removeExpiredOtps();
        let otp = crypto.randomBytes(3).toString('hex');

        // Keep generating OTPs until a unique one is found
        while (this.checkExistingOtp(otp)) {
            otp = crypto.randomBytes(3).toString('hex');
        }

        const currentTime = Date.now();
        this.users_otps.push({ email, otp, createdAt: currentTime });

        return otp;
    };

    validateOtp = (email: string, otp: string) => {
        this.removeExpiredOtps()
        const currentTime = Date.now();
        console.log("Otp'S Are : ", this.users_otps);

        const userOtp = this.users_otps.find(user => user.email === email && user.createdAt + (5 * 60 * 1000) > currentTime);

        if (!userOtp) {
            return false;
        }

        if (userOtp.otp !== otp) {
            return false;
        }

        // OTP is valid, remove it from the list (optional)
        this.users_otps = this.users_otps.filter(user => user.email !== email);

        return true;
    };

    removeExpiredOtps = () => {
        const currentTime = Date.now();
        this.users_otps = this.users_otps.filter(
            user => user.createdAt + (5 * 60 * 1000) > currentTime // 5 minutes validity
        );
    }

}