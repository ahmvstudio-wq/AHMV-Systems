import React from 'react';
import { Link } from 'react-router-dom';
import AppLayout from './shared/AppLayout';
import MetricCard from './shared/MetricCard';
import {
  Users,
  Inbox,
  CreditCard,
  ArrowRight,
  ShieldCheck,
  Database,
  Zap,
  Activity,
  Cpu,
  Layers,
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
  Workflow,
  BarChart3,
  Sliders,
} from 'lucide-react';
import { isSupabaseConfigured } from '../lib/supabase';

export default function AppLauncher() {
  const suites = [
    {
      id: 'crm',
      title: 'AHMV Operating CRM',
      badge: 'Advanced Pipeline',
      description:
        'Full lead lifecycle, deal stage Kanban board, AI diagnostic inspector, Whop checkout links, and conversion velocity telemetry.',
      path: '/crm',
      icon: Users,
      image: '/sales-revenue.jpg',
      stats: '5 Active Deals · AED 353,000 Pipeline',
      actionText: 'Open CRM Pipeline →',
      color: '#059669',
      features: ['Kanban Drag & Flow', 'Whop Checkout Dispatch', 'Multi-Currency AED/USD/INR'],
    },
    {
      id: 'admin',
      title: 'Admin & Intake Command Feed',
      badge: 'Live Submissions',
      description:
        'Real-time record of all filled 60s diagnostic audits, operations review forms, and 1-click conversion into active CRM deals.',
      path: '/admin',
      icon: Inbox,
      image: '/operations.jpg',
      stats: '5 Intakes Logged · 40% Deal Conversion',
      actionText: 'Open Intake Feed →',
      color: '#2563EB',
      features: ['60s Audit Ingestion', 'Operational Debt Calculator', '1-Click Deal Generator'],
    },
    {
      id: 'accounting',
      title: 'Financial Management & ERP',
      badge: 'Full ERP Logic',
      description:
        'Double-entry general ledger, real-time Profit & Loss (P&L), Balance Sheet, UAE 5% VAT calculations, and invoice engine.',
      path: '/accounting',
      icon: CreditCard,
      image: '/ai-finance.jpg',
      stats: 'AED 671,500 Revenue · 82% Net Margin',
      actionText: 'Open ERP Ledger →',
      color: '#7C3AED',
      features: ['Double-Entry Ledger', 'UAE 5% VAT Invoicing', 'Real-time P&L / Balance Sheet'],
    },
  ];

  return (
    <AppLayout
      activeApp="launcher"
      title="AHMV Operations Command Hub"
      subtitle="Unified Architecture for CRM, Intake Feed & Financial ERP"
    >
      {/* ── Executive Hero Card with Official AHMV Logo & Telemetry ── */}
      <div
        className="whop-card"
        style={{
          padding: '36px 40px',
          marginBottom: '32px',
          background: 'linear-gradient(135deg, #FFFFFF 0%, #F8F9FA 100%)',
          border: '1px solid var(--whop-border)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '24px' }}>
          <div style={{ maxWidth: '680px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
              <img
                src="/logo.png.png"
                onError={(e) => {
                  e.currentTarget.src = '/logo.png';
                }}
                alt="AHMV Systems"
                style={{ height: '48px', width: 'auto', objectFit: 'contain' }}
              />
              <div style={{ width: '1px', height: '28px', background: 'var(--whop-border)' }} />
              <span
                style={{
                  fontSize: '11px',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 700,
                  color: 'var(--whop-success)',
                  background: 'var(--whop-success-bg)',
                  padding: '4px 10px',
                  borderRadius: '9999px',
                  border: '1px solid var(--whop-success-border)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span className="whop-status-dot" />
                ENTERPRISE OPERATING SUITE ONLINE
              </span>
            </div>

            <h1 style={{ fontSize: '26px', fontWeight: 800, color: 'var(--whop-text-primary)', letterSpacing: '-0.02em', marginBottom: '10px' }}>
              AHMV Systems Operations Command Hub
            </h1>
            <p style={{ fontSize: '14px', color: 'var(--whop-text-secondary)', lineHeight: 1.6, margin: 0 }}>
              Unified operational infrastructure for managing enterprise client pipelines, diagnostic intake streams, and real-time double-entry financial accounting.
            </p>
          </div>

          <div
            style={{
              background: '#FFFFFF',
              border: '1px solid var(--whop-border)',
              borderRadius: '12px',
              padding: '16px 20px',
              boxShadow: 'var(--whop-shadow-xs)',
              minWidth: '240px',
            }}
          >
            <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--whop-text-muted)', marginBottom: '8px' }}>
              DATABASE ARCHITECTURE
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <Database size={16} color={isSupabaseConfigured ? 'var(--whop-success)' : 'var(--whop-warning)'} />
              <span style={{ fontSize: '13px', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                {isSupabaseConfigured ? 'Supabase Connected' : 'Local Fallback Sync'}
              </span>
            </div>
            <div style={{ fontSize: '11px', color: 'var(--whop-text-dim)', fontFamily: 'var(--font-mono)' }}>
              Migration: supabase/schema.sql
            </div>
          </div>
        </div>
      </div>

      {/* ── Visual Interconnected Architecture Diagram (Bespoke Graphic) ── */}
      <div
        className="whop-card"
        style={{
          padding: '24px 32px',
          marginBottom: '32px',
          background: '#FFFFFF',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: 700, margin: 0, color: 'var(--whop-text-primary)' }}>
              Interconnected System Pipeline Topology
            </h3>
            <span style={{ fontSize: '12px', color: 'var(--whop-text-muted)', fontFamily: 'var(--font-mono)' }}>
              Data telemetry flow across the 3 enterprise applications
            </span>
          </div>
          <span className="whop-status-badge whop-badge-neutral">60 FPS SYNCHRONIZED</span>
        </div>

        {/* SVG Interactive Architecture Flowchart */}
        <div style={{ overflowX: 'auto', padding: '10px 0' }}>
          <svg viewBox="0 0 920 140" style={{ width: '100%', minWidth: '700px', height: 'auto', display: 'block' }}>
            <defs>
              <linearGradient id="flowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#2563EB" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#059669" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.8" />
              </linearGradient>
            </defs>

            {/* Connecting Lines */}
            <line x1="220" y1="70" x2="350" y2="70" stroke="url(#flowGrad)" strokeWidth="3" strokeDasharray="6 6" />
            <line x1="570" y1="70" x2="700" y2="70" stroke="url(#flowGrad)" strokeWidth="3" strokeDasharray="6 6" />

            {/* Node 1: Admin Intake Feed */}
            <g transform="translate(10, 20)">
              <rect width="210" height="100" rx="12" fill="#F8F9FA" stroke="#E4E4E7" strokeWidth="1.5" />
              <rect width="36" height="36" rx="8" x="16" y="16" fill="#EFF6FF" />
              <text x="34" y="40" textAnchor="middle" fill="#2563EB" fontSize="16" fontWeight="bold">📥</text>
              <text x="64" y="32" fill="#09090B" fontSize="13" fontWeight="bold" fontFamily="sans-serif">Admin Intake Feed</text>
              <text x="64" y="48" fill="#71717A" fontSize="10" fontFamily="monospace">60s Audits & Reviews</text>
              <text x="16" y="80" fill="#2563EB" fontSize="10" fontWeight="bold" fontFamily="monospace">⚡ Operational Debt Loss</text>
              <text x="16" y="96" fill="#71717A" fontSize="9" fontFamily="sans-serif">Captures & scores lead friction</text>
            </g>

            {/* Node 2: AHMV Operating CRM */}
            <g transform="translate(360, 20)">
              <rect width="210" height="100" rx="12" fill="#F8F9FA" stroke="#E4E4E7" strokeWidth="1.5" />
              <rect width="36" height="36" rx="8" x="16" y="16" fill="#ECFDF5" />
              <text x="34" y="40" textAnchor="middle" fill="#059669" fontSize="16" fontWeight="bold">👥</text>
              <text x="64" y="32" fill="#09090B" fontSize="13" fontWeight="bold" fontFamily="sans-serif">AHMV Operating CRM</text>
              <text x="64" y="48" fill="#71717A" fontSize="10" fontFamily="monospace">Deals · Kanban · Whop</text>
              <text x="16" y="80" fill="#059669" fontSize="10" fontWeight="bold" fontFamily="monospace">⚡ 1-Click Conversion</text>
              <text x="16" y="96" fill="#71717A" fontSize="9" fontFamily="sans-serif">Dispatches Whop checkout</text>
            </g>

            {/* Node 3: Financial ERP & Ledger */}
            <g transform="translate(710, 20)">
              <rect width="200" height="100" rx="12" fill="#F8F9FA" stroke="#E4E4E7" strokeWidth="1.5" />
              <rect width="36" height="36" rx="8" x="16" y="16" fill="#F5F3FF" />
              <text x="34" y="40" textAnchor="middle" fill="#7C3AED" fontSize="16" fontWeight="bold">💳</text>
              <text x="64" y="32" fill="#09090B" fontSize="13" fontWeight="bold" fontFamily="sans-serif">Financial ERP Ledger</text>
              <text x="64" y="48" fill="#71717A" fontSize="10" fontFamily="monospace">Double-Entry P&L</text>
              <text x="16" y="80" fill="#7C3AED" fontSize="10" fontWeight="bold" fontFamily="monospace">⚡ UAE 5% VAT Invoicing</text>
              <text x="16" y="96" fill="#71717A" fontSize="9" fontFamily="sans-serif">Reconciles bank & revenue</text>
            </g>
          </svg>
        </div>
      </div>

      {/* ── 3 Software Suite Launch Cards (Graphic Rich) ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '36px' }}>
        {suites.map((suite) => {
          const Icon = suite.icon;
          return (
            <Link
              key={suite.id}
              to={suite.path}
              className="whop-card"
              style={{
                textDecoration: 'none',
                color: 'inherit',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                {/* Visual Header Image Banner */}
                <div style={{ height: '140px', width: '100%', position: 'relative', overflow: 'hidden', borderBottom: '1px solid var(--whop-border)' }}>
                  <img
                    src={suite.image}
                    alt={suite.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      background: 'rgba(255, 255, 255, 0.92)',
                      backdropFilter: 'blur(8px)',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontSize: '11px',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 700,
                      color: suite.color,
                      border: '1px solid var(--whop-border)',
                    }}
                  >
                    {suite.badge}
                  </div>
                </div>

                {/* Card Body */}
                <div style={{ padding: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        background: 'var(--whop-surface-subtle)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: suite.color,
                      }}
                    >
                      <Icon size={18} />
                    </div>
                    <h2 style={{ fontSize: '17px', fontWeight: 700, margin: 0, color: 'var(--whop-text-primary)' }}>
                      {suite.title}
                    </h2>
                  </div>

                  <p style={{ fontSize: '13px', color: 'var(--whop-text-secondary)', lineHeight: 1.5, marginBottom: '18px' }}>
                    {suite.description}
                  </p>

                  {/* Feature Bullets */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '20px' }}>
                    {suite.features.map((feat, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--whop-text-muted)' }}>
                        <CheckCircle2 size={13} color={suite.color} />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div
                style={{
                  padding: '16px 24px',
                  background: 'var(--whop-surface-subtle)',
                  borderTop: '1px solid var(--whop-border)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--whop-text-dim)' }}>
                  {suite.stats}
                </span>
                <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--whop-text-primary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  {suite.actionText}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </AppLayout>
  );
}
