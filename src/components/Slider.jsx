import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import backpackBanner from '../assets/images/kareanabanner-kiz-2-tr.jpg'
import coralBanner from '../assets/images/anabanner02-k74-2-tr.jpg'

const sliderData = [
  {
    id: 1,
    image: backpackBanner,
    title: 'Back to School Collection',
    subtitle: 'Trendy Backpacks for Every Style',
    buttonText: 'Shop Now',
    buttonLink: '/shop',
    bgColor: 'bg-pink-100'
  },
  {
    id: 2,
    image: coralBanner,
    title: 'Coral High Original',
    subtitle: 'The Perfect Backpack for Every Adventure',
    buttonText: 'Explore More',
    buttonLink: '/shop',
    bgColor: 'bg-sky-100'
  }
]

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === sliderData.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? sliderData.length - 1 : prev - 1))
  }

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative h-[600px] overflow-hidden">
      {/* Slides */}
      <div
        className="h-full w-full transition-transform duration-500 ease-out flex"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
        }}
      >
        {sliderData.map((slide) => (
          <div
            key={slide.id}
            className={`min-w-full h-full relative ${slide.bgColor}`}
          >
            <div className="container mx-auto h-full flex items-center justify-between px-4">
              <div className="w-1/2 text-left space-y-6">
                <h2 className="text-5xl font-bold text-gray-800">{slide.title}</h2>
                <p className="text-xl text-gray-600">{slide.subtitle}</p>
                <Link
                  to={slide.buttonLink}
                  className="inline-block bg-black text-white px-8 py-3 rounded-md hover:bg-gray-800 transition-colors"
                >
                  {slide.buttonText}
                </Link>
              </div>
              <div className="w-1/2">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/10 hover:bg-black/20 p-2 rounded-full text-black"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/10 hover:bg-black/20 p-2 rounded-full text-black"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {sliderData.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              currentSlide === index ? 'bg-black' : 'bg-black/30'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default Slider
