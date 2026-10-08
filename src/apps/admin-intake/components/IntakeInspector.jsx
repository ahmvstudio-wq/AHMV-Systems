import React from 'react';
import Drawer from '../../shared/Drawer';
import StatusBadge from '../../shared/StatusBadge';
import { ArrowRight, CheckCircle2, User, Building, Mail, AlertTriangle, Sparkles, Send, Flame, Zap } from 'lucide-react';

export default function IntakeInspector({
  isOpen,
  onClose,
  intake,
  onUpdateStatus,
  onConvertToCrm,
}) {
  if (!intake) return null;

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={`Intake Submission #${intake.id}`}
      subtitle={`Source: ${intake.intake_type.replace('_', ' ').toUpperCase()} · Received ${new Date(intake.created_at).toLocaleString()}`}
      width="640px"
      footer={
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
          <select
            value={intake.status}
            onChange={(e) => onUpdateStatus(intake.id, e.target.value)}
            style={{
              padding: '8px 14px',
              borderRadius: '8px',
              border: '1px solid var(--whop-border)',
              fontSize: '12px',
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
              background: '#FFFFFF',
              color: 'var(--whop-text-primary)',
            }}
          >
            <option value="new">● Status: New Submission</option>
            <option value="in_review">● Status: In Review</option>
            <option value="converted_to_crm">● Status: Converted to CRM</option>
            <option value="archived">● Status: Archived</option>
          </select>

          {intake.status !== 'converted_to_crm' && (
            <button
              onClick={() => {
                onConvertToCrm(intake);
                onClose();
              }}
              className="whop-btn whop-btn-primary whop-btn-sm"
            >
              <Sparkles size={14} />
              <span>Convert to CRM Opportunity →</span>
            </button>
          )}
        </div>
      }
    >
      {/* ── Entity Overview Card ── */}
      <div style={{ background: 'var(--whop-surface-subtle)', border: '1px solid var(--whop-border)', borderRadius: '14px', padding: '22px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: 'var(--whop-text-primary)' }}>
              {intake.company_name || 'Direct Individual Inquiry'}
            </h3>
            <div style={{ fontSize: '13px', color: 'var(--whop-text-secondary)', marginTop: '4px' }}>
              {intake.contact_name} ({intake.contact_email})
            </div>
          </div>
          <StatusBadge status={intake.status} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', borderTop: '1px solid var(--whop-border)', paddingTop: '14px', fontSize: '13px' }}>
          <div>
            <span style={{ color: 'var(--whop-text-muted)', fontFamily: 'var(--font-mono)', fontSize: '10px' }}>SECTOR / INDUSTRY</span>
            <div style={{ fontWeight: 700, marginTop: '2px', color: 'var(--whop-text-primary)' }}>{intake.business_type || 'B2B Services'}</div>
          </div>
          <div>
            <span style={{ color: 'var(--whop-text-muted)', fontFamily: 'var(--font-mono)', fontSize: '10px' }}>WORKFORCE CAPACITY</span>
            <div style={{ fontWeight: 700, marginTop: '2px', color: 'var(--whop-text-primary)' }}>{intake.team_size || '11-25 team members'}</div>
          </div>
        </div>
      </div>

      {/* ── Operational Debt Diagnostic Box ── */}
      <div style={{ background: 'var(--whop-danger-bg)', border: '1px solid var(--whop-danger-border)', borderRadius: '14px', padding: '22px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <Flame size={16} color="var(--whop-danger)" />
          <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--whop-danger)', letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 700 }}>
            DIAGNOSED BOTTLENECK & REVENUE DRAG
          </span>
        </div>

        <h4 style={{ fontSize: '16px', fontWeight: 700, marginTop: '4px', marginBottom: '14px', color: 'var(--whop-danger)' }}>
          ⚠️ {intake.bottleneck || 'Operations & Process Bottleneck'}
        </h4>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--whop-danger-border)', paddingTop: '14px' }}>
          <span style={{ fontSize: '13px', color: 'var(--whop-text-secondary)' }}>Estimated Annual Waste:</span>
          <span style={{ fontSize: '22px', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--whop-danger)' }}>
            AED {Number(intake.estimated_annual_debt || 65000).toLocaleString()} / yr
          </span>
        </div>
      </div>

      {/* ── Form Answers Grid ── */}
      <div style={{ background: '#FFFFFF', border: '1px solid var(--whop-border)', borderRadius: '14px', padding: '20px' }}>
        <h4 style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--whop-text-muted)', textTransform: 'uppercase', marginBottom: '14px', letterSpacing: '0.06em' }}>
          RAW SUBMISSION PARAMETERS
        </h4>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {Object.entries(intake.answers || {}).map(([key, value], idx) => (
            <div
              key={idx}
              style={{
                background: 'var(--whop-surface-subtle)',
                border: '1px solid var(--whop-border-light)',
                borderRadius: '8px',
                padding: '10px 14px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '13px',
              }}
            >
              <span style={{ color: 'var(--whop-text-secondary)', fontWeight: 600 }}>
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase())}
              </span>
              <strong style={{ color: 'var(--whop-text-primary)', fontFamily: typeof value === 'number' ? 'var(--font-mono)' : 'inherit' }}>
                {typeof value === 'object' ? JSON.stringify(value) : String(value)}
              </strong>
            </div>
          ))}
        </div>
      </div>
    </Drawer>
  );
}
