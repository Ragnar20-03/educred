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

        console.log("inside this ....");

        const { to, amount } = req.body;
        if (!to || !amount) {
            return res.status(400).json({
                status: "failed",
                msg: "All feilds are necessary !"
            })
        }

        const userPublickKey = new PublicKey(to);
        console.log("user public key is : ", userPublickKey);

        // GET ATA 
        const merchant_associated_token_account = await getAssociatedTokenAddress(
            EDUCRED_MINT,
            MERCHANT_KEYPAIR.publicKey
        )

        const user_associated_token_account = await getAssociatedTokenAddress(
            EDUCRED_MINT,
            userPublickKey
        )



        console.log("merchant ata : ", merchant_associated_token_account);
        console.log("user ata : ", user_associated_token_account);

        const transferInstruction = createTransferInstruction(
            merchant_associated_token_account,
            user_associated_token_account,
            MERCHANT_KEYPAIR.publicKey,
            BigInt(amount) * BigInt(1e9) // convert to base units

        )


        console.log("tansfer instruction is : ", transferInstruction);

        const transaction = new Transaction();


        // check if account exists
        const userATAInfo = await connection.getAccountInfo(user_associated_token_account);
        if (!userATAInfo) {
            console.log("User ATA does not exist. Creating...");
            const createATAIx = createAssociatedTokenAccountInstruction(
                MERCHANT_KEYPAIR.publicKey, // payer
                user_associated_token_account, // ATA
                userPublickKey, // owner
                EDUCRED_MINT,
                TOKEN_PROGRAM_ID,
                ASSOCIATED_TOKEN_PROGRAM_ID
            );

            const createAtaTransaction = new Transaction().add(createATAIx);
            createAtaTransaction.feePayer = MERCHANT_KEYPAIR.publicKey;
            createAtaTransaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
            createAtaTransaction.sign(MERCHANT_KEYPAIR);

            console.log("hererer");
            await sendAndConfirmTransaction(connection, createAtaTransaction, [MERCHANT_KEYPAIR]);
            console.log("User ATA created!");
        }


        transaction.add(transferInstruction)

        transaction.feePayer = MERCHANT_KEYPAIR.publicKey;
        transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;

        transaction.sign(MERCHANT_KEYPAIR);
        console.log("completed !");


        const signature = await sendAndConfirmTransaction(
            connection,
            transaction,
            [MERCHANT_KEYPAIR]
        )
        console.log("signature is : ", signature);

    } catch (error) {
        console.log("something went wrong !", error);
        return res.status(500).json({
            status: "failed",
            msg: "Something went wrong !"
        })
    }
})



