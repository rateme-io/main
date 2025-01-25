import { createLazyFileRoute } from '@tanstack/react-router';

import { SecureRoute } from '@/shared/ui/secure-route.tsx';

export const Route = createLazyFileRoute('/collections')({
  component: SecureRoute(RouteComponent),
});

function RouteComponent() {
  return <div>Hello "/collections"!</div>;
}
