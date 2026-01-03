// filterNode.js
// Filter node - filters data based on conditions

import { Position } from 'reactflow';
import { createNode } from './BaseNode';

export const FilterNode = createNode({
  title: 'Filter',
  fields: [
    {
      name: 'filterField',
      label: 'Field',
      type: 'text',
      placeholder: 'e.g., age, name',
    },
    {
      name: 'filterOperator',
      label: 'Operator',
      type: 'select',
      defaultValue: 'equals',
      options: [
        { value: 'equals', label: 'Equals' },
        { value: 'contains', label: 'Contains' },
        { value: 'greater', label: 'Greater Than' },
        { value: 'less', label: 'Less Than' },
      ],
    },
    {
      name: 'filterValue',
      label: 'Value',
      type: 'text',
      placeholder: 'Filter value',
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
      id: 'passed',
      style: { top: '40%' },
    },
    {
      type: 'source',
      position: Position.Right,
      id: 'filtered',
      style: { top: '60%' },
    },
  ],
  style: {
    width: 220,
    height: 140,
    background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    color: 'white',
  },
});
