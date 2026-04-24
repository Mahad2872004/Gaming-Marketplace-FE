'use client'

import Hero from '@/components/Hero'
import FeaturedGrid from '@/components/FeaturedGrid'
import ReviewsSection from '@/components/ReviewsSection'
import ServiceSection from '@/components/ServiceSection'

export default function Home() {
  return (
    <div>
      <Hero />
      <FeaturedGrid />
      <ReviewsSection />
      <ServiceSection />
    </div>
  )
}


