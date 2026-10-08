import React, { useState } from 'react';
import DataTable from '../../shared/DataTable';
import Modal from '../../shared/Modal';
import { Plus, BookOpen, Scale, CheckCircle2, AlertCircle } from 'lucide-react';

export default function GeneralLedgerView({ entries = [], accounts = [], onSaveEntry }) {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [newEntry, setNewEntry] = useState({
    description: '',
    reference_id: '',
    date: new Date().toISOString().slice(0, 10),
    lines: [
      { account_code: '1010', account_name: 'Primary Operating Bank Account', debit: 50000, credit: 0 },
      { account_code: '4010', account_name: 'System Architecture & Implementation Fees', debit: 0, credit: 50000 },
    ],
  });

  const totalDebit = newEntry.lines.reduce((s, l) => s + (Number(l.debit) || 0), 0);
  const totalCredit = newEntry.lines.reduce((s, l) => s + (Number(l.credit) || 0), 0);
  const isBalanced = totalDebit === totalCredit && totalDebit > 0;

  const handleAddLine = () => {
    setNewEntry({
      ...newEntry,
      lines: [...newEntry.lines, { account_code: '5010', account_name: 'Cloud Infrastructure', debit: 0, credit: 0 }],
    });
  };

  const handleLineChange = (index, field, value) => {
    const updated = [...newEntry.lines];
    updated[index][field] = value;
    if (field === 'account_code') {
      const acc = accounts.find((a) => a.account_code === value);
      if (acc) updated[index].account_name = acc.name;
    }
    setNewEntry({ ...newEntry, lines: updated });
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!isBalanced) {
      alert('Double-entry accounting error: Total Debit must equal Total Credit.');
      return;
    }

    const entry = {
      id: `je-${Date.now().toString().slice(-4)}`,
      entry_number: `JE-2026-${(entries.length + 1).toString().padStart(3, '0')}`,
      date: newEntry.date,
      description: newEntry.description,
      reference_id: newEntry.reference_id,
      lines: newEntry.lines,
      total_debit: totalDebit,
      total_credit: totalCredit,
      created_at: new Date().toISOString(),
    };

    onSaveEntry(entry);
    setCreateModalOpen(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--whop-text-primary)', margin: 0 }}>
            Double-Entry General Journal Ledger
          </h3>
          <p style={{ fontSize: '12px', color: 'var(--whop-text-muted)', margin: '2px 0 0', fontFamily: 'var(--font-mono)' }}>
            Immutable audit record of all financial transactions
          </p>
        </div>

        <button onClick={() => setCreateModalOpen(true)} className="whop-btn whop-btn-primary whop-btn-sm">
          <Plus size={14} />
          <span>New Journal Entry</span>
        </button>
      </div>

      {/* Journal Entries List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {entries.map((entry) => (
          <div key={entry.id} className="whop-card">
            {/* Header */}
            <div style={{ padding: '14px 20px', background: 'var(--whop-surface-subtle)', borderBottom: '1px solid var(--whop-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--whop-text-primary)', marginRight: '10px' }}>
                  {entry.entry_number}
                </span>
                <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--whop-text-primary)' }}>
                  {entry.description}
                </span>
                {entry.reference_id && (
                  <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--whop-text-muted)', marginLeft: '10px' }}>
                    [Ref: {entry.reference_id}]
                  </span>
                )}
              </div>

              <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--whop-text-muted)' }}>
                {entry.date}
              </div>
            </div>

            {/* Lines Table */}
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--whop-border-light)', background: '#FAFAFA' }}>
                  <th style={{ padding: '8px 20px', textAlign: 'left', fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--whop-text-muted)' }}>ACCOUNT CODE & NAME</th>
                  <th style={{ padding: '8px 20px', textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--whop-text-muted)', width: '140px' }}>DEBIT (AED)</th>
                  <th style={{ padding: '8px 20px', textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--whop-text-muted)', width: '140px' }}>CREDIT (AED)</th>
                </tr>
              </thead>
              <tbody>
                {entry.lines.map((line, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid var(--whop-border-light)' }}>
                    <td style={{ padding: '10px 20px' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--whop-text-muted)', marginRight: '8px' }}>
                        {line.account_code}
                      </span>
                      <span style={{ fontWeight: 600 }}>{line.account_name}</span>
                    </td>
                    <td style={{ padding: '10px 20px', textAlign: 'right', fontFamily: 'var(--font-mono)', fontWeight: line.debit > 0 ? 700 : 400 }}>
                      {line.debit > 0 ? Number(line.debit).toLocaleString() : '—'}
                    </td>
                    <td style={{ padding: '10px 20px', textAlign: 'right', fontFamily: 'var(--font-mono)', fontWeight: line.credit > 0 ? 700 : 400 }}>
                      {line.credit > 0 ? Number(line.credit).toLocaleString() : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>

      {/* ── Create Journal Entry Modal ── */}
      <Modal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        title="Record Double-Entry Journal Transaction"
        subtitle="Debit must equal Credit in accordance with GAAP standard"
        footer={
          <>
            <button onClick={() => setCreateModalOpen(false)} className="whop-btn whop-btn-secondary">
              Cancel
            </button>
            <button onClick={handleSave} className="whop-btn whop-btn-primary" disabled={!isBalanced}>
              Post to Ledger
            </button>
          </>
        }
      >
        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '14px' }}>
            <div className="whop-form-group">
              <label className="whop-form-label">Transaction Description *</label>
              <input
                type="text"
                required
                className="whop-form-input"
                placeholder="e.g. Client retainer payment received"
                value={newEntry.description}
                onChange={(e) => setNewEntry({ ...newEntry, description: e.target.value })}
              />
            </div>

            <div className="whop-form-group">
              <label className="whop-form-label">Date</label>
              <input
                type="date"
                required
                className="whop-form-input"
                value={newEntry.date}
                onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
              />
            </div>
          </div>

          <div className="whop-form-group">
            <label className="whop-form-label">Reference ID (Optional)</label>
            <input
              type="text"
              className="whop-form-input"
              placeholder="e.g. INV-004, BANK-TXN-9841"
              value={newEntry.reference_id}
              onChange={(e) => setNewEntry({ ...newEntry, reference_id: e.target.value })}
            />
          </div>

          {/* Ledger Lines */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label className="whop-form-label" style={{ margin: 0 }}>GENERAL LEDGER DEBITS & CREDITS</label>
              <button type="button" onClick={handleAddLine} className="whop-btn whop-btn-secondary whop-btn-sm" style={{ padding: '2px 8px', fontSize: '11px' }}>
                + Add Account Line
              </button>
            </div>

            {newEntry.lines.map((line, idx) => (
              <div key={idx} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '8px', marginBottom: '8px' }}>
                <select
                  className="whop-form-select"
                  value={line.account_code}
                  onChange={(e) => handleLineChange(idx, 'account_code', e.target.value)}
                >
                  {accounts.map((a) => (
                    <option key={a.account_code} value={a.account_code}>
                      {a.account_code} — {a.name} ({a.category.toUpperCase()})
                    </option>
                  ))}
                </select>

                <input
                  type="number"
                  className="whop-form-input"
                  placeholder="Debit (AED)"
                  value={line.debit || ''}
                  onChange={(e) => handleLineChange(idx, 'debit', e.target.value)}
                />

                <input
                  type="number"
                  className="whop-form-input"
                  placeholder="Credit (AED)"
                  value={line.credit || ''}
                  onChange={(e) => handleLineChange(idx, 'credit', e.target.value)}
                />
              </div>
            ))}
          </div>

          {/* Balance Scale Meter */}
          <div
            style={{
              background: isBalanced ? 'var(--whop-success-bg)' : 'var(--whop-warning-bg)',
              border: `1px solid ${isBalanced ? 'var(--whop-success-border)' : 'var(--whop-warning-border)'}`,
              borderRadius: '8px',
              padding: '12px 16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {isBalanced ? <CheckCircle2 size={16} color="var(--whop-success)" /> : <AlertCircle size={16} color="var(--whop-warning)" />}
              <span style={{ fontSize: '12px', fontWeight: 700, color: isBalanced ? 'var(--whop-success)' : 'var(--whop-warning)' }}>
                {isBalanced ? 'Entry is Balanced' : 'Unbalanced: Debits must equal Credits'}
              </span>
            </div>

            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 700 }}>
              Debits: AED {totalDebit.toLocaleString()} | Credits: AED {totalCredit.toLocaleString()}
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}
