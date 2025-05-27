import { createFileRoute } from '@tanstack/react-router'
import saccoHomePageVideo from '../assets/saccoHomePageVideo.mp4'
import ResidentialCard from '@/components/ResidentialCard'
import HospitalityCard from '@/components/HospitalityCard'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <>
      <div className="w-screen h-auto border-[3px] border-blue-500">
        <video
          src={saccoHomePageVideo}
          className="w-full h-auto"
          autoPlay
          loop
          muted
          playsInline
        ></video>
      </div>
      <div>
        <p>
          Sacco Carpet produces the highest quality carpets for the world’s
          leading interior designers and architects. To meet expectations, we
          have the most talented artists in the industry and never sacrificed
          quality for price. We take every detail into consideration, focusing
          on quality, color, price effectiveness and longevity.
        </p>
      </div>
      {/* card div 1 */}
      <div className="flex flex-row">
        <div>
          <ResidentialCard />
        </div>
        <div>
          <HospitalityCard />
        </div>
      </div>

      {/* end card div 1 */}
    </>
  )
}
