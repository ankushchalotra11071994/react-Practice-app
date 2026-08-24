 import { useState } from "react"

 

 
function App() { 
  const [counter, setcounter]= useState(0);
   function chnagecounter(){
  setcounter(pre=> pre+1);
 }

  return (
    <>
      <h1>{counter}</h1>
      <button onClick={chnagecounter}  > click me</button>
    </>
  )
}

export default App
