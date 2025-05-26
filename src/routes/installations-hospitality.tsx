import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/installations-hospitality')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/installations-hospitality"!</div>
}
