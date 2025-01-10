import React from 'react'
import { Home } from 'lucide-react'
import { BrowserRouter as Router } from 'react-router-dom'
import Header from './components/Header'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
            Welcome to E-Commerce
            <Home className="inline-block ml-2" />
          </h1>
        </div>
      </div>
    </Router>
  )
}

export default App
