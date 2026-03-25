/**
 * Local shim for node-domexception.
 * Uses the native DOMException if available, otherwise provides a lightweight fallback.
 */

let DOMException;

if (typeof globalThis.DOMException !== 'undefined') {
  DOMException = globalThis.DOMException;
} else if (typeof Error !== 'undefined') {
  // Lightweight custom DOMException class as a fallback
  DOMException = class DOMException extends Error {
    constructor(message, name) {
      super(message);
      this.name = name || 'Error';
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, DOMException);
      }
    }
  };
} else {
  // Extreme fallback
  DOMException = function(message, name) {
    this.message = message;
    this.name = name || 'Error';
  };
}

module.exports = DOMException;
