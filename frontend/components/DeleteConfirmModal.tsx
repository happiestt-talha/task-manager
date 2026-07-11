import React from 'react';

export interface DeleteConfirmModalProps {
  isOpen: boolean;
  taskTitle?: string;
  onConfirm?: () => Promise<void>;
  onCancel?: () => void;
}

export function DeleteConfirmModal({
  isOpen,
  taskTitle = "this task",
  onConfirm,
  onCancel,
}: DeleteConfirmModalProps) {
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  // Reset state when modal opens/closes
  React.useEffect(() => {
    if (isOpen) {
      setError(null);
      setIsDeleting(false);
    }
  }, [isOpen]);

  const handleConfirm = async () => {
    if (!onConfirm) return;
    setError(null);
    setIsDeleting(true);
    try {
      await onConfirm();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to delete task.");
    } finally {
      setIsDeleting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: '24px',
      }}
    >
      {/* Modal Container */}
      <div
        aria-labelledby="modal-title"
        aria-modal="true"
        role="dialog"
        style={{
          backgroundColor: '#ffffff',
          width: '100%',
          maxWidth: '448px',
          borderRadius: '12px',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
          border: '1px solid #c8c5cb',
          overflow: 'hidden',
        }}
      >
        {/* Modal Content */}
        <div style={{ padding: '32px', textAlign: 'center' }}>
          <div
            style={{
              margin: '0 auto',
              width: '64px',
              height: '64px',
              backgroundColor: 'rgba(186,26,26,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '9999px',
              marginBottom: '24px',
            }}
          >
            <span className="material-symbols-outlined" style={{ color: '#ba1a1a', fontSize: '32px' }}>
              delete_forever
            </span>
          </div>

          {error && (
            <div style={{
              backgroundColor: 'rgba(186,26,26,0.1)',
              color: '#ba1a1a',
              padding: '8px 12px',
              borderRadius: '8px',
              fontSize: '14px',
              marginBottom: '16px',
              textAlign: 'left',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>error</span>
              <span>{error}</span>
            </div>
          )}

          <h2
            id="modal-title"
            style={{
              fontSize: '24px',
              lineHeight: '32px',
              fontWeight: 700,
              color: '#1a1c1c',
              marginBottom: '8px',
            }}
          >
            Delete Task?
          </h2>
          <p style={{ fontSize: '14px', lineHeight: '20px', color: '#ba1a1a', fontWeight: 500, marginBottom: '24px' }}>
            This action cannot be undone.
          </p>
          <p style={{ fontSize: '14px', lineHeight: '20px', color: '#47464b', marginBottom: '24px', padding: '0 16px' }}>
            All associated data and progress tracking for{' '}
            <span style={{ fontWeight: 700, color: '#1a1c1c' }}>"{taskTitle}"</span>{' '}
            will be permanently removed from our servers.
          </p>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '24px' }}>
            <button
              type="button"
              style={{
                flex: 1,
                padding: '12px 24px',
                border: '1px solid #c8c5cb',
                borderRadius: '8px',
                backgroundColor: 'transparent',
                color: '#1a1c1c',
                fontWeight: 600,
                fontSize: '12px',
                cursor: 'pointer',
              }}
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              type="button"
              style={{
                flex: 1,
                padding: '12px 24px',
                border: 'none',
                borderRadius: '8px',
                backgroundColor: '#ba1a1a',
                color: '#ffffff',
                fontWeight: 600,
                fontSize: '12px',
                cursor: isDeleting ? 'not-allowed' : 'pointer',
                opacity: isDeleting ? 0.5 : 1,
                boxShadow: '0 1px 3px 0 rgba(0,0,0,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
              disabled={isDeleting}
              onClick={handleConfirm}
            >
              {isDeleting && <span className="material-symbols-outlined" style={{ fontSize: '16px', animation: 'spin 1s linear infinite' }}>sync</span>}
              {isDeleting ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
