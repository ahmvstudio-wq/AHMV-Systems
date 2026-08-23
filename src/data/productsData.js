export const products = [
  {
    id: 'ai-outreach-prospecting',
    title: 'AI Outreach & Prospecting',
    category: 'Sales & Revenue',
    categorySlug: 'sales',
    badge: 'Autonomous B2B Growth',
    price: 'Custom Quote',
    priceNote: 'Instant Access via Whop',
    checkoutUrl: 'https://whop.com/checkout/plan_ffu8TjQcsIDKf',
    shortDesc: 'Automated cold email and LinkedIn outreach with AI calendar booking.',
    highlightMetric: '10x Pipeline Output',
    deliverables: [
      'B2B Prospect Enrichment',
      'AI Copy Generator',
      'Multi-Inbox Warmup',
      'Instant Response Listener',
      'Meeting Booking Bot'
    ],
    architecture: {
      step1: 'Data Ingestion',
      step2: 'LLM Tagging',
      step3: 'Sequence Dispatch',
      step4: 'CRM Handoff'
    },
    techStack: ['OpenAI', 'Smartlead', 'PostgreSQL', 'Webhooks'],
    targetAudience: 'B2B Founders seeking outbound scale.'
  },
  {
    id: 'lead-intelligence-platform',
    title: 'Lead Intelligence Platform',
    category: 'Sales & Revenue',
    categorySlug: 'sales',
    badge: 'Inbound Acceleration',
    price: 'Custom Quote',
    priceNote: 'Instant Access via Whop',
    checkoutUrl: 'https://whop.com/checkout/plan_ftNV6aTy0u41A',
    shortDesc: 'Capture inbound visitors, score intent, and follow up instantly.',
    highlightMetric: '< 60s Lead Response',
    deliverables: [
      'Omnichannel Webhook Gateway',
      'Intent Scoring Engine',
      'Automated Follow-up Sequences',
      'Lead Routing Matrix',
      'CAC Analytics Dashboard'
    ],
    architecture: {
      step1: 'Form Catch',
      step2: 'Intent Scoring',
      step3: 'Conversation Bot',
      step4: 'Rep Notification'
    },
    techStack: ['Node.js', 'WhatsApp API', 'Supabase', 'Webhooks'],
    targetAudience: 'Companies losing leads to slow response times.'
  },
  {
    id: 'revenue-command-center',
    title: 'Revenue Command Center',
    category: 'Sales & Revenue',
    categorySlug: 'sales',
    badge: 'Executive Deal Pipeline',
    price: 'Custom Quote',
    priceNote: 'Instant Access via Whop',
    checkoutUrl: 'https://whop.com/checkout/plan_saYo91hpRZfKG',
    shortDesc: 'Unified deal pipeline tracking conversions and forecasted revenue.',
    highlightMetric: '100% Pipeline Visibility',
    deliverables: [
      'Automated Kanban Pipeline',
      'Live Revenue Forecast',
      'Activity Log Tracker',
      'Automated Contract Generation',
      'Executive Summary Reports'
    ],
    architecture: {
      step1: 'Deal Creation',
      step2: 'Stage Automation',
      step3: 'Contract Assembly',
      step4: 'Finance Sync'
    },
    techStack: ['React', 'Python', 'PostgreSQL', 'DocuSign'],
    targetAudience: 'Founders managing deal flow across spreadsheets.'
  },
  {
    id: 'business-automation-engine',
    title: 'Business Automation Engine',
    category: 'Operations',
    categorySlug: 'ops',
    badge: 'Core Workflow Mesh',
    price: 'Custom Quote',
    priceNote: 'Instant Access via Whop',
    checkoutUrl: 'https://whop.com/checkout/plan_cMGp6qIvGiaFV',
    shortDesc: 'Central hub syncing databases, SaaS tools, and internal alerts.',
    highlightMetric: '80% Manual Ops Cut',
    deliverables: [
      'Event Router',
      'Bi-directional Sync',
      'Team Command Bot',
      'Error Notifications',
      'Event Logging Console'
    ],
    architecture: {
      step1: 'Event Ingestion',
      step2: 'Payload Transformation',
      step3: 'Execution Flow',
      step4: 'Target DB Commits'
    },
    techStack: ['Node.js', 'Redis', 'PostgreSQL', 'Docker'],
    targetAudience: 'Businesses stuck in manual data transfer.'
  },
  {
    id: 'customer-operations-system',
    title: 'Customer Operations System',
    category: 'Operations',
    categorySlug: 'ops',
    badge: 'Client Retention & Portals',
    price: 'Custom Quote',
    priceNote: 'Instant Access via Whop',
    checkoutUrl: 'https://whop.com/checkout/plan_d0FscrEMdXXJu',
    shortDesc: 'Streamline the customer journey from deal sign to support.',
    highlightMetric: '10 min Support Resolution',
    deliverables: [
      'Client Portal',
      'Automated Onboarding',
      'Ticket Routing Engine',
      'Client Health Score',
      'Renewal Alerts'
    ],
    architecture: {
      step1: 'Workspace Provisioning',
      step2: 'Onboarding Checklist',
      step3: 'Project Milestones',
      step4: 'Renewal Triggers'
    },
    techStack: ['React', 'Tailwind', 'Supabase', 'AWS'],
    targetAudience: 'Service businesses needing a better client experience.'
  },
  {
    id: 'ai-finance-director',
    title: 'AI Finance Director',
    category: 'Finance & Analytics',
    categorySlug: 'finance',
    badge: 'Cash Flow Intelligence',
    price: 'Custom Quote',
    priceNote: 'Instant Access via Whop',
    checkoutUrl: 'https://whop.com/checkout/plan_tTvgsaX40wEMH',
    shortDesc: 'Automate invoice dispatch, payment recovery, and cash tracking.',
    highlightMetric: '14 Days Faster Collections',
    deliverables: [
      'Invoice Dispatch Engine',
      'Payment Recovery Sequences',
      'Bank Reconciliation',
      'Cash Flow Dashboard',
      'Tax Summary Reports'
    ],
    architecture: {
      step1: 'Invoice Generation',
      step2: 'Link Dispatch',
      step3: 'Escalation Reminders',
      step4: 'Ledger Commits'
    },
    techStack: ['Python', 'Stripe', 'Xero', 'PostgreSQL'],
    targetAudience: 'Founders tired of manual invoice chasing.'
  },
  {
    id: 'ai-workforce-autonomous-agents',
    title: 'AI Workforce & Agents',
    category: 'AI Workforce',
    categorySlug: 'ai',
    badge: 'Autonomous Digital Staff',
    price: 'Custom Quote',
    priceNote: 'Instant Access via Whop',
    checkoutUrl: 'https://whop.com/checkout/plan_wczKusGx2Pjb1',
    shortDesc: 'Autonomous agents answering questions and processing documents.',
    highlightMetric: '24/7 Zero-Headcount Ops',
    deliverables: [
      'Customer Care Assistant',
      'Internal Knowledge Assistant',
      'PDF Data Extractor',
      'Human Fallback System',
      'Analytics Audit Panel'
    ],
    architecture: {
      step1: 'Message Ingestion',
      step2: 'Vector Search',
      step3: 'LLM Reasoning',
      step4: 'Action Execution'
    },
    techStack: ['LangChain', 'Claude 3.5', 'Pinecone', 'FastAPI'],
    targetAudience: 'Companies bogged down by routine questions.'
  },
  {
    id: 'custom-software-studio',
    title: 'Custom Software Studio',
    category: 'Engineering',
    categorySlug: 'custom',
    badge: 'Private Software Machinery',
    price: 'Custom Quote',
    priceNote: 'Instant Access via Whop',
    checkoutUrl: 'https://whop.com/checkout/plan_QMWiTc4L5ddlt',
    shortDesc: 'Bespoke web applications and dedicated databases you fully own.',
    highlightMetric: '100% Code & IP Ownership',
    deliverables: [
      'Custom Web Application',
      'Private Dedicated Database',
      'Custom API Infrastructure',
      'Role-based Access Control',
      'Cloud Deployment'
    ],
    architecture: {
      step1: 'Architecture Modeling',
      step2: 'Frontend & API Build',
      step3: 'Security Testing',
      step4: 'Cloud Deployment'
    },
    techStack: ['React', 'Node.js', 'PostgreSQL', 'Docker', 'AWS'],
    targetAudience: 'Companies outgrowing off-the-shelf SaaS.'
  },
  {
    id: 'workforce-operations-platform',
    title: 'Workforce Operations Platform',
    category: 'Operations',
    categorySlug: 'ops',
    badge: 'Internal People Infrastructure',
    price: 'Custom Quote',
    priceNote: 'Instant Access via Whop',
    checkoutUrl: 'https://whop.com/checkout/plan_n2VOVhwTZ0Hv7',
    shortDesc: 'Automate team onboarding, time tracking, and task routing.',
    highlightMetric: 'Zero Onboarding Drag',
    deliverables: [
      'Automated Onboarding Flow',
      'SOP Training Checkpoints',
      'Resource Capacity Heatmap',
      'Task Routing Reminders',
      'Friction Pulse Surveys'
    ],
    architecture: {
      step1: 'Access Provisioning',
      step2: 'Milestone Verification',
      step3: 'Project Allocation',
      step4: 'Diagnostic Alerts'
    },
    techStack: ['React', 'Next.js', 'PostgreSQL', 'Slack API'],
    targetAudience: 'Scaling teams needing predictable delivery.'
  },
  {
    id: 'ahmv-systems-full',
    title: 'AHMV Full Operating System',
    category: 'Full Suite',
    categorySlug: 'all',
    badge: 'Complete Enterprise Architecture',
    price: 'Custom Quote',
    priceNote: 'Instant Access via Whop',
    checkoutUrl: 'https://whop.com/checkout/plan_dBOz6kwNZdCVK',
    shortDesc: 'The complete end-to-end operational operating system.',
    highlightMetric: 'Unified Business Engine',
    deliverables: [
      'Sales Acquisition Suite',
      'Customer Operations Portal',
      'AI Workforce Pipeline',
      'Finance & Billing Dashboard',
      'Dedicated Cloud Deployment'
    ],
    architecture: {
      step1: 'Infrastructure Audit',
      step2: 'Architecture Construction',
      step3: 'System Deployment',
      step4: 'Runtime Optimization'
    },
    techStack: ['AHMV Stack', 'PostgreSQL', 'Docker', 'Dedicated Cloud'],
    targetAudience: 'Founders wanting to eliminate all bottlenecks.'
  }
];
