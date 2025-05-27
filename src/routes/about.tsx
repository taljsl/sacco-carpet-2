import { createFileRoute } from '@tanstack/react-router'

import aboutUsImg1 from '../assets/aboutUsImg1.jpg'
import aboutUsImg2 from '../assets/aboutUsImg2.jpg'
import aboutUsLogo from '../assets/aboutUsLogo.svg'

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
            src="https://prod-sacco.s3.amazonaws.com/video/about_video.mp4?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIARBILXDGNIVPQ2CP3%2F20250527%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250527T194010Z&X-Amz-SignedHeaders=host&X-Amz-Expires=86400&X-Amz-Signature=1496afc37163ee002ea47a66c49696618e50815111a7525a451db5f9efb4663a"
            className="w-full h-auto"
            autoPlay
            loop
            muted
            playsInline
          ></video>
        </div>
        {/* end video div */}
        <div className="container">
          <div className="grid grid-cols-2">
            <div>
              <img src={aboutUsImg1} alt="" />
            </div>
            <div>
              <p>
                In 2001, Adam Tihany visited the Sacco showroom on a hunt to
                design the Michelin Star restaurant, Perse. Collaborating with
                Tihany on Perse opened up a world of opportunity for Sacco
                including; The Breakers, Palm Beach, The Mandarin Oriental, Hong
                Kong and Restaurant Daniel, on Park Avenue. The hospitality
                greats soon followed with David Rockwell, Yabu Pushelberg,
                Jeffrey Beers and Toni Chi, who took Sacco to unforeseen
                heights. To meet the expectation and demand, Sacco hired the
                most talented artists in the industry and never sacrificed
                quality for price.
              </p>
            </div>
            <div>
              <p>
                Today our business is an equal divide between our residential
                and hospitality markets. Whether it is a 100% silk hand knotted
                rug, or a New Zealand wool Axminster, Sacco takes every detail
                into consideration, focusing on quality, color, price
                effectiveness and longevity. Sacco’s devoted sales team is
                enthusiastic, passionate and responsive, proving all the
                difference in customer service. We have successfully opened a
                showroom in New York and London. We currently have sales reps in
                Chicago, Texas, Florida and Los Angeles.
              </p>
            </div>
            <div>
              <div>
                <img src={aboutUsImg2} alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div>
            <img src={aboutUsLogo} alt="" />
          </div>
          <h2>We Look forward to serving you.</h2>
        </div>
      </div>
    </div>
  )
}
