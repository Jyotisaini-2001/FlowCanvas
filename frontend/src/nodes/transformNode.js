// transformNode.js
// Transform node - transforms text data

import { Position } from 'reactflow';
import { createNode } from './BaseNode';

export const TransformNode = createNode({
  title: 'Transform',
  fields: [
    {
      name: 'transformType',
      label: 'Transform',
      type: 'select',
      defaultValue: 'uppercase',
      options: [
        { value: 'uppercase', label: 'UPPERCASE' },
        { value: 'lowercase', label: 'lowercase' },
        { value: 'capitalize', label: 'Capitalize' },
        { value: 'trim', label: 'Trim Whitespace' },
        { value: 'reverse', label: 'Reverse' },
      ],
    },
  ],
  handles: [
    {
      type: 'target',
      position: Position.Left,
      id: 'input',
    },
    {
      type: 'source',
      position: Position.Right,
      id: 'output',
    },
  ],
  style: {
    background: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
    color: 'white',
  },
});
