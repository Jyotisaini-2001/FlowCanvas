// llmNode.js

import { Position } from 'reactflow';
import { createNode } from './BaseNode';

export const LLMNode = createNode({
  title: 'LLM',
  content: <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.9)' }}>This is a LLM.</span>,
  fields: [],
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
