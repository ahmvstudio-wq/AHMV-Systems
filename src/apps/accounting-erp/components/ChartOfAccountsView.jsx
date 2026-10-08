import React, { useState } from 'react';
import DataTable from '../../shared/DataTable';
import StatusBadge from '../../shared/StatusBadge';

export default function ChartOfAccountsView({ accounts = [] }) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredAccounts = accounts.filter(
    (a) => selectedCategory === 'all' || a.category === selectedCategory
  );

  const columns = [
    {
      key: 'account_code',
      label: 'Account Code',
      width: '130px',
      render: (val) => (
        <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '12px', color: 'var(--whop-text-primary)' }}>
          {val}
        </span>
      ),
    },
    {
      key: 'name',
      label: 'Account Name & Scope',
      render: (val, row) => (
        <div>
          <div style={{ fontWeight: 700, color: 'var(--whop-text-primary)' }}>{val}</div>
          <div style={{ fontSize: '11px', color: 'var(--whop-text-muted)', fontFamily: 'var(--font-mono)' }}>
            {row.sub_category}
          </div>
        </div>
      ),
    },
    {
      key: 'category',
      label: 'Category',
      render: (val) => {
        let badgeVariant = 'neutral';
        if (val === 'revenue') badgeVariant = 'success';
        if (val === 'asset') badgeVariant = 'info';
        if (val === 'expense') badgeVariant = 'warning';
        if (val === 'liability') badgeVariant = 'danger';
        return <StatusBadge status={val.toUpperCase()} variant={badgeVariant} />;
      },
    },
    {
      key: 'balance',
      label: 'Current Balance',
      render: (val, row) => (
        <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '13px', color: 'var(--whop-text-primary)' }}>
          {row.currency} {Number(val).toLocaleString()}
        </span>
      ),
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Category Tabs */}
      <div className="whop-pill-tabs">
        {['all', 'asset', 'liability', 'equity', 'revenue', 'expense'].map((cat) => (
          <button
            key={cat}
            className={`whop-pill-tab ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat === 'all' ? 'All Accounts' : cat.toUpperCase()}
          </button>
        ))}
      </div>

      <DataTable
        columns={columns}
        data={filteredAccounts}
        searchPlaceholder="Search accounts by name or code..."
        initialSortKey="account_code"
      />
    </div>
  );
}
