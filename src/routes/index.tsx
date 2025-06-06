import { createFileRoute } from '@tanstack/react-router'
import ResidentialCard from '@/components/ResidentialCard'
import HospitalityCard from '@/components/HospitalityCard'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <>
      <div className="bg-white">
        <div className="w-screen h-auto overflow-hidden leading-none mx-auto">
          <video
            src="https://prod-sacco.s3.amazonaws.com/video/sacco-video-header-v2.mp4?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIARBILXDGNIVPQ2CP3%2F20250605%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250605T204457Z&X-Amz-SignedHeaders=host&X-Amz-Expires=86400&X-Amz-Signature=be6382ebd21f9a0322f30791800bd2b8bfe05a2525ea958a98a078c61f1c4d4e"
            className="w-full h-auto p-1"
            autoPlay
            loop
            muted
            playsInline
          ></video>
        </div>
        <div className="container mx-auto px-12 py-6">
          <div className="mt-16">
            <p className="font-light text-justify text-gray-900 text-xl leading-7 font-thin">
              Sacco Carpet produces the highest quality carpets for the world’s
              leading interior designers and architects. To meet expectations,
              we have the most talented artists in the industry and never
              sacrificed quality for price. We take every detail into
              consideration, focusing on quality, color, price effectiveness and
              longevity.
            </p>
          </div>
        </div>
        <div className="px-5 md:px-12 pb-6 pt-12 ">
          <div className="flex flex-col md:flex-row pt-12 gap-8">
            <div className="font-thin w-full md:w-1/2 ">
              <ResidentialCard />
            </div>
            <div className="font-thin w-full md:w-1/2 ">
              <HospitalityCard />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
