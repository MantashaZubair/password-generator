import { useCallback, useEffect, useState,useRef } from 'react'
  // kisi bhi chezz ka jab hume referance lena hota h to useRef aata h
function App() {
    const [length,setLength]= useState(8)
    const [numberAllowed, setNumberAllowed] = useState(false)
    const [charAllowed, setCharAllowed] = useState(false)
    const [password, setPassword] = useState("")

    // ref hook
    const passwordRef= useRef(null)


    // useCallback is a React Hook that lets you catch a function defination between re-renders

    const passwordGenerator =useCallback(()=>{
      let pass =""
      let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
      if(numberAllowed) str+="0123456789"
      if(charAllowed) str +="!@#$%&*_{}[]~`^"

      for( let i=1;i<=length;i++){
        // console.log(str.length)
        // let char1= (Math.random() * str.length+1)
        // console.log(char1)
        let char = Math.floor(Math.random() * str.length +1)

        pass += str.charAt(char)
         console.log(pass)
      }
      setPassword(pass)
      
     }, [length,numberAllowed,charAllowed,setPassword])  // optimize ki baat kr rahe   

     //usecallback function ko memorize karta hjitna ho sake ho sakta h pura memorize kr le ho sakta h uske part ko menororize kare

    const copyPasswordonClipboard =useCallback(()=>{
      passwordRef.current?.select();
      passwordRef.current?.setSelectionRange(0,20)
       window.navigator.clipboard.writeText(password)
    },[password])

    useEffect(()=>{
      passwordGenerator()
    },[length,numberAllowed,charAllowed,passwordGenerator]) // kuch bhi ched chad hui



  return (
    <>

     <div className='w-full h-auto  max-w-md mx-auto shadow rounded-lg bg-gray-700 px-4 my-8  text-orange-500 text-2xl '>
          <h1 className='text-white text-center text-4xl my-3 '>Passowrd Generator</h1>
           <div className='flex shadow rounded-lg overflow-hidden mb-4 '>
            <input 
            type='text'
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='password'
            readOnly
            ref={passwordRef}
            />
            <button onClick={copyPasswordonClipboard} className='outline-none bg-blue-700 text-white px-3 py-0.5 shink-0' 
            >copy</button>
            </div>
            <div className='flex text-sm gap-x-2 mb-4'>
              <div className='flex items-center gap-x-1'>
                <input type="range"
                min={6}
                max={100}
                value={length}
                className='cursor-pointer'
                onChange={(e)=>setLength(e.target.value)}
                />
                <label>length:{length}</label>
              </div>
              <div className='flex items-center gap-x-1'>
                <input type="checkbox"
                defaultChecked={numberAllowed}
                id='numberInput'
                onChange={()=>setNumberAllowed((prev)=>!prev)}
                />
                <label htmlFor='numberInput'>number</label>
              </div>
              <div className='flex items-center gap-x-1'>
                <input type="checkbox"
                defaultChecked={charAllowed}
                id='charInput'
                onChange={()=>setCharAllowed((prev)=>!prev)}
                />
                <label htmlFor='charInput'>Characters</label>
              </div>
            </div>
           </div>
         
          
    </>
  )
}

export default App
