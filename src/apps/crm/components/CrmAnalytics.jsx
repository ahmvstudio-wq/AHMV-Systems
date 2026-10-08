import React from 'react';
import { CRM_STAGES } from '../data/crmData';
import { TrendingUp, Target, Zap, Clock, ArrowUpRight, BarChart3, ShieldCheck } from 'lucide-react';
import MetricCard from '../../shared/MetricCard';

export default function CrmAnalytics({ deals = [] }) {
  const totalPipeline = deals.reduce((acc, d) => acc + (Number(d.deal_value) || 0), 0);
  const weightedPipeline = deals.reduce((acc, d) => acc + (Number(d.deal_value) * (d.probability / 100) || 0), 0);
  const wonCount = deals.filter((d) => d.stage === 'deal_won' || d.stage === 'retainer').length;
  const winRate = deals.length > 0 ? Math.round((wonCount / deals.length) * 100) : 0;

  // Group by system
  const systemCounts = deals.reduce((acc, d) => {
    const sys = d.system_interested || 'General Ops';
    acc[sys] = (acc[sys] || 0) + 1;
    return acc;
  }, {});

  const maxStageCount = Math.max(
    ...CRM_STAGES.map((s) => deals.filter((d) => d.stage === s.id).length),
    1
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* ── Key Conversion Metric Cards ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        <MetricCard
          title="TOTAL PIPELINE VALUE"
          value={`AED ${totalPipeline.toLocaleString()}`}
          subtext={`Across ${deals.length} active opportunities`}
          icon={BarChart3}
        />

        <MetricCard
          title="WEIGHTED FORECAST"
          value={`AED ${Math.round(weightedPipeline).toLocaleString()}`}
          subtext="Probability-adjusted revenue"
          trend="up"
          trendValue="+32.4%"
        />

        <MetricCard
          title="HISTORIC WIN RATE"
          value={`${winRate}%`}
          subtext={`${wonCount} won / active contracts`}
          badgeText="High Velocity"
        />

        <MetricCard
          title="AVG. CLOSING VELOCITY"
          value="12.4 Days"
          subtext="From 60s audit to SOW commit"
          icon={Clock}
        />
      </div>

      {/* ── Stage Funnel & System Demand Split ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 0.7fr', gap: '24px' }}>
        {/* Pipeline Stage Distribution Funnel */}
        <div className="whop-card" style={{ padding: '28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--whop-text-primary)', margin: 0 }}>
                Pipeline Stage Flow & Monetary Distribution
              </h3>
              <p style={{ fontSize: '12px', color: 'var(--whop-text-muted)', margin: '4px 0 0', fontFamily: 'var(--font-mono)' }}>
                Stage velocity and volume weighting
              </p>
            </div>
            <span className="whop-status-badge whop-badge-neutral">6 STAGES ACTIVE</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {CRM_STAGES.map((stage) => {
              const stageDeals = deals.filter((d) => d.stage === stage.id);
              const count = stageDeals.length;
              const value = stageDeals.reduce((sum, d) => sum + (Number(d.deal_value) || 0), 0);
              const pct = Math.round((count / maxStageCount) * 100);

              return (
                <div key={stage.id} style={{ background: 'var(--whop-surface-subtle)', border: '1px solid var(--whop-border)', borderRadius: '10px', padding: '14px 18px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '8px', fontFamily: 'var(--font-mono)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, color: 'var(--whop-text-primary)' }}>
                      <span style={{ fontSize: '14px' }}>{stage.icon}</span>
                      <span>{stage.label}</span>
                      <span style={{ fontSize: '11px', color: 'var(--whop-text-muted)' }}>({count} deals)</span>
                    </span>
                    <span style={{ fontWeight: 800, color: 'var(--whop-text-primary)' }}>AED {value.toLocaleString()}</span>
                  </div>
                  <div style={{ height: '6px', background: 'var(--whop-border)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div
                      style={{
                        height: '100%',
                        width: `${Math.max(pct, 5)}%`,
                        background: stage.color || 'var(--whop-accent)',
                        borderRadius: '3px',
                        transition: 'width 0.4s ease',
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Product & Architecture Demand Breakdown */}
        <div className="whop-card" style={{ padding: '28px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--whop-text-primary)', marginBottom: '6px' }}>
            Top Architecture Inquiries
          </h3>
          <p style={{ fontSize: '12px', color: 'var(--whop-text-muted)', marginBottom: '24px', fontFamily: 'var(--font-mono)' }}>
            System demand ranking across active leads
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {Object.entries(systemCounts).map(([sys, count], i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '14px 16px',
                  background: 'var(--whop-surface-subtle)',
                  border: '1px solid var(--whop-border)',
                  borderRadius: '10px',
                }}
              >
                <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--whop-text-primary)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '22px', height: '22px', borderRadius: '6px', background: 'var(--whop-surface-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontFamily: 'var(--font-mono)', fontWeight: 800 }}>
                    0{i + 1}
                  </div>
                  <span style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {sys}
                  </span>
                </div>

                <span
                  style={{
                    fontSize: '11px',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                    background: '#FFFFFF',
                    border: '1px solid var(--whop-border)',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    color: 'var(--whop-text-primary)',
                  }}
                >
                  {count} {count === 1 ? 'deal' : 'deals'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
