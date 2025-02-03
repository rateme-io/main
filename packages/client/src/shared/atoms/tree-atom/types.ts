import { Action, Atom, AtomMut, Ctx } from '@reatom/framework';

export type CreateNodeCommand<Payload> = {
  id: string;
} & Payload;

export type NodeAtom<CurrentPayload, Payload = CurrentPayload> = {
  id: string;
  nodes: {
    $next: AtomMut<NodeAtom<Payload> | null>;
    $prev: AtomMut<NodeAtom<Payload> | null>;
    $parent: AtomMut<NodeAtom<Payload> | null>;
    $child: AtomMut<NodeAtom<Payload> | null>;
    $lastChild: AtomMut<NodeAtom<Payload> | null>;
    $children: Atom<NodeAtom<Payload>[]>;
  };
  actions: {
    after: Action<[node: NodeAtom<Payload>], void>;
    before: Action<[node: NodeAtom<Payload>], void>;
    addChild: Action<[node: NodeAtom<Payload>], void>;
    detach: Action<[], void>;
    travers: Action<
      [
        callback: (
          ctx: Ctx,
          current: NodeAtom<Payload>,
        ) => NodeAtom<Payload> | null,
      ],
      void
    >;
    isChild: Action<[node: NodeAtom<Payload>], boolean>;
    isParent: Action<[node: NodeAtom<Payload>], boolean>;
  };
} & CurrentPayload;

export type TreeAtom<Payload> = {
  root: NodeAtom<Payload>;
  $child: NodeAtom<Payload>['nodes']['$child'];
  $children: NodeAtom<Payload>['nodes']['$children'];
  $lastChild: NodeAtom<Payload>['nodes']['$lastChild'];
  addChild: NodeAtom<Payload>['actions']['addChild'];
  createNode: (
    command: CreateNodeCommand<Payload>,
    name: string,
  ) => NodeAtom<Payload>;
  getNode: (id: string) => NodeAtom<Payload> | null;
};
