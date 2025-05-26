'use client';

import { ReactNode, useEffect } from 'react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  isLoading = false
}: ConfirmationModalProps) {
  if (!isOpen) return null;
  
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 50
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '0.5rem',
        width: '100%',
        maxWidth: '28rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        padding: '1.5rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '1rem' }}>
          <div style={{ 
            backgroundColor: '#FEE2E2', 
            borderRadius: '50%', 
            padding: '0.625rem',
            marginRight: '0.75rem'
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
                stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              {title}
            </h3>
            <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>
              {message}
            </p>
          </div>
        </div>
        
        <div style={{ 
          display: 'flex', 
          justifyContent: 'flex-end', 
          gap: '0.75rem', 
          marginTop: '1.5rem',
          backgroundColor: '#F9FAFB',
          padding: '0.75rem',
          borderRadius: '0.375rem'
        }}>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            style={{ 
              padding: '0.5rem 1rem', 
              backgroundColor: '#DC2626',
              color: 'white',
              border: 'none',
              borderRadius: '0.375rem',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              opacity: isLoading ? 0.5 : 1,
              display: 'flex',
              alignItems: 'center'
            }}
          >
            {isLoading && (
              <svg style={{ marginRight: '0.5rem', animation: 'spin 1s linear infinite' }} width="16" height="16" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" opacity="0.25" />
                <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            )}
            {isLoading ? 'Processing...' : confirmText}
          </button>
          <button
            onClick={onClose}
            disabled={isLoading}
            style={{ 
              padding: '0.5rem 1rem', 
              backgroundColor: 'white',
              color: '#374151',
              border: '1px solid #D1D5DB',
              borderRadius: '0.375rem',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              opacity: isLoading ? 0.5 : 1
            }}
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
} 