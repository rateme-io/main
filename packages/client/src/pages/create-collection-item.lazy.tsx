import { createLazyFileRoute } from '@tanstack/react-router';

import { SecureRoute } from '@/shared/ui/secure-route.tsx';

export const Route = createLazyFileRoute('/create-collection-item')({
  component: SecureRoute(RouteComponent),
});

function RouteComponent() {
  return <div>Hello "/create-collection-item"!</div>;
}
