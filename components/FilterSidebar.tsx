'use client'

interface FilterSidebarProps {
  filters: any
  setFilters: (filters: any) => void
}

export default function FilterSidebar({ filters, setFilters }: FilterSidebarProps) {
  const brands = ['Logitech', 'HyperX', 'Asus', 'Razer', 'NZXT', 'MSI']
  const connectivity = [
    '2.4 GHz wireless technology',
    '3.5mm audio input',
    'Bluetooth',
    'LIGHTSPEED wireless technology',
    'Wired USB input',
    'USB-C',
  ]
  const series = ['PRO', 'basic', 'Limited Edition']
  const technology = [
    'LIGHTSPEED',
    'RGB LIGHTSYNC',
    'DTS surround sound technology',
    'BLUE VOICE Mic Technology',
    'DTS Headphone X 2.0',
  ]
  const colors = ['red', 'black', 'grey', 'white', 'blue', 'green', 'yellow', 'purple', 'pink', 'orange']

  // Convert filter strings to arrays for checking
  const getFilterArray = (type: string): string[] => {
    if (!filters[type]) return []
    if (typeof filters[type] === 'string') {
      return filters[type].split(',')
    }
    return filters[type]
  }

  const toggleFilter = (type: string, value: string) => {
    const currentArray = getFilterArray(type)
    const index = currentArray.indexOf(value)
    
    let newArray: string[]
    if (index > -1) {
      newArray = currentArray.filter((item) => item !== value)
    } else {
      newArray = [...currentArray, value]
    }

    const newFilters = { ...filters }
    if (newArray.length === 0) {
      delete newFilters[type]
    } else {
      newFilters[type] = newArray.join(',')
    }
    setFilters(newFilters)
  }

  return (
    <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm sticky top-24">
      <h3 className="text-2xl font-black mb-8 text-gray-900 tracking-tight">Filter Gear</h3>

      {/* Brand */}
      <div className="mb-10">
        <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Brand</h4>
        <div className="space-y-3">
          {brands.map((brand) => (
            <label key={brand} className="flex items-center group cursor-pointer">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  checked={getFilterArray('brand').includes(brand)}
                  onChange={() => toggleFilter('brand', brand)}
                  className="w-5 h-5 border-2 border-gray-200 rounded-lg checked:bg-primary checked:border-primary transition-all cursor-pointer appearance-none"
                />
                <svg className={`absolute w-3 h-3 text-white pointer-events-none ml-1 transition-opacity ${getFilterArray('brand').includes(brand) ? 'opacity-100' : 'opacity-0'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className={`ml-3 text-sm font-bold transition-colors ${getFilterArray('brand').includes(brand) ? 'text-primary' : 'text-gray-600 group-hover:text-gray-900'}`}>{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Connectivity */}
      <div className="mb-10">
        <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Connectivity</h4>
        <div className="space-y-3">
          {connectivity.map((conn) => (
            <label key={conn} className="flex items-center group cursor-pointer">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  checked={getFilterArray('connectivity').includes(conn)}
                  onChange={() => toggleFilter('connectivity', conn)}
                  className="w-5 h-5 border-2 border-gray-200 rounded-lg checked:bg-primary checked:border-primary transition-all cursor-pointer appearance-none"
                />
                <svg className={`absolute w-3 h-3 text-white pointer-events-none ml-1 transition-opacity ${getFilterArray('connectivity').includes(conn) ? 'opacity-100' : 'opacity-0'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className={`ml-3 text-xs font-bold transition-colors ${getFilterArray('connectivity').includes(conn) ? 'text-primary' : 'text-gray-600 group-hover:text-gray-900'}`}>{conn}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div className="mb-6">
        <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Colors</h4>
        <div className="grid grid-cols-5 gap-3">
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => toggleFilter('color', color)}
              className={`w-8 h-8 rounded-xl border-4 transition-all ${
                getFilterArray('color').includes(color) ? 'border-primary shadow-lg shadow-primary/20 scale-110' : 'border-white hover:border-gray-100'
              }`}
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
