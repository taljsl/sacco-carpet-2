import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/view-installation/2')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/view-installation/2"!</div>
}
