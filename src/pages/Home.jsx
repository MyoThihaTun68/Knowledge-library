import { useState } from 'react'
import HeroSection from '../components/HeroSection'

import NoteList from '../components/NoteList'

function App() {

  return (
    <>
    {/* herosection */}
      <HeroSection/>

      {/* List Note books */}
      <NoteList/>
    </>
  )
}

export default App
