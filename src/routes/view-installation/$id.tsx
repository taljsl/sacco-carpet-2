import { createFileRoute, useParams } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import type { pictureData } from '@/data/installation_data'
import { pictures } from '@/data/installation_data'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

export const Route = createFileRoute('/view-installation/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  const { id }: any = useParams({ strict: false })
  const [currentSelection, setCurrentSelection] = useState<
    pictureData | undefined
  >(undefined)

  useEffect(() => {
    const selected: pictureData | undefined = pictures.find(
      (picture) => picture.id == id,
    )
    setCurrentSelection(selected)
  }, [])

  if (!currentSelection) {
    return <div>Sorry, the page you are looking for does not exist</div>
  }

  // Determine the breadcrumb text and link based on category
  const categoryDisplayName =
    currentSelection.category === 'residential' ? 'Residential' : 'Hospitality'

  const categoryLink =
    currentSelection.category === 'residential'
      ? '/installations-residential'
      : '/installations-hospitality'

  return (
    <>
      {/* wrapper */}
      <div>
        {/* primary image */}
        <div>
          <img className="w-full " src={currentSelection.homeImg} alt="" />
        </div>
        {/* end primary image */}
        <div>
          {/* breadcrumb */}
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
                  <BreadcrumbLink
                    href={categoryLink}
                    className="text-gray-600 hover:text-gray-800 uppercase tracking-wide font-medium"
                  >
                    {categoryDisplayName}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-gray-600 uppercase tracking-wide font-medium">
                    {currentSelection.title}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          {/* end breadcrumb div */}
          {/* title div */}
          <div className="flex justify-center">
            <h3 className="text-2xl font-light uppercase">
              {currentSelection.title}
            </h3>
          </div>
          {/* end title div */}
          {/* images div */}
          <div className="px-5 sm:px-8 lg:px-8 pb-12 w-full">
            <div className="px-6 lg:px-12 pb-6 pt-6">
              <div className="flex flex-wrap justify-center gap-y-6 gap-x-4">
                {currentSelection.images.map((img, index) => (
                  <div key={index} className="w-1/2 lg:w-1/4 px-2">
                    <div className="relative w-full pb-[100%] overflow-hidden rounded shadow">
                      <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${img.src})` }}
                      />
                    </div>
                    <span className="text-gray-600 mt-2 flex justify-left text-sm font-medium">
                      {img.picid}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* end warapper */}
    </>
  )
}
