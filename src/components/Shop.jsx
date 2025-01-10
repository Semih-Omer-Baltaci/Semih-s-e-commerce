import React, { useState } from 'react'
import { Filter, ChevronDown, Star } from 'lucide-react'

const products = [
  {
    id: 1,
    name: 'Coral High Classic Backpack',
    price: 299.99,
    rating: 4.5,
    image: '/products/backpack1.jpg',
    category: 'Backpacks',
    colors: ['blue', 'black', 'gray']
  },
  {
    id: 2,
    name: 'Urban Explorer Bag',
    price: 349.99,
    rating: 4.8,
    image: '/products/backpack2.jpg',
    category: 'Backpacks',
    colors: ['green', 'brown', 'black']
  },
  // Add more products as needed
]

const categories = [
  'All Products',
  'Backpacks',
  'School Bags',
  'Travel Bags',
  'Accessories'
]

const Shop = () => {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('All Products')
  const [priceRange, setPriceRange] = useState([0, 1000])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Filter Button */}
      <div className="lg:hidden fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
          className="bg-black text-white p-4 rounded-full shadow-lg"
        >
          <Filter className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Filter Sidebar */}
      <div
        className={`lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity ${
          isMobileFilterOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className={`absolute right-0 top-0 h-full w-80 bg-white transform transition-transform ${
            isMobileFilterOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">Filters</h3>
            {/* Mobile Category Filter */}
            <div className="mb-6">
              <h4 className="font-medium mb-2">Categories</h4>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`block w-full text-left py-2 px-4 rounded ${
                    selectedCategory === category
                      ? 'bg-gray-100 text-black'
                      : 'text-gray-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            {/* Mobile Price Filter */}
            <div className="mb-6">
              <h4 className="font-medium mb-2">Price Range</h4>
              <input
                type="range"
                min="0"
                max="1000"
                value={priceRange[1]}
                onChange={(e) =>
                  setPriceRange([priceRange[0], parseInt(e.target.value)])
                }
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>₺{priceRange[0]}</span>
                <span>₺{priceRange[1]}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-4">
              <h3 className="text-lg font-semibold mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`block w-full text-left py-2 px-4 rounded ${
                      selectedCategory === category
                        ? 'bg-gray-100 text-black'
                        : 'text-gray-600'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">Price Range</h3>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], parseInt(e.target.value)])
                  }
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>₺{priceRange[0]}</span>
                  <span>₺{priceRange[1]}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Shop</h2>
              <div className="flex items-center gap-4">
                <select className="border rounded-md py-2 px-4 bg-white">
                  <option>Latest</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Popular</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative pb-[100%]">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                    <div className="flex items-center mb-2">
                      <div className="flex items-center text-yellow-400">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="ml-1 text-sm text-gray-600">
                          {product.rating}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold">₺{product.price}</span>
                      <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Shop
