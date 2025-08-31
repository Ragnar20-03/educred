import express, { Request, Response } from "express";
import { Connection, Keypair, PublicKey, Transaction, clusterApiUrl, sendAndConfirmTransaction } from "@solana/web3.js";
import { createTransferInstruction, getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

export const router = express.Router();

const my_token_mint_address = new PublicKey("2fbgVGvjfooK7Di28NPWCfMuVD4ybw1wpyqDawekqjHu")
const sender_keypair = Keypair.fromSecretKey(Uint8Array.from([113, 13, 85, 127, 40, 90, 73, 198, 1, 80, 94, 20, 92, 65, 157, 220, 82, 109, 143, 104, 177, 199, 87, 187, 245, 237, 13, 89, 111, 126, 61, 81, 124, 118, 143, 98, 221, 37, 88, 154, 200, 89, 249, 127, 64, 22, 219, 239, 252, 18, 118, 181, 126, 156, 87, 46, 112, 109, 177, 170, 198, 67, 94, 205]))

// const sender_public_key = sender_secrete_key.publicKey;

router.post("/send-educred", async (req: Request, res: Response) => {
    try {

        const { to, amount } = req.body;
        const receiverPublicKey = new PublicKey(to);

        // Convert amount to smallest units (assuming 9 decimals)
        const DECIMALS = 9;
        const amountToSend = BigInt(amount) * BigInt(10 ** DECIMALS);


        const senderTokenAccount = await getOrCreateAssociatedTokenAccount(
            connection,
            sender_keypair,
            my_token_mint_address,
            sender_keypair.publicKey
        )

        console.log("SenderTokenAccount is : ", senderTokenAccount);

        const receiverTokenAccount = await getOrCreateAssociatedTokenAccount(
            connection,
            sender_keypair,
            my_token_mint_address,
            receiverPublicKey
        );
        console.log("Receiver Token Account is : ", receiverTokenAccount);

        // const signature = await transfer(
        //     connection,
        //     sender_keypair,
        //     senderTokenAccount.address,
        //     receiverTokenAccount.address,
        //     sender_keypair,
        //     amountToSend
        // )
        const transaction = new Transaction().add(
            createTransferInstruction(
                senderTokenAccount.address,       // source ATA
                receiverTokenAccount.address,     // destination ATA
                sender_keypair.publicKey,          // owner of source ATA
                amountToSend
            )
        );

        // Send and confirm transaction
        const signature = await sendAndConfirmTransaction(connection, transaction, [sender_keypair]);

        // Fetch updated balances
        const senderBalance = await connection.getTokenAccountBalance(senderTokenAccount.address);
        const receiverBalance = await connection.getTokenAccountBalance(receiverTokenAccount.address);


        return res.status(200).json({
            status: "success",
            senderBalance,
            receiverBalance,
            signature
        })
    } catch (err) {
        console.log("error is : ", err);

        return res.status(500).json({
            status: "failed",
            msg: "Something went wrong"
        })
    }
});
