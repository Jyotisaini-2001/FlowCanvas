// llmNode.js

import { Position } from 'reactflow';
import { createNode } from './BaseNode';

export const LLMNode = createNode({
  title: 'LLM',
  fields: [
    {
      name: 'llmModel',
      label: 'Model',
      type: 'select',
      defaultValue: 'GPT-3.5',
      options: [
        { value: 'GPT-3.5', label: 'GPT-3.5' },
        { value: 'GPT-4', label: 'GPT-4' },
        { value: 'Claude', label: 'Claude' },
        { value: 'Llama', label: 'Llama' },
      ],
    },
  ],
  handles: [
    {
      type: 'target',
      position: Position.Left,
      id: 'system',
      style: { top: `${100 / 3}%` },
    },
    {
      type: 'target',
      position: Position.Left,
      id: 'prompt',
      style: { top: `${200 / 3}%` },
    },
    {
      type: 'source',
      position: Position.Right,
      id: 'response',
    },
  ],
  style: {
    background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    color: 'white',
  },
});
