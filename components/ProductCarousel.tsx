'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface Product {
  _id: string
  name: string
  price: number
  images: string[]
  isBestseller?: boolean
}

interface ProductCarouselProps {
  trendingProducts: Product[]
  newProducts: Product[]
  popularProducts: Product[]
}

export default function ProductCarousel({ trendingProducts, newProducts, popularProducts }: ProductCarouselProps) {
  const [activeTab, setActiveTab] = useState<'trending' | 'new' | 'popular'>('trending')
  const [currentIndex, setCurrentIndex] = useState(0)

  const getCurrentProducts = () => {
    switch (activeTab) {
      case 'trending':
        return trendingProducts
      case 'new':
        return newProducts
      case 'popular':
        return popularProducts
      default:
        return trendingProducts
    }
  }

  const currentProducts = getCurrentProducts()
  const visibleProducts = currentProducts.slice(currentIndex, currentIndex + 4)

  const nextSlide = () => {
    if (currentIndex + 4 < currentProducts.length) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => { setActiveTab('trending'); setCurrentIndex(0) }}
            className={`px-6 py-2 font-semibold transition ${
              activeTab === 'trending'
                ? 'bg-accent text-primary'
                : 'bg-white text-gray-700 hover:bg-gray-200'
            }`}
          >
            TRENDING
          </button>
          <button
            onClick={() => { setActiveTab('new'); setCurrentIndex(0) }}
            className={`px-6 py-2 font-semibold transition ${
              activeTab === 'new'
                ? 'bg-accent text-primary'
                : 'bg-white text-gray-700 hover:bg-gray-200'
            }`}
          >
            NEW
          </button>
          <button
            onClick={() => { setActiveTab('popular'); setCurrentIndex(0) }}
            className={`px-6 py-2 font-semibold transition ${
              activeTab === 'popular'
                ? 'bg-accent text-primary'
                : 'bg-white text-gray-700 hover:bg-gray-200'
            }`}
          >
            POPULAR
          </button>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {visibleProducts.map((product) => (
              <Link key={product._id} href={`/products/${product._id}`}>
                <div className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition relative">
                  {product.isBestseller && (
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded z-10">
                      BESTSELLER
                    </span>
                  )}
                  <div className="h-64 bg-gray-200 relative">
                    {product.images && product.images[0] ? (
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        No Image
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-2">{product.name}</h3>
                    <p className="text-accent font-bold">${product.price.toFixed(2)}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {currentProducts.length > 4 && (
            <>
              <button
                onClick={prevSlide}
                disabled={currentIndex === 0}
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 disabled:opacity-50"
              >
                ←
              </button>
              <button
                onClick={nextSlide}
                disabled={currentIndex + 4 >= currentProducts.length}
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 disabled:opacity-50"
              >
                →
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  )
}


