// Simple toast implementation to replace sonner
const toast = {
  success: (message) => {
    if (typeof window !== 'undefined') {
      console.log('SUCCESS:', message);
      alert(`Success: ${message}`);
    }
  },
  error: (message) => {
    if (typeof window !== 'undefined') {
      console.error('ERROR:', message);
      alert(`Error: ${message}`);
    }
  },
  warning: (message) => {
    if (typeof window !== 'undefined') {
      console.warn('WARNING:', message);
      alert(`Warning: ${message}`);
    }
  },
  info: (message) => {
    if (typeof window !== 'undefined') {
      console.info('INFO:', message);
      alert(`Info: ${message}`);
    }
  }
};

export { toast }; 