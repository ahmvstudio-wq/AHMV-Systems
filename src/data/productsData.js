export const products = [
  {
    id: 'ai-outreach-prospecting',
    title: 'AI Sales Acceleration Platform',
    category: 'Applied AI',
    categorySlug: 'sales',
    badge: 'Sales Technology',
    price: 'Custom Quote',
    priceNote: 'Instant Access via Whop',
    checkoutUrl: 'https://whop.com/checkout/plan_ffu8TjQcsIDKf',
    shortDesc: 'Researches prospects, personalises outreach, manages follow-up, tracks calls and builds proposals.',
    highlightMetric: 'Cut Manual Sales Work',
    deliverables: [
      'Automated Prospect Research & Enrichment',
      'Tailored Pitch Generator',
      'Follow-up Sequence Automation',
      'Call Tracking & Meeting Booking',
      'Proposal Auto-Assembly'
    ],
    architecture: {
      step1: 'Data Ingestion & Research',
      step2: 'LLM Qualification & Personalisation',
      step3: 'Sequence Dispatch',
      step4: 'CRM Handoff & Booking'
    },
    techStack: ['OpenAI', 'Smartlead', 'PostgreSQL', 'Webhooks'],
    targetAudience: 'B2B companies seeking outbound scale without SDR overhead.'
  },
  {
    id: 'lead-intelligence-platform',
    title: 'SIQR Prospecting Engine',
    category: 'Applied AI',
    categorySlug: 'sales',
    badge: 'Standalone Product',
    price: 'Custom Quote',
    priceNote: 'Instant Access via Whop',
    checkoutUrl: 'https://whop.com/checkout/plan_ftNV6aTy0u41A',
    shortDesc: 'The same prospecting and outreach engine, packaged as a standalone, brandable product other businesses can run.',
    highlightMetric: 'Autonomous Engine',
    deliverables: [
      'Multi-tenant Prospecting Engine',
      'Autonomous Conversation Router',
      'Brandable Client Workspace',
      'Direct CRM Sync Matrix',
      'Campaign Analytics Dashboard'
    ],
    architecture: {
      step1: 'Lead Catch & Scoring',
      step2: 'Intent Validation',
      step3: 'Conversation Automation',
      step4: 'Rep Notification'
    },
    techStack: ['Node.js', 'WhatsApp API', 'Supabase', 'Webhooks'],
    targetAudience: 'Agencies and enterprises needing brandable sales tech.'
  },
  {
    id: 'revenue-command-center',
    title: 'Automated Social Content Engine',
    category: 'Digital Growth',
    categorySlug: 'growth',
    badge: 'Marketing Operations',
    price: 'Custom Quote',
    priceNote: 'Instant Access via Whop',
    checkoutUrl: 'https://whop.com/checkout/plan_saYo91hpRZfKG',
    shortDesc: 'Takes finished copy through design, review and scheduled publishing automatically.',
    highlightMetric: 'Automated Publishing Flow',
    deliverables: [
      'Automated Content Queue',
      'Design Template Auto-Populator',
      'Review & Approval Portal',
      'Multi-Platform Scheduler',
      'Engagement Performance Tracker'
    ],
    architecture: {
      step1: 'Draft Ingestion',
      step2: 'Template Generation',
      step3: 'Approval Checkpoint',
      step4: 'Scheduled Dispatch'
    },
    techStack: ['React', 'Python', 'PostgreSQL', 'Social APIs'],
    targetAudience: 'Teams wanting predictable social output without daily manual work.'
  },
  {
    id: 'business-automation-engine',
    title: 'Executive Operations Command Center',
    category: 'Business Infrastructure',
    categorySlug: 'ops',
    badge: 'Operations Control',
    price: 'Custom Quote',
    priceNote: 'Instant Access via Whop',
    checkoutUrl: 'https://whop.com/checkout/plan_cMGp6qIvGiaFV',
    shortDesc: 'One live dashboard pulling data from every connected system, with alerts when something needs attention.',
    highlightMetric: 'Single Source of Truth',
    deliverables: [
      'Unified Business Dashboard',
      'Cross-Tool Data Sync Engine',
      'Real-time Anomaly Alerts',
      'Operational Health Metrics',
      'Automated Executive Reports'
    ],
    architecture: {
      step1: 'Event Ingestion',
      step2: 'Data Normalisation',
      step3: 'Alert Rule Evaluation',
      step4: 'Live Dashboard Updates'
    },
    techStack: ['Node.js', 'Redis', 'PostgreSQL', 'Docker'],
    targetAudience: 'Leadership needing clear visibility across operations.'
  },
  {
    id: 'customer-operations-system',
    title: 'Corporate Digital Experience & AI Hub',
    category: 'Digital Growth',
    categorySlug: 'growth',
    badge: 'Engagement Hub',
    price: 'Custom Quote',
    priceNote: 'Instant Access via Whop',
    checkoutUrl: 'https://whop.com/checkout/plan_d0FscrEMdXXJu',
    shortDesc: 'An interactive site with a live AI demo, a readiness quiz, and built-in lead capture.',
    highlightMetric: 'Interactive Lead Generation',
    deliverables: [
      'Interactive AI Demonstration',
      'System Readiness Assessment Quiz',
      'Integrated Lead Capture Matrix',
      'Applicant & Client Portal',
      'Conversion Analytics'
    ],
    architecture: {
      step1: 'Visitor Interaction',
      step2: 'Dynamic Quiz Scoring',
      step3: 'Lead Data Capture',
      step4: 'CRM Auto-Sync'
    },
    techStack: ['React', 'Three.js', 'Supabase', 'AWS'],
    targetAudience: 'Companies looking to turn digital traffic into qualified leads.'
  },
  {
    id: 'ai-finance-director',
    title: 'Financial Management & Accounting ERP',
    category: 'Business Infrastructure',
    categorySlug: 'finance',
    badge: 'Accounting ERP',
    price: 'Custom Quote',
    priceNote: 'Instant Access via Whop',
    checkoutUrl: 'https://whop.com/checkout/plan_tTvgsaX40wEMH',
    shortDesc: 'Full accounting: structured accounts, financial statements, VAT calculations and inventory in one system.',
    highlightMetric: 'Real-time Financial Clarity',
    deliverables: [
      'Structured Chart of Accounts',
      'Real-Time Financial Statements (P&L, Balance Sheet)',
      'Automated VAT & Tax Calculations',
      'Settlement & Aging Tracker',
      'Integrated Inventory Control'
    ],
    architecture: {
      step1: 'Transaction Ingestion',
      step2: 'Automated Classification',
      step3: 'Tax & VAT Calculation',
      step4: 'Ledger Commit & Reporting'
    },
    techStack: ['Python', 'PostgreSQL', 'Stripe', 'FastAPI'],
    targetAudience: 'Businesses replacing three or four disconnected accounting tools.'
  },
  {
    id: 'ai-workforce-autonomous-agents',
    title: 'Property & Facility Management System',
    category: 'Business Infrastructure',
    categorySlug: 'ops',
    badge: 'Facility Operations',
    price: 'Custom Quote',
    priceNote: 'Instant Access via Whop',
    checkoutUrl: 'https://whop.com/checkout/plan_wczKusGx2Pjb1',
    shortDesc: 'Units, tenants, leases, maintenance tickets, occupancy and revenue in one place.',
    highlightMetric: 'Centralized Property Control',
    deliverables: [
      'Tenant & Unit Registry',
      'Lease Lifecycle Management',
      'Automated Maintenance Ticketing',
      'Occupancy & Revenue Tracking',
      'Owner Reporting Portal'
    ],
    architecture: {
      step1: 'Tenant Interaction / Ticket Catch',
      step2: 'Work Order Routing',
      step3: 'Contract Tracking',
      step4: 'Revenue Reconciliation'
    },
    techStack: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
    targetAudience: 'Property managers and operators replacing spreadsheets and email.'
  },
  {
    id: 'custom-software-studio',
    title: 'Corporate Venture Showcase Website',
    category: 'Digital Growth',
    categorySlug: 'growth',
    badge: 'Digital Experience',
    price: 'Custom Quote',
    priceNote: 'Instant Access via Whop',
    checkoutUrl: 'https://whop.com/checkout/plan_QMWiTc4L5ddlt',
    shortDesc: 'A polished multi-division site built for investors, partners and customers.',
    highlightMetric: 'High-Impact Brand Presence',
    deliverables: [
      'Multi-division Corporate Architecture',
      'Interactive Portfolio Viewer',
      'Investor & Partner Data Rooms',
      'Press & Performance Center',
      'Global CDN Deployment'
    ],
    architecture: {
      step1: 'Brand Architecture Design',
      step2: 'Interactive UI Build',
      step3: 'Data Room Integration',
      step4: 'Global Edge Deployment'
    },
    techStack: ['React', 'GSAP', 'Next.js', 'Edge CDN'],
    targetAudience: 'Multi-division ventures and holding companies.'
  },
  {
    id: 'workforce-operations-platform',
    title: 'Artisan D2C E-commerce Platform',
    category: 'Digital Growth',
    categorySlug: 'growth',
    badge: 'E-commerce',
    price: 'Custom Quote',
    priceNote: 'Instant Access via Whop',
    checkoutUrl: 'https://whop.com/checkout/plan_n2VOVhwTZ0Hv7',
    shortDesc: 'Custom product builder, delivery scheduling and a branded checkout.',
    highlightMetric: 'Tailored Conversion Flow',
    deliverables: [
      'Interactive Product Customizer',
      'Dynamic Delivery Scheduler',
      'Branded Frictionless Checkout',
      'Order Fulfillment Sync',
      'Customer Retention Automation'
    ],
    architecture: {
      step1: 'Customizer State Engine',
      step2: 'Delivery Route Logic',
      step3: 'Payment Gateway Execution',
      step4: 'Fulfillment Dispatch'
    },
    techStack: ['React', 'Stripe', 'Node.js', 'PostgreSQL'],
    targetAudience: 'D2C brands that need custom checkout experiences.'
  },
  {
    id: 'ahmv-systems-full',
    title: 'B2B Consulting & Lead Generation Portal',
    category: 'Digital Growth',
    categorySlug: 'growth',
    badge: 'Lead Portal',
    price: 'Custom Quote',
    priceNote: 'Instant Access via Whop',
    checkoutUrl: 'https://whop.com/checkout/plan_dBOz6kwNZdCVK',
    shortDesc: 'ROI calculator and a guided quiz that routes qualified leads automatically.',
    highlightMetric: 'Self-Serve Qualification',
    deliverables: [
      'Interactive Value & ROI Calculator',
      'Dynamic Needs Assessment Flow',
      'Lead Qualification Router',
      'Automated Consultation Booking',
      'Pipeline Integration'
    ],
    architecture: {
      step1: 'Input Calculation Logic',
      step2: 'Diagnostic Assessment',
      step3: 'Calendar Sync',
      step4: 'CRM Pipeline Commit'
    },
    techStack: ['React', 'Node.js', 'PostgreSQL', 'Calendar APIs'],
    targetAudience: 'Consultancies and agencies wanting to educate and qualify buyers before the call.'
  }
];
