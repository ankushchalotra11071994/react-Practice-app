import { useState } from 'react';
import './App.css'

function App() { 
  let [counter,setcounter]=  useState(15) 
//let counter=5
 
function Addvalue()
{
  if(counter<10){
  counter=counter+1;
  setcounter(counter);
  console.log('increseeeclikced',counter)
  }
}
 
function Removevalue()
{
  if(counter>0){
 counter=counter-1;
  setcounter(counter);}
}
  return (
    <>
     <h1>Ankush</h1>
     <h2>Counter Vlaue :  {counter}</h2>
     <button onClick={Addvalue}>Increse{counter}</button>
     <br></br>
       <button onClick={Removevalue}>decrese{counter}</button>
    </>
  )
}

export default App
