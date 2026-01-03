// outputNode.js

import { Position } from 'reactflow';
import { createNode } from './BaseNode';

export const OutputNode = createNode({
  title: 'Output',
  fields: [
    {
      name: 'outputName',
      label: 'Name',
      type: 'text',
      defaultValue: 'output_',
    },
    {
      name: 'outputType',
      label: 'Type',
      type: 'select',
      defaultValue: 'Text',
      options: [
        { value: 'Text', label: 'Text' },
        { value: 'Image', label: 'Image' },
      ],
    },
  ],
  handles: [
    {
      type: 'target',
      position: Position.Left,
      id: 'value',
    },
  ],
  style: {
    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    color: 'white',
  },
});
