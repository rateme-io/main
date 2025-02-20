import { createLazyFileRoute } from '@tanstack/react-router';

import { ctx } from '@/app/store.ts';
import { createFieldsBuilder } from '@/entities/collection/fields';
import { DropdownField } from '@/entities/collection/fields/basic/dropdown';
import { NumericField } from '@/entities/collection/fields/basic/numeric';
import { TextField } from '@/entities/collection/fields/basic/text';
import { CollectionBuilder } from '@/features/collection-builder';
import { SecureRoute } from '@/shared/ui/secure-route.tsx';

const builder = createFieldsBuilder();

const text = builder.actions.addChild(ctx, TextField);
text.builder.state.$name(ctx, 'Director');
const script = builder.actions.addChild(ctx, TextField);
script.builder.state.$name(ctx, 'Script');
const dropdown = builder.actions.addChild(ctx, DropdownField);
dropdown.builder.state.$name(ctx, 'Genre');
dropdown.builder.state.model.labelField.$value(ctx, 'Horror');
dropdown.builder.state.model.add(ctx);
dropdown.builder.state.model.$isCreatable(ctx, true);
dropdown.builder.state.model.$isMulti(ctx, true);
const Actors = builder.actions.addChild(ctx, DropdownField);
Actors.builder.state.$name(ctx, 'Actors');
Actors.builder.state.model.$isCreatable(ctx, true);
Actors.builder.state.model.$isMulti(ctx, true);
const numeric = builder.actions.addChild(ctx, NumericField);
numeric.builder.state.$name(ctx, 'Year');
numeric.builder.state.min.$enabled(ctx, true);
numeric.builder.state.min.$value(ctx, 2000);
numeric.builder.state.max.$enabled(ctx, true);
numeric.builder.state.max.$value(ctx, 2025);

const model = CollectionBuilder.createModel({ fields: builder });

export const Route = createLazyFileRoute('/create-collection')({
  component: SecureRoute(RouteComponent),
});

function RouteComponent() {
  return <CollectionBuilder.ui model={model} />;
}
