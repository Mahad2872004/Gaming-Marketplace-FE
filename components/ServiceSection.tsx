export default function ServiceSection() {
  const services = [
    {
      icon: '💬',
      title: '24/7 support online consultation',
    },
    {
      icon: '🚚',
      title: 'Free delivery on orders from 39$',
    },
    {
      icon: '🛡️',
      title: 'Easy Returns and 30-day money back guaranty. More information',
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">EVERYTHING YOU NEED IS HERE</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="text-center">
              <div className="text-5xl mb-4">{service.icon}</div>
              <p className="text-gray-700">{service.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


