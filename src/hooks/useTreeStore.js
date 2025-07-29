import { create } from 'zustand';
import { nanoid } from 'nanoid';
import { getLayoutedElements } from '../utils/layout';

const ALLOWED_CHILDREN = {
  Account: ['Loan', 'Collateral'],
  Loan: ['Collateral'],
  Collateral: [],
};

export const useTreeStore = create((set, get) => ({
  nodes: [],
  edges: [],
  selectedNodeId: null,
  sidePanelOpen: true, // ✅ open initially

  setSidePanelOpen: (open) => set({ sidePanelOpen: open }),

  addNode: (type, parentId = null) => {
    const id = nanoid();
    const newNode = {
      id,
      type,
      data: { label: type },
      position: { x: 0, y: 0 },
    };

    const newEdge = parentId
      ? { id: `${parentId}-${id}`, source: parentId, target: id, type: 'default' }
      : null;

    const updatedNodes = [...get().nodes, newNode];
    const updatedEdges = newEdge ? [...get().edges, newEdge] : get().edges;

    const layouted = getLayoutedElements(updatedNodes, updatedEdges);

    set({
      nodes: layouted.nodes,
      edges: layouted.edges,
      selectedNodeId: parentId ? parentId : id,
      sidePanelOpen: !!parentId, // ✅ close after root is added, open if child
    });
  },

  deleteNode: (nodeId) => {
    const descendants = getDescendants(nodeId, get().edges);
    const toRemove = new Set([nodeId, ...descendants]);

    const updatedNodes = get().nodes.filter((n) => !toRemove.has(n.id));
    const updatedEdges = get().edges.filter(
      (e) => !toRemove.has(e.source) && !toRemove.has(e.target)
    );

    const layouted = getLayoutedElements(updatedNodes, updatedEdges);

    set({
      nodes: layouted.nodes,
      edges: layouted.edges,
      selectedNodeId: null,
    });
  },

  setSelectedNodeId: (id) => set({ selectedNodeId: id }),
  getAllowedChildren: (type) => ALLOWED_CHILDREN[type] || [],
}));

function getDescendants(parentId, edges) {
  const map = {};
  edges.forEach(({ source, target }) => {
    if (!map[source]) map[source] = [];
    map[source].push(target);
  });

  const result = [];
  const stack = [parentId];

  while (stack.length) {
    const current = stack.pop();
    const children = map[current] || [];
    result.push(...children);
    stack.push(...children);
  }

  return result;
}
