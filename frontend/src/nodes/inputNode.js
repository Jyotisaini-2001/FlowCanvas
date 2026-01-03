// inputNode.js

import { Position } from 'reactflow';
import { createNode } from './BaseNode';

export const InputNode = createNode({
  title: 'Input',
  fields: [
    {
      name: 'inputName',
      label: 'Name',
      type: 'text',
      defaultValue: 'input_',
    },
    {
      name: 'inputType',
      label: 'Type',
      type: 'select',
      defaultValue: 'Text',
      options: [
        { value: 'Text', label: 'Text' },
        { value: 'File', label: 'File' },
      ],
    },
  ],
  handles: [
    {
      type: 'source',
      position: Position.Right,
      id: 'value',
    },
  ],
  style: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
  },
});
