import { products } from './productsData';

export const serviceCategories = [
  {
    id: 'business-infrastructure',
    name: 'Business Infrastructure',
    shortName: 'Infrastructure',
    tagline: 'The systems your business runs on.',
    description: 'The systems your business runs on: CRM, finance, operations, internal tools, dashboards and workflows.',
    image: '/operations.jpg',
    stats: [
      { value: '100%', label: 'Data & Code Ownership' },
      { value: '1', label: 'Reliable Source of Truth' },
      { value: '80%', label: 'Manual Ops Eliminated' },
    ],
    productIds: ['ai-finance-director', 'ai-workforce-autonomous-agents', 'business-automation-engine'],
  },
  {
    id: 'applied-ai',
    name: 'Applied AI',
    shortName: 'Applied AI',
    tagline: 'AI that does real work.',
    description: 'AI put to work on specific tasks: sales outreach, lead handling, document processing and reporting.',
    image: '/ai-finance.jpg',
    stats: [
      { value: '24/7', label: 'Active Response' },
      { value: '<60s', label: 'Lead Handling Speed' },
      { value: '100%', label: 'Human-in-Control' },
    ],
    productIds: ['ai-outreach-prospecting', 'lead-intelligence-platform'],
  },
  {
    id: 'digital-growth',
    name: 'Digital Growth',
    shortName: 'Digital Growth',
    tagline: 'Turn attention into customers.',
    description: 'Websites and pages built to bring in attention and turn it into leads and customers.',
    image: '/sales-revenue.jpg',
    stats: [
      { value: '10x', label: 'Conversion Velocity' },
      { value: '100%', label: 'Workflow-Connected' },
      { value: 'Live', label: 'Tracking & Analytics' },
    ],
    productIds: ['revenue-command-center', 'customer-operations-system', 'workforce-operations-platform', 'ahmv-systems-full'],
  },
  {
    id: 'bespoke-engineering',
    name: 'Bespoke Engineering',
    shortName: 'Bespoke',
    tagline: 'Built around your business, not a template.',
    description: 'Custom software for problems that don’t fit anything off the shelf.',
    image: '/custom-software.jpg',
    stats: [
      { value: '100%', label: 'Custom Architecture' },
      { value: 'Zero', label: 'Template Bloat' },
      { value: '∞', label: 'Process Scalability' },
    ],
    productIds: ['custom-software-studio', 'ahmv-systems-full'],
  },
];

// Helper: get products for a category (with legacy alias mapping)
export function getProductsByCategory(categoryId) {
  const aliases = {
    'sales-revenue': 'digital-growth',
    'operations-automation': 'business-infrastructure',
    'ai-finance': 'applied-ai',
    'custom-enterprise': 'bespoke-engineering',
    'custom-software': 'bespoke-engineering',
  };
  const resolvedId = aliases[categoryId] || categoryId;
  const cat = serviceCategories.find(c => c.id === resolvedId);
  if (!cat) return products;
  return products.filter(p => cat.productIds.includes(p.id));
}
