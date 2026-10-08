import React, { useState } from 'react';
import Modal from '../../shared/Modal';
import { CRM_STAGES } from '../data/crmData';
import { products } from '../../../data/productsData';

export default function NewDealModal({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    company_name: '',
    contact_name: '',
    contact_email: '',
    contact_phone: '',
    stage: 'lead_catch',
    deal_value: 45000,
    currency: 'AED',
    probability: 30,
    bottleneck: '',
    system_interested: products[0]?.title || 'Executive Operations Command Center',
    tags: 'Enterprise, Inbound',
    notes: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const deal = {
      ...formData,
      id: `deal-${Date.now().toString().slice(-4)}`,
      deal_value: Number(formData.deal_value) || 0,
      tags: formData.tags.split(',').map((t) => t.trim()).filter(Boolean),
      created_at: new Date().toISOString(),
      activities: [
        {
          type: 'created',
          title: 'Lead Ingested into CRM',
          date: new Date().toISOString(),
          text: `Created by Operations Executive. Target architecture: ${formData.system_interested}`,
        },
      ],
    };
    onSave(deal);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New CRM Opportunity"
      subtitle="Ingest a new company, project scope, and system architecture"
      footer={
        <>
          <button onClick={onClose} className="whop-btn whop-btn-secondary">
            Cancel
          </button>
          <button onClick={handleSubmit} className="whop-btn whop-btn-primary">
            Create Opportunity
          </button>
        </>
      }
    >
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
          <div className="whop-form-group">
            <label className="whop-form-label">COMPANY / ENTITY NAME *</label>
            <input
              type="text"
              required
              className="whop-form-input"
              placeholder="e.g. Apex Holdings LLC"
              value={formData.company_name}
              onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
            />
          </div>

          <div className="whop-form-group">
            <label className="whop-form-label">PRIMARY STAKEHOLDER NAME *</label>
            <input
              type="text"
              required
              className="whop-form-input"
              placeholder="Full name"
              value={formData.contact_name}
              onChange={(e) => setFormData({ ...formData, contact_name: e.target.value })}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
          <div className="whop-form-group">
            <label className="whop-form-label">CONTACT EMAIL *</label>
            <input
              type="email"
              required
              className="whop-form-input"
              placeholder="name@company.com"
              value={formData.contact_email}
              onChange={(e) => setFormData({ ...formData, contact_email: e.target.value })}
            />
          </div>

          <div className="whop-form-group">
            <label className="whop-form-label">PHONE / WHATSAPP NUMBER</label>
            <input
              type="text"
              className="whop-form-input"
              placeholder="+971 50 123 4567"
              value={formData.contact_phone}
              onChange={(e) => setFormData({ ...formData, contact_phone: e.target.value })}
            />
          </div>
        </div>

        <div className="whop-form-group">
          <label className="whop-form-label">TARGET SYSTEM ARCHITECTURE MODULE</label>
          <select
            className="whop-form-select"
            value={formData.system_interested}
            onChange={(e) => setFormData({ ...formData, system_interested: e.target.value })}
          >
            {products.map((p) => (
              <option key={p.id} value={p.title}>
                {p.title} ({p.category})
              </option>
            ))}
          </select>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr 1fr', gap: '12px' }}>
          <div className="whop-form-group">
            <label className="whop-form-label">CONTRACT VALUE</label>
            <input
              type="number"
              className="whop-form-input"
              value={formData.deal_value}
              onChange={(e) => setFormData({ ...formData, deal_value: e.target.value })}
            />
          </div>

          <div className="whop-form-group">
            <label className="whop-form-label">CURRENCY</label>
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

          <div className="whop-form-group">
            <label className="whop-form-label">PROBABILITY (%)</label>
            <input
              type="number"
              min="0"
              max="100"
              className="whop-form-input"
              value={formData.probability}
              onChange={(e) => setFormData({ ...formData, probability: Number(e.target.value) })}
            />
          </div>
        </div>

        <div className="whop-form-group">
          <label className="whop-form-label">INITIAL PIPELINE STAGE</label>
          <select
            className="whop-form-select"
            value={formData.stage}
            onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
          >
            {CRM_STAGES.map((s) => (
              <option key={s.id} value={s.id}>
                {s.icon} {s.label}
              </option>
            ))}
          </select>
        </div>

        <div className="whop-form-group">
          <label className="whop-form-label">IDENTIFIED OPERATIONAL BOTTLENECK</label>
          <input
            type="text"
            className="whop-form-input"
            placeholder="e.g. Manual invoice generation, double entry, lead leakage"
            value={formData.bottleneck}
            onChange={(e) => setFormData({ ...formData, bottleneck: e.target.value })}
          />
        </div>

        <div className="whop-form-group">
          <label className="whop-form-label">EXECUTIVE NOTES & SCOPING DETAILS</label>
          <textarea
            rows={3}
            className="whop-form-textarea"
            placeholder="Context from intro conversation, company size, timeline..."
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          />
        </div>
      </form>
    </Modal>
  );
}
