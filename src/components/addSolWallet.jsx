import React from 'react'
import { useState } from "react"
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl"
import './wallet.css'

function AddSolWallet({mnemonic}) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [publicKeys, setPublicKeys] = useState([]);

  return (
    <div className="text-white w-2/4 h-full text-xl bg-stone-950 p-10 ">
        <div className="flex justify-center gap-x-4">
            <button className="wallet bg-gray-900 p-3 rounded-lg"
            onClick={()=>{
                setPublicKeys([])
            }}>remove wallets</button>
            <button className="wallet bg-gray-900 p-3 rounded-lg"
            onClick={mnemonic? async function() {
                const seed = mnemonicToSeed(mnemonic);
                console.log(seed);//an promise whose result is uint8(64) array
                const path = `m/44'/501'/${currentIndex}'/0'`;
                const derivedSeed = derivePath(path, seed.toString("hex")).key;
                console.log(derivedSeed);//logged: uint8(32) array for child private key
                
                const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
                console.log(secret);   //logged:  uint8(64) array for child private key || child public key
                
                const keypair = Keypair.fromSecretKey(secret);
                console.log(keypair);//logged: an object containining both the keypairs
                
                setCurrentIndex(currentIndex + 1);
                console.log(keypair.publicKey);
                
                setPublicKeys([...publicKeys, keypair.publicKey]);
            }: null}>
                Add SOL wallet
            </button>
                </div>
    

            {publicKeys.map(p => <div className="animate-wallet w-full h-20 transition-all items-center justify-center mt-4 rounded-2xl bg-zinc-900"> 
                <p className="mb-2">wallet address-</p> <p>{p.toBase58()}</p> 
            </div>)}
            
        </div>
  )
}

export default AddSolWallet