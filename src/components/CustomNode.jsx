import { Handle, Position } from 'reactflow'; // ⬅️ import this
import { useTreeStore } from '../hooks/useTreeStore';

export default function CustomNode({ id, data }) {
  const setSelectedNodeId = useTreeStore((s) => s.setSelectedNodeId);

  const getNodeStyle = (type) => {
    switch (type) {
      case 'Account':
        return 'bg-blue-100 border-blue-500 text-blue-700';
      case 'Loan':
        return 'bg-green-100 border-green-500 text-green-700';
      case 'Collateral':
        return 'bg-yellow-100 border-yellow-500 text-yellow-700';
      default:
        return 'bg-gray-100 border-gray-500 text-gray-700';
    }
  };

  return (
    <div
      className={`p-4 border-2 rounded shadow-md cursor-pointer text-center ${getNodeStyle(
        data.label
      )}`}
      onClick={() => setSelectedNodeId(id)}
    >
      {/* 👇 Handle for incoming connections */}
      <Handle type="target" position={Position.Top} />

      <div className="font-bold text-sm">{data.label}</div>
      <div className="text-[10px] text-gray-500">ID: {id.slice(0, 6)}</div>

      {/* 👇 Handle for outgoing connections */}
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
