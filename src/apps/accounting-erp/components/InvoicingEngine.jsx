import React, { useState } from 'react';
import DataTable from '../../shared/DataTable';
import StatusBadge from '../../shared/StatusBadge';
import Modal from '../../shared/Modal';
import { FileText, Plus, CheckCircle, Clock, DollarSign, Download, Printer, ShieldCheck, QrCode } from 'lucide-react';

export default function InvoicingEngine({ invoices = [], onSaveInvoice, prefilledDeal }) {
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [createModalOpen, setCreateModalOpen] = useState(Boolean(prefilledDeal));
  const [formData, setFormData] = useState({
    client_name: prefilledDeal?.contact_name || '',
    client_company: prefilledDeal?.company_name || '',
    client_email: prefilledDeal?.contact_email || '',
    client_address: 'Dubai, United Arab Emirates',
    currency: prefilledDeal?.currency || 'AED',
    due_days: 14,
    line_items: [
      {
        description: prefilledDeal?.system_interested
          ? `${prefilledDeal.system_interested} — Architecture & Deployment`
          : 'Business Infrastructure & Operations Engineering Implementation',
        qty: 1,
        unit_price: prefilledDeal?.deal_value || 50000,
      },
    ],
  });

  const calculateSubtotal = () => {
    return formData.line_items.reduce((sum, item) => sum + (Number(item.qty) * Number(item.unit_price) || 0), 0);
  };

  const handleAddItem = () => {
    setFormData({
      ...formData,
      line_items: [...formData.line_items, { description: 'Additional Integration & Workflow Module', qty: 1, unit_price: 15000 }],
    });
  };

  const handleRemoveItem = (index) => {
    setFormData({
      ...formData,
      line_items: formData.line_items.filter((_, i) => i !== index),
    });
  };

  const handleItemChange = (index, field, value) => {
    const updated = [...formData.line_items];
    updated[index][field] = value;
    setFormData({ ...formData, line_items: updated });
  };

  const handleCreateInvoice = (e) => {
    e.preventDefault();
    const subtotal = calculateSubtotal();
    const vat_rate = 5;
    const vat_amount = (subtotal * vat_rate) / 100;
    const total_amount = subtotal + vat_amount;

    const issueDate = new Date();
    const dueDate = new Date();
    dueDate.setDate(issueDate.getDate() + Number(formData.due_days));

    const newInvoice = {
      id: `inv-${Date.now().toString().slice(-4)}`,
      invoice_number: `AHMV-INV-${(invoices.length + 1).toString().padStart(3, '0')}`,
      client_name: formData.client_name,
      client_company: formData.client_company,
      client_email: formData.client_email,
      client_address: formData.client_address,
      issue_date: issueDate.toISOString().slice(0, 10),
      due_date: dueDate.toISOString().slice(0, 10),
      currency: formData.currency,
      line_items: formData.line_items,
      subtotal,
      vat_rate,
      vat_amount,
      total_amount,
      status: 'pending',
      created_at: new Date().toISOString(),
    };

    onSaveInvoice(newInvoice);
    setCreateModalOpen(false);
  };

  const handleTogglePaid = (inv) => {
    const nextStatus = inv.status === 'paid' ? 'pending' : 'paid';
    const updated = {
      ...inv,
      status: nextStatus,
      paid_at: nextStatus === 'paid' ? new Date().toISOString() : null,
    };
    onSaveInvoice(updated);
    if (selectedInvoice && selectedInvoice.id === inv.id) {
      setSelectedInvoice(updated);
    }
  };

  const columns = [
    {
      key: 'invoice_number',
      label: 'Invoice #',
      render: (val) => (
        <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '12px', color: 'var(--whop-text-primary)' }}>
          {val}
        </span>
      ),
    },
    {
      key: 'client_company',
      label: 'Client / Billed To',
      render: (val, row) => (
        <div>
          <div style={{ fontWeight: 700, color: 'var(--whop-text-primary)' }}>{val}</div>
          <div style={{ fontSize: '11px', color: 'var(--whop-text-muted)', fontFamily: 'var(--font-mono)' }}>
            {row.client_name} · {row.client_email}
          </div>
        </div>
      ),
    },
    {
      key: 'total_amount',
      label: 'Total (Incl. 5% VAT)',
      render: (val, row) => (
        <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '13px', color: 'var(--whop-text-primary)' }}>
          {row.currency} {Number(val).toLocaleString()}
        </span>
      ),
    },
    {
      key: 'vat_amount',
      label: '5% UAE VAT',
      render: (val, row) => (
        <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--whop-text-muted)' }}>
          {row.currency} {Number(val).toLocaleString()}
        </span>
      ),
    },
    {
      key: 'issue_date',
      label: 'Issued',
      render: (val) => (
        <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--whop-text-muted)' }}>
          {val}
        </span>
      ),
    },
    {
      key: 'due_date',
      label: 'Due Date',
      render: (val) => (
        <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--whop-text-muted)' }}>
          {val}
        </span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (val) => <StatusBadge status={val} />,
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--whop-text-primary)', margin: 0 }}>
            Enterprise Invoicing & UAE VAT Billing
          </h3>
          <p style={{ fontSize: '12px', color: 'var(--whop-text-muted)', margin: '2px 0 0', fontFamily: 'var(--font-mono)' }}>
            Federal Tax Authority (FTA) compliant 5% VAT invoices
          </p>
        </div>

        <button onClick={() => setCreateModalOpen(true)} className="whop-btn whop-btn-primary whop-btn-sm">
          <Plus size={14} />
          <span>Generate Invoice</span>
        </button>
      </div>

      <DataTable
        columns={columns}
        data={invoices}
        onRowClick={(row) => setSelectedInvoice(row)}
        searchPlaceholder="Search invoices by client, entity or invoice number..."
        initialSortKey="issue_date"
      />

      {/* ── Invoice Document Preview Modal with Official AHMV Logo ── */}
      {selectedInvoice && (
        <div className="whop-modal-overlay" onClick={() => setSelectedInvoice(null)}>
          <div
            className="whop-modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '780px', padding: '0', overflow: 'hidden' }}
          >
            {/* Top Modal Controls */}
            <div style={{ padding: '16px 24px', background: 'var(--whop-surface-subtle)', borderBottom: '1px solid var(--whop-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '14px' }}>
                  {selectedInvoice.invoice_number}
                </span>
                <StatusBadge status={selectedInvoice.status} />
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => handleTogglePaid(selectedInvoice)}
                  className={`whop-btn whop-btn-sm ${selectedInvoice.status === 'paid' ? 'whop-btn-secondary' : 'whop-btn-primary'}`}
                >
                  <CheckCircle size={13} />
                  <span>{selectedInvoice.status === 'paid' ? 'Mark as Unpaid' : 'Mark as Paid'}</span>
                </button>
                <button onClick={() => window.print()} className="whop-btn whop-btn-secondary whop-btn-sm">
                  <Printer size={13} />
                  <span>Print / PDF</span>
                </button>
                <button onClick={() => setSelectedInvoice(null)} className="whop-btn whop-btn-ghost whop-btn-sm">
                  Close
                </button>
              </div>
            </div>

            {/* Printable Invoice Sheet with Official AHMV Logo */}
            <div style={{ padding: '40px', background: '#FFFFFF', color: '#09090B' }}>
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid #09090B', paddingBottom: '24px', marginBottom: '28px' }}>
                <div>
                  <img
                    src="/logo.png.png"
                    onError={(e) => {
                      e.currentTarget.src = '/logo.png';
                    }}
                    alt="AHMV Systems"
                    style={{ height: '50px', width: 'auto', objectFit: 'contain', marginBottom: '12px' }}
                  />
                  <div style={{ fontSize: '13px', fontWeight: 800 }}>AHMV Systems FZ-LLC</div>
                  <div style={{ fontSize: '12px', color: '#71717A', lineHeight: 1.4 }}>
                    Dubai Internet City, Building 16<br />
                    Dubai, United Arab Emirates<br />
                    TRN: 100482910400003
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <h1 style={{ fontSize: '24px', fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 6px', color: '#09090B' }}>
                    TAX INVOICE
                  </h1>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 700, color: '#09090B' }}>
                    {selectedInvoice.invoice_number}
                  </div>
                  <div style={{ fontSize: '12px', color: '#71717A', marginTop: '6px' }}>
                    Issue Date: {selectedInvoice.issue_date}<br />
                    Due Date: {selectedInvoice.due_date}
                  </div>
                </div>
              </div>

              {/* Billed To */}
              <div style={{ marginBottom: '28px', background: '#F8F9FA', padding: '16px 20px', borderRadius: '8px', border: '1px solid #E4E4E7' }}>
                <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#71717A', letterSpacing: '0.04em' }}>
                  BILLED TO CLIENT ENTITY:
                </span>
                <div style={{ fontSize: '16px', fontWeight: 700, color: '#09090B', marginTop: '4px' }}>
                  {selectedInvoice.client_company}
                </div>
                <div style={{ fontSize: '13px', color: '#52525B', marginTop: '2px' }}>
                  Attn: {selectedInvoice.client_name} ({selectedInvoice.client_email})<br />
                  {selectedInvoice.client_address || 'Dubai, United Arab Emirates'}
                </div>
              </div>

              {/* Line Items Table */}
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', marginBottom: '24px' }}>
                <thead>
                  <tr style={{ background: '#F4F4F5', borderBottom: '1px solid #E4E4E7' }}>
                    <th style={{ padding: '10px 14px', textAlign: 'left', fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#71717A' }}>DESCRIPTION</th>
                    <th style={{ padding: '10px 14px', textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#71717A', width: '60px' }}>QTY</th>
                    <th style={{ padding: '10px 14px', textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#71717A', width: '130px' }}>UNIT PRICE</th>
                    <th style={{ padding: '10px 14px', textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#71717A', width: '130px' }}>AMOUNT</th>
                  </tr>
                </thead>
                <tbody>
                  {(selectedInvoice.line_items || []).map((item, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #F4F4F5' }}>
                      <td style={{ padding: '14px', fontWeight: 600 }}>{item.description}</td>
                      <td style={{ padding: '14px', textAlign: 'center', fontFamily: 'var(--font-mono)' }}>{item.qty}</td>
                      <td style={{ padding: '14px', textAlign: 'right', fontFamily: 'var(--font-mono)' }}>
                        {selectedInvoice.currency} {Number(item.unit_price).toLocaleString()}
                      </td>
                      <td style={{ padding: '14px', textAlign: 'right', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                        {selectedInvoice.currency} {(Number(item.qty) * Number(item.unit_price)).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Totals Calculation Box */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '32px' }}>
                <div style={{ width: '300px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#71717A' }}>
                    <span>Subtotal:</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                      {selectedInvoice.currency} {Number(selectedInvoice.subtotal).toLocaleString()}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#71717A' }}>
                    <span>UAE VAT (5%):</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                      {selectedInvoice.currency} {Number(selectedInvoice.vat_amount).toLocaleString()}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '2px solid #09090B', paddingTop: '10px', fontSize: '16px', fontWeight: 800 }}>
                    <span>Total Amount Due:</span>
                    <span style={{ fontFamily: 'var(--font-mono)', color: '#09090B' }}>
                      {selectedInvoice.currency} {Number(selectedInvoice.total_amount).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Wire Payment Details */}
              <div style={{ background: '#F8F9FA', border: '1px solid #E4E4E7', borderRadius: '8px', padding: '16px', fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#71717A', lineHeight: 1.5 }}>
                <div style={{ fontWeight: 700, color: '#09090B', marginBottom: '4px' }}>WIRE SETTLEMENT INSTRUCTIONS:</div>
                Bank: Emirates NBD Bank PJSC · Account Name: AHMV Systems FZ-LLC<br />
                IBAN: AE280260000123456789012 · SWIFT / BIC: EBILAEADXXX
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Create Invoice Modal ── */}
      <Modal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        title="Generate Tax Invoice"
        subtitle="FTA UAE 5% VAT compliant electronic invoice"
        footer={
          <>
            <button onClick={() => setCreateModalOpen(false)} className="whop-btn whop-btn-secondary">
              Cancel
            </button>
            <button onClick={handleCreateInvoice} className="whop-btn whop-btn-primary">
              Issue Invoice
            </button>
          </>
        }
      >
        <form onSubmit={handleCreateInvoice} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div className="whop-form-group">
              <label className="whop-form-label">Client Company / Entity *</label>
              <input
                type="text"
                required
                className="whop-form-input"
                value={formData.client_company}
                onChange={(e) => setFormData({ ...formData, client_company: e.target.value })}
              />
            </div>

            <div className="whop-form-group">
              <label className="whop-form-label">Contact Stakeholder *</label>
              <input
                type="text"
                required
                className="whop-form-input"
                value={formData.client_name}
                onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '14px' }}>
            <div className="whop-form-group">
              <label className="whop-form-label">Client Email Address *</label>
              <input
                type="email"
                required
                className="whop-form-input"
                value={formData.client_email}
                onChange={(e) => setFormData({ ...formData, client_email: e.target.value })}
              />
            </div>

            <div className="whop-form-group">
              <label className="whop-form-label">Currency</label>
              <select
                className="whop-form-select"
                value={formData.currency}
                onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
              >
                <option value="AED">AED (د.إ)</option>
                <option value="USD">USD ($)</option>
                <option value="INR">INR (₹)</option>
              </select>
            </div>
          </div>

          {/* Line Items */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label className="whop-form-label" style={{ margin: 0 }}>LINE ITEMS (SCOPE OF WORK)</label>
              <button type="button" onClick={handleAddItem} className="whop-btn whop-btn-secondary whop-btn-sm" style={{ padding: '2px 8px', fontSize: '11px' }}>
                + Add Line
              </button>
            </div>

            {formData.line_items.map((item, idx) => (
              <div key={idx} style={{ display: 'grid', gridTemplateColumns: '2fr 0.5fr 1fr 30px', gap: '8px', marginBottom: '8px', alignItems: 'center' }}>
                <input
                  type="text"
                  className="whop-form-input"
                  placeholder="Service description"
                  value={item.description}
                  onChange={(e) => handleItemChange(idx, 'description', e.target.value)}
                />
                <input
                  type="number"
                  min="1"
                  className="whop-form-input"
                  value={item.qty}
                  onChange={(e) => handleItemChange(idx, 'qty', e.target.value)}
                />
                <input
                  type="number"
                  className="whop-form-input"
                  value={item.unit_price}
                  onChange={(e) => handleItemChange(idx, 'unit_price', e.target.value)}
                />
                {formData.line_items.length > 1 && (
                  <button type="button" onClick={() => handleRemoveItem(idx)} style={{ background: 'none', border: 'none', color: 'var(--whop-danger)', cursor: 'pointer', fontWeight: 700 }}>
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>

          <div style={{ background: 'var(--whop-surface-subtle)', padding: '14px', borderRadius: '8px', border: '1px solid var(--whop-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', fontWeight: 600 }}>Total with 5% UAE VAT:</span>
            <span style={{ fontSize: '16px', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>
              {formData.currency} {(calculateSubtotal() * 1.05).toLocaleString()}
            </span>
          </div>
        </form>
      </Modal>
    </div>
  );
}
