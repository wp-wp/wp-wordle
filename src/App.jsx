import React, { useState } from 'react'
import Header from './_components/Header'
import Wordle from './_components/Wordle'

function App() {
  return (
    <div className='main flex flex-col justify-center h-full'>
      <Header/>
      <Wordle />
    </div>
  )
}

export default App