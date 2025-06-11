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
            src="https://d5ub84cxsf6h3.cloudfront.net/SaccoHomePageVid.mp4"
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
