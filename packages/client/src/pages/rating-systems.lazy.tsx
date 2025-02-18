import { createLazyFileRoute } from '@tanstack/react-router';

import { SecureRoute } from '@/shared/ui/secure-route.tsx';

export const Route = createLazyFileRoute('/rating-systems')({
  component: SecureRoute(RouteComponent),
});

function RouteComponent() {
  return <div>Hello "/rating-systems"!</div>;
}
