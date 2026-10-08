import { fetchCollection, saveRecord, deleteRecord } from '../../../lib/supabase';

export const INITIAL_INTAKES = [
  {
    id: 'intake-101',
    intake_type: 'audit_60s',
    contact_name: 'Sultan Al-Ghurair',
    contact_email: 'sultan@ghurair-trade.com',
    company_name: 'Al-Ghurair Commodities',
    business_type: 'B2B services',
    team_size: '26 to 50',
    bottleneck: 'Finance or invoicing',
    goal: 'Better financial control',
    estimated_annual_debt: 124000,
    status: 'new',
    created_at: '2026-10-01T08:15:00Z',
    answers: {
      businessType: 'B2B services',
      teamSize: '26 to 50',
      lossArea: 'Finance or invoicing',
      improvementGoal: 'Better financial control',
      software_count: 7,
      manual_hours_weekly: 18,
    },
  },
  {
    id: 'intake-102',
    intake_type: 'operations_review',
    contact_name: 'Laila Al-Mansoor',
    contact_email: 'laila@qamarholding.ae',
    company_name: 'Qamar Hospitality & Leisure',
    business_type: 'B2C services',
    team_size: '101 to 250',
    bottleneck: 'Customer handling',
    goal: 'Faster response and follow-up',
    estimated_annual_debt: 285000,
    status: 'in_review',
    created_at: '2026-09-30T17:40:00Z',
    answers: {
      businessType: 'B2C services',
      teamSize: '101 to 250',
      lossArea: 'Customer handling',
      improvementGoal: 'Faster response and follow-up',
      description: 'Customer inquiries across 4 hotel properties get lost in WhatsApp and email folders.',
    },
  },
  {
    id: 'intake-103',
    intake_type: 'whop_checkout',
    contact_name: 'David Sterling',
    contact_email: 'david@sterlingb2b.co.uk',
    company_name: 'Sterling Outreach Partners',
    business_type: 'Professional services',
    team_size: '11 to 25',
    bottleneck: 'Lead generation or follow-up',
    goal: 'More qualified opportunities',
    estimated_annual_debt: 92000,
    status: 'converted_to_crm',
    created_at: '2026-09-29T11:20:00Z',
    answers: {
      whop_plan: 'plan_ffu8TjQcsIDKf',
      product_name: 'AI Sales Acceleration Platform',
      amount_paid: 'Free Instant Provisioning',
    },
  },
  {
    id: 'intake-104',
    intake_type: 'audit_60s',
    contact_name: 'Kareem Barakat',
    contact_email: 'kareem@barakatcapital.com',
    company_name: 'Barakat Private Equity',
    business_type: 'B2B services',
    team_size: '11 to 25',
    bottleneck: 'Disconnected software',
    goal: 'Better visibility into operations',
    estimated_annual_debt: 78000,
    status: 'new',
    created_at: '2026-09-28T14:05:00Z',
    answers: {
      businessType: 'B2B services',
      teamSize: '11 to 25',
      lossArea: 'Disconnected software',
      improvementGoal: 'Better visibility into operations',
      tools_used: ['Salesforce', 'Asana', 'Excel', 'Quickbooks'],
    },
  },
  {
    id: 'intake-105',
    intake_type: 'direct_consultation',
    contact_name: 'Nadia El-Sayed',
    contact_email: 'nadia@zenithexperience.com',
    company_name: 'Zenith Luxury Events',
    business_type: 'B2B services',
    team_size: '1 to 10 people',
    bottleneck: 'Internal operations',
    goal: 'Less manual work',
    estimated_annual_debt: 45000,
    status: 'archived',
    created_at: '2026-09-25T09:30:00Z',
    answers: {
      description: 'Vendor contract tracking is manual. Looking for bespoke portal.',
    },
  },
];

const INTAKES_STORAGE_KEY = 'ahmv_intakes_store_v1';

export async function getIntakes() {
  return await fetchCollection('intake_submissions', INITIAL_INTAKES, INTAKES_STORAGE_KEY);
}

export async function saveIntake(intake, currentIntakes) {
  return await saveRecord('intake_submissions', intake, INTAKES_STORAGE_KEY, currentIntakes);
}

export async function removeIntake(intakeId, currentIntakes) {
  return await deleteRecord('intake_submissions', intakeId, INTAKES_STORAGE_KEY, currentIntakes);
}
