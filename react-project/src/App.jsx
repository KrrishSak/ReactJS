import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const Card = ({title}) => {
  const [hasliked, sethasLinked] = useState(false);
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    console.log(`${title} movie has been liked: ${hasliked}`)
  }, [hasliked])
  return ( 
    
    <div className='Card' onClick={() => setCount(count + 1)}>
    <h2> {title} <br/> {count || null} </h2>
    <button onClick={() => 
      sethasLinked(!hasliked)
    }>
      {hasliked ? '❤️' : '💟'}
    </button>
    </div>
  )
}

const App = () => {
  return ( 
    <div className='class-container' >
      <Card title = "star wars"/>
      <Card title = "Avatar"/>
      <Card title = "Lion King"/>
    </div>
  )
}

export default App
