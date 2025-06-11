import { createFileRoute } from '@tanstack/react-router'
import aboutUsImg1 from '../assets/aboutUsImg1.jpg'
import aboutUsImg2 from '../assets/aboutUsImg2.jpg'
import aboutUsLogo from '../assets/aboutUsLogo.svg'
// CHANGE: Added shadcn Breadcrumb import
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/about')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="w-full">
      <div className="relative overflow-hidden">
        <video
          src="https://d5ub84cxsf6h3.cloudfront.net/about_video.mp4"
          className="w-full h-auto object-cover"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>

      {/* Breadcrumb and Title Section */}
      <div className="container mx-auto px-10 lg:px-8">
        <div className="flex justify-center mt-0">
          <Breadcrumb className="py-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="/"
                  className="text-gray-600 hover:text-gray-800 uppercase tracking-wide font-medium"
                >
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-gray-600 uppercase tracking-wide font-medium">
                  About
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Page Title */}
        <div className="flex justify-center">
          <h1 className="text-4xl md:text-5xl font-medium uppercase tracking-wider text-center mb-0 text-gray-800">
            About Us
          </h1>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="container mx-auto px-10 lg:px-8 pb-8 md:pb-16">
        <div className="flex justify-center mt-10 mb-8">
          <div className="w-full max-w-4xl">
            <p className="text-gray-600 font-normal text-lg leading-relaxed mb-10">
              Sacco Carpet was founded in 2001 by Marc and Debra Sacco on the
              principle of producing the highest quality carpets for the world's
              leading interior designers and architects. Sacco's reputation for
              excellence and quality grew fiercely when Marc developed Sacco's
              Chinese Persian knotted silk collection and South African
              hand-woven mohair collection, both colored by the famous John
              Saladino. It was designers like John Saladino, Charlotte Moss and
              Joe Nahem who caught sight of these collections, earning Sacco a
              fine reputation for excellent products in high-end residential
              spaces.
            </p>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="bg-white mb-16">
        <div className="px-5 md:px-12 pb-6 pt-12">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="aspect-[4/3] md:aspect-auto">
              <img
                src={aboutUsImg1}
                alt="Sacco Carpet Interior"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="bg-gray-100 p-12 md:p-16 flex items-center">
              <div className="max-w-lg">
                <p className="text-gray-600 font-normal text-lg leading-relaxed mt-12 md:mt-0">
                  <strong>In 2001</strong>, Adam Tihany visited the Sacco
                  showroom on a hunt to design the Michelin Star restaurant,
                  Perse. Collaborating with Tihany on Perse opened up a world of
                  opportunity for Sacco including; The Breakers, Palm Beach, The
                  Mandarin Oriental, Hong Kong and Restaurant Daniel, on Park
                  Avenue. The hospitality greats soon followed with David
                  Rockwell, Yabu Pushelberg, Jeffrey Beers and Toni Chi, who
                  took Sacco to unforeseen heights. To meet the expectation and
                  demand, Sacco hired the most talented artists in the industry
                  and never sacrificed quality for price.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="bg-gray-100 p-12 md:p-16 flex items-center pt-0 md:pt-16 order-2 md:order-1">
              <div className="max-w-lg">
                <p className="text-gray-600 font-normal text-lg leading-relaxed mt-4 md:mt-0 mb-12 md:mb-0">
                  <strong>Today</strong> our business is an equal divide between
                  our residential and hospitality markets. Whether it is a 100%
                  silk hand knotted rug, or a New Zealand wool Axminster, Sacco
                  takes every detail into consideration, focusing on quality,
                  color, price effectiveness and longevity. Sacco's devoted
                  sales team is enthusiastic, passionate and responsive, proving
                  all the difference in customer service. We have successfully
                  opened a showroom in New York and London. We currently have
                  sales reps in Chicago, Texas, Florida and Los Angeles.
                </p>
              </div>
            </div>
            <div className="aspect-[3/2] md:aspect-auto order-1 md:order-2">
              <img
                src={aboutUsImg2}
                alt="Sacco Carpet Showroom"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Bottom Section */}
          <div className="flex flex-col justify-center items-center py-16 px-12 mt-16">
            <div className="w-[120px] h-[120px] mb-8 flex items-center justify-center">
              <img
                src={aboutUsLogo}
                alt="Sacco Carpet Logo"
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <h2 className="text-2xl md:text-3xl font-normal text-center text-gray-600 mb-8">
              We look forward to serving you.
            </h2>

            <Button className="mt-8 uppercase text-gray-700 font-normal w-[200px] h-[48px] bg-gray-100 rounded-none hover:bg-gray-200 transition-colors duration-200">
              Let's Get Started?
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
