import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {generateMnemonic} from 'bip39'
import { EthWallet } from './components/addEthWallet'
import AddSolWallet from './components/addSolWallet'
import CheckBalance from './components/CheckBalance'

function App() {
  const [mnemonic, setMnemonic] = useState("")


  return (
   <>
   <div className='bg-black h-screen relative'>
   <div className='bg-black h-20 flex justify-center'>
   <button className='text-white bg-slate-950 border-white h-14 w-40 border-2 mt-4' onClick={async function(){
     const mn = await generateMnemonic()
     setMnemonic(mn)
    }}>
    add seed phase
   </button>
   <input className='w-2/3 h-14 text-xl p-4 mt-4' placeholder='generate your seed phase' value={mnemonic} ></input>
     </div>
     <div className='bg-black h-20 flex justify-center mt-5'>
    <CheckBalance/>
      </div>
<div className='flex justify-between  absolute left-40 ml-2 rounded-lg  p-8 w-4/5'>

   <EthWallet mnemonic={mnemonic}/>
   <AddSolWallet mnemonic={mnemonic}/>
</div>
      </div>
   </>
  )
}

export default App
