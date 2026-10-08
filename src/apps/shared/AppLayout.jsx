import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Layers,
  Users,
  Inbox,
  CreditCard,
  Settings,
  Database,
  Search,
  Plus,
  ExternalLink,
  ChevronDown,
  Menu,
  CheckCircle2,
  AlertCircle,
  Bell,
  ArrowUpRight,
  TrendingUp,
  Activity,
  Cpu,
  Radio,
  Zap,
  Globe,
  HelpCircle,
} from 'lucide-react';
import { isSupabaseConfigured } from '../../lib/supabase';
import './whop-ui.css';

export default function AppLayout({
  activeApp = 'crm', // 'crm' | 'admin' | 'accounting' | 'launcher'
  title,
  subtitle,
  children,
  actionButton,
  badgeCount,
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showDbModal, setShowDbModal] = useState(false);
  const location = useLocation();

  const navItems = [
    {
      id: 'launcher',
      label: 'Command Hub & Overview',
      path: '/apps',
      icon: Layers,
      badge: 'Hub',
    },
    {
      id: 'crm',
      label: 'AHMV Operating CRM',
      path: '/crm',
      icon: Users,
      badge: 'Pipeline',
    },
    {
      id: 'admin',
      label: 'Admin & Intake Command',
      path: '/admin',
      icon: Inbox,
      badge: 'Live Feed',
    },
    {
      id: 'accounting',
      label: 'Financial ERP & Ledger',
      path: '/accounting',
      icon: CreditCard,
      badge: 'P&L / VAT',
    },
  ];

  return (
    <div className="whop-app-wrapper">
      {/* ── Left Sidebar Navigation ── */}
      <aside className={`whop-sidebar ${mobileOpen ? 'mobile-open' : ''}`}>
        {/* Workspace Brand Header with Official AHMV Logo */}
        <div className="whop-sidebar-header">
          <Link to="/" className="whop-brand-logo-wrap" title="Return to AHMV Systems Main Website">
            <img
              src="/logo.png.png"
              onError={(e) => {
                e.currentTarget.src = '/logo.png';
              }}
              alt="AHMV Systems Logo"
              className="whop-brand-logo-img"
            />
          </Link>
        </div>

        {/* Navigation Items */}
        <div className="whop-nav-section">
          <div className="whop-nav-label">ENTERPRISE APPLICATIONS</div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeApp === item.id;
            return (
              <Link
                key={item.id}
                to={item.path}
                className={`whop-nav-item ${isActive ? 'active' : ''}`}
                onClick={() => setMobileOpen(false)}
              >
                <div className="whop-nav-item-left">
                  <div className="whop-nav-icon">
                    <Icon size={17} />
                  </div>
                  <span>{item.label}</span>
                </div>
                {item.badge && <span className="whop-nav-badge">{item.badge}</span>}
              </Link>
            );
          })}

          <div className="whop-nav-label" style={{ marginTop: '20px' }}>
            EXTERNAL & SYSTEM LINKS
          </div>

          <a
            href="/"
            className="whop-nav-item"
            target="_blank"
            rel="noreferrer"
          >
            <div className="whop-nav-item-left">
              <div className="whop-nav-icon">
                <Globe size={16} />
              </div>
              <span>Live Website</span>
            </div>
            <ArrowUpRight size={13} color="var(--whop-text-dim)" />
          </a>

          <a
            href="/#pricing"
            className="whop-nav-item"
            target="_blank"
            rel="noreferrer"
          >
            <div className="whop-nav-item-left">
              <div className="whop-nav-icon">
                <Zap size={16} />
              </div>
              <span>Whop Products</span>
            </div>
            <ArrowUpRight size={13} color="var(--whop-text-dim)" />
          </a>

          <button
            onClick={() => setShowDbModal(true)}
            className="whop-nav-item"
            style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none' }}
          >
            <div className="whop-nav-item-left">
              <div className="whop-nav-icon">
                <Database size={16} />
              </div>
              <span>Supabase Sync</span>
            </div>
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                background: isSupabaseConfigured ? 'var(--whop-success)' : 'var(--whop-warning)',
              }}
            />
          </button>
        </div>

        {/* Sidebar Footer with Live System Telemetry */}
        <div className="whop-sidebar-footer">
          <div className="whop-telemetry-badge">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="whop-status-dot" />
              <span style={{ fontWeight: 600, color: 'var(--whop-text-primary)' }}>
                SYSTEM ONLINE
              </span>
            </div>
            <span style={{ color: 'var(--whop-text-muted)' }}>v2.4.0</span>
          </div>
        </div>
      </aside>

      {/* ── Main App Content ── */}
      <div className="whop-main-container">
        {/* Top Header */}
        <header className="whop-header">
          <div className="whop-header-left">
            <div>
              <div className="whop-header-title">{title}</div>
              {subtitle && <div className="whop-header-subtitle">{subtitle}</div>}
            </div>
          </div>

          <div className="whop-header-right">
            {actionButton}

            <div style={{ width: '1px', height: '24px', background: 'var(--whop-border)', margin: '0 4px' }} />

            <Link
              to="/"
              className="whop-btn whop-btn-secondary whop-btn-sm"
              title="Return to Main Website"
            >
              <span>Main Site</span>
              <ArrowUpRight size={13} />
            </Link>
          </div>
        </header>

        {/* Content Body */}
        <main className="whop-content-body">{children}</main>
      </div>

      {/* ── Supabase Database Connection Modal ── */}
      {showDbModal && (
        <div className="whop-modal-overlay" onClick={() => setShowDbModal(false)}>
          <div className="whop-modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '540px', padding: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: isSupabaseConfigured ? 'var(--whop-success-bg)' : 'var(--whop-warning-bg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Database size={20} color={isSupabaseConfigured ? 'var(--whop-success)' : 'var(--whop-warning)'} />
              </div>
              <div>
                <h3 style={{ fontSize: '17px', fontWeight: 700, margin: 0, color: 'var(--whop-text-primary)' }}>
                  Supabase PostgreSQL Engine
                </h3>
                <span style={{ fontSize: '12px', color: 'var(--whop-text-muted)', fontFamily: 'var(--font-mono)' }}>
                  {isSupabaseConfigured ? 'Connected & Live Syncing' : 'Zero-Config Local Cache Mode'}
                </span>
              </div>
            </div>

            <p style={{ fontSize: '13px', color: 'var(--whop-text-secondary)', lineHeight: 1.6, marginBottom: '20px' }}>
              All 3 applications are fully wired to read and write to Supabase. Complete SQL schema is stored in{' '}
              <code style={{ fontFamily: 'var(--font-mono)', background: 'var(--whop-surface-subtle)', padding: '2px 6px', borderRadius: '4px' }}>
                supabase/schema.sql
              </code>.
            </p>

            <div
              style={{
                background: 'var(--whop-surface-subtle)',
                border: '1px solid var(--whop-border)',
                borderRadius: '10px',
                padding: '16px',
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                marginBottom: '24px',
              }}
            >
              <div style={{ color: 'var(--whop-text-muted)', marginBottom: '6px' }}>CONFIGURATION STATUS:</div>
              <div style={{ fontWeight: 700, color: isSupabaseConfigured ? 'var(--whop-success)' : 'var(--whop-warning)' }}>
                {isSupabaseConfigured ? '● VITE_SUPABASE_URL & ANON KEY DETECTED' : '● RUNNING OFFLINE PERSISTENCE (READY FOR CREDS)'}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button onClick={() => setShowDbModal(false)} className="whop-btn whop-btn-primary whop-btn-sm">
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
