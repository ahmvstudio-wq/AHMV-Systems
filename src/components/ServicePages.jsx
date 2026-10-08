import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getProductsByCategory } from '../data/serviceCategories';
import { products } from '../data/productsData';

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────────────────────
// Canvas 1: Acquisition Pipeline Flow (Revenue & Sales Operations)
// ─────────────────────────────────────────────────────────────
function AcquisitionCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w = (canvas.width = canvas.offsetWidth);
    let h = (canvas.height = canvas.offsetHeight);
    let t = 0, raf;

    const stages = [
      { label: 'Enquiry', x: 0.12, count: 120 },
      { label: 'Qualified', x: 0.38, count: 68 },
      { label: 'Booking', x: 0.65, count: 42 },
      { label: 'Won Deal', x: 0.88, count: 24 },
    ];

    const particles = Array.from({ length: 18 }, () => ({
      stage: Math.floor(Math.random() * 3),
      progress: Math.random(),
      speed: 0.007 + Math.random() * 0.005,
      y: 0.5 + (Math.random() - 0.5) * 0.28,
    }));

    function draw() {
      ctx.clearRect(0, 0, w, h);
      t += 0.02;

      // Funnel connectors
      ctx.strokeStyle = 'rgba(0,0,0,0.06)';
      ctx.lineWidth = 1.5;
      for (let i = 0; i < stages.length - 1; i++) {
        const x1 = stages[i].x * w;
        const x2 = stages[i + 1].x * w;
        const cy = h * 0.5;
        ctx.beginPath();
        ctx.moveTo(x1, cy);
        ctx.lineTo(x2, cy);
        ctx.stroke();
      }

      // Stage nodes
      stages.forEach((st) => {
        const cx = st.x * w;
        const cy = h * 0.5;

        ctx.strokeStyle = 'rgba(0,0,0,0.12)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(cx, cy, 22, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(cx, cy, 18, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#09090B';
        ctx.font = 'bold 9px var(--font-mono)';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(st.count, cx, cy);

        ctx.fillStyle = '#71717A';
        ctx.font = '9px var(--font-mono)';
        ctx.fillText(st.label, cx, cy + 30);
      });

      // Flowing particles
      particles.forEach((p) => {
        p.progress += p.speed;
        if (p.progress >= 1) {
          p.progress = 0;
          p.stage = (p.stage + 1) % 3;
        }

        const s1 = stages[p.stage];
        const s2 = stages[p.stage + 1];
        const px = (s1.x + (s2.x - s1.x) * p.progress) * w;
        const py = (h * p.y);

        ctx.fillStyle = '#09090B';
        ctx.beginPath();
        ctx.arc(px, py, 3.5, 0, Math.PI * 2);
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    }

    draw();
    const handleResize = () => {
      if (!canvas) return;
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />;
}

// ─────────────────────────────────────────────────────────────
// Canvas 2: Business Ops Grid Canvas
// ─────────────────────────────────────────────────────────────
function BusinessOpsCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w = (canvas.width = canvas.offsetWidth);
    let h = (canvas.height = canvas.offsetHeight);
    let t = 0, raf;

    const nodes = [
      { label: 'Intake', x: 0.15, y: 0.3 },
      { label: 'Approvals', x: 0.15, y: 0.7 },
      { label: 'CRM Sync', x: 0.5, y: 0.5 },
      { label: 'Invoicing', x: 0.85, y: 0.3 },
      { label: 'Client Portal', x: 0.85, y: 0.7 },
    ];

    function draw() {
      ctx.clearRect(0, 0, w, h);
      t += 0.02;

      // Connecting web
      ctx.strokeStyle = 'rgba(0,0,0,0.06)';
      ctx.lineWidth = 1.5;
      nodes.forEach((n1, i) => {
        nodes.forEach((n2, j) => {
          if (i < j) {
            ctx.beginPath();
            ctx.moveTo(n1.x * w, n1.y * h);
            ctx.lineTo(n2.x * w, n2.y * h);
            ctx.stroke();
          }
        });
      });

      // Nodes
      nodes.forEach((n) => {
        const cx = n.x * w;
        const cy = n.y * h;

        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(cx, cy, 24, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = 'rgba(0,0,0,0.15)';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.fillStyle = '#09090B';
        ctx.font = '500 10px var(--font-mono)';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(n.label, cx, cy);
      });

      raf = requestAnimationFrame(draw);
    }

    draw();
    const handleResize = () => {
      if (!canvas) return;
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />;
}

// ─────────────────────────────────────────────────────────────
// Canvas 3: Finance Grid Canvas
// ─────────────────────────────────────────────────────────────
function FinanceGridCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w = (canvas.width = canvas.offsetWidth);
    let h = (canvas.height = canvas.offsetHeight);
    let t = 0, raf;

    function draw() {
      ctx.clearRect(0, 0, w, h);
      t += 0.03;

      // Animated bars
      const barCount = 14;
      const barWidth = w / (barCount * 2);
      for (let i = 0; i < barCount; i++) {
        const x = (i * 2 + 0.5) * barWidth;
        const height = Math.sin(t + i * 0.4) * 50 + 70;
        const y = h * 0.7 - height;

        ctx.fillStyle = i === 10 ? '#10B981' : 'rgba(0,0,0,0.06)';
        ctx.fillRect(x, y, barWidth, height);
      }

      raf = requestAnimationFrame(draw);
    }

    draw();
    const handleResize = () => {
      if (!canvas) return;
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />;
}

// ─────────────────────────────────────────────────────────────
// Canvas 4: Tech Network Canvas
// ─────────────────────────────────────────────────────────────
function TechNetworkCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w = (canvas.width = canvas.offsetWidth);
    let h = (canvas.height = canvas.offsetHeight);
    let t = 0, raf;

    const points = Array.from({ length: 16 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
    }));

    function draw() {
      ctx.clearRect(0, 0, w, h);

      // Move points
      points.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      });

      // Connections
      ctx.strokeStyle = 'rgba(0,0,0,0.05)';
      ctx.lineWidth = 1;
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const dx = points[i].x - points[j].x;
          const dy = points[i].y - points[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(points[i].x, points[i].y);
            ctx.lineTo(points[j].x, points[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw points
      points.forEach((p) => {
        ctx.fillStyle = '#09090B';
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    }

    draw();
    const handleResize = () => {
      if (!canvas) return;
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />;
}

// ─────────────────────────────────────────────────────────────
// Master Service Data with High-Value Copy & Direct Clarity
// ─────────────────────────────────────────────────────────────
const servicesData = [
  {
    id: 'business-infrastructure',
    num: '01',
    badge: 'BUSINESS INFRASTRUCTURE',
    title: 'Business Infrastructure',
    headline: 'The systems your business runs on.',
    sub: "When your team's work is spread across spreadsheets, inboxes, chat threads and software that doesn't talk to each other, growth just creates more mess instead of more capacity. We build the systems underneath the day-to-day work so there's one reliable place to operate from.",
    Canvas: BusinessOpsCanvas,
    stats: [
      { label: 'Code & Data Ownership', value: '100', suffix: '%' },
      { label: 'Source of Truth', value: '1', suffix: '' },
      { label: 'Manual Ops Eliminated', value: '80', suffix: '%' },
      { label: 'Deployment Time', value: '14', suffix: 'd' },
    ],
    overview: `When your team's work is spread across spreadsheets, inboxes, chat threads and software that doesn't talk to each other, growth creates confusion instead of leverage.\n\nWe build the systems underneath the day-to-day work: custom CRM pipelines, financial and invoicing platforms, internal tools, and operations control centers.\n\nWe start by mapping how your business runs today, finding where time and money are leaking, and building the smallest system that solves the bottleneck permanently.`,
    systems: [
      { title: 'CRM & Customer Management', desc: 'Centralized lead records, contact pipelines, deal stages, and interaction histories in one place.' },
      { title: 'Finance, Invoicing & ERP', desc: 'Structured accounting, automated invoicing, VAT calculations, and real-time cash tracking.' },
      { title: 'Internal Operations Portals', desc: 'Dedicated staff dashboards, role-based controls, and secure client file exchange spaces.' },
      { title: 'Operations Command Centers', desc: 'Live dashboards pulling metrics across connected tools with alerts when issues arise.' },
      { title: 'Workflow & Approval Engines', desc: 'Automated task routing and digital sign-offs that eliminate manual handoffs.' },
      { title: 'Centralized Databases', desc: 'Clean, secure databases that replace scattered, vulnerable spreadsheets.' },
    ],
    signs: [
      'Customer information is scattered across multiple tools, inboxes, and spreadsheets.',
      'Managers have to ask for status updates because there is no single live view of what is happening.',
      'Your team spends hours every week re-typing the same data into different software.',
      'Finance and operations run on separate numbers that never agree with each other.',
      'A critical process only works because one specific person knows how to do it.',
      'Off-the-shelf software covers part of the job, forcing you into clunky manual workarounds.'
    ],
    workflow: [
      { step: '01', title: 'Diagnose Workflow', desc: 'Map how work, data, and money move today, and isolate where time is being lost.' },
      { step: '02', title: 'Design Architecture', desc: 'Define roles, database schemas, and permission rules before writing any code.' },
      { step: '03', title: 'Build & Integrate', desc: 'Build the custom interface, connect your databases, and test with real team scenarios.' },
      { step: '04', title: 'Deploy & Support', desc: 'Launch the system, help your team adopt it, and provide ongoing technical support.' },
    ],
    beforeAfter: [
      { area: 'Customer Data', before: 'Scattered across several different tools and inboxes', after: 'One reliable source of truth for the entire team' },
      { area: 'Operational Visibility', before: 'Managers ask for updates because there is no single view', after: 'Real-time dashboards covering lead flow, tasks, and vitals' },
      { area: 'Data Entry', before: 'Team spends hours typing the same data into multiple apps', after: 'Automated handoffs connect tools and eliminate duplication' },
      { area: 'Finance & Operations', before: 'Separate systems that do not agree with each other', after: 'Real-time financial visibility and synchronized ledgers' },
    ],
    faqs: [
      { q: 'How is this different from Bespoke Engineering?', a: "Business Infrastructure covers problems other businesses have already solved in some form (CRM, billing, portals, ops). Your version is custom-built to fit your exact workflow, but the underlying category is proven. If nothing on the market comes close, that's Bespoke Engineering." },
      { q: 'Can you work with the software we already have?', a: 'Yes. Keeping a system that already works and connecting it to the rest of your stack is often better than replacing it.' },
      { q: 'Do you take on smaller, contained jobs?', a: 'Yes. We also build quick, fixed-scope tools: invoice generators, simple client portals, and lightweight internal tools that do not need a full platform.' },
    ],
  },
  {
    id: 'applied-ai',
    num: '02',
    badge: 'APPLIED AI',
    title: 'Applied AI',
    headline: 'AI that does real work.',
    sub: "We use AI where it genuinely helps: researching prospects, drafting tailored outreach, classifying documents, and handling customer replies. The goal isn't to add a novelty feature. It's to give your business more operational capacity without adding headcount.",
    Canvas: AcquisitionCanvas,
    stats: [
      { label: 'Response Latency', value: '< 60', suffix: 's' },
      { label: 'Pipeline Velocity', value: '3.4', suffix: 'x' },
      { label: 'Human-in-Control', value: '100', suffix: '%' },
      { label: 'Zero Headcount Ops', value: '24/7', suffix: '' },
    ],
    overview: `We use AI where it genuinely helps: research, writing, sorting, decisions and high-volume replies. The point isn't to add an AI gimmick. It's to give the business more capacity without adding headcount.\n\nNot a chatbot. Not a pile of API calls. A defined piece of work handled by a system you can see into, with clear points where a human takes over.\n\nWherever it matters, your team can review messages, correct the system, take over a conversation, approve an action, or switch automation off entirely.`,
    systems: [
      { title: 'AI Sales Acceleration Team', desc: 'Finds ideal prospects, researches them, qualifies interest, starts conversations, and books meetings.' },
      { title: 'Inbound Lead Handling Engine', desc: 'Replies in under 60 seconds to ad/website enquiries, understands intent, qualifies, and routes to reps.' },
      { title: 'Document & PDF Processing', desc: 'Extracts structured information out of invoices, receipts, and complex PDFs automatically.' },
      { title: 'Internal Knowledge Assistants', desc: 'Secure assistants that answer staff policy and project questions from private company documents.' },
      { title: 'Intelligent Workflow Routing', desc: 'AI decision logic paired with strict business rules to automate triage and categorization.' },
      { title: 'Automated Reporting Insights', desc: 'Summarizes high-volume operational activity and flags anomalies for leadership.' },
    ],
    signs: [
      'Sales reps spend more time prospecting and drafting emails than talking to buyers.',
      'Inbound leads from ads or social go cold before a human rep can respond.',
      'Your team spends hours copying data from invoices, forms, and PDF documents.',
      'Support staff spends all day answering the exact same 10 routine questions.',
      'You want to scale sales outreach without hiring a massive army of SDRs.',
      'Operational bottlenecks limit how many clients you can take on.'
    ],
    workflow: [
      { step: '01', title: 'Target & Logic Definition', desc: 'Define your ideal customer criteria, knowledge boundaries, and guardrails.' },
      { step: '02', title: 'AI Architecture & Safeguards', desc: 'Setup vector indexing, structured prompting, and human handoff triggers.' },
      { step: '03', title: 'Channel & Pipeline Sync', desc: 'Connect WhatsApp, Email, CRM, calendar booking, and internal tools.' },
      { step: '04', title: 'Controlled Rollout & Monitoring', desc: 'Run live test runs with your team, monitor accuracy, and deploy.' },
    ],
    beforeAfter: [
      { area: 'Sales Outreach', before: 'Hours lost manually researching prospects and writing emails', after: 'Automated research, personalized outreach, and scheduled follow-ups' },
      { area: 'Inbound Response', before: 'Enquiries sit cold in inboxes for hours or days', after: 'Under 60-second qualification and instant calendar booking' },
      { area: 'Document Sorting', before: 'Staff manually retypes data from incoming documents', after: 'Automated data extraction and structured database updates' },
      { area: 'Control & Reliability', before: 'Fear of unmonitored AI making mistakes', after: 'You stay in complete control with manual review triggers' },
    ],
    faqs: [
      { q: 'What if I do not actually need AI?', a: 'Then we will not sell you AI. If a simpler process change or a normal piece of software solves it better, that is what we will recommend.' },
      { q: 'Do we stay in control of what the AI sends?', a: 'Yes. Wherever it matters, your team can review messages, correct the system, take over a conversation, approve an action, or switch automation off entirely.' },
      { q: 'Is our company data shared with public AI models?', a: 'No. Private endpoints and vector databases ensure your data remains confidential and is never used to train public models.' },
    ],
  },
  {
    id: 'digital-growth',
    num: '03',
    badge: 'DIGITAL GROWTH',
    title: 'Digital Growth',
    headline: 'Turn attention into customers.',
    sub: "A website shouldn't just tell people who you are. It should capture demand, explain your value clearly, and move the right visitors forward into a form, a booking, a qualification quiz, or a purchase.",
    Canvas: TechNetworkCanvas,
    stats: [
      { label: 'Conversion Velocity', value: '3.8', suffix: 'x' },
      { label: 'System Integration', value: '100', suffix: '%' },
      { label: 'Tracking Clarity', value: 'Live', suffix: '' },
      { label: 'Fast Build Delivery', value: '7-14', suffix: 'd' },
    ],
    overview: `A website shouldn't just tell people who you are. It should capture demand, explain your value clearly, and move the right visitors forward, whether that's a form, a call or a purchase.\n\nWe treat the website as part of the business process, not a brochure. Every page connects to what happens next: a CRM, a booking, a quiz result, a sales conversation or a sale.\n\nFor straightforward jobs, we also offer fixed-scope Fast Digital Builds: business websites, landing pages and simple enquiry systems designed to go live quickly.`,
    systems: [
      { title: 'High-Converting Business Sites', desc: 'Clean, polished web applications that explain value clearly and build credibility.' },
      { title: 'Paid Campaign Landing Pages', desc: 'Laser-focused pages engineered specifically to convert paid ad traffic into leads.' },
      { title: 'Interactive Calculators & Quizzes', desc: 'ROI tools and diagnostic assessments that educate buyers and capture lead data.' },
      { title: 'Custom E-Commerce & Checkouts', desc: 'Tailored product customizers, delivery scheduling, and branded checkout flows.' },
      { title: 'Automated Content Engines', desc: 'Content generation, review portals, and multi-channel scheduled publishing workflows.' },
      { title: 'Conversion Tracking & Analytics', desc: 'Real-time dashboards showing exactly which marketing channels drive pipeline.' },
    ],
    signs: [
      'Your website gets traffic, but very few visitors actually reach out, book, or buy.',
      'Sales reps waste time on discovery calls with unqualified prospects.',
      'You are spending money on ads but sending visitors to generic, unoptimized pages.',
      'Your checkout or booking process is rigid and doesn\'t fit how you actually sell.',
      'Form submissions sit in an email inbox for hours instead of syncing to your CRM.',
      'You lack clear tracking to know which marketing campaigns actually bring revenue.'
    ],
    workflow: [
      { step: '01', title: 'Buyer Journey Mapping', desc: 'Define how visitors should move from interest to booking, purchase, or conversation.' },
      { step: '02', title: 'UX & Interactive Engine Build', desc: 'Design clean layouts, interactive calculators, and qualification quizzes.' },
      { step: '03', title: 'Backend & CRM Connectivity', desc: 'Connect webhooks, payment gateways, calendar schedulers, and analytics.' },
      { step: '04', title: 'Testing, CDN Launch & Tracking', desc: 'Test conversion flows across devices, launch on fast edge CDN, and verify tracking.' },
    ],
    beforeAfter: [
      { area: 'Website Purpose', before: 'Passive brochure that visitors browse and abandon', after: 'Active engine that qualifies demand and captures leads' },
      { area: 'Lead Quality', before: 'Unqualified form submissions with vague requirements', after: 'Interactive quizzes that educate and pre-qualify before contact' },
      { area: 'Handoff Speed', before: 'Form submissions sitting unread in email inboxes', after: 'Instant sync to CRM, calendar booking, and sales alerts' },
      { area: 'Ad Conversion', before: 'Generic homepage traffic with high bounce rates', after: 'Laser-focused landing pages tailored to specific campaigns' },
    ],
    faqs: [
      { q: 'What makes this different from a standard design agency?', a: 'We treat the website as part of the business operations, not just graphic design. Every page is built to route directly into your CRM, database, or sales pipeline.' },
      { q: 'What is a Fast Digital Build?', a: 'For contained jobs with clear scope, we provide rapid fixed-fee turnarounds: business websites, landing pages, invoice tools, and simple client portals.' },
      { q: 'Can we update content ourselves later?', a: 'Yes. All components and content models are structured cleanly so your team can make updates without breaking layout or tracking.' },
    ],
  },
  {
    id: 'bespoke-engineering',
    num: '04',
    badge: 'BESPOKE ENGINEERING',
    title: 'Bespoke Engineering',
    headline: 'Built around your business, not a template.',
    sub: "Some problems don't fit into a pre-packaged category. They need software designed from scratch around a unique dataset, a proprietary algorithm, or an operational process that no existing tool handles properly.",
    Canvas: TechNetworkCanvas,
    stats: [
      { label: 'Custom Architecture', value: '100', suffix: '%' },
      { label: 'IP Ownership', value: '100', suffix: '%' },
      { label: 'Process Scalability', value: '∞', suffix: '' },
      { label: 'Template Bloat', value: '0', suffix: '%' },
    ],
    overview: `Some problems don't fit a category. They need a system designed around a workflow, a dataset or a process that no existing software handles properly.\n\nBusiness Infrastructure covers problems with a known shape, even when the build itself is custom. Bespoke Engineering is for the problems that don't have a known shape yet.\n\nWe start with diagnosis and requirements. Scope, architecture, milestones, deployment and who owns what are all agreed before development begins.`,
    systems: [
      { title: 'Purpose-Built Internal Software', desc: 'Custom web applications designed from the ground up around your exact operations.' },
      { title: 'Private AI & Specialized Agents', desc: 'Proprietary AI engines running on your private infrastructure and custom rules.' },
      { title: 'Client, Partner & Vendor Portals', desc: 'Secure external interfaces for customer operations, transactions, and reporting.' },
      { title: 'Legacy Modernization & Bridges', desc: 'Connecting old systems so they work as one, or rebuilding aging internal software.' },
      { title: 'Custom Data & Calculation Engines', desc: 'High-performance computational tools, custom pricing engines, and schedulers.' },
      { title: 'Productizing Internal Tools', desc: 'Turning an internal script or spreadsheet into a standalone, brandable product.' },
    ],
    signs: [
      'Existing off-the-shelf software forces you to change how you work instead of fitting your workflow.',
      'You are stitching together 5+ different SaaS tools that constantly break and corrupt data.',
      'Your business model or process is genuinely unique and provides your competitive advantage.',
      'An internal spreadsheet or prototype has proven its value and needs to become a real platform.',
      'The ongoing cost of manual workarounds and SaaS license taxes exceeds building a custom system.',
      'You need 100% intellectual property, code, and database ownership on your private cloud.'
    ],
    workflow: [
      { step: '01', title: 'Requirements & Discovery', desc: 'Deep-dive into the proprietary workflow, dataset, constraints, and success criteria.' },
      { step: '02', title: 'Architecture & Milestones', desc: 'Define database schemas, API contracts, security rules, and delivery milestones.' },
      { step: '03', title: 'Full-Stack Custom Build', desc: 'Engineer custom software backends, web portals, private databases, and API integrations.' },
      { step: '04', title: 'Deployment, SLA & Handover', desc: 'Deploy to private cloud infrastructure with documented source code handover and ongoing support.' },
    ],
    beforeAfter: [
      { area: 'Software Fit', before: 'Off-the-shelf software forces you to change how you work', after: 'System designed around how your business actually operates' },
      { area: 'System Fragmentation', before: 'Multiple tools taped together with fragile automations', after: 'One unified custom software codebase built to last' },
      { area: 'Code Ownership', before: 'Locked into closed third-party vendor platforms', after: '100% of code, database, and assets owned by your company' },
      { area: 'Scale Limits', before: 'Hitting rigid database limits or expensive per-user fees', after: 'Unlimited custom architecture scaling on your private cloud' },
    ],
    faqs: [
      { q: 'When is bespoke engineering the right call?', a: "When existing products force you to change how you work, when several tools need to behave like one system, when your process is genuinely unique, or when sticking with the current workaround costs more than building the right system." },
      { q: 'Who owns the system once it is built?', a: 'Ownership is agreed upfront in the contract. As a standard position, you own the code, the data and the business assets we build for you.' },
      { q: 'How do you handle maintenance and support after launch?', a: 'We provide structured technical SLA options to handle server monitoring, updates, and ongoing enhancements.' },
    ],
  },
];

// ─────────────────────────────────────────────────────────────
// Service Page Component — Comprehensive & High-Value
// ─────────────────────────────────────────────────────────────
function ServicePage({ service }) {
  const navigate = useNavigate();
  const headRef = useRef(null);
  const overviewRef = useRef(null);
  const statsRef = useRef(null);
  const productsRef = useRef(null);
  const signsRef = useRef(null);
  const systemsRef = useRef(null);
  const workflowRef = useRef(null);
  const beforeAfterRef = useRef(null);
  const faqRef = useRef(null);

  const [openFaq, setOpenFaq] = useState(null);

  const categoryProducts = getProductsByCategory(service.id);

  const handleBack = (e) => {
    e.preventDefault();
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    ScrollTrigger.getAll().forEach((t) => t.kill());
    ScrollTrigger.refresh();

    // Hero entrance
    if (headRef.current) {
      const headLines = headRef.current.querySelectorAll('.sp-head-line');
      gsap.fromTo(headLines,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, stagger: 0.12, ease: 'power3.out' }
      );
    }

    // Stat cards
    if (statsRef.current) {
      const statCards = statsRef.current.querySelectorAll('.stat-box');
      gsap.fromTo(statCards,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: statsRef.current, start: 'top 88%', once: true } }
      );
    }

    // Systems cards
    if (systemsRef.current) {
      const sysCards = systemsRef.current.querySelectorAll('.sys-card');
      gsap.fromTo(sysCards,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.75, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: systemsRef.current, start: 'top 85%', once: true } }
      );
    }

    // Product cards
    if (productsRef.current) {
      const pCards = productsRef.current.querySelectorAll('.prod-showcase-card');
      gsap.fromTo(pCards,
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: productsRef.current, start: 'top 84%', once: true } }
      );
    }

    // Signs list
    if (signsRef.current) {
      const signItems = signsRef.current.querySelectorAll('.sign-item');
      gsap.fromTo(signItems,
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, stagger: 0.06, ease: 'power3.out',
          scrollTrigger: { trigger: signsRef.current, start: 'top 85%', once: true } }
      );
    }

    // Workflow cards
    if (workflowRef.current) {
      const steps = workflowRef.current.querySelectorAll('.flow-card');
      gsap.fromTo(steps,
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: workflowRef.current, start: 'top 85%', once: true } }
      );
    }

    // Before/After rows
    if (beforeAfterRef.current) {
      const rows = beforeAfterRef.current.querySelectorAll('.ba-row');
      gsap.fromTo(rows,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.65, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: beforeAfterRef.current, start: 'top 80%', once: true } }
      );
    }
  }, [service]);

  return (
    <div style={{ minHeight: '100vh', background: '#FAFAFA', color: '#09090B', fontFamily: 'var(--font-grotesk)' }}>

      {/* Sticky Navigation Bar */}
      <nav style={{ padding: '18px 36px', borderBottom: '1px solid #E4E4E7', position: 'sticky', top: 0, background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)', zIndex: 100 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <a
            href="/"
            onClick={handleBack}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontFamily: 'var(--font-mono)', color: '#71717A', letterSpacing: '0.04em', textTransform: 'uppercase', textDecoration: 'none', transition: 'color 0.2s', cursor: 'pointer' }}
            onMouseEnter={e => e.currentTarget.style.color = '#09090B'}
            onMouseLeave={e => e.currentTarget.style.color = '#71717A'}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M12 7H2M2 7L6 3M2 7L6 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Back to Homepage
          </a>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <a href="#production-builds" style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: '#52525B', textDecoration: 'none', fontWeight: 500 }}>
              Production Builds ↓
            </a>
            <a href="/#contact" style={{ height: '38px', padding: '0 18px', fontSize: '12px', display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#09090B', color: '#FFFFFF', borderRadius: '6px', textDecoration: 'none', fontWeight: 600, fontFamily: 'var(--font-mono)', letterSpacing: '0.02em' }}>
              Book Operations Review
            </a>
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 32px 120px' }}>

        {/* ═══════════════════════════════════════════
            HERO SECTION
        ═══════════════════════════════════════════ */}
        <div ref={headRef} style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '60px', alignItems: 'center', marginBottom: '80px' }} className="hero-split">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#09090B' }} />
              <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#71717A', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600 }}>
                VERTICAL {service.num} — {service.badge}
              </span>
            </div>

            <h1 className="sp-head-line" style={{
              fontSize: 'clamp(36px, 4.8vw, 68px)',
              fontWeight: 500,
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              marginBottom: '20px',
              color: '#09090B',
            }}>
              {service.title}
            </h1>

            <p className="sp-head-line" style={{ fontSize: '20px', color: '#09090B', fontWeight: 500, lineHeight: 1.4, marginBottom: '16px' }}>
              {service.headline}
            </p>

            <p className="sp-head-line" style={{ fontSize: '15px', color: '#52525B', lineHeight: 1.65, marginBottom: '36px', maxWidth: '540px' }}>
              {service.sub}
            </p>

            <div className="sp-head-line" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a href="/#contact" className="cta-main cta-main1" style={{ height: '50px', padding: '0 28px', background: '#09090B', color: '#FFFFFF', borderRadius: '8px', textDecoration: 'none', fontWeight: 600, fontSize: '14px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                Book My Free Operations Review
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
              <a href="#production-builds" style={{ height: '50px', padding: '0 24px', background: '#F4F4F5', border: '1px solid #E4E4E7', color: '#09090B', borderRadius: '8px', textDecoration: 'none', fontWeight: 500, fontSize: '14px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                View Production Builds ↓
              </a>
            </div>
          </div>

          {/* Interactive Live Canvas Graphic */}
          <div style={{ height: '380px', background: '#FFFFFF', border: '1px solid #E4E4E7', borderRadius: '20px', overflow: 'hidden', position: 'relative', boxShadow: '0 10px 40px rgba(0,0,0,0.03)' }}>
            <div style={{ position: 'absolute', top: '14px', left: '14px', zIndex: 10, display: 'flex', alignItems: 'center', gap: '6px', background: '#FFFFFF', padding: '5px 10px', borderRadius: '6px', border: '1px solid #E4E4E7', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981' }} />
              <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: '#09090B', fontWeight: 600, textTransform: 'uppercase' }}>LIVE SYSTEM DIAGRAM</span>
            </div>
            <service.Canvas />
          </div>
        </div>

        {/* ═══════════════════════════════════════════
            KEY IMPACT METRICS
        ═══════════════════════════════════════════ */}
        <div ref={statsRef} style={{ marginBottom: '80px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }} className="stats-grid-responsive">
            {service.stats.map((s, idx) => (
              <div key={idx} className="stat-box" style={{ background: '#FFFFFF', border: '1px solid #E4E4E7', borderRadius: '14px', padding: '28px 22px', boxShadow: '0 4px 16px rgba(0,0,0,0.02)' }}>
                <div style={{ fontSize: '38px', fontWeight: 600, fontFamily: 'var(--font-mono)', color: '#09090B', lineHeight: 1, marginBottom: '8px' }}>
                  {s.value}{s.suffix}
                </div>
                <div style={{ fontSize: '12px', color: '#71717A', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 500 }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ═══════════════════════════════════════════
            WHAT WE BUILD (SPECIFIC SYSTEMS GRID)
        ═══════════════════════════════════════════ */}
        <div ref={systemsRef} style={{ marginBottom: '90px' }}>
          <div style={{ maxWidth: '800px', marginBottom: '36px' }}>
            <p style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#71717A', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '8px' }}>
              CAPABILITIES & COVERAGE
            </p>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 500, letterSpacing: '-0.03em', lineHeight: 1.1, color: '#09090B' }}>
              What we build under {service.title}.
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }} className="features-grid-responsive">
            {service.systems.map((sys, idx) => (
              <div key={idx} className="sys-card" style={{ background: '#FFFFFF', border: '1px solid #E4E4E7', borderRadius: '14px', padding: '28px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
                <div>
                  <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#71717A', marginBottom: '10px' }}>
                    0{idx + 1}
                  </div>
                  <h3 style={{ fontSize: '17px', fontWeight: 600, color: '#09090B', marginBottom: '10px', lineHeight: 1.3 }}>
                    {sys.title}
                  </h3>
                  <p style={{ fontSize: '13px', color: '#52525B', lineHeight: 1.6 }}>
                    {sys.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ═══════════════════════════════════════════
            SELECTED LIVE BUILDS (PRODUCT SHOWCASE)
        ═══════════════════════════════════════════ */}
        <div id="production-builds" ref={productsRef} style={{ marginBottom: '100px', paddingTop: '20px' }}>
          <div style={{ maxWidth: '800px', marginBottom: '40px' }}>
            <p style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#71717A', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '8px' }}>
              PRODUCTION BUILDS & ARCHITECTURES
            </p>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 500, letterSpacing: '-0.03em', lineHeight: 1.1, color: '#09090B', marginBottom: '12px' }}>
              Real systems built for this vertical.
            </h2>
            <p style={{ fontSize: '15px', color: '#52525B', lineHeight: 1.6 }}>
              Every build below started as a specific operational bottleneck and was delivered as a tested, production-ready system. You own 100% of the code and private data.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {categoryProducts.map((p, idx) => (
              <div
                key={p.id}
                className="prod-showcase-card"
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #E4E4E7',
                  borderRadius: '18px',
                  padding: '36px',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.03)',
                  display: 'grid',
                  gridTemplateColumns: '1.2fr 0.8fr',
                  gap: '40px',
                  alignItems: 'center',
                }}
              >
                {/* Left: Product Information & Architecture */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                    <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', background: '#F4F4F5', border: '1px solid #E4E4E7', padding: '3px 8px', borderRadius: '4px', color: '#27272A', fontWeight: 600 }}>
                      {p.badge}
                    </span>
                    <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#71717A' }}>
                      {p.category}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '24px', fontWeight: 600, color: '#09090B', marginBottom: '10px', letterSpacing: '-0.02em' }}>
                    {p.title}
                  </h3>

                  <p style={{ fontSize: '14px', color: '#52525B', lineHeight: 1.6, marginBottom: '24px' }}>
                    {p.shortDesc}
                  </p>

                  {/* 4-Step Architecture Strip */}
                  <div style={{ marginBottom: '24px' }}>
                    <p style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: '#71717A', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.04em' }}>
                      SYSTEM DATA PIPELINE
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px' }} className="arch-steps-grid">
                      {Object.values(p.architecture).map((stepText, sIdx) => (
                        <div key={sIdx} style={{ background: '#F4F4F5', border: '1px solid #E4E4E7', borderRadius: '6px', padding: '8px 10px', fontSize: '11px', color: '#27272A', fontFamily: 'var(--font-mono)', lineHeight: 1.3 }}>
                          <span style={{ color: '#71717A', display: 'block', fontSize: '9px' }}>STEP 0{sIdx + 1}</span>
                          {stepText}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech stack */}
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {p.techStack.map((t, tIdx) => (
                      <span key={tIdx} style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#52525B', background: '#FAFAFA', border: '1px solid #E4E4E7', padding: '3px 8px', borderRadius: '4px' }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right: Deliverables & Action Links */}
                <div style={{ background: '#F4F4F5', border: '1px solid #E4E4E7', borderRadius: '14px', padding: '28px' }}>
                  <p style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#27272A', fontWeight: 600, textTransform: 'uppercase', marginBottom: '14px', letterSpacing: '0.04em' }}>
                    WHAT'S INCLUDED IN THIS BUILD:
                  </p>
                  
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {p.deliverables.map((del, dIdx) => (
                      <li key={dIdx} style={{ fontSize: '13px', color: '#3F3F46', display: 'flex', alignItems: 'flex-start', gap: '8px', lineHeight: 1.4 }}>
                        <span style={{ color: '#10B981', fontWeight: 'bold' }}>✓</span>
                        {del}
                      </li>
                    ))}
                  </ul>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <Link
                      to={`/products/${p.id}`}
                      className="cta-main cta-main1"
                      style={{
                        height: '46px',
                        width: '100%',
                        justifyContent: 'center',
                        fontSize: '13px',
                        background: '#09090B',
                        color: '#FFFFFF',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        textDecoration: 'none',
                        fontWeight: 600,
                      }}
                    >
                      <span>Explore System Architecture</span>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </Link>

                    <a
                      href="/#contact"
                      style={{
                        textAlign: 'center',
                        fontSize: '12px',
                        fontFamily: 'var(--font-mono)',
                        color: '#71717A',
                        padding: '6px',
                        textDecoration: 'none',
                      }}
                    >
                      Discuss deployment in Operations Review →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ═══════════════════════════════════════════
            SIGNS YOU NEED THIS (RED FLAGS / DIAGNOSIS)
        ═══════════════════════════════════════════ */}
        <div ref={signsRef} style={{ marginBottom: '90px', background: '#FFFFFF', border: '1px solid #E4E4E7', borderRadius: '18px', padding: '44px 36px' }}>
          <p style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#71717A', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '8px' }}>
            OPERATIONAL RED FLAGS
          </p>
          <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 38px)', fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.15, color: '#09090B', marginBottom: '28px' }}>
            Signs your business has outgrown its current setup:
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }} className="form-row-2">
            {service.signs.map((sign, idx) => (
              <div key={idx} className="sign-item" style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', background: '#F4F4F5', padding: '16px 20px', borderRadius: '10px', border: '1px solid #E4E4E7' }}>
                <span style={{ color: '#EF4444', fontWeight: 'bold', fontSize: '14px', flexShrink: 0 }}>✕</span>
                <p style={{ fontSize: '13px', color: '#27272A', lineHeight: 1.5, margin: 0, fontWeight: 500 }}>
                  {sign}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ═══════════════════════════════════════════
            BEFORE vs AFTER (THE REAL DIFFERENCE)
        ═══════════════════════════════════════════ */}
        <div ref={beforeAfterRef} style={{ marginBottom: '90px' }}>
          <div style={{ maxWidth: '800px', marginBottom: '32px' }}>
            <p style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#71717A', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '8px' }}>
              OPERATIONAL COMPARISON
            </p>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 500, letterSpacing: '-0.03em', lineHeight: 1.1, color: '#09090B' }}>
              Manual fragmentation vs. Unified system.
            </h2>
          </div>

          <div style={{ borderRadius: '14px', overflow: 'hidden', border: '1px solid #E4E4E7', background: '#FFFFFF' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '0.8fr 1.1fr 1.1fr', background: '#F4F4F5', padding: '16px 28px', fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#52525B', fontWeight: 'bold', letterSpacing: '0.04em' }}>
              <span>OPERATIONAL AREA</span>
              <span style={{ color: '#EF4444' }}>HOW MOST BUSINESSES RUN</span>
              <span style={{ color: '#10B981' }}>WITH AN AHMV SYSTEM</span>
            </div>
            {service.beforeAfter.map((ba, i) => (
              <div key={i} className="ba-row" style={{ display: 'grid', gridTemplateColumns: '0.8fr 1.1fr 1.1fr', padding: '22px 28px', borderTop: '1px solid #E4E4E7', fontSize: '13px', alignItems: 'center' }}>
                <div style={{ fontWeight: 600, color: '#18181B', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>{ba.area}</div>
                <div style={{ color: '#71717A', lineHeight: 1.5 }}>{ba.before}</div>
                <div style={{ color: '#09090B', fontWeight: 500, lineHeight: 1.5 }}>{ba.after}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ═══════════════════════════════════════════
            HOW WE BUILD IT (METHODOLOGY)
        ═══════════════════════════════════════════ */}
        <div ref={workflowRef} style={{ marginBottom: '90px' }}>
          <div style={{ maxWidth: '800px', marginBottom: '32px' }}>
            <p style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#71717A', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '8px' }}>
              DELIVERY PROCESS
            </p>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 500, letterSpacing: '-0.03em', lineHeight: 1.1, color: '#09090B' }}>
              Four stages. Clear milestones. Fully deployed.
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }} className="flow-grid-responsive">
            {service.workflow.map((w, i) => (
              <div key={i} className="flow-card" style={{ background: '#FFFFFF', border: '1px solid #E4E4E7', borderRadius: '14px', padding: '30px 22px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#71717A', marginBottom: '12px', fontWeight: 600 }}>
                    STAGE {w.step}
                  </div>
                  <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#09090B', marginBottom: '10px', lineHeight: 1.3 }}>{w.title}</h3>
                  <p style={{ fontSize: '13px', color: '#52525B', lineHeight: 1.55 }}>{w.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ═══════════════════════════════════════════
            FAQ ACCORDION
        ═══════════════════════════════════════════ */}
        <div ref={faqRef} style={{ marginBottom: '90px' }}>
          <div style={{ maxWidth: '800px', marginBottom: '32px' }}>
            <p style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#71717A', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '8px' }}>
              COMMON QUESTIONS
            </p>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 500, letterSpacing: '-0.03em', lineHeight: 1.1, color: '#09090B' }}>
              Everything you need to know.
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderRadius: '14px', overflow: 'hidden' }}>
            {service.faqs.map((f, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} style={{ background: '#FFFFFF', border: '1px solid #E4E4E7', borderRadius: '10px', overflow: 'hidden' }}>
                  <button onClick={() => setOpenFaq(isOpen ? null : i)}
                    style={{ width: '100%', padding: '22px 28px', background: 'none', border: 'none', color: '#09090B', fontSize: '15px', fontWeight: 600, textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', fontFamily: 'var(--font-grotesk)' }}>
                    <span>{f.q}</span>
                    <span style={{ fontSize: '20px', color: '#71717A', transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)', transition: 'transform 0.25s ease', flexShrink: 0, marginLeft: '16px' }}>+</span>
                  </button>
                  {isOpen && (
                    <div style={{ padding: '0 28px 24px', fontSize: '14px', color: '#52525B', lineHeight: 1.65, borderTop: '1px solid #F4F4F5' }}>
                      {f.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ═══════════════════════════════════════════
            BOTTOM CTA
        ═══════════════════════════════════════════ */}
        <div style={{ textAlign: 'center', padding: '70px 30px', background: '#09090B', color: '#FFFFFF', borderRadius: '20px', marginBottom: '80px' }}>
          <p style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#A1A1AA', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '12px' }}>
            START WITH A REVIEW
          </p>
          <h2 style={{ fontSize: 'clamp(30px, 4.5vw, 56px)', fontWeight: 500, letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: '20px', color: '#FFFFFF' }}>
            Tell us what's getting in the way.
          </h2>
          <p style={{ fontSize: '15px', color: '#A1A1AA', maxWidth: '540px', margin: '0 auto 36px', lineHeight: 1.6 }}>
            If something is slowing the business down, tell us what it is. We'll help you work out if the answer is software, AI, automation, or a simpler process.
          </p>
          <a href="/#contact" className="cta-main cta-main1" style={{ height: '54px', padding: '0 36px', display: 'inline-flex', alignItems: 'center', gap: '10px', background: '#FFFFFF', color: '#09090B', borderRadius: '8px', textDecoration: 'none', fontWeight: 600, fontSize: '15px' }}>
            <span>Book My Free Operations Review</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 13L13 1M13 1H5M13 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
        </div>

        {/* ═══════════════════════════════════════════
            EXPLORE OTHER SYSTEMS
        ═══════════════════════════════════════════ */}
        <div style={{ paddingTop: '40px', borderTop: '1px solid #E4E4E7' }}>
          <p style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#71717A', marginBottom: '18px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            EXPLORE OTHER VERTICALS
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }} className="other-services-grid">
            {servicesData.filter((s) => s.id !== service.id).map((s) => (
              <Link key={s.id} to={`/services/${s.id}`}
                style={{ background: '#FFFFFF', border: '1px solid #E4E4E7', borderRadius: '12px', padding: '24px', color: '#09090B', textDecoration: 'none', transition: 'all 0.2s', display: 'block' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#09090B'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#E4E4E7'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <div style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: '#71717A', marginBottom: '8px' }}>{s.num}</div>
                <div style={{ fontSize: '16px', fontWeight: 600, lineHeight: 1.3, marginBottom: '6px' }}>{s.title}</div>
                <div style={{ fontSize: '13px', color: '#52525B', lineHeight: 1.4 }}>{s.headline}</div>
              </Link>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-split { grid-template-columns: 1fr !important; }
          .prod-showcase-card { grid-template-columns: 1fr !important; gap: 24px !important; }
          .stats-grid-responsive { grid-template-columns: 1fr 1fr !important; }
          .flow-grid-responsive { grid-template-columns: 1fr 1fr !important; }
          .features-grid-responsive { grid-template-columns: 1fr !important; }
          .other-services-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          .stats-grid-responsive { grid-template-columns: 1fr !important; }
          .flow-grid-responsive { grid-template-columns: 1fr !important; }
          .other-services-grid { grid-template-columns: 1fr !important; }
          .arch-steps-grid { grid-template-columns: 1fr 1fr !important; }
          .form-row-2 { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Services Grid Component for FeaturesSection on Homepage
// ─────────────────────────────────────────────────────────────
export function ServicesGrid() {
  const gridRef = useRef(null);

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll('.svc-card');
    gsap.set(cards, { y: 50, opacity: 0, rotateX: 14, scale: 0.95, transformPerspective: 800 });
    ScrollTrigger.create({
      trigger: gridRef.current,
      start: 'top 78%',
      onEnter: () => gsap.to(cards, { y: 0, opacity: 1, rotateX: 0, scale: 1, duration: 0.85, stagger: 0.12, ease: 'power4.out' }),
      once: true,
    });
  }, []);

  return (
    <div ref={gridRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
      {servicesData.map((s) => (
        <Link
          key={s.id}
          to={`/services/${s.id}`}
          className="svc-card"
          style={{
            background: '#F4F4F5',
            border: '1px solid #27272A',
            borderRadius: '16px',
            padding: '28px',
            display: 'block',
            color: '#FFF',
            textDecoration: 'none',
            position: 'relative',
            overflow: 'hidden',
            transition: 'border-color 0.25s ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#27272A'; }}
        >
          <div style={{ height: '150px', marginBottom: '20px', borderRadius: '10px', overflow: 'hidden', background: '#FFF', border: '1px solid rgba(255,255,255,0.08)' }}>
            <s.Canvas />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.4)' }}>{s.num}</span>
            <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', background: 'rgba(255,255,255,0.1)', padding: '3px 8px', borderRadius: '4px', color: 'rgba(255,255,255,0.7)' }}>
              {s.badge}
            </span>
          </div>

          <h3 style={{ fontSize: '17px', fontWeight: 500, lineHeight: 1.3, marginBottom: '10px' }}>{s.title}</h3>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>{s.headline}</p>

          <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontFamily: 'var(--font-mono)', color: '#FFF' }}>
            Explore Full System →
          </div>
        </Link>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Router Entry Point
// ─────────────────────────────────────────────────────────────
export default function ServicePageRouter({ serviceId }) {
  const aliases = {
    'sales-revenue': 'digital-growth',
    'operations-automation': 'business-infrastructure',
    'ai-finance': 'applied-ai',
    'custom-enterprise': 'bespoke-engineering',
    'custom-software': 'bespoke-engineering',
  };
  const resolvedId = aliases[serviceId] || serviceId;
  const service = servicesData.find((s) => s.id === resolvedId);

  if (!service) {
    return (
      <div style={{ minHeight: '100vh', background: '#FAFAFA', color: '#09090B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.4)', marginBottom: '16px' }}>
            SYSTEM NOT FOUND
          </p>
          <Link to="/" style={{ color: '#09090B', textDecoration: 'underline' }}>
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return <ServicePage service={service} />;
}
