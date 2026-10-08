import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AppLayout from '../shared/AppLayout';
import MetricCard from '../shared/MetricCard';
import FinancialStatements from './components/FinancialStatements';
import InvoicingEngine from './components/InvoicingEngine';
import GeneralLedgerView from './components/GeneralLedgerView';
import ChartOfAccountsView from './components/ChartOfAccountsView';
import {
  getAccounts,
  getInvoices,
  saveInvoice,
  getJournalEntries,
  saveJournalEntry,
} from './data/erpData';
import { CreditCard, FileText, BookOpen, Layers, DollarSign, Download, Plus } from 'lucide-react';

export default function AccountingErpApp() {
  const [accounts, setAccounts] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('statements'); // 'statements' | 'invoices' | 'ledger' | 'accounts'
  const location = useLocation();

  const prefilledDeal = location.state?.createInvoiceForDeal || null;

  const loadData = async () => {
    setLoading(true);
    const [accData, invData, jeData] = await Promise.all([
      getAccounts(),
      getInvoices(),
      getJournalEntries(),
    ]);
    setAccounts(accData);
    setInvoices(invData);
    setEntries(jeData);
    setLoading(false);

    if (prefilledDeal) {
      setViewMode('invoices');
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSaveInvoice = async (invoice) => {
    const updated = await saveInvoice(invoice, invoices);
    setInvoices(updated);
  };

  const handleSaveEntry = async (entry) => {
    const updated = await saveJournalEntry(entry, entries);
    setEntries(updated);
  };

  // Financial aggregates
  const totalRevenue = accounts
    .filter((a) => a.category === 'revenue')
    .reduce((sum, a) => sum + (Number(a.balance) || 0), 0);
  const totalExpenses = accounts
    .filter((a) => a.category === 'expense')
    .reduce((sum, a) => sum + (Number(a.balance) || 0), 0);
  const netIncome = totalRevenue - totalExpenses;
  const accountsReceivable = accounts
    .find((a) => a.account_code === '1200')
    ?.balance || 115000;
  const vatPayable = accounts
    .find((a) => a.account_code === '2020')
    ?.balance || 14200;

  return (
    <AppLayout
      activeApp="accounting"
      title="Financial Management & ERP Ledger"
      subtitle="Double-Entry General Ledger, Real-Time P&L, UAE 5% VAT & Invoicing Engine"
    >
      {/* ── Financial Health Metric Tiles ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '14px', marginBottom: '24px' }}>
        <MetricCard
          title="TOTAL GROSS REVENUE"
          value={`AED ${totalRevenue.toLocaleString()}`}
          subtext="Architecture, Retainers & Whop"
          trend="up"
          trendValue="+24.8%"
          icon={DollarSign}
        />
        <MetricCard
          title="NET OPERATING INCOME"
          value={`AED ${netIncome.toLocaleString()}`}
          subtext="Retained Operating Margin"
          trend="up"
          trendValue="82% Margin"
          badgeText="EBITDA"
        />
        <MetricCard
          title="ACCOUNTS RECEIVABLE"
          value={`AED ${Number(accountsReceivable).toLocaleString()}`}
          subtext="Pending client invoice settlements"
          badgeText="Receivables"
        />
        <MetricCard
          title="OPERATING EXPENSES (OpEx)"
          value={`AED ${totalExpenses.toLocaleString()}`}
          subtext="Cloud, LLM API Tokens, Payroll"
        />
        <MetricCard
          title="VAT PAYABLE (5% FTA)"
          value={`AED ${Number(vatPayable).toLocaleString()}`}
          subtext="Accrued UAE VAT liability"
          badgeText="Tax Authority"
        />
      </div>

      {/* ── Subheader Navigation Tabs ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div className="whop-pill-tabs">
          <button
            className={`whop-pill-tab ${viewMode === 'statements' ? 'active' : ''}`}
            onClick={() => setViewMode('statements')}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Layers size={13} />
              <span>Financial Statements</span>
            </div>
          </button>

          <button
            className={`whop-pill-tab ${viewMode === 'invoices' ? 'active' : ''}`}
            onClick={() => setViewMode('invoices')}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <FileText size={13} />
              <span>Invoicing Engine ({invoices.length})</span>
            </div>
          </button>

          <button
            className={`whop-pill-tab ${viewMode === 'ledger' ? 'active' : ''}`}
            onClick={() => setViewMode('ledger')}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <BookOpen size={13} />
              <span>General Ledger</span>
            </div>
          </button>

          <button
            className={`whop-pill-tab ${viewMode === 'accounts' ? 'active' : ''}`}
            onClick={() => setViewMode('accounts')}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CreditCard size={13} />
              <span>Chart of Accounts</span>
            </div>
          </button>
        </div>
      </div>

      {/* ── Active View Body ── */}
      {loading ? (
        <div style={{ padding: '80px 0', textAlign: 'center', color: 'var(--whop-text-muted)', fontFamily: 'var(--font-mono)' }}>
          Loading ERP Financial Ledger from Supabase...
        </div>
      ) : (
        <>
          {viewMode === 'statements' && (
            <FinancialStatements accounts={accounts} invoices={invoices} />
          )}

          {viewMode === 'invoices' && (
            <InvoicingEngine
              invoices={invoices}
              onSaveInvoice={handleSaveInvoice}
              prefilledDeal={prefilledDeal}
            />
          )}

          {viewMode === 'ledger' && (
            <GeneralLedgerView
              entries={entries}
              accounts={accounts}
              onSaveEntry={handleSaveEntry}
            />
          )}

          {viewMode === 'accounts' && (
            <ChartOfAccountsView accounts={accounts} />
          )}
        </>
      )}
    </AppLayout>
  );
}
