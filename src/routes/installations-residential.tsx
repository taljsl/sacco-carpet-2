import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/installations-residential')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/installations-residential"!</div>
}
