'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { getCart, removeFromCart, createOrder } from '@/lib/api'
import Cookies from 'js-cookie'

import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react'

export default function CartPage() {
  const [cart, setCart] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const token = Cookies.get('token')
    if (!token) {
      router.push('/login')
      return
    }

    const fetchCart = async () => {
      try {
        const data = await getCart()
        setCart(data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching cart:', error)
        setLoading(false)
      }
    }

    fetchCart()
  }, [router])

  const handleRemove = async (itemId: string) => {
    try {
      const updatedCart = await removeFromCart(itemId)
      setCart(updatedCart)
    } catch (error) {
      console.error('Error removing item:', error)
    }
  }

  const calculateTotal = () => {
    if (!cart || !cart.items) return 0
    return cart.items.reduce((sum: number, item: any) => {
      return sum + (item.product?.price || 0) * item.quantity
    }, 0)
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Loading Your Cart...</p>
      </div>
    )
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8">
          <ShoppingBag size={48} className="text-gray-200" />
        </div>
        <h1 className="text-4xl font-black text-gray-900 mb-4 uppercase tracking-tight">Your cart is empty</h1>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">Looks like you haven't added anything to your cart yet. Explore our latest gaming gear!</p>
        <Link 
          href="/categories" 
          className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-black rounded-2xl hover:bg-primary-light transition-all shadow-xl shadow-primary/20"
        >
          Start Shopping
          <ArrowRight size={20} />
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-gray-50/50 min-h-screen py-12 lg:py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl lg:text-5xl font-black text-gray-900 mb-12 uppercase tracking-tighter">
          Shopping <span className="text-primary">Cart</span>
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cart.items.map((item: any) => (
              <div key={item._id} className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-500">
                <div className="flex gap-6 items-center">
                  <div className="w-24 h-24 lg:w-32 lg:h-32 bg-gray-50 rounded-2xl flex-shrink-0 relative overflow-hidden group">
                    {item.product?.images?.[0] ? (
                      <img 
                        src={item.product.images[0]} 
                        alt={item.product.name}
                        className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-200 uppercase font-black text-[10px]">No Image</div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg lg:text-xl font-bold text-gray-900 truncate hover:text-primary transition-colors cursor-pointer">
                        {item.product?.name}
                      </h3>
                      <button
                        onClick={() => handleRemove(item._id)}
                        className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                    
                    <p className="text-sm text-gray-400 line-clamp-1 mb-4">{item.product?.description}</p>
                    
                    <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-50">
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Qty</span>
                          <span className="bg-gray-50 px-3 py-1 rounded-lg font-bold text-gray-900">{item.quantity}</span>
                        </div>
                        {item.color && (
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Color</span>
                            <div
                              className="w-5 h-5 rounded-lg border-2 border-white shadow-sm"
                              style={{ backgroundColor: item.color }}
                            />
                          </div>
                        )}
                      </div>
                      
                      <div className="text-xl font-black text-primary">
                        Rs {((item.product?.price || 0) * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-2xl shadow-primary/5 sticky top-24">
              <h2 className="text-2xl font-black text-gray-900 mb-8 uppercase tracking-tight">Order Summary</h2>
              
              <div className="space-y-4 mb-8 pb-8 border-b border-gray-100">
                <div className="flex justify-between items-center text-gray-500 font-medium">
                  <span className="uppercase text-xs tracking-widest">Subtotal</span>
                  <span className="font-bold text-gray-900 text-lg">Rs {calculateTotal().toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-gray-500 font-medium">
                  <span className="uppercase text-xs tracking-widest">Shipping</span>
                  <span className="text-green-600 font-bold uppercase text-xs">Free</span>
                </div>
                <div className="flex justify-between items-center text-gray-500 font-medium">
                  <span className="uppercase text-xs tracking-widest">Tax</span>
                  <span className="font-bold text-gray-900">Included</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center mb-10">
                <span className="text-sm font-black text-gray-900 uppercase tracking-[0.2em]">Total</span>
                <span className="text-3xl font-black text-primary">
                  Rs {calculateTotal().toLocaleString()}
                </span>
              </div>
              
              <Link
                href="/checkout"
                className="group w-full h-16 bg-primary hover:bg-primary-light text-white flex items-center justify-center gap-3 rounded-[24px] font-black text-lg transition-all shadow-xl shadow-primary/20 active:scale-[0.98]"
              >
                Checkout Now
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <p className="mt-6 text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Secure SSL Encryption Protected
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

