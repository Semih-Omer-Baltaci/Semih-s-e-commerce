import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addCreditCard } from '../features/payment/paymentSlice'
import { CreditCard } from 'lucide-react'

const CreditCardForm = () => {
  const dispatch = useDispatch()
  const [cardData, setCardData] = useState({
    cardNumber: '',
    cardholderName: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    saveCard: true
  })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [focused, setFocused] = useState(null)
  const [cardType, setCardType] = useState('')

  // Detect card type based on first digits
  useEffect(() => {
    const number = cardData.cardNumber.replace(/\s+/g, '');
    let type = '';
    
    if (/^4/.test(number)) {
      type = 'visa';
    } else if (/^5[1-5]/.test(number)) {
      type = 'mastercard';
    } else if (/^3[47]/.test(number)) {
      type = 'amex';
    }
    
    setCardType(type);
  }, [cardData.cardNumber]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setCardData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }
  
  const handleFocus = (field) => {
    setFocused(field)
  }
  
  const handleBlur = () => {
    setFocused(null)
  }
  
  const validateForm = () => {
    const newErrors = {}
    
    // Card number validation (basic)
    if (!cardData.cardNumber.trim()) {
      newErrors.cardNumber = 'Kart numarası gerekli'
    } else if (!/^\d{16}$/.test(cardData.cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = 'Geçerli bir kart numarası girin (16 haneli)'
    }
    
    // Cardholder name validation
    if (!cardData.cardholderName.trim()) {
      newErrors.cardholderName = 'Kart sahibi adı gerekli'
    }
    
    // Expiry validation
    if (!cardData.expiryMonth) {
      newErrors.expiryMonth = 'Ay gerekli'
    }
    
    if (!cardData.expiryYear) {
      newErrors.expiryYear = 'Yıl gerekli'
    }
    
    // CVV validation
    if (!cardData.cvv.trim()) {
      newErrors.cvv = 'CVV gerekli'
    } else if (!/^\d{3,4}$/.test(cardData.cvv)) {
      newErrors.cvv = 'Geçerli bir CVV girin'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      // Process credit card data
      if (cardData.saveCard) {
        dispatch(addCreditCard({
          id: `card-${Date.now()}`,
          lastFourDigits: cardData.cardNumber.slice(-4),
          cardholderName: cardData.cardholderName,
          expiryMonth: cardData.expiryMonth,
          expiryYear: cardData.expiryYear
        }))
      }
      
      // Show success message
      setSubmitted(true)
      
      // Reset form
      setCardData({
        cardNumber: '',
        cardholderName: '',
        expiryMonth: '',
        expiryYear: '',
        cvv: '',
        saveCard: true
      })
    }
  }
  
  // Helper to format credit card number with spaces for input
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = matches && matches[0] || ''
    const parts = []
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    
    if (parts.length) {
      return parts.join(' ')
    } else {
      return value
    }
  }
  
  // Format card number for display with masking
  const formatCardNumberDisplay = (value) => {
    const parts = value.split(' ')
    if (parts.length === 0) return '•••• •••• •••• ••••'
    
    // Show only last 4 digits, mask the rest
    if (parts.length === 4) {
      return `•••• •••• •••• ${parts[3]}`
    } else if (parts.length > 0) {
      // For incomplete numbers
      const lastPart = parts[parts.length - 1]
      const maskedParts = Array(parts.length - 1).fill('••••')
      return [...maskedParts, lastPart].join(' ')
    }
    
    return value
  }
  
  // Get styling and logos based on card type
  const getCardTypeStyles = (type) => {
    switch (type) {
      case 'visa':
        return {
          gradient: 'from-blue-800 to-blue-600',
          logo: (
            <div className="text-white font-bold italic text-xl">VISA</div>
          )
        }
      case 'mastercard':
        return {
          gradient: 'from-red-600 to-orange-600',
          logo: (
            <div className="flex">
              <div className="h-8 w-8 bg-red-500 rounded-full opacity-80"></div>
              <div className="h-8 w-8 bg-yellow-500 rounded-full opacity-80 -ml-4"></div>
            </div>
          )
        }
      case 'amex':
        return {
          gradient: 'from-blue-400 to-blue-600',
          logo: (
            <div className="text-white font-bold text-lg">AMEX</div>
          )
        }
      default:
        return {
          gradient: 'from-gray-700 to-gray-900',
          logo: null
        }
    }
  }
  
  // Generate month and year options
  const months = Array.from({ length: 12 }, (_, i) => {
    const num = i + 1
    return num < 10 ? `0${num}` : `${num}`
  })
  
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 10 }, (_, i) => `${currentYear + i}`)
  
  return (
    <div>
      {submitted && (
        <div className="bg-green-100 text-green-700 p-4 rounded-md mb-6 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Kredi kartı bilgileri başarıyla kaydedildi.
        </div>
      )}
      
      {/* Card Preview */}
      <div className="mb-8">
        <div className={`h-48 p-6 rounded-xl shadow-md relative overflow-hidden ${cardType ? `bg-gradient-to-r ${getCardTypeStyles(cardType).gradient}` : 'bg-gradient-to-r from-gray-700 to-gray-900'}`}>
          <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
            <div className="absolute top-6 right-6 w-12 h-12 border border-white/20 rounded-full"></div>
            <div className="absolute top-10 right-10 w-12 h-12 border border-white/20 rounded-full"></div>
            <div className="absolute bottom-6 left-6 w-16 h-4 bg-white/20 rounded-full"></div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border border-white/10 rounded-full"></div>
          </div>
          
          {/* Card Chip */}
          <div className="h-9 w-12 bg-yellow-300/80 rounded-md mb-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-yellow-100/30"></div>
            <div className="absolute top-4 left-0 w-full h-1 bg-yellow-600/30"></div>
            <div className="absolute top-6 left-0 w-full h-1 bg-yellow-600/30"></div>
          </div>
          
          {/* Card Number */}
          <div className="text-xl text-white font-mono mb-6 tracking-wider">
            {cardData.cardNumber ? formatCardNumberDisplay(cardData.cardNumber) : '•••• •••• •••• ••••'}
          </div>
          
          <div className="flex justify-between items-end">
            {/* Cardholder Name */}
            <div>
              <div className="text-xs text-white/70 uppercase mb-1">Kart Sahibi</div>
              <div className="text-sm text-white font-medium tracking-wide uppercase">
                {cardData.cardholderName || 'AD SOYAD'}
              </div>
            </div>
            
            {/* Expiry Date */}
            <div className="text-right">
              <div className="text-xs text-white/70 uppercase mb-1">Son Kullanma</div>
              <div className="text-sm text-white font-medium tracking-wide">
                {cardData.expiryMonth || 'MM'}/{cardData.expiryYear ? cardData.expiryYear.slice(-2) : 'YY'}
              </div>
            </div>
            
            {/* Card Brand Logo */}
            {cardType && (
              <div className="absolute top-6 right-6">
                {getCardTypeStyles(cardType).logo}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6">
          {/* Card Number */}
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="cardNumber">
              Kart Numarası
            </label>
            <div className="relative">
              <input
                id="cardNumber"
                name="cardNumber"
                type="text"
                value={formatCardNumber(cardData.cardNumber)}
                onChange={(e) => {
                  const formatted = formatCardNumber(e.target.value)
                  setCardData(prev => ({ ...prev, cardNumber: formatted }))
                  if (errors.cardNumber) setErrors(prev => ({ ...prev, cardNumber: '' }))
                }}
                onFocus={() => handleFocus('number')}
                onBlur={handleBlur}
                placeholder="1234 5678 9012 3456"
                className={`w-full px-4 py-3 border rounded-lg ${errors.cardNumber ? 'border-red-500 bg-red-50' : focused === 'number' ? 'border-blue-500 ring-1 ring-blue-500' : 'border-gray-300'} transition-all duration-200`}
                maxLength="19"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <CreditCard size={20} />
              </div>
            </div>
            {errors.cardNumber && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.cardNumber}
              </p>
            )}
          </div>
          
          {/* Cardholder Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="cardholderName">
              Kart Sahibinin Adı
            </label>
            <input
              id="cardholderName"
              name="cardholderName"
              type="text"
              value={cardData.cardholderName}
              onChange={handleChange}
              onFocus={() => handleFocus('name')}
              onBlur={handleBlur}
              placeholder="Ad Soyad"
              className={`w-full px-4 py-3 border rounded-lg ${errors.cardholderName ? 'border-red-500 bg-red-50' : focused === 'name' ? 'border-blue-500 ring-1 ring-blue-500' : 'border-gray-300'} transition-all duration-200`}
            />
            {errors.cardholderName && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.cardholderName}
              </p>
            )}
          </div>
          
          {/* Expiry Date and CVV */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Son Kullanma Tarihi
              </label>
              <div className="flex space-x-2">
                <select
                  name="expiryMonth"
                  value={cardData.expiryMonth}
                  onChange={handleChange}
                  onFocus={() => handleFocus('expiry')}
                  onBlur={handleBlur}
                  className={`flex-1 px-3 py-3 border rounded-lg appearance-none ${errors.expiryMonth ? 'border-red-500 bg-red-50' : focused === 'expiry' ? 'border-blue-500 ring-1 ring-blue-500' : 'border-gray-300'} transition-all duration-200`}
                >
                  <option value="">Ay</option>
                  {months.map(month => (
                    <option key={month} value={month}>{month}</option>
                  ))}
                </select>
                
                <select
                  name="expiryYear"
                  value={cardData.expiryYear}
                  onChange={handleChange}
                  onFocus={() => handleFocus('expiry')}
                  onBlur={handleBlur}
                  className={`flex-1 px-3 py-3 border rounded-lg appearance-none ${errors.expiryYear ? 'border-red-500 bg-red-50' : focused === 'expiry' ? 'border-blue-500 ring-1 ring-blue-500' : 'border-gray-300'} transition-all duration-200`}
                >
                  <option value="">Yıl</option>
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
              {(errors.expiryMonth || errors.expiryYear) && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  Son kullanma tarihi gerekli
                </p>
              )}
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="cvv">
                CVV / CVC
              </label>
              <div className="relative">
                <input
                  id="cvv"
                  name="cvv"
                  type="text"
                  value={cardData.cvv}
                  onChange={handleChange}
                  onFocus={() => handleFocus('cvv')}
                  onBlur={handleBlur}
                  placeholder="123"
                  className={`w-full px-4 py-3 border rounded-lg ${errors.cvv ? 'border-red-500 bg-red-50' : focused === 'cvv' ? 'border-blue-500 ring-1 ring-blue-500' : 'border-gray-300'} transition-all duration-200`}
                  maxLength="4"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="text-xs text-gray-400 bg-gray-100 rounded px-1 py-0.5">CVV</div>
                </div>
              </div>
              {errors.cvv && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.cvv}
                </p>
              )}
            </div>
          </div>
        </div>
        
        {/* Save Card Checkbox */}
        <div className="mt-4">
          <label className="flex items-center cursor-pointer">
            <div className="relative">
              <input
                id="saveCard"
                name="saveCard"
                type="checkbox"
                checked={cardData.saveCard}
                onChange={handleChange}
                className="sr-only"
              />
              <div className={`w-5 h-5 border ${cardData.saveCard ? 'bg-blue-600 border-blue-600' : 'bg-white border-gray-300'} rounded transition-colors`}></div>
              {cardData.saveCard && (
                <svg className="absolute top-0.5 left-0.5 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <span className="ml-2 text-gray-700">Bu kartı gelecekteki alışverişlerim için kaydet</span>
          </label>
        </div>
        
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center font-medium text-lg mt-6 shadow-md hover:shadow-lg"
        >
          Kartı Kaydet
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </form>
    </div>
  )
}

export default CreditCardForm
