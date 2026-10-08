import React, { useState } from 'react';
import Drawer from '../../shared/Drawer';
import StatusBadge from '../../shared/StatusBadge';
import { CRM_STAGES } from '../data/crmData';
import {
  Building2,
  Mail,
  Phone,
  Calendar,
  DollarSign,
  Tag,
  Clock,
  Sparkles,
  Send,
  FileText,
  CheckCircle,
  ExternalLink,
  Plus,
  Trash2,
  Zap,
  Layers,
  ArrowRight,
} from 'lucide-react';

export default function DealDrawer({
  isOpen,
  onClose,
  deal,
  onUpdateDeal,
  onDeleteDeal,
  onGenerateInvoice,
}) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'activity' | 'notes'
  const [newNote, setNewNote] = useState('');
  const [newActivityText, setNewActivityText] = useState('');
  const [newActivityType, setNewActivityType] = useState('call');
  const [whopCopied, setWhopCopied] = useState(false);

  if (!deal) return null;

  const currentStageIndex = CRM_STAGES.findIndex((s) => s.id === deal.stage);

  const handleStageClick = (stageId) => {
    const updated = {
      ...deal,
      stage: stageId,
      probability: stageId === 'deal_won' || stageId === 'retainer' ? 100 : deal.probability,
      activities: [
        {
          type: 'stage_change',
          title: `Moved to ${CRM_STAGES.find((s) => s.id === stageId)?.label}`,
          date: new Date().toISOString(),
          text: `Pipeline stage updated by Operations Executive.`,
        },
        ...(deal.activities || []),
      ],
    };
    onUpdateDeal(updated);
  };

  const handleAddNote = () => {
    if (!newNote.trim()) return;
    const updatedNotes = deal.notes ? `${deal.notes}\n\n[${new Date().toLocaleDateString()}] ${newNote}` : newNote;
    const updated = {
      ...deal,
      notes: updatedNotes,
      activities: [
        {
          type: 'note',
          title: 'Note Added',
          date: new Date().toISOString(),
          text: newNote,
        },
        ...(deal.activities || []),
      ],
    };
    onUpdateDeal(updated);
    setNewNote('');
  };

  const handleAddActivity = () => {
    if (!newActivityText.trim()) return;
    const newAct = {
      type: newActivityType,
      title: `${newActivityType.toUpperCase()} Logged`,
      date: new Date().toISOString(),
      text: newActivityText,
    };
    const updated = {
      ...deal,
      activities: [newAct, ...(deal.activities || [])],
    };
    onUpdateDeal(updated);
    setNewActivityText('');
  };

  const handleCopyWhopLink = () => {
    const url = deal.whop_plan_id
      ? `https://whop.com/checkout/${deal.whop_plan_id}`
      : 'https://whop.com/checkout/plan_ffu8TjQcsIDKf';
    navigator.clipboard.writeText(url);
    setWhopCopied(true);
    setTimeout(() => setWhopCopied(false), 2000);
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={deal.company_name}
      subtitle={`DEAL ID: ${deal.id} · Created ${new Date(deal.created_at || Date.now()).toLocaleDateString()}`}
      width="640px"
      footer={
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
          <button
            onClick={() => {
              if (window.confirm('Delete this deal permanently?')) {
                onDeleteDeal(deal.id);
                onClose();
              }
            }}
            className="whop-btn whop-btn-danger whop-btn-sm"
          >
            <Trash2 size={13} />
            <span>Delete Deal</span>
          </button>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => {
                if (onGenerateInvoice) onGenerateInvoice(deal);
                onClose();
              }}
              className="whop-btn whop-btn-secondary whop-btn-sm"
            >
              <FileText size={13} />
              <span>Generate ERP Invoice</span>
            </button>

            <button
              onClick={handleCopyWhopLink}
              className="whop-btn whop-btn-primary whop-btn-sm"
            >
              <ExternalLink size={13} />
              <span>{whopCopied ? 'Whop Link Copied!' : 'Copy Whop Link'}</span>
            </button>
          </div>
        </div>
      }
    >
      {/* ── Visual Stage Progress Stepper ── */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--whop-text-muted)', textTransform: 'uppercase', marginBottom: '10px' }}>
          LIFECYCLE STAGE PROGRESSION
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '4px' }}>
          {CRM_STAGES.map((s, idx) => {
            const isCompleted = idx <= currentStageIndex;
            const isCurrent = s.id === deal.stage;
            return (
              <button
                key={s.id}
                onClick={() => handleStageClick(s.id)}
                style={{
                  background: isCurrent ? 'var(--whop-accent)' : isCompleted ? 'var(--whop-surface-muted)' : 'var(--whop-surface-subtle)',
                  color: isCurrent ? 'var(--whop-accent-text)' : 'var(--whop-text-primary)',
                  border: isCurrent ? '1px solid var(--whop-accent)' : '1px solid var(--whop-border)',
                  borderRadius: '6px',
                  padding: '8px 4px',
                  cursor: 'pointer',
                  textAlign: 'center',
                  fontSize: '10px',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: isCurrent ? 700 : 500,
                  transition: 'all 0.15s ease',
                }}
              >
                <div style={{ fontSize: '12px', marginBottom: '2px' }}>{s.icon}</div>
                <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {s.label}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Key Deal Figures ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '24px' }}>
        <div style={{ background: 'var(--whop-surface-subtle)', border: '1px solid var(--whop-border)', borderRadius: '10px', padding: '14px' }}>
          <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--whop-text-muted)', marginBottom: '4px' }}>
            DEAL VALUE
          </div>
          <div style={{ fontSize: '18px', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--whop-text-primary)' }}>
            {deal.currency} {Number(deal.deal_value).toLocaleString()}
          </div>
        </div>

        <div style={{ background: 'var(--whop-surface-subtle)', border: '1px solid var(--whop-border)', borderRadius: '10px', padding: '14px' }}>
          <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--whop-text-muted)', marginBottom: '4px' }}>
            WIN PROBABILITY
          </div>
          <div style={{ fontSize: '18px', fontWeight: 800, fontFamily: 'var(--font-mono)', color: deal.probability >= 70 ? 'var(--whop-success)' : 'var(--whop-warning)' }}>
            {deal.probability}%
          </div>
        </div>

        <div style={{ background: 'var(--whop-surface-subtle)', border: '1px solid var(--whop-border)', borderRadius: '10px', padding: '14px' }}>
          <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--whop-text-muted)', marginBottom: '4px' }}>
            SOURCE
          </div>
          <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--whop-text-primary)', marginTop: '4px' }}>
            {deal.lead_source || 'Inbound'}
          </div>
        </div>
      </div>

      {/* ── Target Architecture Blueprint Card ── */}
      <div style={{ background: 'var(--whop-surface-subtle)', border: '1px solid var(--whop-border)', borderRadius: '12px', padding: '18px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <Zap size={16} color="var(--whop-warning)" />
          <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--whop-text-muted)', textTransform: 'uppercase' }}>
            RECOMMENDED AHMV ARCHITECTURE BLUEPRINT
          </span>
        </div>
        <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--whop-text-primary)', marginBottom: '4px' }}>
          {deal.system_interested}
        </div>
        <div style={{ fontSize: '12px', color: 'var(--whop-text-secondary)' }}>
          Operational Debt Target: <strong style={{ color: 'var(--whop-text-primary)' }}>{deal.bottleneck}</strong>
        </div>
      </div>

      {/* ── Navigation Tabs ── */}
      <div className="whop-pill-tabs" style={{ marginBottom: '20px' }}>
        <button className={`whop-pill-tab ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>
          Client Overview
        </button>
        <button className={`whop-pill-tab ${activeTab === 'activity' ? 'active' : ''}`} onClick={() => setActiveTab('activity')}>
          Activity Stream ({deal.activities?.length || 0})
        </button>
        <button className={`whop-pill-tab ${activeTab === 'notes' ? 'active' : ''}`} onClick={() => setActiveTab('notes')}>
          Executive Notes
        </button>
      </div>

      {/* ── Tab: Overview ── */}
      {activeTab === 'overview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="whop-form-group">
              <label className="whop-form-label">Contact Person</label>
              <input
                type="text"
                className="whop-form-input"
                value={deal.contact_name}
                onChange={(e) => onUpdateDeal({ ...deal, contact_name: e.target.value })}
              />
            </div>

            <div className="whop-form-group">
              <label className="whop-form-label">Email Address</label>
              <input
                type="email"
                className="whop-form-input"
                value={deal.contact_email}
                onChange={(e) => onUpdateDeal({ ...deal, contact_email: e.target.value })}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="whop-form-group">
              <label className="whop-form-label">Deal Value ({deal.currency})</label>
              <input
                type="number"
                className="whop-form-input"
                value={deal.deal_value}
                onChange={(e) => onUpdateDeal({ ...deal, deal_value: Number(e.target.value) })}
              />
            </div>

            <div className="whop-form-group">
              <label className="whop-form-label">Win Probability (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                className="whop-form-input"
                value={deal.probability}
                onChange={(e) => onUpdateDeal({ ...deal, probability: Number(e.target.value) })}
              />
            </div>
          </div>

          <div className="whop-form-group">
            <label className="whop-form-label">Tags (comma separated)</label>
            <input
              type="text"
              className="whop-form-input"
              value={(deal.tags || []).join(', ')}
              onChange={(e) => onUpdateDeal({ ...deal, tags: e.target.value.split(',').map((t) => t.trim()) })}
            />
          </div>
        </div>
      )}

      {/* ── Tab: Activity ── */}
      {activeTab === 'activity' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Add Activity Bar */}
          <div style={{ display: 'flex', gap: '8px', background: 'var(--whop-surface-subtle)', padding: '12px', borderRadius: '10px', border: '1px solid var(--whop-border)' }}>
            <select
              value={newActivityType}
              onChange={(e) => setNewActivityType(e.target.value)}
              style={{ background: '#FFFFFF', border: '1px solid var(--whop-border)', borderRadius: '6px', padding: '6px 8px', fontSize: '12px', color: 'var(--whop-text-primary)' }}
            >
              <option value="call">Call</option>
              <option value="email">Email</option>
              <option value="meeting">Meeting</option>
              <option value="audit">Audit</option>
            </select>
            <input
              type="text"
              className="whop-form-input"
              placeholder="Log an interaction or milestone..."
              value={newActivityText}
              onChange={(e) => setNewActivityText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddActivity()}
            />
            <button onClick={handleAddActivity} className="whop-btn whop-btn-primary whop-btn-sm">
              Log
            </button>
          </div>

          {/* Activity Timeline */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {(deal.activities || []).map((act, i) => (
              <div
                key={i}
                style={{
                  background: 'var(--whop-surface-subtle)',
                  border: '1px solid var(--whop-border)',
                  borderRadius: '8px',
                  padding: '12px 16px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--whop-text-primary)' }}>
                    {act.title}
                  </span>
                  <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--whop-text-dim)' }}>
                    {new Date(act.date).toLocaleString()}
                  </span>
                </div>
                <div style={{ fontSize: '13px', color: 'var(--whop-text-secondary)', lineHeight: 1.4 }}>
                  {act.text}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Tab: Notes ── */}
      {activeTab === 'notes' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="whop-form-group">
            <label className="whop-form-label">Add Note</label>
            <textarea
              className="whop-form-textarea"
              rows={3}
              placeholder="Record strategic insights, pricing agreements, or client constraints..."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
            />
            <button onClick={handleAddNote} className="whop-btn whop-btn-primary whop-btn-sm" style={{ alignSelf: 'flex-end', marginTop: '6px' }}>
              Add Note
            </button>
          </div>

          <div style={{ background: 'var(--whop-surface-subtle)', border: '1px solid var(--whop-border)', borderRadius: '10px', padding: '16px', whiteSpace: 'pre-wrap', fontSize: '13px', color: 'var(--whop-text-secondary)', lineHeight: 1.6 }}>
            {deal.notes || 'No notes added yet.'}
          </div>
        </div>
      )}
    </Drawer>
  );
}
