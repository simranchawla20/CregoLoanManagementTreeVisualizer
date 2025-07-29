import { useTreeStore } from "../hooks/useTreeStore";

export default function SidePanel() {
  const {
    nodes,
    selectedNodeId,
    addNode,
    deleteNode,
    getAllowedChildren,
    sidePanelOpen,
    setSidePanelOpen,
  } = useTreeStore();

  const selectedNode = nodes.find((n) => n.id === selectedNodeId) || null;
  const allowedChildren = selectedNode ? getAllowedChildren(selectedNode.type) : [];

  return (
    <div
      className={`fixed top-0 right-0 h-full w-1/4 bg-white border-l shadow-lg transition-transform duration-300 z-50 ${
        sidePanelOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
    <div className="p-4 h-full relative">

{selectedNodeId && (
  <button
    onClick={() => setSidePanelOpen(false)}
    style={{
      position: 'absolute',
      top: '10px',
      right: '15px',
      background: 'transparent',
      border: 'none',
      fontSize: '20px',
      color: '#666',
      cursor: 'pointer',
      outline: 'none'
    }}
  >
    ×
  </button>
)}


        {/* Root node selection */}
        {nodes.length === 0 && (
          <>
            <h2 className="text-lg font-semibold mb-4">Add Root Node</h2>
            {['Account', 'Loan'].map((type) => (
              <button
                key={type}
                onClick={() => addNode(type, null)}
                className="w-full px-3 py-2 mb-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
              >
                Add {type}
              </button>
            ))}
          </>
        )}

        {/* Node details */}
        {selectedNode && nodes.length > 0 && (
          <>
            <div className="mb-4 space-y-1 mt-8">
              <p className="text-sm">
                <span className="font-semibold text-gray-700">Type:</span>{' '}
                <span className="text-blue-600">{selectedNode.type}</span>
              </p>
              <p className="text-sm break-all">
                <span className="font-semibold text-gray-700">ID:</span>{' '}
                <span className="text-gray-600">{selectedNode.id}</span>
              </p>
            </div>

            <div className="space-y-2">
              {allowedChildren.map((childType) => (
                <button
                  key={childType}
                  onClick={() => addNode(childType, selectedNode.id)}
                  className="w-full px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                >
                  Add {childType}
                </button>
              ))}

              <button
                onClick={() => deleteNode(selectedNode.id)}
                className="w-full px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm mt-4"
              >
                Delete Node
              </button>
            </div>
          </>
        )}

        {/* No selection */}
        {!selectedNode && nodes.length > 0 && (
          <div className="text-sm text-gray-500 mt-10">Select a node to view details</div>
        )}
      </div>
    </div>
  );
}
