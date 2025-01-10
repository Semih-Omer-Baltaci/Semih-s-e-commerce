import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Route, Routes } from 'react-router'
import Header from './components/Header'
import Hero from './components/Hero'
import Slider from './components/Slider'
import Testimonials from './components/Testimonials'
import Shop from './components/Shop'

const Home = () => (
  <main>
    <Hero />
    <Slider />
    <Testimonials />
  </main>
)

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
