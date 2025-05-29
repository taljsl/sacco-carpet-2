import { createFileRoute, useParams } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import type { pictureData } from '@/data/installation_data'
import { pictures } from '@/data/installation_data'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

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

  return (
    <>
      <div>
        <img src={currentSelection.homeImg} alt="" />
      </div>
      <div>{/* divider goes here */}</div>
      <div>
        <h3>{currentSelection.title}</h3>
      </div>
      <div className="flex flex-row flex-wrap ">
        {currentSelection.images.map((img, index) => (
          <Card key={index}>
            <CardContent>
              <img src={img.src} alt={img.src} />
              <span>{img.picid}</span>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  )
}
