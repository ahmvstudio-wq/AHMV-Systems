import { fetchCollection, saveRecord, deleteRecord } from '../../../lib/supabase';

export const INITIAL_CHART_OF_ACCOUNTS = [
  { account_code: '1010', name: 'Primary Operating Bank Account (ENBD)', category: 'asset', sub_category: 'Cash & Equivalents', balance: 285400.0, currency: 'AED' },
  { account_code: '1020', name: 'Whop Merchant Payout Clearing', category: 'asset', sub_category: 'Merchant Clearing', balance: 48900.0, currency: 'AED' },
  { account_code: '1030', name: 'Stripe Gateway Clearing Balance', category: 'asset', sub_category: 'Merchant Clearing', balance: 32150.0, currency: 'AED' },
  { account_code: '1200', name: 'Accounts Receivable (Invoiced Clients)', category: 'asset', sub_category: 'Receivables', balance: 115000.0, currency: 'AED' },
  { account_code: '2010', name: 'Accounts Payable & Vendor Accruals', category: 'liability', sub_category: 'Payables', balance: 18400.0, currency: 'AED' },
  { account_code: '2020', name: 'VAT Payable (5% UAE FTA Accrual)', category: 'liability', sub_category: 'Taxes', balance: 14200.0, currency: 'AED' },
  { account_code: '2030', name: 'Unearned Revenue / Retainer Deposits', category: 'liability', sub_category: 'Deferred Revenue', balance: 45000.0, currency: 'AED' },
  { account_code: '3010', name: 'Founder Equity & Retained Capital', category: 'equity', sub_category: 'Equity', balance: 260000.0, currency: 'AED' },
  { account_code: '4010', name: 'System Architecture & Implementation Fees', category: 'revenue', sub_category: 'Primary Revenue', balance: 395000.0, currency: 'AED' },
  { account_code: '4020', name: 'Monthly Maintenance & AI Retainers', category: 'revenue', sub_category: 'Recurring Revenue', balance: 184000.0, currency: 'AED' },
  { account_code: '4030', name: 'Whop Standalone Software Licensing', category: 'revenue', sub_category: 'Product Revenue', balance: 92500.0, currency: 'AED' },
  { account_code: '5010', name: 'Cloud Infrastructure (AWS / Supabase)', category: 'expense', sub_category: 'Direct Cost', balance: 12400.0, currency: 'AED' },
  { account_code: '5020', name: 'LLM & API Token Consumption (OpenAI / Anthropic)', category: 'expense', sub_category: 'Direct Cost', balance: 18900.0, currency: 'AED' },
  { account_code: '5030', name: 'Engineering & Contractor Payroll', category: 'expense', sub_category: 'Payroll', balance: 84000.0, currency: 'AED' },
  { account_code: '5040', name: 'Corporate Software & Tool Consolidation', category: 'expense', sub_category: 'OpEx', balance: 8500.0, currency: 'AED' },
];

