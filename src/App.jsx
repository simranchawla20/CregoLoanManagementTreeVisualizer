import TreeEditor from './components/TreeEditor';
import SidePanel from './components/SidePanel';
import { useTreeStore } from './hooks/useTreeStore';

function App() {
  const sidePanelOpen = useTreeStore((s) => s.sidePanelOpen);

  return (
    <div className="flex h-screen">
      <div className={`${sidePanelOpen ? 'w-3/4' : 'w-full'} transition-all duration-300`}>
        <TreeEditor />
      </div>
     <SidePanel />
    </div>
  );
}

export default App;
