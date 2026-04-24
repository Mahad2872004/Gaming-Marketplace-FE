'use client'

import Link from 'next/link'
import Image from 'next/image'
import { addToCart } from '@/lib/api'
import Cookies from 'js-cookie'

interface Product {
  _id: string
  name: string
  description: string
  price: number
  images: string[]
  colors: string[]
  isBestseller?: boolean
  condition?: string
  category?: any
  stock: number
}

import { Star, Check, ShoppingCart, Eye, Heart, ArrowLeftRight, Search } from 'lucide-react'

export default function ProductCard({ product }: { product: Product }) {
  const handleAddToCart = async () => {
    const token = Cookies.get('token')
    if (!token) {
      alert('Please login to add items to cart')
      return
    }

    try {
      await addToCart(product._id, 1)
      alert('Product added to cart!')
    } catch (error) {
      console.error('Error adding to cart:', error)
      alert('Failed to add product to cart')
    }
  }

  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 flex flex-col h-full hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group">
      {/* Product Image Area */}
      <div className="relative aspect-square mb-6">
        <Link href={`/products/${product._id}`} className="block w-full h-full">
          {product.images && product.images[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-contain group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-50 rounded-xl text-gray-300">
              <Eye size={32} />
            </div>
          )}
        </Link>
        
        {/* Quick Actions (Floating) */}
        <div className="absolute right-0 top-0 flex flex-col gap-2 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
          <button className="w-9 h-9 bg-white rounded-lg shadow-md flex items-center justify-center text-gray-400 hover:text-primary hover:bg-gray-50 transition-colors border border-gray-100">
            <ArrowLeftRight size={18} />
          </button>
          <button className="w-9 h-9 bg-white rounded-lg shadow-md flex items-center justify-center text-gray-400 hover:text-primary hover:bg-gray-50 transition-colors border border-gray-100">
            <Search size={18} />
          </button>
          <button className="w-9 h-9 bg-white rounded-lg shadow-md flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-gray-50 transition-colors border border-gray-100">
            <Heart size={18} />
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1">
        <Link href={`/products/${product._id}`}>
          <h3 className="text-base font-bold text-gray-900 leading-tight mb-2 line-clamp-2 hover:text-primary transition-colors min-h-[40px]">
            {product.name}
          </h3>
        </Link>
        <p className="text-[11px] font-bold text-gray-400 mb-3 uppercase tracking-wider">
          {product.category?.name || product.category || 'Gaming Gear'}
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
          {product.stock > 0 ? (
            <>
              <Check size={16} className="text-primary font-bold" />
              <span className="text-sm font-bold text-gray-900">In stock</span>
            </>
          ) : (
            <span className="text-sm font-bold text-red-500">Out of stock</span>
          )}
        </div>

        {/* Price */}
        <div className="mb-5">
          <span className="text-lg font-black text-primary">
            Rs {product.price.toLocaleString()}
          </span>
        </div>

        {/* Conditional Button */}
        <div className="mt-auto">
          {product.stock > 0 ? (
            <button 
              onClick={handleAddToCart}
              className="w-full py-3 bg-primary hover:bg-primary-light text-white text-center text-sm font-black rounded-xl transition-all active:scale-[0.98] shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
            >
              Add To Cart
            </button>
          ) : (
            <Link 
              href={`/products/${product._id}`}
              className="block w-full py-3 bg-gray-900 hover:bg-black text-white text-center text-sm font-black rounded-xl transition-all active:scale-[0.98] shadow-lg"
            >
              Read More
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

