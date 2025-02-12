import React from 'react'
import { useState } from 'react';
import Home from './components/Home'
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const[mode, setMode] = useState('light')

  // Dark MOde
  const toggleMode = () =>{
    if(mode === 'light'){
      setMode('dark');
      document.body.style.backgroundColor = 'black'
    }
    else{
      setMode('light');
      document.body.style.backgroundColor = 'white'
    }
  }

  return (
    <>
      <Home mode={mode} toggleMode={toggleMode} />
    </>
  )
}

export default App