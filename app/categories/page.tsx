'use client'

import { useEffect, useState } from 'react'
import ProductCard from '@/components/ProductCard'
import FilterSidebar from '@/components/FilterSidebar'
import { getProducts, getCategories } from '@/lib/api'
import { Gamepad2 } from 'lucide-react'

export default function CategoriesPage() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [filters, setFilters] = useState<any>({})
  const [sortBy, setSortBy] = useState('newest')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cats = await getCategories()
        setCategories(cats || [])
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const params: any = { ...filters, sortBy }
        if (selectedCategory) {
          params.category = selectedCategory
        }
        const data = await getProducts(params)
        setProducts(data.products || [])
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }

    fetchProducts()
  }, [filters, sortBy, selectedCategory])

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-r from-primary to-primary-dark text-white py-16 lg:py-24 overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-accent/20 blur-[120px] rounded-full -translate-x-1/2 translate-y-1/2"></div>
        
        <div className="relative container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.3em] text-primary-lighter mb-6">
                <span>Home</span>
                <span className="w-1 h-1 bg-primary-lighter rounded-full"></span>
                <span>Categories</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black mb-6 leading-[0.9] tracking-tighter uppercase">
                Explore The <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">Next Gen</span> Gear
              </h1>
              <p className="text-lg text-primary-lighter/80 max-w-xl font-medium leading-relaxed">
                Elevate your gaming experience with our curated selection of high-performance hardware and accessories.
              </p>
            </div>
            
            <div className="hidden lg:flex flex-1 justify-end">
              <div className="relative w-80 h-80 bg-white/5 backdrop-blur-2xl rounded-[40px] border border-white/10 flex items-center justify-center p-8 group">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/0 to-white/10 rounded-[40px] group-hover:opacity-100 transition-opacity"></div>
                <Gamepad2 size={120} className="text-white opacity-20 group-hover:scale-110 transition-transform duration-700" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Sidebar */}
            <aside className="w-full lg:w-72 flex-shrink-0">
              <div className="sticky top-24">
                <FilterSidebar filters={filters} setFilters={setFilters} />
              </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1">
              <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                <div>
                  <h2 className="text-3xl font-black text-gray-900 tracking-tight">Gaming Gear</h2>
                  <p className="text-sm text-gray-500 font-medium">{products.length} products found</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Sort By:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-6 py-2.5 border-none rounded-xl bg-white text-gray-900 font-bold shadow-sm focus:ring-4 focus:ring-primary/5 transition-all outline-none appearance-none cursor-pointer pr-10 relative"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 1rem center',
                      backgroundSize: '1rem',
                    }}
                  >
                    <option value="newest">Newest First</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Best Rated</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {products.map((product: any) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>

              {products.length === 0 && (
                <div className="text-center py-24 bg-white rounded-[32px] border border-dashed border-gray-200">
                  <div className="text-6xl mb-4">🎮</div>
                  <p className="text-gray-900 font-black text-xl mb-2">No gear found here!</p>
                  <p className="text-gray-500">Try adjusting your filters to find what you&apos;re looking for.</p>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}

