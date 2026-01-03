# FlowForge

**A modern visual pipeline builder with dynamic variable detection and DAG validation**

Build complex data processing workflows using an intuitive drag-and-drop interface. Features dynamic variable handles, node abstraction system, and real-time pipeline validation.

## Features

- **9+ Node Types** - Input, Output, LLM, Text, Filter, Transform, API, Database, Conditional
- **Dynamic Variables** - Automatic handle creation with `{{ variable }}` syntax
- **DAG Validation** - Real-time directed acyclic graph checking using Kahn's algorithm
- **Node Abstraction** - Flexible BaseNode system for easy extensibility
- **Modern UI** - Clean, gradient-based design with smooth interactions
- **FastAPI Backend** - Python-powered pipeline analysis and validation

## Demo

### Dynamic Variable Detection
Type `{{ name }}` or `{{ count }}` in any text field and watch handles automatically appear on the left side of the node!

### Pipeline Validation
Connect nodes together and click "Submit Pipeline" to validate your workflow and check if it forms a valid DAG.

## Tech Stack

### Frontend
- **React** - UI framework
- **ReactFlow** - Node-based graph editor
- **Zustand** - State management
- **JavaScript/JSX** - Primary language

### Backend
- **Python** - Backend language
- **FastAPI** - Modern API framework
- **Pydantic** - Data validation
- **Uvicorn** - ASGI server

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- Python (v3.8 or higher)
- npm or yarn

### Installation

#### 1. Clone the repository
```bash
git clone https://github.com/yourusername/flowforge.git
cd flowforge
```

#### 2. Setup Frontend
```bash
cd frontend
npm install
npm start
```
The frontend will run on [http://localhost:3000](http://localhost:3000)

#### 3. Setup Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```
The backend will run on [http://localhost:8000](http://localhost:8000)

## Usage

### Creating a Pipeline

1. **Add Nodes**: Click on node buttons in the toolbar (Input, LLM, Output, Text, etc.)
2. **Configure Nodes**:
   - Enter text in input fields
   - Use `{{ variableName }}` syntax to create dynamic variable handles
   - Select options from dropdowns
3. **Connect Nodes**: Drag from output handles (right side) to input handles (left side)
4. **Submit Pipeline**: Click "Submit Pipeline" to validate your workflow

### Example: Dynamic Variables

In an Input node, type:
```
Hello {{ name }}, you have {{ count }} messages
```

This will automatically create two handles on the left side:
- `name` handle
- `count` handle

You can then connect other nodes to these handles to provide values for these variables.

### Example: Building a Text Processing Pipeline

```
[Input Node]
  Text: "Process {{ input }}"
    ↓
[LLM Node]
  Model: GPT-3.5
    ↓
[Text Node]
  Text: "Result: {{ input }}"
    ↓
[Output Node]
  Name: final_output
```

## Architecture

### Node Abstraction System

FlowForge uses a powerful `BaseNode` abstraction that allows you to create new nodes with minimal code:

```javascript
import { createNode } from './BaseNode';
import { Position } from 'reactflow';

export const CustomNode = createNode({
  title: 'Custom',
  fields: [
    {
      name: 'inputText',
      label: 'Input',
      type: 'text',
      defaultValue: '',
    }
  ],
  handles: [
    {
      type: 'source',
      position: Position.Right,
      id: 'output',
    }
  ],
  style: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
  },
});
```

### Available Node Types

| Node Type | Description | Use Case |
|-----------|-------------|----------|
| **Input** | Entry point for data | User input, data sources |
| **Output** | Exit point for results | Final output, data destination |
| **LLM** | Large Language Model processing | AI text generation, analysis |
| **Text** | Text transformation | Template processing, formatting |
| **Filter** | Data filtering | Conditional data filtering |
| **Transform** | Data transformation | Format conversion, mapping |
| **API** | API integration | External API calls |
| **Database** | Database operations | CRUD operations |
| **Conditional** | Conditional logic | If/else branching |

### Field Types

The BaseNode abstraction supports multiple field types:

- `text` - Single-line text input
- `textarea` - Multi-line text input
- `select` - Dropdown selection
- `number` - Numeric input
- `checkbox` - Boolean toggle

## API Reference

### Backend Endpoints

#### `GET /`
Health check endpoint
- **Response**: `{ "Ping": "Pong" }`

#### `POST /pipelines/parse`
Analyze and validate a pipeline
- **Request Body**:
  ```json
  {
    "nodes": [
      { "id": "1", "type": "input", "data": {...} }
    ],
    "edges": [
      { "source": "1", "target": "2" }
    ]
  }
  ```
- **Response**:
  ```json
  {
    "num_nodes": 3,
    "num_edges": 2,
    "is_dag": true
  }
  ```

## Project Structure

```
flowforge/
├── frontend/
│   ├── src/
│   │   ├── nodes/
│   │   │   ├── BaseNode.js          # Node abstraction
│   │   │   ├── inputNode.js         # Input node
│   │   │   ├── outputNode.js        # Output node
│   │   │   ├── llmNode.js          # LLM node
│   │   │   ├── textNode.js         # Text node
│   │   │   ├── filterNode.js       # Filter node
│   │   │   ├── transformNode.js    # Transform node
│   │   │   ├── apiNode.js          # API node
│   │   │   ├── databaseNode.js     # Database node
│   │   │   └── conditionalNode.js  # Conditional node
│   │   ├── App.js                  # Main app component
│   │   ├── ui.js                   # Canvas UI
│   │   ├── toolbar.js              # Node toolbar
│   │   ├── submit.js               # Submit button
│   │   ├── store.js                # Zustand state
│   │   └── index.js                # Entry point
│   └── package.json
├── backend/
│   ├── main.py                     # FastAPI app
│   └── requirements.txt
└── README.md
```

## Development

### Adding a New Node

1. Create a new file in `/frontend/src/nodes/`
2. Use the `createNode` helper:

```javascript
import { createNode } from './BaseNode';
import { Position } from 'reactflow';

export const MyNode = createNode({
  title: 'My Custom Node',
  fields: [
    {
      name: 'myField',
      label: 'My Field',
      type: 'text',
      defaultValue: 'default value',
    }
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
    }
  ],
  style: {
    background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)',
    color: 'white',
  },
});
```

3. Register it in your node types configuration

### Running Tests

```bash
# Frontend tests
cd frontend
npm test

# Backend tests
cd backend
pytest
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Roadmap

- [ ] Export/Import pipeline JSON
- [ ] Pipeline execution engine
- [ ] Node library marketplace
- [ ] Collaborative editing
- [ ] Pipeline templates
- [ ] Real-time variable preview
- [ ] Undo/Redo functionality
- [ ] Node grouping/subflows
- [ ] Custom node styling
- [ ] Pipeline versioning

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built as part of the VectorShift Frontend Technical Assessment
- Powered by [ReactFlow](https://reactflow.dev/)
- Inspired by visual programming tools like n8n, Node-RED, and Zapier

## Contact

For questions or feedback, please open an issue on GitHub.

---

Made with by [Your Name]
