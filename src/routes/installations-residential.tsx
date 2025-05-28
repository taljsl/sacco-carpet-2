import { createFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'
import Num9Home from '../assets/individualPages/Num9Home.jpg'
import Num10Home from '../assets/individualPages/Num10Home.jpg'
import Num11Home from '../assets/individualPages/Num11Home.jpg'
import Num12Home from '../assets/individualPages/Num12Home.jpg'
import Num13Home from '../assets/individualPages/Num13Home.jpg'
import Num14Home from '../assets/individualPages/Num14Home.jpg'

export const Route = createFileRoute('/installations-residential')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <div className="container">
        <div className="grid grid-cols-2 grid-rows-3">
          <Link to="/view-installation/9">
            <div>
              <img src={Num9Home} alt="" />
            </div>
          </Link>
          <Link to="/view-installation/10">
            <div>
              <img src={Num10Home} alt="" />
            </div>
          </Link>
          <Link to="/view-installation/11">
            <div>
              <img src={Num11Home} alt="" />
            </div>
          </Link>
          <Link to="/view-installation/12">
            <div>
              <img src={Num12Home} alt="" />
            </div>
          </Link>
          <Link to="/view-installation/13">
            <div>
              <img src={Num13Home} alt="" />
            </div>
          </Link>
          <Link to="/view-installation/14">
            <div>
              <img src={Num14Home} alt="" />
            </div>
          </Link>
        </div>
      </div>
      <div>
        <div>
          
        </div>
      </div>
    </>
  )
}
