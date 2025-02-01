import { Action, Atom, AtomMut } from '@reatom/framework';

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
    find: Action<[id: string], NodeAtom<Payload> | null>;
    isChild: Action<[node: NodeAtom<Payload>], boolean>;
    isParent: Action<[node: NodeAtom<Payload>], boolean>;
    findFirstSibling: Action<[], NodeAtom<Payload> | null>;
    findLastSibling: Action<[], NodeAtom<Payload> | null>;
  };
} & CurrentPayload;

export type NodeBuilder<Payload> = {
  root: NodeAtom<Payload>;
  $child: NodeAtom<Payload>['nodes']['$child'];
  $children: NodeAtom<Payload>['nodes']['$children'];
  $lastChild: NodeAtom<Payload>['nodes']['$lastChild'];
  addChild: NodeAtom<Payload>['actions']['addChild'];
  find: NodeAtom<Payload>['actions']['find'];
  createNode: (
    command: CreateNodeCommand<Payload>,
    name: string,
  ) => NodeAtom<Payload>;
  getNode: (id: string) => NodeAtom<Payload> | null;
};
