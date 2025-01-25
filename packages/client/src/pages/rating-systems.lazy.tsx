import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/rating-systems')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/rating-systems"!</div>
}
