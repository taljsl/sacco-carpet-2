import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/installations')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/installations"!</div>
}
