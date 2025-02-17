import { createLazyFileRoute } from '@tanstack/react-router';

import { collectionBuilder } from '@/shared/fields';
import { SecureRoute } from '@/shared/ui/secure-route.tsx';
import { CollectionBuilder } from '@/widgets/collection-builder';

export const Route = createLazyFileRoute('/create-collection/')({
  component: SecureRoute(RouteComponent),
});

function RouteComponent() {
  return <CollectionBuilder model={collectionBuilder} />;
}
