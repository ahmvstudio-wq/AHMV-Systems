import { fetchCollection, saveRecord, deleteRecord } from '../../../lib/supabase';

export const CRM_STAGES = [
  { id: 'lead_catch', label: 'Lead Catch', color: '#3B82F6', icon: '📥' },
  { id: 'diagnosis', label: '60s Diagnosis', color: '#8B5CF6', icon: '🔍' },
  { id: 'architecture', label: 'System Design', color: '#F59E0B', icon: '📐' },
  { id: 'proposal', label: 'Proposal Sent', color: '#EC4899', icon: '📄' },
  { id: 'deal_won', label: 'Won / In Deployment', color: '#10B981', icon: '🚀' },
  { id: 'retainer', label: 'Active Retainer', color: '#059669', icon: '🛡️' },
];

export const INITIAL_DEALS = [
  {
    id: 'deal-001',
    company_name: 'Apex Capital Advisors',
    contact_name: 'Faris Al-Nuaimi',
    contact_email: 'faris@apexcapital.ae',
    contact_phone: '+971 50 892 4190',
    stage: 'deal_won',
    deal_value: 85000,
    currency: 'AED',
    probability: 100,
    bottleneck: 'Finance & multi-currency ERP reporting latency',
    system_interested: 'Financial Management & Accounting ERP',
    whop_plan_id: 'plan_tTvgsaX40wEMH',
    lead_source: 'Diagnostic Audit',
    tags: ['VIP', 'Enterprise', 'Finance ERP'],
    notes: 'Completed discovery call. Needs multi-entity VAT breakdown and Stripe/Whop automated reconciliations. System architecture approved.',
    assigned_to: 'Mohammed Rehan',
    expected_close_date: '2026-10-15',
    created_at: '2026-09-24T10:30:00Z',
    activities: [
      { type: 'call', title: 'Executive Operations Discovery Call', date: '2026-09-25T14:00:00Z', text: 'Reviewed current Excel accounting debt. 14hrs/week wasted on manual ledger entries.' },
      { type: 'stage_change', title: 'Moved to System Architecture', date: '2026-09-27T09:15:00Z', text: 'Proposed custom Python/PostgreSQL chart of accounts module.' },
      { type: 'proposal_sent', title: 'Invoice & Proposal Dispatched', date: '2026-09-29T11:00:00Z', text: 'Sent formal 85,000 AED implementation contract.' },
      { type: 'stage_change', title: 'Deal Won & Deposit Received', date: '2026-09-30T16:45:00Z', text: 'Deposit verified. SOW signed.' },
    ],
  },
  {
    id: 'deal-002',
    company_name: 'Solaria Real Estate Group',
    contact_name: 'Elena Rostova',
    contact_email: 'elena@solariagroup.com',
    contact_phone: '+971 52 441 9081',
    stage: 'architecture',
    deal_value: 65000,
    currency: 'AED',
    probability: 70,
    bottleneck: 'Property maintenance tickets and lease lifecycle in spreadsheets',
    system_interested: 'Property & Facility Management System',
    whop_plan_id: 'plan_wczKusGx2Pjb1',
    lead_source: 'Website 60s Audit',
    tags: ['Real Estate', 'Facility Ops'],
    notes: 'Manages 140 luxury residential units in Downtown Dubai. Tenants reporting delays in ticket resolution.',
    assigned_to: 'Operations Lead',
    expected_close_date: '2026-10-20',
    created_at: '2026-09-26T14:10:00Z',
    activities: [
      { type: 'intake', title: 'Submitted 60s Audit', date: '2026-09-26T14:10:00Z', text: 'Reported 12hrs/week loss on tenant maintenance coordination.' },
      { type: 'call', title: 'Diagnostic Call with COO', date: '2026-09-28T16:00:00Z', text: 'Walked through WhatsApp-integrated ticketing bot and tenant portal demo.' },
    ],
  },
  {
    id: 'deal-003',
    company_name: 'Vanguard Growth Agency',
    contact_name: 'Marcus Vance',
    contact_email: 'marcus@vanguardscale.io',
    contact_phone: '+44 7911 123456',
    stage: 'proposal',
    deal_value: 45000,
    currency: 'USD',
    probability: 60,
    bottleneck: 'Cold outbound prospecting and rep qualification overhead',
    system_interested: 'AI Sales Acceleration Platform',
    whop_plan_id: 'plan_ffu8TjQcsIDKf',
    lead_source: 'Whop Marketplace',
    tags: ['Applied AI', 'Outbound Engine'],
    notes: 'Scaling B2B SDR outbound team. Wants automated prospect enrichment and multi-channel followup sequence engine.',
    assigned_to: 'Mohammed Rehan',
    expected_close_date: '2026-10-10',
    created_at: '2026-09-28T08:45:00Z',
    activities: [
      { type: 'whop_link', title: 'Whop Access Token Created', date: '2026-09-28T09:00:00Z', text: 'Sent Whop checkout link plan_ffu8TjQcsIDKf.' },
      { type: 'proposal_sent', title: 'Custom Architecture Deck Sent', date: '2026-09-30T15:30:00Z', text: 'Outlined Smartlead + PostgreSQL webhooks integration.' },
    ],
  },
  {
    id: 'deal-004',
    company_name: 'Kite Luxury Logistics',
    contact_name: 'Tariq Mansoor',
    contact_email: 'tariq@kitelogistics.com',
    contact_phone: '+971 55 901 2234',
    stage: 'lead_catch',
    deal_value: 38000,
    currency: 'AED',
    probability: 25,
    bottleneck: 'Manual operations & WhatsApp order routing',
    system_interested: 'Executive Operations Command Center',
    whop_plan_id: 'plan_cMGp6qIvGiaFV',
    lead_source: 'Operations Review Form',
    tags: ['Logistics', 'Operations'],
    notes: 'Inbound submission from operations review form. Experiencing disconnected driver dispatch and customer updates.',
    assigned_to: 'Operations Lead',
    expected_close_date: '2026-11-01',
    created_at: '2026-10-01T06:20:00Z',
    activities: [
      { type: 'intake', title: 'Operations Review Form Submitted', date: '2026-10-01T06:20:00Z', text: 'Detailed driver dispatch bottleneck.' },
    ],
  },
  {
    id: 'deal-005',
    company_name: 'Artisan Heritage Atelier',
    contact_name: 'Claire Beauchamp',
    contact_email: 'c.beauchamp@atelierheritage.fr',
    contact_phone: '+33 6 12 34 56 78',
    stage: 'retainer',
    deal_value: 120000,
    currency: 'AED',
    probability: 100,
    bottleneck: 'Custom bespoke e-commerce customizer & checkout logic',
    system_interested: 'Artisan D2C E-commerce Platform',
    whop_plan_id: 'plan_n2VOVhwTZ0Hv7',
    lead_source: 'Referral',
    tags: ['D2C', 'Active Retainer', 'High LTV'],
    notes: 'Live on production. Ongoing monthly operations & maintenance retainer (12,000 AED/mo).',
    assigned_to: 'Mohammed Rehan',
    expected_close_date: '2026-08-15',
    created_at: '2026-08-01T12:00:00Z',
    activities: [
      { type: 'note', title: 'Monthly Retainer Optimization Review', date: '2026-09-28T10:00:00Z', text: 'Checked customizer state engine. 99.98% uptime, zero cart drops.' },
    ],
  },
];

const CRM_STORAGE_KEY = 'ahmv_crm_deals_store_v1';

export async function getDeals() {
  return await fetchCollection('crm_deals', INITIAL_DEALS, CRM_STORAGE_KEY);
}

export async function saveDeal(deal, currentDeals) {
  return await saveRecord('crm_deals', deal, CRM_STORAGE_KEY, currentDeals);
}

export async function removeDeal(dealId, currentDeals) {
  return await deleteRecord('crm_deals', dealId, CRM_STORAGE_KEY, currentDeals);
}
