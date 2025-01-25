import { createLazyFileRoute } from '@tanstack/react-router';

import { PageWrapper } from '@/shared/ui/page-wrapper.tsx';
import { SecureRoute } from '@/shared/ui/secure-route.tsx';

export const Route = createLazyFileRoute('/create-collection')({
  component: SecureRoute(RouteComponent),
});

function RouteComponent() {
  return <PageWrapper>Hello "/create-collection"!</PageWrapper>;
}
