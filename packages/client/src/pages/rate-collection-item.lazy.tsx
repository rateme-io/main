import { createLazyFileRoute } from '@tanstack/react-router';

import { SecureRoute } from '@/shared/ui/secure-route.tsx';

export const Route = createLazyFileRoute('/rate-collection-item')({
  component: SecureRoute(RouteComponent),
});

function RouteComponent() {
  return <div>Hello "/rate-collection-item"!</div>;
}
