// BaseNode.js
// Base abstraction for creating nodes with configurable handles and fields

import { useState, useMemo } from 'react';
import { Handle, Position } from 'reactflow';

/**
 * Extract variable names from text containing {{ variable }} patterns
 * @param {string} text - The text to parse
 * @returns {Array<string>} - Array of unique variable names
 */
const extractVariables = (text) => {
  if (!text || typeof text !== 'string') return [];

  const regex = /\{\{\s*([^}]+)\s*\}\}/g;
  const variables = [];
  let match;

  while ((match = regex.exec(text)) !== null) {
    const varName = match[1].trim();
    if (varName && !variables.includes(varName)) {
      variables.push(varName);
    }
  }

  return variables;
};

/**
 * BaseNode - A flexible abstraction for creating React Flow nodes
 *
 * @param {Object} config - Node configuration
 * @param {string} config.title - Node title/label
 * @param {Array} config.fields - Array of field configurations
 * @param {Array} config.handles - Array of handle configurations
 * @param {Object} config.style - Custom styles for the node container
 * @param {Object} config.defaultValues - Default values for fields
 */
export const BaseNode = ({ id, data, config }) => {
  const {
    title,
    fields = [],
    handles = [],
    style = {},
    defaultValues = {},
    content = null,
  } = config;

  // Initialize state for all fields
  const [fieldValues, setFieldValues] = useState(() => {
    const initialValues = {};
    fields.forEach(field => {
      initialValues[field.name] = data?.[field.name] || defaultValues[field.name] || field.defaultValue || '';
    });
    return initialValues;
  });

  // Handle field value changes
  const handleFieldChange = (fieldName, value) => {
    setFieldValues(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  // Extract variables from all text-based fields
  const detectedVariables = useMemo(() => {
    const allText = fields
      .filter(f => f.type === 'text' || f.type === 'textarea')
      .map(f => fieldValues[f.name] || '')
      .join(' ');

    return extractVariables(allText);
  }, [fieldValues, fields]);

  // Render a single field based on its type
  const renderField = (field) => {
    const { name, label, type, options, placeholder, rows } = field;
    const value = fieldValues[name];

    switch (type) {
      case 'text':
        return (
          <label key={name} style={{ display: 'block', marginBottom: '6px' }}>
            <span style={{ fontSize: '11px', color: '#718096', marginBottom: '2px', display: 'block' }}>
              {label}
            </span>
            <input
              type="text"
              value={value}
              onChange={(e) => handleFieldChange(name, e.target.value)}
              placeholder={placeholder}
              style={{
                width: '100%',
                padding: '4px 8px',
                border: '1px solid #e2e8f0',
                borderRadius: '4px',
                fontSize: '12px',
                boxSizing: 'border-box',
              }}
            />
          </label>
        );

      case 'select':
        return (
          <label key={name} style={{ display: 'block', marginBottom: '6px' }}>
            <span style={{ fontSize: '11px', color: '#718096', marginBottom: '2px', display: 'block' }}>
              {label}
            </span>
            <select
              value={value}
              onChange={(e) => handleFieldChange(name, e.target.value)}
              style={{
                width: '100%',
                padding: '4px 8px',
                border: '1px solid #e2e8f0',
                borderRadius: '4px',
                fontSize: '12px',
                boxSizing: 'border-box',
                backgroundColor: 'white',
              }}
            >
              {options.map(opt => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </label>
        );

      case 'textarea':
        return (
          <label key={name} style={{ display: 'block', marginBottom: '6px' }}>
            <span style={{ fontSize: '11px', color: '#718096', marginBottom: '2px', display: 'block' }}>
              {label}
            </span>
            <textarea
              value={value}
              onChange={(e) => handleFieldChange(name, e.target.value)}
              placeholder={placeholder}
              rows={rows || 3}
              style={{
                width: '100%',
                padding: '4px 8px',
                border: '1px solid #e2e8f0',
                borderRadius: '4px',
                fontSize: '12px',
                boxSizing: 'border-box',
                fontFamily: 'inherit',
                resize: 'vertical',
              }}
            />
          </label>
        );

      case 'number':
        return (
          <label key={name}>
            {label}:
            <input
              type="number"
              value={value}
              onChange={(e) => handleFieldChange(name, e.target.value)}
              placeholder={placeholder}
            />
          </label>
        );

      case 'checkbox':
        return (
          <label key={name}>
            <input
              type="checkbox"
              checked={value}
              onChange={(e) => handleFieldChange(name, e.target.checked)}
            />
            {label}
          </label>
        );

      default:
        return null;
    }
  };

  // Render handles
  const renderHandle = (handle, index) => {
    const {
      type,
      position,
      id: handleId,
      style: handleStyle = {},
    } = handle;

    return (
      <Handle
        key={handleId || `${type}-${index}`}
        type={type}
        position={position}
        id={handleId || `${id}-${type}-${index}`}
        style={handleStyle}
      />
    );
  };

  // Default container style with modern design
  const defaultStyle = {
    width: 200,
    height: 80,
    border: 'none',
    padding: '12px',
    borderRadius: '8px',
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '13px',
  };

  const containerStyle = { ...defaultStyle, ...style };

  return (
    <div style={containerStyle}>
      {/* Render static handles */}
      {handles.map((handle, index) => renderHandle(handle, index))}

      {/* Render dynamic variable handles on the left */}
      {detectedVariables.map((varName, index) => (
        <Handle
          key={`var-${varName}`}
          type="target"
          position={Position.Left}
          id={`${id}-var-${varName}`}
          style={{
            top: `${50 + (index * 20)}px`,
            background: '#667eea',
          }}
        >
          <div style={{
            position: 'absolute',
            right: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: '10px',
            color: '#4a5568',
            whiteSpace: 'nowrap',
            fontWeight: '500',
          }}>
            {varName}
          </div>
        </Handle>
      ))}

      {/* Title */}
      {title && (
        <div style={{
          fontWeight: '600',
          marginBottom: '8px',
          fontSize: '14px',
          color: '#1a202c',
        }}>
          <span>{title}</span>
        </div>
      )}

      {/* Custom content */}
      {content}

      {/* Fields */}
      {fields.length > 0 && (
        <div>
          {fields.map(field => renderField(field))}
        </div>
      )}

      {/* Display detected variables at the bottom */}
      {detectedVariables.length > 0 && (
        <div style={{
          marginTop: '8px',
          paddingTop: '8px',
          borderTop: '1px solid rgba(255, 255, 255, 0.2)',
          fontSize: '10px',
          color: 'rgba(255, 255, 255, 0.8)',
        }}>
          <span style={{ fontWeight: '600' }}>Variables: </span>
          <span>{detectedVariables.join(', ')}</span>
        </div>
      )}
    </div>
  );
};

/**
 * Helper function to create a node component from a configuration
 * This makes it easier to define nodes in a declarative way
 */
export const createNode = (config) => {
  return ({ id, data }) => <BaseNode id={id} data={data} config={config} />;
};
