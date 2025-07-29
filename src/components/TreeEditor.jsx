import ReactFlow, { Background, Controls, ReactFlowProvider } from 'reactflow';
import 'reactflow/dist/style.css';
import { useTreeStore } from '../hooks/useTreeStore';
import CustomNode from './CustomNode';

const nodeTypes = {
  default: CustomNode,
};

export default function TreeEditor() {
  const nodes = useTreeStore((s) => s.nodes);
  const edges = useTreeStore((s) => s.edges);
  const setSelectedNodeId = useTreeStore((s) => s.setSelectedNodeId);
  const setSidePanelOpen = useTreeStore((s) => s.setSidePanelOpen);

  return (
    <ReactFlowProvider>
      <div className="w-full h-full">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodeClick={(e, node) => {
            setSelectedNodeId(node.id);
            setSidePanelOpen(true); // ✅ open panel
          }}
          fitView
          edgeOptions={{ style: { stroke: '#ffffff', strokeWidth: 2 } }}
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </ReactFlowProvider>
  );
}
    