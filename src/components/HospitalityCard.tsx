import { Link } from "@tanstack/react-router";
import hospitalityCardImage from '../assets/hospitalityCardImage.jpeg'

export default function HospitalityCard() {
    return (
         <>
      
      <div className="flex flex-col">
        <Link to="/installations-hospitality">
          <div>
            <img src={hospitalityCardImage} alt="" />
          </div>
          <div>
            <span>Hospitality</span>
          </div>
        </Link>
      </div>

      
    </>
    )
}