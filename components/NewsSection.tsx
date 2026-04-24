export default function NewsSection() {
  const newsItems = [
    {
      title: 'ALWAYS IN THE GAME',
      description: 'Stay ahead of the latest and greatest gaming tech, featuring new releases, exclusive deals, and exciting pre-orders.',
      image: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400&q=80',
    },
    {
      title: 'ENHANCE YOUR EXPERIENCE',
      description: 'Upgrade your world by elevating your setup and personalize your space with our collection of stylish and functional gaming accessories.',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80',
    },
    {
      title: 'COMMAND THE BATTLE!',
      description: 'Take control with our diverse range of gaming keyboards, featuring mechanical switches for tactile feedback etc.',
      image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&q=80',
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">DISCOVER NEWS AND INNOVATIONS</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newsItems.map((item, index) => (
            <div key={index} className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition">
              <div className="h-64 bg-cover bg-center" style={{ backgroundImage: `url(${item.image})` }}></div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <a href="#" className="text-accent font-semibold hover:underline">See More</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


