import { products } from './productsData';

export const serviceCategories = [
  {
    id: 'sales-revenue',
    name: 'Sales & Revenue Systems',
    shortName: 'Sales & Revenue',
    tagline: 'Automated systems to book meetings.',
    description: 'Automated lead generation and pipeline management. Replaces manual prospecting with deterministic systems.',
    image: '/sales-revenue.jpg',
    stats: [
      { value: '10x', label: 'Pipeline Output' },
      { value: '<60s', label: 'Lead Response' },
      { value: '100%', label: 'Pipeline Visibility' },
    ],
    productIds: ['ai-outreach-prospecting', 'lead-intelligence-platform', 'revenue-command-center'],
  },
  {
    id: 'operations-automation',
    name: 'Operations & Automation',
    shortName: 'Operations',
    tagline: 'Automated client delivery and onboarding.',
    description: 'Automate client onboarding, support tickets, and project tracking.',
    image: '/operations.jpg',
    stats: [
      { value: '80%', label: 'Manual Ops Cut' },
      { value: '10min', label: 'Support Resolution' },
      { value: '0', label: 'Dropped Handoffs' },
    ],
    productIds: ['business-automation-engine', 'customer-operations-system'],
  },
  {
    id: 'ai-finance',
    name: 'AI & Finance Intelligence',
    shortName: 'AI & Finance',
    tagline: 'Autonomous agents and automated finance.',
    description: 'Deploy AI agents for support and data entry. Automate your invoicing and cash flow tracking.',
    image: '/ai-finance.jpg',
    stats: [
      { value: '24/7', label: 'Autonomous Ops' },
      { value: '14d', label: 'Faster Collections' },
      { value: '0', label: 'Headcount Needed' },
    ],
    productIds: ['ai-finance-director', 'ai-workforce-autonomous-agents'],
  },
  {
    id: 'custom-enterprise',
    name: 'Custom Software & Full OS',
    shortName: 'Custom & Enterprise',
    tagline: 'Custom software built for your business.',
    description: 'Bespoke web applications, private databases, and full operating systems. 100% owned by you.',
    image: '/custom-software.jpg',
    stats: [
      { value: '100%', label: 'Code Ownership' },
      { value: '1', label: 'Unified Dashboard' },
      { value: '∞', label: 'Scalability' },
    ],
    productIds: ['custom-software-studio', 'workforce-operations-platform', 'ahmv-systems-full'],
  },
];

// Helper: get products for a category
export function getProductsByCategory(categoryId) {
  const cat = serviceCategories.find(c => c.id === categoryId);
  if (!cat) return [];
  return products.filter(p => cat.productIds.includes(p.id));
}
