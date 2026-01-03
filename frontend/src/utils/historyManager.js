// historyManager.js - Undo/Redo functionality

class HistoryManager {
  constructor(maxHistory = 50) {
    this.history = [];
    this.currentIndex = -1;
    this.maxHistory = maxHistory;
  }

  /**
   * Add a new state to history
   */
  push(state) {
    // Remove any states after current index (when user made changes after undo)
    this.history = this.history.slice(0, this.currentIndex + 1);

    // Add new state
    this.history.push({
      nodes: JSON.parse(JSON.stringify(state.nodes)),
      edges: JSON.parse(JSON.stringify(state.edges)),
      timestamp: Date.now(),
    });

    // Limit history size
    if (this.history.length > this.maxHistory) {
      this.history.shift();
    } else {
      this.currentIndex++;
    }
  }

  /**
   * Undo - go back one step
   */
  undo() {
    if (!this.canUndo()) {
      return null;
    }

    this.currentIndex--;
    return this.history[this.currentIndex];
  }

  /**
   * Redo - go forward one step
   */
  redo() {
    if (!this.canRedo()) {
      return null;
    }

    this.currentIndex++;
    return this.history[this.currentIndex];
  }

  /**
   * Check if can undo
   */
  canUndo() {
    return this.currentIndex > 0;
  }

  /**
   * Check if can redo
   */
  canRedo() {
    return this.currentIndex < this.history.length - 1;
  }

  /**
   * Get current state
   */
  getCurrentState() {
    if (this.currentIndex >= 0 && this.currentIndex < this.history.length) {
      return this.history[this.currentIndex];
    }
    return null;
  }

  /**
   * Clear history
   */
  clear() {
    this.history = [];
    this.currentIndex = -1;
  }

  /**
   * Get history stats
   */
  getStats() {
    return {
      total: this.history.length,
      current: this.currentIndex,
      canUndo: this.canUndo(),
      canRedo: this.canRedo(),
    };
  }
}

// Export singleton instance
export const historyManager = new HistoryManager();

/**
 * Setup keyboard shortcuts for undo/redo
 */
export const setupKeyboardShortcuts = (undoCallback, redoCallback) => {
  const handleKeyDown = (event) => {
    // Check for Ctrl+Z (Undo)
    if ((event.ctrlKey || event.metaKey) && event.key === 'z' && !event.shiftKey) {
      event.preventDefault();
      undoCallback();
    }

    // Check for Ctrl+Shift+Z or Ctrl+Y (Redo)
    if (
      ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'z') ||
      ((event.ctrlKey || event.metaKey) && event.key === 'y')
    ) {
      event.preventDefault();
      redoCallback();
    }

    // Ctrl+S for Save
    if ((event.ctrlKey || event.metaKey) && event.key === 's') {
      event.preventDefault();
      // Will be handled by the component
      window.dispatchEvent(new CustomEvent('flowforge-save'));
    }

    // Ctrl+O for Open
    if ((event.ctrlKey || event.metaKey) && event.key === 'o') {
      event.preventDefault();
      window.dispatchEvent(new CustomEvent('flowforge-open'));
    }

    // Ctrl+E for Export
    if ((event.ctrlKey || event.metaKey) && event.key === 'e') {
      event.preventDefault();
      window.dispatchEvent(new CustomEvent('flowforge-export'));
    }
  };

  window.addEventListener('keydown', handleKeyDown);

  // Return cleanup function
  return () => {
    window.removeEventListener('keydown', handleKeyDown);
  };
};
