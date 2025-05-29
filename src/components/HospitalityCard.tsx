import { Link } from '@tanstack/react-router'
import hospitalityCardImage from '../assets/hospitalityCardImage.jpeg'

export default function HospitalityCard() {
  return (
    <div className="flex flex-col items-center w-full bg-gray-100">
      <Link to="/installations-hospitality" className="w-full">
        <div className="relative w-full" style={{ paddingBottom: '100%' }}>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${hospitalityCardImage})` }}
          />
        </div>
        <span className="flex justify-center text-center px-3 py-6 text-xl uppercase font-thin">
          Hospitality
        </span>
      </Link>
    </div>
  )
}
