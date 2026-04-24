'use client'

import React from 'react'
import { Star, CheckCircle2, Quote } from 'lucide-react'

const reviews = [
  {
    id: 1,
    name: 'Mudassar Tahir',
    time: '4 months ago',
    rating: 5,
    text: "Aslam o Alikum..!! It's my gaming PC.. I placed order from Lahore.. And i received it After one day.. perfectly and...",
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mudassar',
  },
  {
    id: 2,
    name: 'Captin Wolf',
    time: '5 months ago',
    rating: 5,
    text: "⭐⭐⭐⭐⭐ 5/5 — Excellent Purchase from Purple Tech! I recently bought a GTX 1660 Super from them and...",
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Wolf',
  },
  {
    id: 3,
    name: 'Yaseen Shahid',
    time: '6 months ago',
    rating: 5,
    text: "One of the best store in all over Pakistan. It was my first custom build and I'm very satisfied after connecting with Purple Tech gaming store ... You can trust them....",
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Yaseen',
  },
]

export default function ReviewsSection() {
  return (
    <section id="reviews" className="py-24 bg-gray-50/80 border-y border-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <p className="text-primary font-bold tracking-widest text-sm uppercase mb-3">Testimonials</p>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 tracking-tight">
            What Customers Say About Purple Tech Gaming Store
          </h2>
          <p className="text-gray-500 text-lg">
            Read verified Google reviews from gamers who built their custom gaming PCs with Purple Tech Gaming. 
            Trusted for high-performance PCs, genuine components, fast delivery, and expert customer support.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Summary Column */}
          <div className="lg:w-1/4 text-center">
            <div className="inline-block p-8 rounded-3xl bg-gradient-to-b from-white to-primary/5 border border-primary/10 shadow-xl shadow-primary/5">
              <h3 className="text-2xl font-black text-gray-900 mb-2">EXCELLENT</h3>
              <div className="flex justify-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={28} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-500 font-medium mb-4">Based on <span className="text-gray-900 font-bold">206 reviews</span></p>
              <div className="flex items-center justify-center gap-2">
                <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 flex items-center gap-2">
                  <span className="text-xl font-bold tracking-tighter">
                    <span className="text-blue-500">G</span>
                    <span className="text-red-500">o</span>
                    <span className="text-yellow-500">o</span>
                    <span className="text-blue-500">g</span>
                    <span className="text-green-500">l</span>
                    <span className="text-red-500">e</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews Grid */}
          <div className="lg:w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {reviews.map((review) => (
                <div 
                  key={review.id} 
                  className="bg-white p-6 rounded-3xl border border-gray-100 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 relative group"
                >
                  <Quote className="absolute top-6 right-6 text-primary/5 group-hover:text-primary/10 transition-colors" size={40} />
                  
                  {/* User Info */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="relative">
                      <img src={review.avatar} alt={review.name} className="w-12 h-12 rounded-full border-2 border-white shadow-md" />
                      <div className="absolute -bottom-1 -right-1 bg-primary text-white rounded-full p-0.5">
                        <CheckCircle2 size={10} className="fill-primary" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 leading-tight group-hover:text-primary transition-colors">{review.name}</h4>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{review.time}</p>
                    </div>
                    <div className="ml-auto">
                      <span className="text-blue-500 text-xl font-bold">G</span>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-3">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-[10px] font-black text-primary/40 ml-1 uppercase">Verified</span>
                  </div>

                  {/* Text */}
                  <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-4">
                    {review.text}
                  </p>
                  
                  <button className="w-full py-2 bg-gray-50 group-hover:bg-primary group-hover:text-white text-gray-400 text-xs font-black rounded-xl transition-all duration-300 uppercase tracking-widest">
                    Read Full Review
                  </button>
                </div>
              ))}
            </div>
            
            {/* Trustindex Badge */}
            <div className="flex justify-end mt-6">
              <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 rounded-lg text-xs font-bold border border-green-100">
                <span>Verified by Trustindex</span>
                <span className="bg-green-700 text-white rounded-full w-3 h-3 flex items-center justify-center text-[8px]">i</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
