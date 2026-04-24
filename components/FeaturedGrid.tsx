'use client'

import React from 'react'
import Link from 'next/link'
import { Star, Check, ShoppingCart, Eye, Heart, ArrowLeftRight, Search } from 'lucide-react'

const products = [
  {
    id: 1,
    name: 'Logitech G Pro X Superlight Wireless Mouse',
    category: 'Gaming Mouse, Logitech',
    price: 'Rs 35,000',
    image: '/gaming_mouse.png',
    rating: 5,
    stock: true,
  },
  {
    id: 2,
    name: 'Razer BlackWidow V4 Mechanical Keyboard',
    category: 'Keyboard, Razer',
    price: 'Rs 42,000',
    image: '/gaming_keyboard.png',
    rating: 4,
    stock: true,
  },
  {
    id: 3,
    name: 'ASUS ROG Swift 27" Gaming Monitor',
    category: 'Monitor, ASUS',
    price: 'Rs 125,000',
    image: '/images/thumbnails.png',
    rating: 5,
    stock: true,
  },
  {
    id: 4,
    name: 'SteelSeries Arctis Nova Pro Headset',
    category: 'Audio, SteelSeries',
    price: 'Rs 58,000',
    image: '/images/hero-mouse.png',
    rating: 4,
    stock: true,
  },
  {
    id: 5,
    name: 'NVIDIA GeForce RTX 4070 Founders Edition',
    category: 'GPU, NVIDIA',
    price: 'Rs 185,000',
    image: '/purple_gaming_pc_hero.png', // Fallback
    rating: 5,
    stock: true,
  },
  {
    id: 6,
    name: 'Corsair Vengeance RGB 32GB DDR5 RAM',
    category: 'Memory, Corsair',
    price: 'Rs 28,000',
    image: '/gaming_keyboard.png', // Fallback
    rating: 4,
    stock: true,
  },
  {
    id: 7,
    name: 'Samsung 990 Pro 2TB NVMe SSD',
    category: 'Storage, Samsung',
    price: 'Rs 45,000',
    image: '/gaming_mouse.png', // Fallback
    rating: 5,
    stock: true,
  },
  {
    id: 8,
    name: 'MSI MAG B650 Tomahawk Motherboard',
    category: 'Motherboard, MSI',
    price: 'Rs 62,000',
    image: '/images/thumbnails.png', // Fallback
    rating: 4,
    stock: true,
  },
  {
    id: 9,
    name: 'NZXT Kraken Elite 360 RGB AIO Cooler',
    category: 'Cooling, NZXT',
    price: 'Rs 52,000',
    image: '/images/hero-mouse.png', // Fallback
    rating: 5,
    stock: true,
  },
  {
    id: 10,
    name: 'Lian Li PC-O11 Dynamic EVO Case',
    category: 'Case, Lian Li',
    price: 'Rs 48,000',
    image: '/purple_gaming_pc_hero.png', // Fallback
    rating: 5,
    stock: true,
  },
]

export default function FeaturedGrid() {
  return (
    <section className="py-16 bg-gray-50/50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Shop Gaming Gear</h2>
          <Link 
            href="/products" 
            className="px-6 py-2.5 bg-primary/10 text-primary font-bold rounded-full hover:bg-primary hover:text-white transition-all duration-300"
          >
            More Products
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="bg-white rounded-2xl p-5 border border-gray-100 flex flex-col h-full hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group"
            >
              {/* Product Image */}
              <div className="relative aspect-square mb-6">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Quick Actions (Floating) */}
                <div className="absolute right-0 top-0 flex flex-col gap-2 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                  <button className="w-8 h-8 bg-white rounded-lg shadow-md flex items-center justify-center text-gray-400 hover:text-primary hover:bg-gray-50 transition-colors border border-gray-100">
                    <ArrowLeftRight size={16} />
                  </button>
                  <button className="w-8 h-8 bg-white rounded-lg shadow-md flex items-center justify-center text-gray-400 hover:text-primary hover:bg-gray-50 transition-colors border border-gray-100">
                    <Search size={16} />
                  </button>
                  <button className="w-8 h-8 bg-white rounded-lg shadow-md flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-gray-50 transition-colors border border-gray-100">
                    <Heart size={16} />
                  </button>
                </div>
              </div>

              {/* Info */}
              <div className="flex flex-col flex-1">
                <h3 className="text-sm font-bold text-gray-900 leading-tight mb-2 line-clamp-2 group-hover:text-primary transition-colors min-h-[40px]">
                  {product.name}
                </h3>
                <p className="text-[10px] font-black text-gray-400 mb-3 uppercase tracking-wider">
                  {product.category}
                </p>
                
                {/* Rating */}
                <div className="flex items-center gap-0.5 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={14} 
                      className="text-gray-200" 
                    />
                  ))}
                </div>

                {/* Status */}
                <div className="mb-3 flex items-center gap-1.5">
                  <Check size={16} className="text-primary font-bold" />
                  <span className="text-xs font-bold text-gray-900">In stock</span>
                </div>

                {/* Price */}
                <div className="mb-5">
                  <span className="text-lg font-black text-primary">
                    {product.price}
                  </span>
                </div>

                {/* Button */}
                <div className="mt-auto">
                  <button className="w-full py-3 bg-primary hover:bg-primary-light text-white text-center text-xs font-bold rounded-xl transition-all active:scale-[0.98] shadow-lg shadow-primary/20">
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
