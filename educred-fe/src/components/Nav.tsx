import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import type { RootState } from "../redux/store";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { setWallet, removeWallet } from "../redux/walletSlice";
import { PublicKey } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount } from "@solana/spl-token";

export const Nav = () => {
  const dispatch = useDispatch();
  const { publicKey, wallet, connected } = useWallet();
  const { connection } = useConnection();
  const [ecred, setEcred] = useState();

  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  // Listen to wallet connection/disconnection
  useEffect(() => {
    if (connected && publicKey && wallet) {
      dispatch(
        setWallet({
          publicKey: publicKey.toBase58(),
          walletName: wallet.adapter.name,
        })
      );
      console.log(
        "Wallet connected:",
        publicKey.toBase58(),
        wallet.adapter.name
      );
    } else {
      dispatch(removeWallet());
      console.log("Wallet disconnected");
    }
  }, [connected, publicKey, wallet, dispatch]);

  return (
    <div className="bg-black p-3 m-3 flex flex-wrap justify-center gap-6 text-lg rounded-2xl text-white ">
      <Link to="/" className="block px-2 py-1 hover:text-gray-300">
        Home
      </Link>
      <Link to="/market" className="block px-2 py-1 hover:text-gray-300">
        Market
      </Link>
      {isLoggedIn && (
        <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
          <WalletMultiButton />
          <p>Educred : </p>
        </div>
      )}
    </div>
  );
};
