import React from 'react'
import { Star } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    quote: "Harika kalite ve hızlı teslimat! Kesinlikle tavsiye ederim.",
    name: "Ayşe Yılmaz",
    title: "Öğrenci",
    description: "Üniversite öğrencisi",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg"
  },
  {
    id: 2,
    quote: "Çantalar çok dayanıklı ve şık. Fiyat-performans açısından mükemmel.",
    name: "Mehmet Demir",
    title: "Öğretmen",
    description: "İlkokul öğretmeni",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg"
  },
  {
    id: 3,
    quote: "Çocuğum için aldığım okul çantasından çok memnun kaldık.",
    name: "Zeynep Kaya",
    title: "Anne",
    description: "2 çocuk annesi",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg"
  },
  {
    id: 4,
    quote: "Modern tasarımları ve renk seçenekleri ile harika ürünler.",
    name: "Can Özkan",
    title: "Tasarımcı",
    description: "Grafik tasarımcı",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg"
  },
  {
    id: 5,
    quote: "Müşteri hizmetleri çok ilgili. Her sorunuma anında çözüm buldular.",
    name: "Elif Şahin",
    title: "Müşteri",
    description: "Düzenli alışveriş yapıyor",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg"
  },
  {
    id: 6,
    quote: "Kaliteli malzeme ve işçilik. Uzun süre kullanılabilecek ürünler.",
    name: "Ahmet Yıldız",
    title: "Spor eğitmeni",
    description: "Fitness antrenörü",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg"
  }
]

const TestimonialCard = ({ quote, name, title, description, avatar }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-center mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
        ))}
      </div>
      <p className="text-gray-700 mb-4 italic">"{quote}"</p>
      <div className="flex items-center">
        <img
          src={avatar}
          alt={name}
          className="w-12 h-12 rounded-full mr-4 object-cover"
        />
        <div>
          <h4 className="font-semibold text-gray-800">{name}</h4>
          <p className="text-gray-600 text-sm">{title}</p>
          <p className="text-gray-500 text-xs">{description}</p>
        </div>
      </div>
    </div>
  )
}

const Testimonials = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Müşterilerimiz Ne Diyor?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Ürünlerimizi kullanan müşterilerimizin deneyimlerini ve görüşlerini sizlerle paylaşıyoruz.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
