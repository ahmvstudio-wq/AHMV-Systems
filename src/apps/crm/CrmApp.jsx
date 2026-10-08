import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../shared/AppLayout';
import KanbanBoard from './components/KanbanBoard';
import LeadTableView from './components/LeadTableView';
import CrmAnalytics from './components/CrmAnalytics';
import DealDrawer from './components/DealDrawer';
import NewDealModal from './components/NewDealModal';
import { getDeals, saveDeal, removeDeal } from './data/crmData';
import { Plus, LayoutGrid, List, BarChart3, Download, RefreshCw } from 'lucide-react';

export default function CrmApp() {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('kanban'); // 'kanban' | 'table' | 'analytics'
  const [selectedDeal, setSelectedDeal] = useState(null);
  const [newModalOpen, setNewModalOpen] = useState(false);
  const [currency, setCurrency] = useState('AED');
  const navigate = useNavigate();

  const loadData = async () => {
    setLoading(true);
    const data = await getDeals();
    setDeals(data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSaveDeal = async (deal) => {
    const updated = await saveDeal(deal, deals);
    setDeals(updated);
    if (selectedDeal && selectedDeal.id === deal.id) {
      setSelectedDeal(deal);
    }
  };

  const handleMoveStage = async (dealId, newStageId) => {
    const deal = deals.find((d) => d.id === dealId);
    if (!deal) return;
    const updatedDeal = {
      ...deal,
      stage: newStageId,
      probability: newStageId === 'deal_won' || newStageId === 'retainer' ? 100 : deal.probability,
    };
    const updated = await saveDeal(updatedDeal, deals);
    setDeals(updated);
  };

  const handleDeleteDeal = async (dealId) => {
    const updated = await removeDeal(dealId, deals);
    setDeals(updated);
  };

  const handleGenerateInvoice = (deal) => {
    // Navigate seamlessly to ERP invoicing with pre-filled deal state
    navigate('/accounting', { state: { createInvoiceForDeal: deal } });
  };

  const handleExportCSV = () => {
    const headers = ['Company', 'Contact Name', 'Email', 'Stage', 'Value', 'Currency', 'Probability', 'System'];
    const rows = deals.map((d) => [
      `"${d.company_name}"`,
      `"${d.contact_name}"`,
      `"${d.contact_email}"`,
      `"${d.stage}"`,
      d.deal_value,
      `"${d.currency}"`,
      `"${d.probability}%"`,
      `"${d.system_interested}"`,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `AHMV_CRM_Deals_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AppLayout
      activeApp="crm"
      title="AHMV Operating CRM"
      subtitle="Enterprise Pipeline, Lead Qualification & Architecture Scoping"
      actionButton={
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button onClick={handleExportCSV} className="whop-btn whop-btn-secondary whop-btn-sm" title="Export CSV">
            <Download size={13} />
            <span>Export</span>
          </button>
          <button onClick={() => setNewModalOpen(true)} className="whop-btn whop-btn-primary whop-btn-sm">
            <Plus size={14} />
            <span>New Deal</span>
          </button>
        </div>
      }
    >
      {/* ── Subheader Controls Bar ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        {/* View Switcher */}
        <div className="whop-pill-tabs">
          <button
            className={`whop-pill-tab ${viewMode === 'kanban' ? 'active' : ''}`}
            onClick={() => setViewMode('kanban')}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <LayoutGrid size={13} />
              <span>Pipeline Board</span>
            </div>
          </button>

          <button
            className={`whop-pill-tab ${viewMode === 'table' ? 'active' : ''}`}
            onClick={() => setViewMode('table')}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <List size={13} />
              <span>Data Grid ({deals.length})</span>
            </div>
          </button>

          <button
            className={`whop-pill-tab ${viewMode === 'analytics' ? 'active' : ''}`}
            onClick={() => setViewMode('analytics')}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <BarChart3 size={13} />
              <span>Funnel Analytics</span>
            </div>
          </button>
        </div>

        {/* Currency & Refresh */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ display: 'flex', background: '#FFFFFF', border: '1px solid var(--whop-border)', borderRadius: '8px', padding: '2px' }}>
            {['AED', 'USD', 'INR'].map((curr) => (
              <button
                key={curr}
                onClick={() => setCurrency(curr)}
                style={{
                  padding: '4px 10px',
                  fontSize: '11px',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: currency === curr ? 700 : 400,
                  border: 'none',
                  borderRadius: '6px',
                  background: currency === curr ? '#0A0A0B' : 'transparent',
                  color: currency === curr ? '#FFFFFF' : 'var(--whop-text-muted)',
                  cursor: 'pointer',
                }}
              >
                {curr}
              </button>
            ))}
          </div>

          <button onClick={loadData} className="whop-btn whop-btn-secondary whop-btn-sm" title="Refresh data">
            <RefreshCw size={13} />
          </button>
        </div>
      </div>

      {/* ── Active View Content ── */}
      {loading ? (
        <div style={{ padding: '80px 0', textAlign: 'center', color: 'var(--whop-text-muted)', fontFamily: 'var(--font-mono)' }}>
          Loading CRM Pipeline from Supabase...
        </div>
      ) : (
        <>
          {viewMode === 'kanban' && (
            <KanbanBoard
              deals={deals}
              onSelectDeal={(deal) => setSelectedDeal(deal)}
              onMoveStage={handleMoveStage}
              currencySymbol={`${currency} `}
            />
          )}

          {viewMode === 'table' && (
            <LeadTableView
              deals={deals}
              onSelectDeal={(deal) => setSelectedDeal(deal)}
              onMoveStage={handleMoveStage}
            />
          )}

          {viewMode === 'analytics' && <CrmAnalytics deals={deals} />}
        </>
      )}

      {/* ── Deal Inspector Drawer ── */}
      <DealDrawer
        isOpen={Boolean(selectedDeal)}
        deal={selectedDeal}
        onClose={() => setSelectedDeal(null)}
        onUpdateDeal={handleSaveDeal}
        onDeleteDeal={handleDeleteDeal}
        onGenerateInvoice={handleGenerateInvoice}
      />

      {/* ── New Deal Creation Modal ── */}
      <NewDealModal
        isOpen={newModalOpen}
        onClose={() => setNewModalOpen(false)}
        onSave={handleSaveDeal}
      />
    </AppLayout>
  );
}
