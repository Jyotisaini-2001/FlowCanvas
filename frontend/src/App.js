import { useState, useEffect, useCallback } from 'react';
import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { useStore } from './store';
import {
  savePipelineToLocal,
  loadPipelineFromLocal,
  getAllPipelines,
  exportPipelineAsJSON,
} from './utils/pipelineManager';
import { historyManager, setupKeyboardShortcuts } from './utils/historyManager';
import { loadTemplate } from './utils/templates';

function App() {
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);
  const setNodes = useStore((state) => state.setNodes);
  const setEdges = useStore((state) => state.setEdges);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  useEffect(() => {
    const cleanup = setupKeyboardShortcuts(handleUndo, handleRedo);
    const handleSaveEvent = () => handleSave();
    const handleLoadEvent = () => handleLoad();
    const handleExportEvent = () => handleExport();
    window.addEventListener('flowforge-save', handleSaveEvent);
    window.addEventListener('flowforge-open', handleLoadEvent);
    window.addEventListener('flowforge-export', handleExportEvent);
    return () => {
      cleanup();
      window.removeEventListener('flowforge-save', handleSaveEvent);
      window.removeEventListener('flowforge-open', handleLoadEvent);
      window.removeEventListener('flowforge-export', handleExportEvent);
    };
  }, [nodes, edges]);

  useEffect(() => {
    if (nodes.length > 0 || edges.length > 0) {
      historyManager.push({ nodes, edges });
      setCanUndo(historyManager.canUndo());
      setCanRedo(historyManager.canRedo());
    }
  }, [nodes, edges]);

  const handleUndo = useCallback(() => {
    const state = historyManager.undo();
    if (state) {
      setNodes(state.nodes);
      setEdges(state.edges);
      setCanUndo(historyManager.canUndo());
      setCanRedo(historyManager.canRedo());
    }
  }, [setNodes, setEdges]);

  const handleRedo = useCallback(() => {
    const state = historyManager.redo();
    if (state) {
      setNodes(state.nodes);
      setEdges(state.edges);
      setCanUndo(historyManager.canUndo());
      setCanRedo(historyManager.canRedo());
    }
  }, [setNodes, setEdges]);

  const handleSave = useCallback(() => {
    const name = prompt('Enter pipeline name:');
    if (name) {
      const result = savePipelineToLocal(nodes, edges, name);
      alert(result.success ? '✅ Saved!' : '❌ ' + result.message);
    }
  }, [nodes, edges]);

  const handleLoad = useCallback(() => {
    const result = getAllPipelines();
    if (result.success && result.pipelines.length > 0) {
      const names = result.pipelines.map((p, i) => `${i + 1}. ${p.name}`).join('\n');
      const choice = prompt('Saved pipelines:\n' + names + '\n\nEnter pipeline name:');
      if (choice) {
        const loadResult = loadPipelineFromLocal(choice);
        if (loadResult.success) {
          setNodes(loadResult.pipeline.nodes);
          setEdges(loadResult.pipeline.edges);
          alert('✅ Loaded!');
        } else {
          alert('❌ ' + loadResult.message);
        }
      }
    } else {
      alert('No saved pipelines found');
    }
  }, [setNodes, setEdges]);

  const handleExport = useCallback(() => {
    exportPipelineAsJSON(nodes, edges, 'pipeline');
    alert('✅ Exported!');
  }, [nodes, edges]);

  const handleLoadTemplate = useCallback((templateId) => {
    const result = loadTemplate(templateId);
    if (result.success) {
      setNodes(result.nodes);
      setEdges(result.edges);
      alert(`✅ Template "${result.name}" loaded!`);
    }
  }, [setNodes, setEdges]);

  const handleSubmit = useCallback(async () => {
    try {
      const pipeline = {
        nodes: nodes,
        edges: edges,
      };

      const response = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pipeline),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      const isDAGText = data.is_dag ? 'Yes' : 'No';
      alert(
        `Pipeline Analysis:\n\n` +
        `Number of Nodes: ${data.num_nodes}\n` +
        `Number of Edges: ${data.num_edges}\n` +
        `Is DAG (Directed Acyclic Graph): ${isDAGText}`
      );
    } catch (error) {
      console.error('Error submitting pipeline:', error);
      alert(`Error submitting pipeline: ${error.message}`);
    }
  }, [nodes, edges]);

  return (
    <div>
      <div style={{padding:'10px',background:'#1F2937',color:'white',display:'flex',gap:'10px',alignItems:'center',borderBottom:'1px solid #374151'}}>
        <div style={{fontSize:'18px',fontWeight:'bold',marginRight:'auto'}}>⚡ FlowForge</div>
        <button onClick={handleUndo} disabled={!canUndo} style={{padding:'6px 12px',background:canUndo?'#374151':'#1F2937',color:canUndo?'white':'#6B7280',border:'none',borderRadius:'4px',cursor:canUndo?'pointer':'not-allowed',fontSize:'14px'}}>↶ Undo</button>
        <button onClick={handleRedo} disabled={!canRedo} style={{padding:'6px 12px',background:canRedo?'#374151':'#1F2937',color:canRedo?'white':'#6B7280',border:'none',borderRadius:'4px',cursor:canRedo?'pointer':'not-allowed',fontSize:'14px'}}>↷ Redo</button>
        <button onClick={handleSave} style={{padding:'6px 12px',background:'#374151',color:'white',border:'none',borderRadius:'4px',cursor:'pointer',fontSize:'14px'}}>💾 Save</button>
        <button onClick={handleLoad} style={{padding:'6px 12px',background:'#374151',color:'white',border:'none',borderRadius:'4px',cursor:'pointer',fontSize:'14px'}}>📂 Load</button>
        <button onClick={handleExport} style={{padding:'6px 12px',background:'#374151',color:'white',border:'none',borderRadius:'4px',cursor:'pointer',fontSize:'14px'}}>📥 Export</button>
        <select onChange={(e)=>e.target.value&&handleLoadTemplate(e.target.value)} style={{padding:'6px 12px',background:'#374151',color:'white',border:'none',borderRadius:'4px',cursor:'pointer',fontSize:'14px'}} defaultValue="">
          <option value="">📋 Templates</option>
          <option value="simple-llm">Simple LLM Chat</option>
          <option value="data-processing">Data Processing</option>
          <option value="api-integration">API Integration</option>
          <option value="conditional-routing">Conditional Routing</option>
          <option value="database-query">Database Query</option>
          <option value="text-processing">Text Processing</option>
        </select>
        <button onClick={handleSubmit} style={{padding:'6px 16px',background:'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',color:'white',border:'none',borderRadius:'4px',cursor:'pointer',fontSize:'14px',fontWeight:'600',marginLeft:'10px'}}>🚀 Submit</button>
      </div>
      <PipelineToolbar />
      <PipelineUI />
    </div>
  );
}

export default App;
