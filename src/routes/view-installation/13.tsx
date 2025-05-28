import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/view-installation/13')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/view-installation/13"!</div>
}
