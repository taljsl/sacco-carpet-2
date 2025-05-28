import { createFileRoute } from '@tanstack/react-router'
import Num1Home from '../../assets/individualPages/Num1Home.jpg'
import Num1Sub1 from '../../assets/individualPages/Num1Sub1.jpg'

export const Route = createFileRoute('/view-installation/1')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="container">
      <div>
        <img src={Num1Home} alt="" />
      </div>
      <div>{/* divider goes here */}</div>
      <div>
        <h3>BREAKERS PALM BEACH</h3>
      </div>
      <div>
        <img src={Num1Sub1} alt="" />
        <span>ID:76620</span>
      </div>
    </div>
  )
}
