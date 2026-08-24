import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Card from '../component/card.jsx'
function App() {
  const [count, setCount] = useState(0)
let myobj={
  user:"ankush",
  age:12
}
  return (
 <>
<Card channel="ankush" myarray={myobj}/>
<Card channel="Gunjan" myarray={myobj}/>
 </>
  )
}

export default App
