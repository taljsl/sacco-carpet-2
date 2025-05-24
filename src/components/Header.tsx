import { Link } from '@tanstack/react-router'
import saccologo from '../assets/saccologo.svg'

export default function Header() {
  return (
    <header className="p-2 flex gap-2 bg-white text-black justify-between items-center">
      <nav className="flex flex-row space-x-4 px-2 items-center">
        <Link to="/">
          <img
            src={saccologo}
            alt="Sacco Carpet Logo"
            className="h-[80px] w-auto"
          />
        </Link>
        <Link to="/shop" className="hover:bg-gray-100">
          SHOP
        </Link>
        <Link to="/installations" className="hover:bg-gray-100">
          INSTALLATIONS
        </Link>
        <Link to="/about" className="hover:bg-gray-100">
          ABOUT US
        </Link>
      </nav>
    </header>
  )
}