export const INITIAL_INVOICES = [
  {
    id: 'inv-2026-001',
    invoice_number: 'AHMV-INV-001',
    client_name: 'Faris Al-Nuaimi',
    client_company: 'Apex Capital Advisors',
    client_email: 'faris@apexcapital.ae',
    client_address: 'DIFC Gate Tower 4, Level 12, Dubai, UAE',
    issue_date: '2026-09-29',
    due_date: '2026-10-14',
    currency: 'AED',
    line_items: [
      { description: 'Financial Management & Accounting ERP - Core Architecture & Ledger Engine', qty: 1, unit_price: 60000 },
      { description: 'Multi-Entity Chart of Accounts & Automated VAT Module Integration', qty: 1, unit_price: 25000 },
    ],
    subtotal: 85000,
    vat_rate: 5,
    vat_amount: 4250,
    total_amount: 89250,
    status: 'paid',
    paid_at: '2026-09-30T16:45:00Z',
  },
  {
    id: 'inv-2026-002',
    invoice_number: 'AHMV-INV-002',
    client_name: 'Elena Rostova',
    client_company: 'Solaria Real Estate Group',
    client_email: 'elena@solariagroup.com',
    client_address: 'Business Bay Prime Tower, Suite 802, Dubai, UAE',
    issue_date: '2026-10-01',
    due_date: '2026-10-15',
    currency: 'AED',
    line_items: [
      { description: 'Property & Facility Management System - Unit & Lease Registry Deployment', qty: 1, unit_price: 45000 },
      { description: 'Automated WhatsApp Maintenance Ticketing Bot Integration', qty: 1, unit_price: 20000 },
    ],
    subtotal: 65000,
    vat_rate: 5,
    vat_amount: 3250,
    total_amount: 68250,
    status: 'pending',
  },
  {
    id: 'inv-2026-003',
    invoice_number: 'AHMV-INV-003',
    client_name: 'Claire Beauchamp',
    client_company: 'Artisan Heritage Atelier',
    client_email: 'c.beauchamp@atelierheritage.fr',
    client_address: 'Rue Saint-Honoré, 75001 Paris, France',
    issue_date: '2026-09-01',
    due_date: '2026-09-15',
    currency: 'AED',
    line_items: [
      { description: 'Monthly System Engineering & D2C Optimization Retainer - September 2026', qty: 1, unit_price: 12000 },
    ],
    subtotal: 12000,
    vat_rate: 5,
    vat_amount: 600,
    total_amount: 12600,
    status: 'paid',
    paid_at: '2026-09-02T10:00:00Z',
  },
];

export const INITIAL_JOURNAL_ENTRIES = [
  {
    id: 'je-001',
    entry_number: 'JE-2026-001',
    date: '2026-09-30',
    description: 'Invoice Settlement - Apex Capital Advisors (AHMV-INV-001)',
    reference_id: 'AHMV-INV-001',
    lines: [
      { account_code: '1010', account_name: 'Primary Operating Bank Account', debit: 89250.0, credit: 0.0 },
      { account_code: '4010', account_name: 'System Architecture & Implementation Fees', debit: 0.0, credit: 85000.0 },
      { account_code: '2020', account_name: 'VAT Payable (5% UAE Tax)', debit: 0.0, credit: 4250.0 },
    ],
  },
  {
    id: 'je-002',
    entry_number: 'JE-2026-002',
    date: '2026-09-28',
    description: 'Cloud Infrastructure & LLM API Token Billing (AWS & OpenAI)',
    reference_id: 'AWS-SEP-2026',
    lines: [
      { account_code: '5010', account_name: 'Cloud Infrastructure', debit: 12400.0, credit: 0.0 },
      { account_code: '5020', account_name: 'LLM API Consumption', debit: 18900.0, credit: 0.0 },
      { account_code: '1010', account_name: 'Primary Operating Bank Account', debit: 0.0, credit: 31300.0 },
    ],
  },
];

const ERP_ACCOUNTS_KEY = 'ahmv_erp_accounts_store_v1';
const ERP_INVOICES_KEY = 'ahmv_erp_invoices_store_v1';
const ERP_JOURNAL_KEY = 'ahmv_erp_journal_store_v1';

export async function getAccounts() {
  return await fetchCollection('erp_chart_of_accounts', INITIAL_CHART_OF_ACCOUNTS, ERP_ACCOUNTS_KEY);
}

export async function getInvoices() {
  return await fetchCollection('erp_invoices', INITIAL_INVOICES, ERP_INVOICES_KEY);
}

export async function saveInvoice(invoice, currentInvoices) {
  return await saveRecord('erp_invoices', invoice, ERP_INVOICES_KEY, currentInvoices);
}

export async function getJournalEntries() {
  return await fetchCollection('erp_journal_entries', INITIAL_JOURNAL_ENTRIES, ERP_JOURNAL_KEY);
}

export async function saveJournalEntry(entry, currentEntries) {
  return await saveRecord('erp_journal_entries', entry, ERP_JOURNAL_KEY, currentEntries);
}
