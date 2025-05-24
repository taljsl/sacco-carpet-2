import { createFileRoute } from '@tanstack/react-router'
import saccoHomePageVideo from '../assets/saccoHomePageVideo.mp4'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className='w-screen h-auto'>
      <video
        src={saccoHomePageVideo}
        className="w-full h-auto"
        autoPlay
        loop
        muted
        playsInline
      ></video>
    </div>
  )
}
