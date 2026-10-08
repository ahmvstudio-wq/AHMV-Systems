import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export default function Drawer({ isOpen, onClose, title, subtitle, children, footer, width = '600px' }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="whop-overlay" onClick={onClose}>
      <div
        className="whop-drawer"
        style={{ width }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="whop-drawer-header">
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--whop-text-primary)', margin: 0 }}>
              {title}
            </h3>
            {subtitle && (
              <p style={{ fontSize: '12px', color: 'var(--whop-text-muted)', margin: '4px 0 0', fontFamily: 'var(--font-mono)' }}>
                {subtitle}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'var(--whop-surface-subtle)',
              border: '1px solid var(--whop-border)',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--whop-text-secondary)',
            }}
          >
            <X size={16} />
          </button>
        </div>

        <div className="whop-drawer-body">
          {children}
        </div>

        {footer && (
          <div className="whop-drawer-footer">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
