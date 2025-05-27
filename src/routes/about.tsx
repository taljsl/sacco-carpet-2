import { createFileRoute } from '@tanstack/react-router'
import aboutVideo from '../assets/aboutVideo.mp4'

export const Route = createFileRoute('/about')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="container w-full h-auto border-">
      <div>
        {/* video div */}
        <div className="w-screen h-auto border-[3px] border-blue-500">
          <video
            src={aboutVideo}
            className="w-full h-auto"
            autoPlay
            loop
            muted
            playsInline
          ></video>
        </div>
        {/* end video div */}
      </div>
      
    </div>
  )
}

