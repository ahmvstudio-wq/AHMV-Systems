import React from 'react';
import DataTable from '../../shared/DataTable';
import StatusBadge from '../../shared/StatusBadge';
import { CRM_STAGES } from '../data/crmData';

export default function LeadTableView({ deals = [], onSelectDeal, onMoveStage }) {
  const columns = [
    {
      key: 'company_name',
      label: 'Company / Client',
      render: (val, row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '6px',
              background: 'var(--whop-accent)',
              color: 'var(--whop-accent-text)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
            }}
          >
            {val.slice(0, 1)}
          </div>
          <div>
            <div style={{ fontWeight: 700, color: 'var(--whop-text-primary)' }}>{val}</div>
            <div style={{ fontSize: '11px', color: 'var(--whop-text-muted)', fontFamily: 'var(--font-mono)' }}>
              {row.contact_name} · {row.contact_email}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: 'stage',
      label: 'Pipeline Stage',
      render: (val, row) => (
        <select
          value={val}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => onMoveStage(row.id, e.target.value)}
          style={{
            padding: '6px 10px',
            fontSize: '11px',
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
            borderRadius: '6px',
            border: '1px solid var(--whop-border)',
            background: '#FFFFFF',
            color: 'var(--whop-text-primary)',
            cursor: 'pointer',
          }}
        >
          {CRM_STAGES.map((s) => (
            <option key={s.id} value={s.id}>
              {s.icon} {s.label}
            </option>
          ))}
        </select>
      ),
    },
    {
      key: 'deal_value',
      label: 'Contract Value',
      render: (val, row) => (
        <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--whop-text-primary)', fontSize: '13px' }}>
          {row.currency} {Number(val).toLocaleString()}
        </span>
      ),
    },
    {
      key: 'probability',
      label: 'Win Prob.',
      render: (val) => (
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
            color: val >= 70 ? 'var(--whop-success)' : val >= 40 ? 'var(--whop-warning)' : 'var(--whop-text-muted)',
          }}
        >
          {val}%
        </span>
      ),
    },
    {
      key: 'system_interested',
      label: 'Architecture Scope',
      render: (val) => (
        <span style={{ fontSize: '12px', color: 'var(--whop-text-secondary)', fontWeight: 500 }}>
          {val || 'General Ops'}
        </span>
      ),
    },
    {
      key: 'lead_source',
      label: 'Origin Source',
      render: (val) => (
        <span
          style={{
            fontSize: '11px',
            fontFamily: 'var(--font-mono)',
            background: 'var(--whop-surface-subtle)',
            padding: '4px 10px',
            borderRadius: '6px',
            color: 'var(--whop-text-primary)',
            border: '1px solid var(--whop-border)',
          }}
        >
          {val || 'Audit'}
        </span>
      ),
    },
    {
      key: 'created_at',
      label: 'Ingested',
      render: (val) => (
        <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--whop-text-muted)' }}>
          {new Date(val).toLocaleDateString()}
        </span>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={deals}
      onRowClick={(row) => onSelectDeal(row)}
      searchPlaceholder="Search leads by company, contact name, email or architecture..."
      initialSortKey="deal_value"
    />
  );
}
