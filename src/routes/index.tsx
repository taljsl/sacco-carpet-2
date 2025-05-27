import { createFileRoute } from '@tanstack/react-router'
// import saccoHomePageVideo from '../assets/saccoHomePageVideo.mp4'
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
          src="https://prod-sacco.s3.amazonaws.com/video/sacco-video-header-v2.mp4?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIARBILXDGNIVPQ2CP3%2F20250527%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250527T194739Z&X-Amz-SignedHeaders=host&X-Amz-Expires=86400&X-Amz-Signature=f55ae2dc9ddd036b6024b6b9404eb40b5167eeddbc07830b7cf40baa73ab79b8"
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
