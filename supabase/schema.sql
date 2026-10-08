-- ==============================================================================
-- AHMV SYSTEMS — UNIFIED SUPABASE DATABASE SCHEMA
-- For: CRM Suite, Admin Intake Command Center, and Financial ERP & Accounting
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ──────────────────────────────────────────────────────────────────────────────
-- 1. ENUMS
-- ──────────────────────────────────────────────────────────────────────────────
DO $$ BEGIN
    CREATE TYPE deal_stage AS ENUM ('lead_catch', 'diagnosis', 'architecture', 'proposal', 'deal_won', 'deployment', 'retainer', 'lost');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE intake_type AS ENUM ('audit_60s', 'operations_review', 'whop_checkout', 'direct_consultation');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE intake_status AS ENUM ('new', 'in_review', 'converted_to_crm', 'archived');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE account_category AS ENUM ('asset', 'liability', 'equity', 'revenue', 'expense');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE invoice_status AS ENUM ('draft', 'pending', 'paid', 'overdue', 'cancelled');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- ──────────────────────────────────────────────────────────────────────────────
-- 2. CRM & PIPELINE TABLES
-- ──────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS crm_deals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_name TEXT NOT NULL,
    contact_name TEXT NOT NULL,
    contact_email TEXT NOT NULL,
    contact_phone TEXT,
    stage deal_stage NOT NULL DEFAULT 'lead_catch',
    deal_value NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    currency TEXT NOT NULL DEFAULT 'AED',
    probability INT NOT NULL DEFAULT 20,
    bottleneck TEXT,
    system_interested TEXT,
    whop_plan_id TEXT,
    lead_source TEXT DEFAULT 'Diagnostic Audit',
    tags TEXT[] DEFAULT '{}',
    notes TEXT,
    assigned_to TEXT DEFAULT 'Operations Lead',
    expected_close_date DATE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS crm_activities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    deal_id UUID REFERENCES crm_deals(id) ON DELETE CASCADE,
    activity_type TEXT NOT NULL, -- 'call', 'note', 'stage_change', 'proposal_sent', 'whop_link'
    title TEXT NOT NULL,
    description TEXT,
    performed_by TEXT DEFAULT 'AHMV Executive',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ──────────────────────────────────────────────────────────────────────────────
-- 3. ADMIN & INTAKE SUBMISSIONS TABLE
-- ──────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS intake_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    intake_type intake_type NOT NULL DEFAULT 'audit_60s',
    contact_name TEXT NOT NULL,
    contact_email TEXT NOT NULL,
    company_name TEXT,
    business_type TEXT,
    team_size TEXT,
    bottleneck TEXT,
    goal TEXT,
    answers JSONB DEFAULT '{}'::jsonb,
    estimated_annual_debt NUMERIC(12, 2) DEFAULT 0.00,
    status intake_status NOT NULL DEFAULT 'new',
    crm_deal_id UUID REFERENCES crm_deals(id) ON DELETE SET NULL,
    ip_address TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ──────────────────────────────────────────────────────────────────────────────
