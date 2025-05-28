import { createFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'
import Num1Home from '../assets/individualPages/Num1Home.jpg'
import Num2Home from '../assets/individualPages/Num2Home.jpg'
import Num3Home from '../assets/individualPages/Num3Home.jpg'
import Num4Home from '../assets/individualPages/Num4Home.jpg'
import Num5Home from '../assets/individualPages/Num5Home.jpg'
import Num6Home from '../assets/individualPages/Num6Home.jpg'
import Num7Home from '../assets/individualPages/Num7Home.jpg'
import Num8Home from '../assets/individualPages/Num8Home.jpg'







export const Route = createFileRoute('/installations-hospitality')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <div className="container">
        <div className="grid grid-cols-2 grid-rows-4">
          <Link to="/view-installation/1">
            <div>
              <img src={Num1Home} alt="" />
            </div>
          </Link>
          <Link to="/view-installation/2">
            <div>
              <img src={Num2Home} alt="" />
            </div>
          </Link>
          <Link to="/view-installation/3">
            <div>
              <img src={Num3Home} alt="" />
            </div>
          </Link>
          <Link to="/view-installation/4">
            <div>
              <img src={Num4Home} alt="" />
            </div>
          </Link>
          <Link to="/view-installation/5">
            <div>
              <img src={Num5Home} alt="" />
            </div>
          </Link>
          <Link to="/view-installation/6">
            <div>
              <img src={Num6Home} alt="" />
            </div>
          </Link>
          <Link to="/view-installation/7">
            <div>
              <img src={Num7Home} alt="" />
            </div>
          </Link>
          <Link to="/view-installation/8">
            <div>
              <img src={Num8Home} alt="" />
            </div>
          </Link>
        </div>
      </div>
    </>
  )
}

