import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { Wallet, HDNodeWallet } from "ethers";
import './wallet.css'

export const EthWallet = ({mnemonic}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [addresses, setAddresses] = useState([]);

    return (
        <div className="text-white w-2/4 h-full text-lg bg-stone-950 p-10 ">
            
            <div className="flex justify-center gap-x-4">
            <button className="wallet bg-gray-900 p-3 rounded-lg"
            onClick={()=>{
                setAddresses([])
            }}>remove wallets</button>
            <button className="wallet bg-gray-900 p-3 rounded-lg"
            onClick={mnemonic? async function() {
                const seed = await mnemonicToSeed(mnemonic);
                const derivationPath = `m/44'/60'/${currentIndex}'/0'`;
                 const hdNode = HDNodeWallet.fromSeed(seed);
                 const child = hdNode.derivePath(derivationPath);
                 const privateKey = child.privateKey;
                 const wallet = new Wallet(privateKey);
                 setCurrentIndex(currentIndex + 1);
                setAddresses([...addresses, wallet.address]);                
            }: null}>
                Add ETH wallet
            </button></div>
            {addresses.map(p => <div key={p}  className="animate-wallet w-full h-20 opacity-1 items-center justify-center mt-4 rounded-2xl bg-zinc-900"> 
                <p className="mb-2">wallet address-</p> <p>{p}</p> 
            </div>)}

            
        </div>
    )
}