// src/routes/installations-hospitality.tsx
import { Link, createFileRoute } from '@tanstack/react-router'
import type { ImageItem } from '@/data/installation_data'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/installations-hospitality')({
  component: InstallationsHospitalityPage,
})

const images: Array<ImageItem> = [
  { src: '/images/individualpages/Num1Home.jpg', id: '1' },
  { src: '/images/individualpages/Num2Home.jpg', id: '2' },
  { src: '/images/individualpages/Num3Home.jpg', id: '3' },
  { src: '/images/individualpages/Num4Home.jpg', id: '4' },
  { src: '/images/individualpages/Num5Home.jpg', id: '5' },
  { src: '/images/individualpages/Num6Home.jpg', id: '6' },
  { src: '/images/individualpages/Num7Home.jpg', id: '7' },
  { src: '/images/individualpages/Num8Home.jpg', id: '8' },
]

function InstallationsHospitalityPage() {
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
                Hospitality Installations
              </span>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Title Container */}
      <div className="container mx-auto text-center mb-10">
        <h1 className="text-2xl sm:text-3xl uppercase font-light tracking-wide">
          Hospitality Installations
        </h1>
      </div>

      {/* -- Image Grid Container -- */}
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 pb-16">
        {images.map(({ src, id }) => (
          <Link key={id} to="/view-installation/$id" params={{ id }}>
            {/* -- Image Box -- */}
            <div
              className="aspect-[1/1.17] bg-cover bg-center"
              style={{ backgroundImage: `url(${src})` }}
            />
          </Link>
        ))}
      </div>

      {/*  Button Container */}
      <div className="container mx-auto mt-8 flex justify-center">
        <Link to="/installations-residential">
          <Button className="mt-8 uppercase text-gray-700 font-normal  h-[48px] bg-gray-100 rounded-none hover:bg-gray-200 transition-colors duration-200">
            View Residential Installations
          </Button>
        </Link>
      </div>
    </div>
  )
}