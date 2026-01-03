// apiNode.js
// API node - makes HTTP requests

import { Position } from 'reactflow';
import { createNode } from './BaseNode';

export const APINode = createNode({
  title: 'API Call',
  fields: [
    {
      name: 'method',
      label: 'Method',
      type: 'select',
      defaultValue: 'GET',
      options: [
        { value: 'GET', label: 'GET' },
        { value: 'POST', label: 'POST' },
        { value: 'PUT', label: 'PUT' },
        { value: 'DELETE', label: 'DELETE' },
      ],
    },
    {
      name: 'url',
      label: 'URL',
      type: 'text',
      placeholder: 'https://api.example.com',
    },
    {
      name: 'headers',
      label: 'Headers',
      type: 'textarea',
      placeholder: 'JSON headers',
      rows: 2,
    },
  ],
  handles: [
    {
      type: 'target',
      position: Position.Left,
      id: 'body',
      style: { top: '30%' },
    },
    {
      type: 'source',
      position: Position.Right,
      id: 'response',
      style: { top: '40%' },
    },
    {
      type: 'source',
      position: Position.Right,
      id: 'error',
      style: { top: '60%' },
    },
  ],
  style: {
    width: 240,
    height: 160,
    background: 'linear-gradient(135deg, #a8ff78 0%, #78ffd6 100%)',
    color: '#2d3748',
  },
});
