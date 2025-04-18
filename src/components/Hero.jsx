import React from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className="bg-gray-50 py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-6xl font-bold mb-4 text-gray-900">
          Semih's Bag
        </h1>
        <h2 className="text-2xl text-gray-600 mb-8">
          %100 handmade
        </h2>
        <div className="flex justify-center space-x-4">
          <Link
            to="/shop"
            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
          >
            Shop
          </Link>
          <Link
            to="/explore"
            className="px-6 py-3 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
          >
            Explore
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Hero
