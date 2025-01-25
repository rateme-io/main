import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/collections')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/collections"!</div>
}