-- 4. FINANCIAL ERP & ACCOUNTING TABLES
-- ──────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS erp_chart_of_accounts (
    account_code TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    category account_category NOT NULL,
    sub_category TEXT,
    balance NUMERIC(14, 2) NOT NULL DEFAULT 0.00,
    currency TEXT NOT NULL DEFAULT 'AED',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS erp_journal_entries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    entry_number TEXT UNIQUE NOT NULL,
    entry_date DATE NOT NULL DEFAULT CURRENT_DATE,
    description TEXT NOT NULL,
    reference_id TEXT, -- e.g. Invoice # or Whop Transaction ID
    total_debit NUMERIC(14, 2) NOT NULL DEFAULT 0.00,
    total_credit NUMERIC(14, 2) NOT NULL DEFAULT 0.00,
    is_posted BOOLEAN DEFAULT TRUE,
    created_by TEXT DEFAULT 'System',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS erp_journal_lines (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    journal_entry_id UUID REFERENCES erp_journal_entries(id) ON DELETE CASCADE,
    account_code TEXT REFERENCES erp_chart_of_accounts(account_code),
    debit NUMERIC(14, 2) NOT NULL DEFAULT 0.00,
    credit NUMERIC(14, 2) NOT NULL DEFAULT 0.00,
    description TEXT
);

CREATE TABLE IF NOT EXISTS erp_invoices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    invoice_number TEXT UNIQUE NOT NULL,
    crm_deal_id UUID REFERENCES crm_deals(id) ON DELETE SET NULL,
    client_name TEXT NOT NULL,
    client_company TEXT NOT NULL,
    client_email TEXT NOT NULL,
    client_address TEXT,
    issue_date DATE NOT NULL DEFAULT CURRENT_DATE,
    due_date DATE NOT NULL,
    currency TEXT NOT NULL DEFAULT 'AED',
    line_items JSONB NOT NULL DEFAULT '[]'::jsonb,
    subtotal NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    vat_rate NUMERIC(5, 2) NOT NULL DEFAULT 5.00, -- UAE 5% VAT default
    vat_amount NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    total_amount NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    status invoice_status NOT NULL DEFAULT 'pending',
    payment_method TEXT,
    paid_at TIMESTAMPTZ,
    whop_checkout_url TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS erp_expenses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    expense_number TEXT UNIQUE NOT NULL,
    category TEXT NOT NULL, -- e.g., 'Cloud Infrastructure', 'AI Tokens / LLMs', 'Software Subscriptions', 'Salaries'
    vendor TEXT NOT NULL,
    description TEXT NOT NULL,
    amount NUMERIC(12, 2) NOT NULL,
    currency TEXT NOT NULL DEFAULT 'AED',
    tax_deductible BOOLEAN DEFAULT TRUE,
    payment_account TEXT REFERENCES erp_chart_of_accounts(account_code),
    expense_date DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ──────────────────────────────────────────────────────────────────────────────
-- 5. INITIAL SEED DATA (CHART OF ACCOUNTS & SYSTEMS)
-- ──────────────────────────────────────────────────────────────────────────────
INSERT INTO erp_chart_of_accounts (account_code, name, category, sub_category, balance, currency)
VALUES
  ('1010', 'Primary Operating Bank Account (ENBD)', 'asset', 'Cash & Equivalents', 285400.00, 'AED'),
  ('1020', 'Whop Merchant Payout Balance', 'asset', 'Merchant Clearing', 48900.00, 'AED'),
  ('1030', 'Stripe Processing Account', 'asset', 'Merchant Clearing', 32150.00, 'AED'),
  ('1200', 'Accounts Receivable (Invoiced Clients)', 'asset', 'Receivables', 115000.00, 'AED'),
  ('2010', 'Accounts Payable & Vendor Accruals', 'liability', 'Payables', 18400.00, 'AED'),
  ('2020', 'VAT Payable (5% UAE Tax Authority)', 'liability', 'Taxes', 14200.00, 'AED'),
  ('2030', 'Unearned Revenue / Retainer Deposits', 'liability', 'Deferred Revenue', 45000.00, 'AED'),
  ('3010', 'Founder Equity & Retained Earnings', 'equity', 'Equity', 260000.00, 'AED'),
  ('4010', 'System Architecture & Implementation Fees', 'revenue', 'Primary Revenue', 395000.00, 'AED'),
  ('4020', 'Recurring Monthly Retainers (Ops & AI Maintenance)', 'revenue', 'Recurring Revenue', 184000.00, 'AED'),
  ('4030', 'Whop Software Licensing & Standalone Engines', 'revenue', 'Product Revenue', 92500.00, 'AED'),
  ('5010', 'Cloud Compute & Hosting (AWS / Supabase / Vercel)', 'expense', 'Operations Cost', 12400.00, 'AED'),
  ('5020', 'LLM API Consumption (OpenAI / Anthropic)', 'expense', 'Operations Cost', 18900.00, 'AED'),
  ('5030', 'Software Subscriptions (Tool Consolidation)', 'expense', 'OpEx', 8500.00, 'AED'),
  ('5040', 'Engineering & Operations Contractor Payroll', 'expense', 'Direct Labor', 84000.00, 'AED')
ON CONFLICT (account_code) DO NOTHING;

-- ──────────────────────────────────────────────────────────────────────────────
-- 6. ROW LEVEL SECURITY (RLS) POLICIES
-- ──────────────────────────────────────────────────────────────────────────────
ALTER TABLE crm_deals ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE intake_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE erp_chart_of_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE erp_journal_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE erp_journal_lines ENABLE ROW LEVEL SECURITY;
ALTER TABLE erp_invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE erp_expenses ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users / service role full read/write, public insert for intakes
CREATE POLICY "Public can submit intake forms" ON intake_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated users full access on deals" ON crm_deals FOR ALL USING (true);
CREATE POLICY "Authenticated users full access on activities" ON crm_activities FOR ALL USING (true);
CREATE POLICY "Authenticated users full access on intakes" ON intake_submissions FOR ALL USING (true);
CREATE POLICY "Authenticated users full access on erp_accounts" ON erp_chart_of_accounts FOR ALL USING (true);
CREATE POLICY "Authenticated users full access on erp_journals" ON erp_journal_entries FOR ALL USING (true);
CREATE POLICY "Authenticated users full access on erp_journal_lines" ON erp_journal_lines FOR ALL USING (true);
CREATE POLICY "Authenticated users full access on erp_invoices" ON erp_invoices FOR ALL USING (true);
CREATE POLICY "Authenticated users full access on erp_expenses" ON erp_expenses FOR ALL USING (true);
