import { Link, createFileRoute } from '@tanstack/react-router'

import Num9Home from '../assets/individualPages/Num9Home.jpg'
import Num10Home from '../assets/individualPages/Num10Home.jpg'
import Num11Home from '../assets/individualPages/Num11Home.jpg'
import Num12Home from '../assets/individualPages/Num12Home.jpg'
import Num13Home from '../assets/individualPages/Num13Home.jpg'
import Num14Home from '../assets/individualPages/Num14Home.jpg'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/installations-residential')({
  component: InstallationsResidentialPage,
})

const images = [
  { src: Num9Home, id: '9' },
  { src: Num10Home, id: '10' },
  { src: Num11Home, id: '11' },
  { src: Num12Home, id: '12' },
  { src: Num13Home, id: '13' },
  { src: Num14Home, id: '14' },
]

function InstallationsResidentialPage() {
  return (
    <div className="bg-white px-4 sm:px-8 lg:px-10 pt-8">
      {/* Breadcrumb Container */}
      <div className="container mx-auto mb-4 flex justify-center">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <span className="text-muted-foreground">
                Residential Installations
              </span>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Title Container */}
      <div className="container mx-auto text-center mb-10">
        <h1 className="text-2xl sm:text-3xl uppercase font-light tracking-wide">
          Residential Installations
        </h1>
      </div>

      {/* Image Grid Container */}
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 pb-16">
        {images.map(({ src, id }) => (
          <Link key={id} to="/view-installation/$id" params={{ id }}>
            <div
              className="aspect-[1/1.17] bg-cover bg-center"
              style={{ backgroundImage: `url(${src})` }}
            />
          </Link>
        ))}
      </div>

      {/* Button Container */}
      <div className="container mx-auto mt-8 flex justify-center">
        <Link to="/installations-hospitality">
          <Button className="mt-8 uppercase text-gray-700 font-normal h-[48px] bg-gray-100 rounded-none hover:bg-gray-200 transition-colors duration-200">
            View Hospitality Installations
          </Button>
        </Link>
      </div>
    </div>
  )
}
