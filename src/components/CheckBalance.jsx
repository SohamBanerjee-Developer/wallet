import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import './wallet.css'

function CheckBalance() {
  const ref = useRef(0)
  const[input,setInput]=useState("")
  const[error, setError] = useState("")
  const[balance, setBalance] = useState("")
  // console.log(ref.current.value);

    useEffect(()=>{//it should not return any promise or call an async function
      async function hee(){
      setError("")
      setBalance("")
      const response= await fetch("https://eth-mainnet.g.alchemy.com/v2/Q2sMxfLhwZtyozPE8bZ9pDJ4KcLTbTvn", {
        method: "POST",
        body: JSON.stringify({
          "jsonrpc": "2.0",
          "id": 1,
          "method": "eth_getBalance",
          "params": [input, "latest"]
      }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
      
      
      const value = await response.json()
      value.error?setError(value.error.message):setBalance(parseInt(value.result, 16)/1000000000000000000)
      console.log(input)
      console.log(balance);       
      console.log(value);
      
  //while printing the error inside useEffect it was giving the previous state why?    
    }
    hee()
    
  },[input])

    //ref.current.value always has the current input value
      
  
  return (
    <>
    <button  className='text-white bg-slate-950 border-white h-14 w-40 border-2 mt-4'
    onClick={()=>{
      document.getElementById("Balance").style.transform = "scale(1)"
    }}>Check Balance</button>
    <input ref={ref} onChange={()=>{setInput(ref.current.value)}} //this is a faster fetching
    className='w-2/3 h-14 text-xl p-4 mt-4'
    placeholder='add your eth address'/>
    <div id="Balance" className='bg-slate-900 w-2/5 h-2/4 text-xl rounded-lg scale-0 flex justify-center items-center absolute z-10'>
    <div className='text-red-700 relative text-2xl p-4'>{error?error:<div>your balance is:<p>{balance}</p></div>}</div>
    <button className='absolute -right-4 -top-8' onClick={()=>{
       document.getElementById("Balance").style.transform = "scale(0)"
    }}>❌</button>
    </div>
    </>
  )
}

export default CheckBalance
// Tip: This event is similar to the oninput event. The difference is that the oninput event occurs immediately after the value of an element has changed, while onchange occurs when the element loses focus, after the content has been changed. The other difference is that the onchange event also works on <select> elements.

