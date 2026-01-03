// textNode.js
// Enhanced with dynamic sizing and variable handles

import { useState, useEffect, useRef } from 'react';
import { Handle, Position } from 'reactflow';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const textareaRef = useRef(null);

  // Extract variables from text (e.g., {{ variableName }})
  useEffect(() => {
    // Match patterns like {{ variableName }}
    const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
    const matches = [...currText.matchAll(regex)];
    const foundVariables = matches.map(match => match[1]);

    // Remove duplicates
    const uniqueVariables = [...new Set(foundVariables)];
    setVariables(uniqueVariables);
  }, [currText]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [currText]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  // Calculate dynamic dimensions based on content
  const minWidth = 200;
  const minHeight = 100;
  const textLength = currText.length;
  const dynamicWidth = Math.max(minWidth, Math.min(400, minWidth + textLength * 0.5));
  const dynamicHeight = Math.max(minHeight, Math.min(300, minHeight + Math.floor(textLength / 30) * 10));

  return (
    <div style={{
      width: dynamicWidth,
      minHeight: dynamicHeight,
      border: 'none',
      padding: '12px',
      borderRadius: '8px',
      background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      color: '#2d3748',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      fontSize: '13px',
    }}>
      {/* Variable input handles */}
      {variables.map((variable, index) => (
        <div key={`var-container-${variable}`}>
          <Handle
            type="target"
            position={Position.Left}
            id={`${variable}`}
            style={{
              top: `${((index + 1) * 100) / (variables.length + 1)}%`,
              background: '#667eea',
              width: '12px',
              height: '12px',
              border: '2px solid white',
            }}
          />
          <div style={{
            position: 'absolute',
            left: '20px',
            top: `${((index + 1) * 100) / (variables.length + 1)}%`,
            transform: 'translateY(-50%)',
            fontSize: '10px',
            color: '#4a5568',
            whiteSpace: 'nowrap',
            fontWeight: '500',
            background: 'rgba(255, 255, 255, 0.9)',
            padding: '2px 6px',
            borderRadius: '3px',
            border: '1px solid #e2e8f0',
            pointerEvents: 'none',
          }}>
            {variable}
          </div>
        </div>
      ))}

      {/* Output handle */}
      <Handle
        type="source"
        position={Position.Right}
        id={`output`}
      />

      {/* Title */}
      <div style={{
        fontWeight: '600',
        marginBottom: '8px',
        fontSize: '14px',
        color: '#1a202c',
      }}>
        <span>Text</span>
      </div>

      {/* Text input */}
      <label style={{ display: 'block', marginBottom: '6px' }}>
        <span style={{
          fontSize: '11px',
          color: '#718096',
          marginBottom: '2px',
          display: 'block',
        }}>
          Text
        </span>
        <textarea
          ref={textareaRef}
          value={currText}
          onChange={handleTextChange}
          style={{
            width: '100%',
            padding: '8px',
            border: '1px solid #e2e8f0',
            borderRadius: '4px',
            fontSize: '12px',
            boxSizing: 'border-box',
            fontFamily: 'inherit',
            resize: 'none',
            overflow: 'hidden',
            minHeight: '40px',
          }}
        />
      </label>

      {/* Display detected variables */}
      {variables.length > 0 && (
        <div style={{
          marginTop: '8px',
          fontSize: '11px',
          color: '#718096',
        }}>
          Variables: {variables.join(', ')}
        </div>
      )}
    </div>
  );
};
