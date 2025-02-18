import { createLazyFileRoute } from '@tanstack/react-router';

import { ctx } from '@/app/store.ts';
import { createFieldsBuilder } from '@/entities/collection/fields';
import { SecureRoute } from '@/shared/ui/secure-route.tsx';

const builder = createFieldsBuilder();

export const Route = createLazyFileRoute('/create-collection')({
  component: SecureRoute(RouteComponent),
});

function RouteComponent() {
  return <CollectionBuilder model={builder} />;
}
