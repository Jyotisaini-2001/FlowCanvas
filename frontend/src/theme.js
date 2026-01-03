// theme.js - Flat, modern color scheme for FlowForge

export const theme = {
  // Primary Colors (Flat, no gradients)
  primary: {
    main: '#6366F1',      // Indigo
    light: '#818CF8',
    dark: '#4F46E5',
    bg: '#EEF2FF',
  },

  // Secondary Colors
  secondary: {
    main: '#8B5CF6',      // Violet
    light: '#A78BFA',
    dark: '#7C3AED',
  },

  // Neutral Colors
  neutral: {
    white: '#FFFFFF',
    gray50: '#F9FAFB',
    gray100: '#F3F4F6',
    gray200: '#E5E7EB',
    gray300: '#D1D5DB',
    gray400: '#9CA3AF',
    gray500: '#6B7280',
    gray600: '#4B5563',
    gray700: '#374151',
    gray800: '#1F2937',
    gray900: '#111827',
    black: '#000000',
  },

  // Canvas
  canvas: {
    background: '#0F172A',    // Dark slate
    grid: '#1E293B',
    dots: '#334155',
  },

  // Node Type Colors (Flat)
  nodes: {
    input: {
      bg: '#6366F1',
      text: '#FFFFFF',
      border: '#4F46E5',
      icon: '📥',
    },
    output: {
      bg: '#EC4899',
      text: '#FFFFFF',
      border: '#DB2777',
      icon: '📤',
    },
    llm: {
      bg: '#8B5CF6',
      text: '#FFFFFF',
      border: '#7C3AED',
      icon: '🤖',
    },
    text: {
      bg: '#06B6D4',
      text: '#FFFFFF',
      border: '#0891B2',
      icon: '📝',
    },
    filter: {
      bg: '#F59E0B',
      text: '#FFFFFF',
      border: '#D97706',
      icon: '🔍',
    },
    transform: {
      bg: '#10B981',
      text: '#FFFFFF',
      border: '#059669',
      icon: '🔄',
    },
    api: {
      bg: '#14B8A6',
      text: '#FFFFFF',
      border: '#0D9488',
      icon: '🌐',
    },
    database: {
      bg: '#F43F5E',
      text: '#FFFFFF',
      border: '#E11D48',
      icon: '🗄️',
    },
    conditional: {
      bg: '#A855F7',
      text: '#FFFFFF',
      border: '#9333EA',
      icon: '🔀',
    },
  },

  // Status Colors
  status: {
    success: '#10B981',
    error: '#EF4444',
    warning: '#F59E0B',
    info: '#3B82F6',
  },

  // Shadows
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
  },

  // Border Radius
  radius: {
    sm: '4px',
    base: '8px',
    md: '12px',
    lg: '16px',
    full: '9999px',
  },

  // Spacing
  spacing: {
    xs: '4px',
    sm: '8px',
    base: '12px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },

  // Typography
  fonts: {
    sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    mono: '"SF Mono", "Monaco", "Inconsolata", "Fira Code", "Droid Sans Mono", "Source Code Pro", monospace',
  },

  fontSize: {
    xs: '11px',
    sm: '12px',
    base: '14px',
    md: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
  },
};

// Helper function to get node theme
export const getNodeTheme = (nodeType) => {
  return theme.nodes[nodeType] || theme.nodes.input;
};
