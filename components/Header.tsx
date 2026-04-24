'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { Search, User, Heart, ShoppingCart, ChevronDown } from 'lucide-react'

export default function Header() {
  const [user, setUser] = useState<any>(null)
  const [cartCount, setCartCount] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const token = Cookies.get('token')
    if (token) {
      // Fetch user and cart data
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.user) setUser(data.user)
        })
        .catch(() => {
          Cookies.remove('token')
        })

      fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.items) setCartCount(data.items.length)
        })
    }
  }, [])

  const handleLogout = () => {
    Cookies.remove('token')
    setUser(null)
    router.push('/')
  }

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1 group">
          <span className="text-2xl font-black tracking-tighter text-primary group-hover:text-primary-light transition-colors">PURPLE</span>
          <span className="text-2xl font-black tracking-tighter text-gray-900">TECH</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          <div className="group relative">
            <button className="flex items-center gap-1 font-medium text-gray-700 hover:text-primary transition-colors">
              Products <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />
            </button>
          </div>
          <div className="group relative">
            <button className="flex items-center gap-1 font-medium text-gray-700 hover:text-primary transition-colors">
              Gaming PC <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />
            </button>
          </div>
          <div className="group relative">
            <Link href="/categories" className="flex items-center gap-1 font-medium text-gray-700 hover:text-primary transition-colors">
              Buy & Sell <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />
            </Link>
          </div>
          <div className="group relative">
            <button className="flex items-center gap-1 font-medium text-gray-700 hover:text-primary transition-colors">
              Support <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />
            </button>
          </div>
          <Link href="/contact" className="font-medium text-gray-700 hover:text-primary transition-colors">
            Contact Us
          </Link>
        </nav>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <input 
              type="text" 
              placeholder="Search for products" 
              className="w-full h-11 pl-4 pr-12 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/5 transition-all"
            />
            <button className="absolute right-0 top-0 h-full px-4 text-gray-400 hover:text-primary transition-colors">
              <Search size={20} />
            </button>
          </div>
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-5">
          <Link href="/profile" className="text-gray-700 hover:text-primary transition-colors">
            <User size={24} />
          </Link>
          <Link href="/wishlist" className="relative text-gray-700 hover:text-primary transition-colors">
            <Heart size={24} />
            <span className="absolute -top-1.5 -right-1.5 bg-primary text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">0</span>
          </Link>
          <Link href="/cart" className="flex items-center gap-2 bg-primary text-white pl-4 pr-1 py-1 rounded-full hover:bg-primary-light transition-all shadow-lg shadow-primary/20 group">
            <ShoppingCart size={20} className="ml-1" />
            <div className="bg-black text-white px-3 py-1.5 rounded-full flex items-center gap-2 group-hover:bg-gray-900 transition-colors">
              <span className="text-xs font-bold whitespace-nowrap">Rs {cartCount > 0 ? 'Loading...' : '0'}</span>
              <span className="bg-white text-black text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {cartCount}
              </span>
            </div>
          </Link>
        </div>
      </div>
    </header>
  )
}


