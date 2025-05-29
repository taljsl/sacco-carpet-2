import { Link } from '@tanstack/react-router'
import residentialCardImage from '../assets/residentialCardImage.jpeg'

export default function ResidentialCard() {
  return (
    <div className="flex flex-col items-center w-full bg-gray-100">
      <Link to="/installations-residential" className="w-full">
        <div className="relative w-full" style={{ paddingBottom: '100%' }}>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${residentialCardImage})` }}
          />
        </div>
        <span className="flex justify-center text-center px-3 py-6 text-xl uppercase font-thin">
          Residential
        </span>
      </Link>
    </div>
  )
}
