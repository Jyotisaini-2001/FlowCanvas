// pipelineManager.js - Save/Load/Export pipeline functionality

/**
 * Save pipeline to localStorage
 */
export const savePipelineToLocal = (nodes, edges, name = 'pipeline') => {
  try {
    const pipeline = {
      name,
      nodes,
      edges,
      timestamp: new Date().toISOString(),
      version: '1.0',
    };

    // Get existing pipelines
    const savedPipelines = JSON.parse(localStorage.getItem('flowforge_pipelines') || '[]');

    // Add or update pipeline
    const existingIndex = savedPipelines.findIndex(p => p.name === name);
    if (existingIndex >= 0) {
      savedPipelines[existingIndex] = pipeline;
    } else {
      savedPipelines.push(pipeline);
    }

    localStorage.setItem('flowforge_pipelines', JSON.stringify(savedPipelines));
    return { success: true, message: 'Pipeline saved successfully' };
  } catch (error) {
    return { success: false, message: `Error saving pipeline: ${error.message}` };
  }
};

/**
 * Load pipeline from localStorage
 */
export const loadPipelineFromLocal = (name) => {
  try {
    const savedPipelines = JSON.parse(localStorage.getItem('flowforge_pipelines') || '[]');
    const pipeline = savedPipelines.find(p => p.name === name);

    if (!pipeline) {
      return { success: false, message: 'Pipeline not found' };
    }

    return { success: true, pipeline };
  } catch (error) {
    return { success: false, message: `Error loading pipeline: ${error.message}` };
  }
};

/**
 * Get all saved pipelines
 */
export const getAllPipelines = () => {
  try {
    const savedPipelines = JSON.parse(localStorage.getItem('flowforge_pipelines') || '[]');
    return { success: true, pipelines: savedPipelines };
  } catch (error) {
    return { success: false, message: `Error getting pipelines: ${error.message}`, pipelines: [] };
  }
};

/**
 * Delete pipeline from localStorage
 */
export const deletePipeline = (name) => {
  try {
    const savedPipelines = JSON.parse(localStorage.getItem('flowforge_pipelines') || '[]');
    const filtered = savedPipelines.filter(p => p.name !== name);
    localStorage.setItem('flowforge_pipelines', JSON.stringify(filtered));
    return { success: true, message: 'Pipeline deleted successfully' };
  } catch (error) {
    return { success: false, message: `Error deleting pipeline: ${error.message}` };
  }
};

/**
 * Export pipeline as JSON file
 */
export const exportPipelineAsJSON = (nodes, edges, name = 'pipeline') => {
  try {
    const pipeline = {
      name,
      nodes,
      edges,
      timestamp: new Date().toISOString(),
      version: '1.0',
      application: 'FlowForge',
    };

    const dataStr = JSON.stringify(pipeline, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

    const exportFileDefaultName = `${name}_${Date.now()}.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();

    return { success: true, message: 'Pipeline exported successfully' };
  } catch (error) {
    return { success: false, message: `Error exporting pipeline: ${error.message}` };
  }
};

/**
 * Import pipeline from JSON file
 */
export const importPipelineFromJSON = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const pipeline = JSON.parse(e.target.result);

        // Validate pipeline structure
        if (!pipeline.nodes || !pipeline.edges) {
          reject(new Error('Invalid pipeline format'));
          return;
        }

        resolve({ success: true, pipeline });
      } catch (error) {
        reject(new Error(`Error parsing JSON: ${error.message}`));
      }
    };

    reader.onerror = () => {
      reject(new Error('Error reading file'));
    };

    reader.readAsText(file);
  });
};

/**
 * Auto-save pipeline (debounced)
 */
let autoSaveTimeout = null;
export const autoSavePipeline = (nodes, edges, delay = 2000) => {
  clearTimeout(autoSaveTimeout);
  autoSaveTimeout = setTimeout(() => {
    savePipelineToLocal(nodes, edges, '__autosave__');
  }, delay);
};

/**
 * Load auto-saved pipeline
 */
export const loadAutoSave = () => {
  return loadPipelineFromLocal('__autosave__');
};

/**
 * Clear auto-save
 */
export const clearAutoSave = () => {
  deletePipeline('__autosave__');
};
