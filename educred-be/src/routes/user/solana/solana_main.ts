// import express, { Request, Response } from "express";
// import { Connection, Keypair, PublicKey, clusterApiUrl } from "@solana/web3.js";
// import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";

// const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

// export const router = express.Router();

// router.post("/send-educred", async (req: Request, res: Response) => {
//     try {
//         const { senderSecret, receiverPublicKey, amount, mint } = req.body;

//         if (!senderSecret || !receiverPublicKey || !amount || !mint) {
//             return res
//                 .status(400)
//                 .json({ error: "Missing required parameters: senderSecret, receiverPublicKey, amount, mint" });
//         }

//         // Create sender Keypair from secret
//         const senderKeypair = Keypair.fromSecretKey(Uint8Array.from(senderSecret)); // Key pair == public + private key 

//         // Convert amount to smallest units (assuming 9 decimals)
//         const DECIMALS = 9;
//         const amountToSend = BigInt(amount) * BigInt(10 ** DECIMALS);

//         const tokenMint = new PublicKey(mint); // mint address ( actual token address )
//         const receiverPubKey = new PublicKey(receiverPublicKey); // receiver public key 

//         // Get or create sender ATA (guarantees ownership matches keypair)
//         const senderTokenAccount = await getOrCreateAssociatedTokenAccount( // this getOrCreateAssociatedTokenAccount requires -> connection , payer ( whos going to pay ) which accepts key pair , for which token ( eg here educred ) , and owner ( who wns the account )
//             connection,
//             senderKeypair, // payer for fees
//             tokenMint,
//             senderKeypair.publicKey //
//         );

//         // Get or create receiver ATA
//         const receiverTokenAccount = await getOrCreateAssociatedTokenAccount( // same for here
//             connection,
//             senderKeypair, // payer for fees
//             tokenMint,
//             receiverPubKey
//         );

//         // Transfer tokens
//         const signature = await transfer( // transfer is used for spl tokens transfer accepts connection , payer , source,dest,owner (keypair) of source , amount
//             connection,
//             senderKeypair,
//             senderTokenAccount.address,
//             receiverTokenAccount.address,
//             senderKeypair,
//             amountToSend
//         );

//         // Fetch updated balances
//         const senderBalance = await connection.getTokenAccountBalance(senderTokenAccount.address);
//         const receiverBalance = await connection.getTokenAccountBalance(receiverTokenAccount.address);

//         return res.status(200).json({
//             success: true,
//             signature,
//             senderBalance: senderBalance.value.uiAmountString,
//             receiverBalance: receiverBalance.value.uiAmountString
//         });

//     } catch (error: any) {
//         console.error("Transfer error:", error);
//         return res.status(500).json({ error: error.message });
//     }
// });
