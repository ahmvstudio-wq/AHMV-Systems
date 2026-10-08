import React from 'react';

export default function StatusBadge({ status, customLabel, variant }) {
  const normalized = (status || '').toLowerCase().replace(/[\s-]/g, '_');

  let badgeVariant = variant || 'neutral';
  let label = customLabel || status;

  if (!variant) {
    if (['won', 'deal_won', 'paid', 'active', 'converted', 'completed', 'optimized', 'success'].includes(normalized)) {
      badgeVariant = 'success';
    } else if (['proposal', 'pending', 'in_review', 'diagnosing', 'in_deployment', 'warning'].includes(normalized)) {
      badgeVariant = 'warning';
    } else if (['lost', 'overdue', 'cancelled', 'failed', 'danger', 'high_urgency'].includes(normalized)) {
      badgeVariant = 'danger';
    } else if (['lead_catch', 'architecture', 'new', 'draft', 'info'].includes(normalized)) {
      badgeVariant = 'info';
    } else if (['retainer', 'enterprise', 'custom', 'vip'].includes(normalized)) {
      badgeVariant = 'purple';
    }
  }

  return (
    <span className={`whop-badge whop-badge-${badgeVariant}`}>
      <span className="whop-badge-dot" />
      <span>{label || status}</span>
    </span>
  );
}
