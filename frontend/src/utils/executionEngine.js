// executionEngine.js - Pipeline execution engine (Phase 3)

/**
 * Topological sort to determine execution order
 */
const topologicalSort = (nodes, edges) => {
  const adjList = {};
  const inDegree = {};

  // Initialize
  nodes.forEach(node => {
    adjList[node.id] = [];
    inDegree[node.id] = 0;
  });

  // Build adjacency list and in-degree count
  edges.forEach(edge => {
    if (adjList[edge.source] && inDegree[edge.target] !== undefined) {
      adjList[edge.source].push(edge.target);
      inDegree[edge.target]++;
    }
  });

  // Find nodes with no dependencies
  const queue = [];
  Object.keys(inDegree).forEach(nodeId => {
    if (inDegree[nodeId] === 0) {
      queue.push(nodeId);
    }
  });

  const sorted = [];
  while (queue.length > 0) {
    const current = queue.shift();
    sorted.push(current);

    adjList[current].forEach(neighbor => {
      inDegree[neighbor]--;
      if (inDegree[neighbor] === 0) {
        queue.push(neighbor);
      }
    });
  }

  // Check if there's a cycle
  if (sorted.length !== nodes.length) {
    throw new Error('Pipeline contains cycles - cannot execute');
  }

  return sorted;
};

/**
 * Execute a single node
 */
const executeNode = async (node, inputs, onProgress) => {
  onProgress?.({
    nodeId: node.id,
    status: 'executing',
    message: `Executing ${node.type} node...`,
  });

  // Simulate execution delay
  await new Promise(resolve => setTimeout(resolve, 500));

  let output;

  switch (node.type) {
    case 'input':
      output = {
        value: node.data?.inputName || 'input_value',
        type: node.data?.inputType || 'Text',
      };
      break;

    case 'llm':
      output = {
        value: `[LLM Response from ${node.data?.llmModel || 'GPT-3.5'}]: Processed "${inputs?.[0]?.value || ''}"`,
        model: node.data?.llmModel,
      };
      break;

    case 'text':
      // Replace variables in text
      let text = node.data?.text || '';
      inputs.forEach((input, index) => {
        // Simple variable replacement
        text = text.replace(/\{\{\s*input\s*\}\}/g, input.value || '');
      });
      output = { value: text };
      break;

    case 'filter':
      const filterValue = node.data?.filterValue || '';
      const filterType = node.data?.filterType || 'Contains';
      const inputValue = inputs?.[0]?.value || '';

      let passed = false;
      switch (filterType) {
        case 'Contains':
          passed = String(inputValue).includes(filterValue);
          break;
        case 'Equals':
          passed = String(inputValue) === filterValue;
          break;
        case 'Greater Than':
          passed = Number(inputValue) > Number(filterValue);
          break;
        case 'Less Than':
          passed = Number(inputValue) < Number(filterValue);
          break;
        default:
          passed = true;
      }

      output = {
        value: passed ? inputValue : null,
        passed,
        filter: filterType,
      };
      break;

    case 'transform':
      const transformType = node.data?.transformType || 'Uppercase';
      const transformInput = inputs?.[0]?.value || '';

      let transformed;
      switch (transformType) {
        case 'Uppercase':
          transformed = String(transformInput).toUpperCase();
          break;
        case 'Lowercase':
          transformed = String(transformInput).toLowerCase();
          break;
        case 'Capitalize':
          transformed = String(transformInput).charAt(0).toUpperCase() + String(transformInput).slice(1);
          break;
        case 'Trim':
          transformed = String(transformInput).trim();
          break;
        case 'Reverse':
          transformed = String(transformInput).split('').reverse().join('');
          break;
        default:
          transformed = transformInput;
      }

      output = { value: transformed, transform: transformType };
      break;

    case 'api':
      output = {
        value: `[API Response from ${node.data?.apiUrl || 'http://api.example.com'}]`,
        method: node.data?.apiMethod || 'GET',
        status: 200,
      };
      break;

    case 'database':
      output = {
        value: `[Database ${node.data?.operation || 'SELECT'} on ${node.data?.table || 'table'}]`,
        operation: node.data?.operation,
        table: node.data?.table,
        rows: 10,
      };
      break;

    case 'conditional':
      const condition = node.data?.condition || 'Contains';
      const conditionValue = node.data?.value || '';
      const condInput = inputs?.[0]?.value || '';

      let conditionMet = false;
      switch (condition) {
        case 'Contains':
          conditionMet = String(condInput).includes(conditionValue);
          break;
        case 'Equals':
          conditionMet = String(condInput) === conditionValue;
          break;
        default:
          conditionMet = false;
      }

      output = {
        value: condInput,
        conditionMet,
        trueOutput: conditionMet ? condInput : null,
        falseOutput: !conditionMet ? condInput : null,
      };
      break;

    case 'output':
      output = {
        value: inputs?.[0]?.value || '',
        name: node.data?.outputName || 'output',
        type: node.data?.outputType || 'Text',
      };
      break;

    default:
      output = { value: inputs?.[0]?.value || '' };
  }

  onProgress?.({
    nodeId: node.id,
    status: 'completed',
    message: `Completed ${node.type} node`,
    output,
  });

  return output;
};

