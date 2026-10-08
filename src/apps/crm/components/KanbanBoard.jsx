import React from 'react';
import { CRM_STAGES } from '../data/crmData';
import { MoreHorizontal, ArrowRight, DollarSign, Tag, CheckCircle2, ChevronRight, Zap, Building2, User, Clock } from 'lucide-react';
import StatusBadge from '../../shared/StatusBadge';

export default function KanbanBoard({ deals = [], onSelectDeal, onMoveStage, currencySymbol = 'AED ' }) {
  const totalPipelineSum = deals.reduce((sum, d) => sum + (Number(d.deal_value) || 0), 0) || 1;

  const dealsByStage = CRM_STAGES.reduce((acc, stage) => {
    acc[stage.id] = deals.filter((d) => d.stage === stage.id);
    return acc;
  }, {});

  const handleDragStart = (e, dealId) => {
    e.dataTransfer.setData('text/plain', dealId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetStageId) => {
    e.preventDefault();
    const dealId = e.dataTransfer.getData('text/plain');
    if (dealId && onMoveStage) {
      onMoveStage(dealId, targetStageId);
    }
  };

  return (
    <div className="whop-kanban-board">
      {CRM_STAGES.map((stage) => {
        const stageDeals = dealsByStage[stage.id] || [];
        const totalValue = stageDeals.reduce((sum, d) => sum + (Number(d.deal_value) || 0), 0);
        const stagePct = Math.round((totalValue / totalPipelineSum) * 100);

        return (
          <div
            key={stage.id}
            className="whop-kanban-column"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, stage.id)}
          >
            {/* Column Header with Telemetry */}
            <div className="whop-kanban-column-header">
              <div>
                <div className="whop-kanban-column-title">
                  <span style={{ fontSize: '15px' }}>{stage.icon}</span>
                  <span>{stage.label}</span>
                  <span
                    style={{
                      fontSize: '11px',
                      background: 'var(--whop-surface-subtle)',
                      border: '1px solid var(--whop-border)',
                      padding: '2px 8px',
                      borderRadius: '10px',
                      color: 'var(--whop-text-primary)',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 700,
                    }}
                  >
                    {stageDeals.length}
                  </span>
                </div>
                <div style={{ height: '3px', background: 'var(--whop-border-light)', borderRadius: '2px', marginTop: '8px', overflow: 'hidden' }}>
                  <div style={{ width: `${Math.max(stagePct, 4)}%`, height: '100%', background: stage.color || '#09090B', borderRadius: '2px' }} />
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '13px', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--whop-text-primary)' }}>
                  {currencySymbol}{totalValue.toLocaleString()}
                </div>
                <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--whop-text-muted)' }}>
                  {stagePct}% volume
                </span>
              </div>
            </div>

            {/* Column Cards */}
            <div className="whop-kanban-cards-area">
              {stageDeals.map((deal) => (
                <div
                  key={deal.id}
                  className="whop-kanban-card"
                  draggable
                  onDragStart={(e) => handleDragStart(e, deal.id)}
                  onClick={() => onSelectDeal(deal)}
                >
                  {/* Top Bar: Company Name & Deal Size */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div
                        style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '6px',
                          background: 'var(--whop-accent)',
                          color: 'var(--whop-accent-text)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '11px',
                          fontWeight: 800,
                          fontFamily: 'var(--font-mono)',
                        }}
                      >
                        {deal.company_name.slice(0, 1)}
                      </div>
                      <h4 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--whop-text-primary)', margin: 0, lineHeight: 1.3 }}>
                        {deal.company_name}
                      </h4>
                    </div>

                    <span
                      style={{
                        fontSize: '12px',
                        fontWeight: 700,
                        fontFamily: 'var(--font-mono)',
                        color: 'var(--whop-text-primary)',
                        background: 'var(--whop-surface-subtle)',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        border: '1px solid var(--whop-border)',
                      }}
                    >
                      {deal.currency} {Number(deal.deal_value).toLocaleString()}
                    </span>
                  </div>

                  {/* Contact Person & Probability Meter */}
                  <div style={{ fontSize: '12px', color: 'var(--whop-text-secondary)', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <User size={12} color="var(--whop-text-dim)" />
                      {deal.contact_name}
                    </span>
                    <span
                      style={{
                        fontSize: '11px',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 700,
                        color: deal.probability >= 70 ? 'var(--whop-success)' : 'var(--whop-warning)',
                      }}
                    >
                      {deal.probability}% Win Odds
                    </span>
                  </div>

                  {/* Target Architecture Blueprint Tag */}
                  {deal.system_interested && (
                    <div
                      style={{
                        fontSize: '11px',
                        background: 'var(--whop-surface-subtle)',
                        border: '1px solid var(--whop-border)',
                        borderRadius: '6px',
                        padding: '6px 10px',
                        marginBottom: '12px',
                        color: 'var(--whop-text-primary)',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      <Zap size={13} color="var(--whop-warning)" />
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {deal.system_interested}
                      </span>
                    </div>
                  )}

                  {/* Card Footer: Tags & Quick Stage Shift */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--whop-border-light)', paddingTop: '10px' }}>
                    <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                      {(deal.tags || []).slice(0, 2).map((tag, i) => (
                        <span
                          key={i}
                          style={{
                            fontSize: '10px',
                            fontFamily: 'var(--font-mono)',
                            background: 'var(--whop-surface-muted)',
                            padding: '2px 6px',
                            borderRadius: '4px',
                            color: 'var(--whop-text-secondary)',
                            border: '1px solid var(--whop-border)',
                          }}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <button
                      title="Advance to next pipeline stage"
                      onClick={(e) => {
                        e.stopPropagation();
                        const currentIndex = CRM_STAGES.findIndex((s) => s.id === stage.id);
                        if (currentIndex < CRM_STAGES.length - 1) {
                          onMoveStage(deal.id, CRM_STAGES[currentIndex + 1].id);
                        }
                      }}
                      className="whop-btn whop-btn-secondary whop-btn-sm"
                      style={{ padding: '3px 8px', fontSize: '11px' }}
                    >
                      <span>Advance</span>
                      <ChevronRight size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
