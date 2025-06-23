import React from 'react'
import Header from '../components/header/Header'
import HeroSlider from '../components/heroSlider/HeroSlider'

const App = () => {
  return (
    <div>
      <div className="container">
        <Header/>
      </div>
      <HeroSlider />
    </div>
  )
}

export default App