/**
 * Execute entire pipeline
 */
export const executePipeline = async (nodes, edges, onProgress, onComplete) => {
  try {
    onProgress?.({
      status: 'starting',
      message: 'Initializing pipeline execution...',
    });

    // Get execution order
    const executionOrder = topologicalSort(nodes, edges);

    // Store outputs for each node
    const nodeOutputs = {};

    // Execute nodes in order
    for (const nodeId of executionOrder) {
      const node = nodes.find(n => n.id === nodeId);
      if (!node) continue;

      // Get inputs for this node
      const incomingEdges = edges.filter(e => e.target === nodeId);
      const inputs = incomingEdges.map(edge => nodeOutputs[edge.source]).filter(Boolean);

      // Execute node
      const output = await executeNode(node, inputs, onProgress);
      nodeOutputs[nodeId] = output;
    }

    // Get final outputs (from output nodes)
    const outputNodes = nodes.filter(n => n.type === 'output');
    const finalOutputs = outputNodes.map(node => ({
      name: node.data?.outputName || node.id,
      ...nodeOutputs[node.id],
    }));

    onComplete?.({
      success: true,
      outputs: finalOutputs,
      nodeOutputs,
      message: 'Pipeline executed successfully',
    });

    return {
      success: true,
      outputs: finalOutputs,
      nodeOutputs,
    };
  } catch (error) {
    onProgress?.({
      status: 'error',
      message: error.message,
    });

    onComplete?.({
      success: false,
      error: error.message,
    });

    return {
      success: false,
      error: error.message,
    };
  }
};

/**
 * Validate pipeline before execution
 */
export const validatePipeline = (nodes, edges) => {
  const errors = [];

  // Check for input nodes
  const inputNodes = nodes.filter(n => n.type === 'input');
  if (inputNodes.length === 0) {
    errors.push('Pipeline must have at least one Input node');
  }

  // Check for output nodes
  const outputNodes = nodes.filter(n => n.type === 'output');
  if (outputNodes.length === 0) {
    errors.push('Pipeline must have at least one Output node');
  }

  // Check for disconnected nodes
  const connectedNodeIds = new Set();
  edges.forEach(edge => {
    connectedNodeIds.add(edge.source);
    connectedNodeIds.add(edge.target);
  });

  const disconnectedNodes = nodes.filter(n => !connectedNodeIds.has(n.id));
  if (disconnectedNodes.length > 0) {
    errors.push(`${disconnectedNodes.length} node(s) are not connected`);
  }

  // Check for cycles
  try {
    topologicalSort(nodes, edges);
  } catch (error) {
    errors.push('Pipeline contains cycles');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};
