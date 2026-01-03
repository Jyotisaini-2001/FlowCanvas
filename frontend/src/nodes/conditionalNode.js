// conditionalNode.js
// Conditional node - routes data based on conditions

import { Position } from 'reactflow';
import { createNode } from './BaseNode';

export const ConditionalNode = createNode({
  title: 'Conditional',
  fields: [
    {
      name: 'condition',
      label: 'Condition',
      type: 'text',
      placeholder: 'e.g., value > 10',
    },
    {
      name: 'logicType',
      label: 'Logic',
      type: 'select',
      defaultValue: 'if-else',
      options: [
        { value: 'if-else', label: 'If/Else' },
        { value: 'switch', label: 'Switch' },
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
      id: 'true',
      style: { top: '35%' },
    },
    {
      type: 'source',
      position: Position.Right,
      id: 'false',
      style: { top: '65%' },
    },
  ],
  style: {
    width: 220,
    height: 120,
    background: 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)',
    color: '#2d3748',
  },
});
