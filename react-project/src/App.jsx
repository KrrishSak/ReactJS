import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const Card = ({title}) => {
  const [hasliked, sethasLinked] = useState(false);
  
  return ( 
    
    <div className='Card'>
    <h2> {title} </h2>
    <button onClick={() => 
      sethasLinked(true)
    }>
      {hasliked ? '❤️' : '💟'}
    </button>
    </div>
  )
}

const App = () => {
  
  return ( 
    <div className='class-container'>
      <Card title = "star wars"/>
      <Card title = "Avatar"/>
      <Card title = "Lion King"/>
    </div>
  )
}

export default App
