import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative min-h-[600px] bg-gradient-to-br from-primary via-primary-dark to-black overflow-hidden flex items-center">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/20 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-accent/10 blur-[100px] rounded-full translate-y-1/4 -translate-x-1/4"></div>

      <div className="container mx-auto px-4 relative z-10 py-12 lg:py-0">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Content */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] mb-6 tracking-tight">
              BUILD YOUR CUSTOM <br />
              <span className="text-accent-light">GAMING PC</span> IN PAKISTAN
            </h1>
            <p className="text-gray-300 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
              We provide custom PC builds designed for gaming, professional work, and everyday use, 
              tailored to every budget. Our Sell Your PC program lets customers easily trade in old systems, 
              while our tested and verified used hardware offers best performance at best prices.
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Link 
                href="/build" 
                className="px-8 py-4 bg-primary hover:bg-primary-light text-white font-bold rounded-xl transition-all shadow-xl shadow-primary/30 hover:-translate-y-1"
              >
                Start Building
              </Link>
              <Link 
                href="/categories" 
                className="px-8 py-4 bg-white hover:bg-gray-100 text-black font-bold rounded-xl transition-all shadow-xl shadow-white/10 hover:-translate-y-1"
              >
                Shop Pre-Built
              </Link>
            </div>
          </div>

          {/* PC Image */}
          <div className="flex-1 relative group">
            <div className="absolute inset-0 bg-accent/20 blur-[80px] rounded-full scale-75 group-hover:scale-100 transition-transform duration-700"></div>
            <img 
              src="/purple_gaming_pc_hero.png" 
              alt="Custom Gaming PC" 
              className="relative z-10 w-full max-w-[600px] mx-auto drop-shadow-[0_20px_50px_rgba(76,29,149,0.5)] transform hover:rotate-2 hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  )
}


