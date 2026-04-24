export default function Footer() {
  return (
    <footer className="bg-primary text-white py-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">GameGeek</h3>
            <p className="text-sm text-gray-300">
              Your one-stop shop for gaming accessories and gadgets.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/categories" className="hover:text-accent">Categories</a></li>
              <li><a href="/brands" className="hover:text-accent">Brands</a></li>
              <li><a href="/new" className="hover:text-accent">What&apos;s New</a></li>
              <li><a href="/sales" className="hover:text-accent">Sales</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/help" className="hover:text-accent">Help Center</a></li>
              <li><a href="/about" className="hover:text-accent">About Us</a></li>
              <li><a href="/contact" className="hover:text-accent">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <p className="text-sm text-gray-300">
              Phone: +4904-049-950<br />
              Email: support@gamegeek.com
            </p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-300">
          <p>&copy; 2024 GameGeek. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}


