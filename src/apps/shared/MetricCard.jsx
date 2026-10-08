import React from 'react';

export default function MetricCard({ title, value, subtext, trend, trendValue, icon: Icon, badgeText }) {
  return (
    <div className="whop-metric-card">
      <div className="whop-metric-title">
        <span>{title}</span>
        {Icon && <Icon size={16} color="var(--whop-text-dim)" />}
        {badgeText && (
          <span style={{ fontSize: '10px', background: 'var(--whop-surface-subtle)', padding: '2px 6px', borderRadius: '4px', color: 'var(--whop-text-secondary)' }}>
            {badgeText}
          </span>
        )}
      </div>

      <div className="whop-metric-value">{value}</div>

      <div className="whop-metric-sub">
        {trend && (
          <span className={trend === 'up' ? 'whop-trend-up' : 'whop-trend-down'}>
            {trend === 'up' ? '↗ ' : '↘ '}
            {trendValue}
          </span>
        )}
        <span>{subtext}</span>
      </div>
    </div>
  );
}
