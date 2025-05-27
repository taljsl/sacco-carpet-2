import { Link } from '@tanstack/react-router'
import residentialCardImage from '../assets/residentialCardImage.jpeg'

export default function ResidentialCard() {
  return (
    <>
      
      <div className="flex flex-col">
        <Link to="/installations-residential">
          <div>
            <img src={residentialCardImage} alt="" />
          </div>
          <div>
            <span>Residential</span>
          </div>
        </Link>
      </div>

      
    </>
  )
}
