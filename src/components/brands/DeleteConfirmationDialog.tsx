'use client';

interface DeleteConfirmationDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmButtonText: string;
  cancelButtonText: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteConfirmationDialog({
  isOpen,
  title,
  message,
  confirmButtonText,
  cancelButtonText,
  onConfirm,
  onCancel
}: DeleteConfirmationDialogProps) {
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
        <div style={{ marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#EF4444' }}>{title}</h3>
        </div>
        
        <div style={{ marginBottom: '1.5rem' }}>
          <p style={{ color: '#4B5563' }}>{message}</p>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
          <button
            onClick={onCancel}
            style={{ 
              padding: '0.5rem 1rem', 
              backgroundColor: 'white',
              border: '1px solid #D1D5DB',
              borderRadius: '0.375rem',
              cursor: 'pointer'
            }}
          >
            {cancelButtonText}
          </button>
          <button
            onClick={onConfirm}
            style={{ 
              padding: '0.5rem 1rem', 
              backgroundColor: '#EF4444',
              color: 'white',
              border: 'none',
              borderRadius: '0.375rem',
              cursor: 'pointer'
            }}
          >
            {confirmButtonText}
          </button>
        </div>
      </div>
    </div>
  );
} 