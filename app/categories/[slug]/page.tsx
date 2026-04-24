'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import ProductCard from '@/components/ProductCard'
import FilterSidebar from '@/components/FilterSidebar'
import { getProducts } from '@/lib/api'

export default function CategoryPage() {
  const params = useParams()
  const [products, setProducts] = useState([])
  const [filters, setFilters] = useState<any>({})
  const [sortBy, setSortBy] = useState('newest')

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const params: any = { ...filters, sortBy }
        const data = await getProducts(params)
        setProducts(data.products || [])
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }

    fetchProducts()
  }, [filters, sortBy])

  return (
    <div className="min-h-screen">
      {/* Hero Banner with Blurred Background */}
      <div className="relative bg-primary text-white py-20 overflow-hidden">
        {/* Blurred Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1920&q=80)',
            filter: 'blur(4px)',
          }}
        ></div>
        <div className="absolute inset-0 bg-primary opacity-80"></div>
        
        <div className="relative container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="max-w-2xl">
              <p className="text-sm mb-4 opacity-90">/ Start / Categories / Headphones and Audio for gaming</p>
              <h1 className="text-5xl md:text-6xl font-bold mb-2 leading-tight">
                HEADPHONES AND AUDIO
              </h1>
              <h1 className="text-5xl md:text-6xl font-bold mb-2 leading-tight">
                FOR GAMING
              </h1>
              <h2 className="text-5xl md:text-6xl font-bold leading-tight">
                IS ALWAYS{' '}
                <span className="text-accent">A GOOD GAME</span>
                {' '}WITH
              </h2>
            </div>
            <div className="hidden lg:block w-80 h-80 relative">
              <div 
                className="w-full h-full rounded-lg bg-cover bg-center"
                style={{
                  backgroundImage: 'url(https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80)',
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area with Light Green Background */}
      <div className="bg-accent-light min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="flex gap-8">
            {/* Sidebar - White Background */}
            <aside className="w-64 flex-shrink-0">
              <FilterSidebar filters={filters} setFilters={setFilters} />
            </aside>

            {/* Main Content */}
            <main className="flex-1">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Products</h2>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Rating</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product: any) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>

              {products.length === 0 && (
                <div className="text-center py-16 bg-white rounded-lg">
                  <p className="text-gray-500 text-lg">No products found</p>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}

