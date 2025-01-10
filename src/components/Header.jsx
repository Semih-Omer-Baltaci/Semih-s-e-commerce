import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-3">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold">
            <img src="/logo.png" alt="Logo" className="h-8" />
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            <Link to="/products" className="text-gray-600 hover:text-gray-900">Products</Link>
            <Link to="/solutions" className="text-gray-600 hover:text-gray-900">Solutions</Link>
            <Link to="/community" className="text-gray-600 hover:text-gray-900">Community</Link>
            <Link to="/resources" className="text-gray-600 hover:text-gray-900">Resources</Link>
            <Link to="/pricing" className="text-gray-600 hover:text-gray-900">Pricing</Link>
            <Link to="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <Link to="/signin" className="px-4 py-2 text-gray-600 hover:text-gray-900 rounded-md">
              Sign in
            </Link>
            <Link to="/register" className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800">
              Register
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header
