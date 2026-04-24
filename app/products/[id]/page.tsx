'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getProduct, addToCart } from '@/lib/api'
import Cookies from 'js-cookie'

export default function ProductPage() {
  const params = useParams()
  const [product, setProduct] = useState<any>(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProduct(params.id as string)
        setProduct(data)
        if (data.colors && data.colors.length > 0) {
          setSelectedColor(data.colors[0])
        }
        setLoading(false)
      } catch (error) {
        console.error('Error fetching product:', error)
        setLoading(false)
      }
    }

    if (params.id) {
      fetchProduct()
    }
  }, [params.id])

  const handleAddToCart = async () => {
    const token = Cookies.get('token')
    if (!token) {
      alert('Please login to add items to cart')
      return
    }

    try {
      await addToCart(product._id, quantity, selectedColor)
      alert('Product added to cart!')
    } catch (error) {
      console.error('Error adding to cart:', error)
      alert('Failed to add product to cart')
    }
  }

  if (loading) {
    return <div className="container mx-auto px-4 py-16 text-center">Loading...</div>
  }

  if (!product) {
    return <div className="container mx-auto px-4 py-16 text-center">Product not found</div>
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumbs */}
      <div className="bg-gray-50 border-b border-gray-100 py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-xs font-medium text-gray-400 uppercase tracking-widest">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href="/categories" className="hover:text-primary transition-colors">Products</Link>
            <ChevronRight size={12} />
            <span className="text-gray-900">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-gray-50 rounded-3xl overflow-hidden border border-gray-100 shadow-inner group">
              {product.images && product.images[selectedImage] ? (
                <Image
                  src={product.images[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-contain p-8 group-hover:scale-110 transition-transform duration-700"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <span className="text-4xl">📷</span>
                </div>
              )}
            </div>
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-5 gap-4">
                {product.images.map((image: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square rounded-xl border-2 transition-all overflow-hidden bg-gray-50 ${
                      selectedImage === index ? 'border-primary shadow-lg shadow-primary/20' : 'border-transparent hover:border-gray-200'
                    }`}
                  >
                    <Image src={image} alt={`${product.name} ${index + 1}`} fill className="object-cover p-1" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-primary/10 text-primary text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                  {product.category?.name || product.category || 'Gaming Gear'}
                </span>
                {product.condition === 'new' && (
                  <span className="bg-green-50 text-green-600 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                    New Arrival
                  </span>
                )}
              </div>
              <h1 className="text-4xl font-black text-gray-900 mb-4 leading-tight">{product.name}</h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} className="fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="ml-2 text-sm font-bold text-gray-400">({product.reviews?.length || 12} Reviews)</span>
                </div>
                <div className="h-4 w-px bg-gray-200"></div>
                <div className="flex items-center gap-1.5 text-sm font-bold text-primary">
                  <CheckCircle size={16} />
                  <span>In Stock</span>
                </div>
              </div>
            </div>

            <div className="mb-10 p-6 bg-gray-50 rounded-3xl border border-gray-100 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase mb-1">Price</p>
                <div className="text-4xl font-black text-primary leading-none">
                  Rs {product.price.toLocaleString()}
                </div>
              </div>
              {product.stock < 10 && (
                <div className="text-right">
                  <p className="text-xs font-bold text-red-500 uppercase mb-1">Only {product.stock} Left</p>
                  <div className="h-1.5 w-24 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-red-500 w-1/3"></div>
                  </div>
                </div>
              )}
            </div>

            <p className="text-gray-600 text-lg leading-relaxed mb-10">{product.description}</p>

            <div className="space-y-8 mb-10">
              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div>
                  <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Select Color</h3>
                  <div className="flex gap-4">
                    {product.colors.map((color: string, index: number) => (
                      <button
                        key={index}
                        onClick={() => setSelectedColor(color)}
                        className={`w-12 h-12 rounded-2xl border-4 transition-all ${
                          selectedColor === color ? 'border-primary shadow-xl shadow-primary/20 scale-110' : 'border-white hover:border-gray-100'
                        }`}
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="flex items-center gap-8">
                <div>
                  <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Quantity</h3>
                  <div className="flex items-center bg-gray-50 rounded-2xl p-1 border border-gray-100">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-primary hover:bg-white rounded-xl transition-all"
                    >
                      <Minus size={18} />
                    </button>
                    <span className="w-12 text-center font-black text-gray-900">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-primary hover:bg-white rounded-xl transition-all"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mb-12">
              <button
                onClick={handleAddToCart}
                className="flex-[3] bg-primary hover:bg-primary-light text-white h-16 rounded-2xl font-black text-lg transition-all shadow-2xl shadow-primary/30 flex items-center justify-center gap-3 active:scale-95"
              >
                <ShoppingCart size={24} />
                Add To Cart
              </button>
              <button className="flex-1 bg-white border border-gray-100 h-16 rounded-2xl flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-100 transition-all shadow-sm">
                <Heart size={24} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm">
                  <Truck size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase">Delivery</p>
                  <p className="text-xs font-bold text-gray-900">Free Express Shipping</p>
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase">Warranty</p>
                  <p className="text-xs font-bold text-gray-900">1 Year Local Warranty</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications */}
        {product.technology && product.technology.length > 0 && (
          <div className="mt-24 relative rounded-[40px] overflow-hidden bg-gradient-to-br from-primary to-primary-dark p-12 lg:p-20 shadow-2xl shadow-primary/20">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-16">
              <div className="flex-1">
                <h2 className="text-4xl lg:text-6xl font-black text-white mb-8 leading-tight uppercase tracking-tighter">
                  Cutting-Edge <br />Technology
                </h2>
                <p className="text-primary-lighter/80 text-lg leading-relaxed mb-12 max-w-xl">
                  {product.description}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {product.technology.map((tech: string, index: number) => (
                    <div key={index} className="flex items-center gap-4 bg-white/10 backdrop-blur-md border border-white/10 p-5 rounded-2xl">
                      <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-white">
                        <Zap size={20} />
                      </div>
                      <span className="font-bold text-white uppercase text-xs tracking-widest">{tech}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-1 flex justify-center">
                <div className="relative w-full max-w-md aspect-square bg-white/5 backdrop-blur-3xl rounded-full flex items-center justify-center border border-white/10">
                   <Gamepad2 size={120} className="text-white opacity-20 animate-pulse" />
                   <div className="absolute inset-0 bg-gradient-to-tr from-primary/0 to-white/10 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
import { ChevronRight, Star, CheckCircle, ShoppingCart, Heart, Minus, Plus, Truck, ShieldCheck, Zap, Gamepad2 } from 'lucide-react'

