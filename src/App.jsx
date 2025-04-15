import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Route, Routes } from 'react-router'
import Header from './components/Header'
import Hero from './components/Hero'
import Slider from './components/Slider'
import Testimonials from './components/Testimonials'
import Shop from './components/Shop'
import Footer from './components/Footer'
import Login from './components/Login'
import Profile from './components/Profile'
import Cart from './components/Cart'

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
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <Routes>
  <Route path="/cart" element={<Cart />} />
          <Route exact path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
