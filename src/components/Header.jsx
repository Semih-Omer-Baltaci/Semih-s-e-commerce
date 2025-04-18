import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, X, ShoppingCart, User } from 'lucide-react'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../features/auth/authSlice'
import SemihsBagsLogo from '../assets/logos/semihsBagsLogo'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const user = useSelector(state => state.auth.user)
  const cartCount = useSelector(state => state.cart.items.length)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  const navigation = [
    { name: 'Ana Sayfa', href: '/' },
    { name: 'Mağaza', href: '/shop' },
    { name: 'Hakkımızda', href: '/about' },
    { name: 'İletişim', href: '/contact' }
  ]

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <SemihsBagsLogo size="default" />
            <span className="text-2xl font-bold text-[#8B5A2B]">Semih's Bags</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-sm font-medium text-gray-500 hover:text-gray-900"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Right Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/cart" className="relative p-2 hover:bg-gray-100 rounded-full">
  <ShoppingCart className="w-6 h-6" />
  {cartCount > 0 && (
    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5">
      {cartCount}
    </span>
  )}
</Link>
            {isAuthenticated ? (
              <>
                <span className="font-medium mr-2">{user?.username}</span>
                <Link to="/profile" className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors flex items-center">
                  <User className="w-5 h-5 inline-block mr-2" /> Profil
                </Link>
                <button onClick={handleLogout} className="ml-2 px-3 py-2 rounded bg-gray-200 hover:bg-gray-300">Çıkış</button>
              </>
            ) : (
              <button onClick={() => navigate('/login')} className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors">
                <User className="w-5 h-5 inline-block mr-2" />
                Giriş Yap
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <Link to="/cart" className="relative p-2 hover:bg-gray-100 rounded-full">
  <ShoppingCart className="w-6 h-6" />
  {cartCount > 0 && (
    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5">
      {cartCount}
    </span>
  )}
</Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-sm font-medium text-gray-500 hover:text-gray-900"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {isAuthenticated ? (
                <>
                  <span className="font-medium mr-2">{user?.username}</span>
                  <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors flex items-center">
                    <User className="w-5 h-5 inline-block mr-2" /> Profil
                  </Link>
                  <button onClick={() => { handleLogout(); setIsMenuOpen(false)}} className="mt-2 px-3 py-2 rounded bg-gray-200 hover:bg-gray-300">Çıkış</button>
                </>
              ) : (
                <button onClick={() => { navigate('/login'); setIsMenuOpen(false)}} className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors">
                  <User className="w-5 h-5 inline-block mr-2" />
                  Giriş Yap
                </button>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header
