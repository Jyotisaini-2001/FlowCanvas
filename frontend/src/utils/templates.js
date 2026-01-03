// templates.js - Pre-built pipeline templates

export const pipelineTemplates = [
  {
    id: 'simple-llm',
    name: 'Simple LLM Chat',
    description: 'Basic LLM chat pipeline with input and output',
    category: 'AI/LLM',
    nodes: [
      {
        id: 'input-1',
        type: 'customInput',
        position: { x: 100, y: 100 },
        data: { inputName: 'user_message', inputType: 'Text' },
      },
      {
        id: 'llm-1',
        type: 'llm',
        position: { x: 350, y: 100 },
        data: { llmModel: 'GPT-3.5' },
      },
      {
        id: 'output-1',
        type: 'customOutput',
        position: { x: 600, y: 100 },
        data: { outputName: 'response', outputType: 'Text' },
      },
    ],
    edges: [
      { id: 'e1-2', source: 'input-1', target: 'llm-1', sourceHandle: 'value', targetHandle: 'llm-1-target-0' },
      { id: 'e2-3', source: 'llm-1', target: 'output-1', sourceHandle: 'llm-1-source-0', targetHandle: 'output-1-target-0' },
    ],
  },
  {
    id: 'data-processing',
    name: 'Data Processing Pipeline',
    description: 'Filter, transform, and output data',
    category: 'Data',
    nodes: [
      {
        id: 'input-1',
        type: 'customInput',
        position: { x: 100, y: 150 },
        data: { inputName: 'raw_data', inputType: 'Text' },
      },
      {
        id: 'filter-1',
        type: 'filter',
        position: { x: 350, y: 150 },
        data: { filterType: 'Contains', filterValue: 'important' },
      },
      {
        id: 'transform-1',
        type: 'transform',
        position: { x: 600, y: 150 },
        data: { transformType: 'Uppercase' },
      },
      {
        id: 'output-1',
        type: 'customOutput',
        position: { x: 850, y: 150 },
        data: { outputName: 'processed_data', outputType: 'Text' },
      },
    ],
    edges: [
      { id: 'e1-2', source: 'input-1', target: 'filter-1' },
      { id: 'e2-3', source: 'filter-1', target: 'transform-1' },
      { id: 'e3-4', source: 'transform-1', target: 'output-1' },
    ],
  },
  {
    id: 'api-integration',
    name: 'API Integration Flow',
    description: 'Fetch data from API and process it',
    category: 'API',
    nodes: [
      {
        id: 'input-1',
        type: 'customInput',
        position: { x: 100, y: 100 },
        data: { inputName: 'api_url', inputType: 'Text' },
      },
      {
        id: 'api-1',
        type: 'api',
        position: { x: 350, y: 100 },
        data: { apiMethod: 'GET' },
      },
      {
        id: 'text-1',
        type: 'text',
        position: { x: 600, y: 100 },
        data: { text: 'Response: {{ input }}' },
      },
      {
        id: 'output-1',
        type: 'customOutput',
        position: { x: 850, y: 100 },
        data: { outputName: 'api_response', outputType: 'Text' },
      },
    ],
    edges: [
      { id: 'e1-2', source: 'input-1', target: 'api-1' },
      { id: 'e2-3', source: 'api-1', target: 'text-1' },
      { id: 'e3-4', source: 'text-1', target: 'output-1' },
    ],
  },
  {
    id: 'conditional-routing',
    name: 'Conditional Routing',
    description: 'Route data based on conditions',
    category: 'Logic',
    nodes: [
      {
        id: 'input-1',
        type: 'customInput',
        position: { x: 100, y: 200 },
        data: { inputName: 'data', inputType: 'Text' },
      },
      {
        id: 'conditional-1',
        type: 'conditional',
        position: { x: 350, y: 200 },
        data: { condition: 'Contains', value: 'urgent' },
      },
      {
        id: 'output-1',
        type: 'customOutput',
        position: { x: 600, y: 100 },
        data: { outputName: 'urgent_output', outputType: 'Text' },
      },
      {
        id: 'output-2',
        type: 'customOutput',
        position: { x: 600, y: 300 },
        data: { outputName: 'normal_output', outputType: 'Text' },
      },
    ],
    edges: [
      { id: 'e1-2', source: 'input-1', target: 'conditional-1' },
      { id: 'e2-3', source: 'conditional-1', target: 'output-1', sourceHandle: 'true' },
      { id: 'e2-4', source: 'conditional-1', target: 'output-2', sourceHandle: 'false' },
    ],
  },
  {
    id: 'database-query',
    name: 'Database Query Pipeline',
    description: 'Query database and format results',
    category: 'Database',
    nodes: [
      {
        id: 'input-1',
        type: 'customInput',
        position: { x: 100, y: 150 },
        data: { inputName: 'query_param', inputType: 'Text' },
      },
      {
        id: 'database-1',
        type: 'database',
        position: { x: 350, y: 150 },
        data: { operation: 'SELECT', table: 'users' },
      },
      {
        id: 'text-1',
        type: 'text',
        position: { x: 600, y: 150 },
        data: { text: 'Found {{ count }} results' },
      },
      {
        id: 'output-1',
        type: 'customOutput',
        position: { x: 850, y: 150 },
        data: { outputName: 'query_results', outputType: 'Text' },
      },
    ],
    edges: [
      { id: 'e1-2', source: 'input-1', target: 'database-1' },
      { id: 'e2-3', source: 'database-1', target: 'text-1' },
      { id: 'e3-4', source: 'text-1', target: 'output-1' },
    ],
  },
  {
    id: 'text-processing',
    name: 'Text Processing Chain',
    description: 'Multi-step text transformation',
    category: 'Transform',
    nodes: [
      {
        id: 'input-1',
        type: 'customInput',
        position: { x: 100, y: 200 },
        data: { inputName: 'raw_text', inputType: 'Text' },
      },
      {
        id: 'text-1',
        type: 'text',
        position: { x: 300, y: 200 },
        data: { text: 'Processing: {{ input }}' },
      },
      {
        id: 'llm-1',
        type: 'llm',
        position: { x: 500, y: 200 },
        data: { llmModel: 'GPT-4' },
      },
      {
        id: 'transform-1',
        type: 'transform',
        position: { x: 700, y: 200 },
        data: { transformType: 'Trim' },
      },
      {
        id: 'output-1',
        type: 'customOutput',
        position: { x: 900, y: 200 },
        data: { outputName: 'final_text', outputType: 'Text' },
      },
    ],
    edges: [
      { id: 'e1-2', source: 'input-1', target: 'text-1' },
      { id: 'e2-3', source: 'text-1', target: 'llm-1' },
      { id: 'e3-4', source: 'llm-1', target: 'transform-1' },
      { id: 'e4-5', source: 'transform-1', target: 'output-1' },
    ],
  },
];

/**
 * Get template by ID
 */
export const getTemplate = (id) => {
  return pipelineTemplates.find(t => t.id === id);
};

/**
 * Get templates by category
 */
export const getTemplatesByCategory = (category) => {
  return pipelineTemplates.filter(t => t.category === category);
};

/**
 * Get all categories
 */
export const getCategories = () => {
  const categories = [...new Set(pipelineTemplates.map(t => t.category))];
  return categories;
};

/**
 * Load template into canvas
 */
export const loadTemplate = (templateId) => {
  const template = getTemplate(templateId);
  if (!template) {
    return { success: false, message: 'Template not found' };
  }

  return {
    success: true,
    nodes: template.nodes,
    edges: template.edges,
    name: template.name,
  };
};
