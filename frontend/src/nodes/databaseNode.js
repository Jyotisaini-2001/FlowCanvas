// databaseNode.js
// Database node - performs database operations

import { Position } from 'reactflow';
import { createNode } from './BaseNode';

export const DatabaseNode = createNode({
  title: 'Database',
  fields: [
    {
      name: 'operation',
      label: 'Operation',
      type: 'select',
      defaultValue: 'SELECT',
      options: [
        { value: 'SELECT', label: 'SELECT' },
        { value: 'INSERT', label: 'INSERT' },
        { value: 'UPDATE', label: 'UPDATE' },
        { value: 'DELETE', label: 'DELETE' },
      ],
    },
    {
      name: 'table',
      label: 'Table',
      type: 'text',
      placeholder: 'table_name',
    },
    {
      name: 'query',
      label: 'Query',
      type: 'textarea',
      placeholder: 'SQL query or conditions',
      rows: 3,
    },
  ],
  handles: [
    {
      type: 'target',
      position: Position.Left,
      id: 'data',
    },
    {
      type: 'source',
      position: Position.Right,
      id: 'result',
    },
  ],
  style: {
    width: 240,
    height: 160,
    background: 'linear-gradient(135deg, #ff9a56 0%, #ff6a88 100%)',
    color: 'white',
  },
});
