import express, { Request, Response } from "express"

import { Connection, Keypair, PublicKey, Transaction, clusterApiUrl, sendAndConfirmTransaction } from "@solana/web3.js";
import { ASSOCIATED_TOKEN_PROGRAM_ID, createAssociatedTokenAccountInstruction, createTransferInstruction, getAssociatedTokenAddress, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import bs58 from "bs58"

const connection = new Connection(clusterApiUrl('devnet'), "confirmed")


// Hardcoded secret key array (from solana-keygen)
const MERCHANT_SECRET = new Uint8Array([47, 103, 116, 20, 176, 124, 19, 198, 161, 165, 198, 78, 41, 171, 228, 69, 221, 236, 132, 43, 205, 180, 122, 193, 111, 109, 146, 225, 4, 116, 202, 158, 206, 238, 232, 141, 127, 123, 232, 249, 50, 41, 174, 62, 224, 208, 159, 31, 190, 4, 190, 37, 35, 128, 181, 239, 248, 130, 246, 75, 11, 95, 232, 91]);
const MERCHANT_KEYPAIR = Keypair.fromSecretKey(MERCHANT_SECRET);

//token mint account 
const EDUCRED_MINT = new PublicKey("9g5xTr4vmtoah1T5fg6VxWbhVzpvyAY65SKWJYk1wEd5")

export const router = express.Router();

router.post('/send-educred', async (req: Request, res: Response) => {
    try {
        const { to, amount } = req.body;
        if (!to || !amount) return res.status(400).json({ status: "failed", msg: "All fields are required!" });

        const userPublicKey = new PublicKey(to);

        const merchantATA = await getAssociatedTokenAddress(EDUCRED_MINT, MERCHANT_KEYPAIR.publicKey);
        const userATA = await getAssociatedTokenAddress(EDUCRED_MINT, userPublicKey);

        const tx = new Transaction();

        // Create user ATA if not exists
        const userATAInfo = await connection.getAccountInfo(userATA);
        if (!userATAInfo) {
            const createATAIx = createAssociatedTokenAccountInstruction(
                MERCHANT_KEYPAIR.publicKey,
                userATA,
                userPublicKey,
                EDUCRED_MINT
            );
            tx.add(createATAIx);
        }

        // Add transfer
        const tokenAmount = BigInt(Number(amount) * 1e9);
        const transferIx = createTransferInstruction(
            merchantATA,
            userATA,
            MERCHANT_KEYPAIR.publicKey,
            tokenAmount
        );
        tx.add(transferIx);

        tx.feePayer = MERCHANT_KEYPAIR.publicKey;
        tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;

        const signature = await sendAndConfirmTransaction(connection, tx, [MERCHANT_KEYPAIR]);

        return res.json({ status: "success", signature });
    } catch (err) {
        console.error("Error sending EduCred token:", err);
        return res.status(500).json({ status: "failed", msg: "Something went wrong!" });
    }
});




