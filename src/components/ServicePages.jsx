import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────────────────────
// Canvas 1: Acquisition Pipeline Flow
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

    const nodes = [
      { x: 0.12, y: 0.35, label: 'Meta Ads' },
      { x: 0.12, y: 0.65, label: 'Google Ads' },
      { x: 0.38, y: 0.5, label: 'AI Qualifier' },
      { x: 0.62, y: 0.3, label: 'WhatsApp' },
      { x: 0.62, y: 0.7, label: 'Email Bot' },
      { x: 0.88, y: 0.5, label: 'Booked Slot' },
    ];

    const edges = [[0, 2], [1, 2], [2, 3], [2, 4], [3, 5], [4, 5]];
    const particles = edges.map(([a, b]) => ({
      from: a, to: b, progress: Math.random(), speed: 0.005 + Math.random() * 0.003,
    }));

    function drawNode(n, pulse) {
      const nx = n.x * w, ny = n.y * h;
      const g = ctx.createRadialGradient(nx, ny, 0, nx, ny, 24 + pulse * 6);
      g.addColorStop(0, 'rgba(255,255,255,0.22)');
      g.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(nx, ny, 28 + pulse * 6, 0, Math.PI * 2); ctx.fill();

      ctx.beginPath(); ctx.arc(nx, ny, 9, 0, Math.PI * 2);
      ctx.fillStyle = '#FFF'; ctx.fill();

      ctx.fillStyle = 'rgba(255,255,255,0.75)';
      ctx.font = "500 11px 'Inter', sans-serif";
      ctx.textAlign = 'center';
      ctx.fillText(n.label, nx, ny + 24);
    }

    function drawEdge(a, b) {
      const ax = a.x * w, ay = a.y * h, bx = b.x * w, by = b.y * h;
      ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(bx, by);
      ctx.strokeStyle = 'rgba(255,255,255,0.12)'; ctx.lineWidth = 1; ctx.stroke();
    }

    function drawParticle(p) {
      const from = nodes[p.from], to = nodes[p.to];
      const px = (from.x + (to.x - from.x) * p.progress) * w;
      const py = (from.y + (to.y - from.y) * p.progress) * h;
      const g = ctx.createRadialGradient(px, py, 0, px, py, 7);
      g.addColorStop(0, '#FFF');
      g.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(px, py, 4, 0, Math.PI * 2); ctx.fill();
    }

    function draw() {
      t += 0.015;
      ctx.clearRect(0, 0, w, h);
      edges.forEach(([a, b]) => drawEdge(nodes[a], nodes[b]));
      const pulse = Math.sin(t) * 0.5 + 0.5;
      nodes.forEach((n) => drawNode(n, pulse));
      particles.forEach((p) => {
        drawParticle(p);
        p.progress += p.speed;
        if (p.progress > 1) p.progress = 0;
      });
      raf = requestAnimationFrame(draw);
    }

    draw();
    const onResize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); };
  }, []);
  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />;
}

// ─────────────────────────────────────────────────────────────
// Canvas 2: CRM Orbit Diagram
// ─────────────────────────────────────────────────────────────
function CRMCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w = (canvas.width = canvas.offsetWidth);
    let h = (canvas.height = canvas.offsetHeight);
    let t = 0, raf;

    const cx = w / 2, cy = h / 2;
    const orbitNodes = [
      { label: 'Leads', angle: 0 },
      { label: 'Pipelines', angle: 72 },
      { label: 'Finance', angle: 144 },
      { label: 'Tasks', angle: 216 },
      { label: 'Clients', angle: 288 },
    ];

    function draw() {
      t += 0.008;
      ctx.clearRect(0, 0, w, h);
      const rad = Math.min(w, h) * 0.32;

      ctx.beginPath(); ctx.arc(cx, cy, rad, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255,255,255,0.08)'; ctx.lineWidth = 1; ctx.stroke();

      ctx.beginPath(); ctx.arc(cx, cy, 36, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,0.1)'; ctx.fill();
      ctx.beginPath(); ctx.arc(cx, cy, 14, 0, Math.PI * 2);
      ctx.fillStyle = '#FFF'; ctx.fill();
      ctx.fillStyle = '#0A0A0B'; ctx.font = 'bold 9px Inter,sans-serif';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText('OS', cx, cy);

      orbitNodes.forEach((n) => {
        const angle = (n.angle + t * 8) * (Math.PI / 180);
        const nx = cx + Math.cos(angle) * rad;
        const ny = cy + Math.sin(angle) * rad;

        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(nx, ny);
        ctx.strokeStyle = 'rgba(255,255,255,0.12)'; ctx.lineWidth = 1; ctx.stroke();

        ctx.beginPath(); ctx.arc(nx, ny, 8, 0, Math.PI * 2);
        ctx.fillStyle = '#FFF'; ctx.fill();

        ctx.fillStyle = 'rgba(255,255,255,0.8)';
        ctx.font = '500 10px Inter,sans-serif';
        ctx.textBaseline = 'alphabetic';
        ctx.fillText(n.label, nx, ny + 22);
      });

      raf = requestAnimationFrame(draw);
    }

    draw();
    const onResize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); };
  }, []);
  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />;
}

// ─────────────────────────────────────────────────────────────
// Canvas 3: Predictive Analytics Chart
// ─────────────────────────────────────────────────────────────
function PredictiveCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w = (canvas.width = canvas.offsetWidth);
    let h = (canvas.height = canvas.offsetHeight);
    let t = 0, raf;

    const bars = [0.35, 0.55, 0.45, 0.8, 0.6, 0.9, 0.7, 0.95];

    function draw() {
      t += 0.018;
      ctx.clearRect(0, 0, w, h);
      const bw = w / bars.length;
      const maxH = h * 0.7;

      bars.forEach((b, i) => {
        const animH = maxH * b * (0.88 + Math.sin(t + i * 0.5) * 0.12);
        const x = i * bw + bw * 0.2;
        const bWidth = bw * 0.6;
        const y = h - animH - 24;

        const grad = ctx.createLinearGradient(0, y, 0, h - 24);
        grad.addColorStop(0, 'rgba(255,255,255,0.95)');
        grad.addColorStop(1, 'rgba(255,255,255,0.08)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.roundRect(x, y, bWidth, animH, [4, 4, 0, 0]);
        ctx.fill();
      });

      ctx.fillStyle = 'rgba(255,255,255,0.6)';
      ctx.font = '500 11px Inter,sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('Deal Dwell Velocity Score', 14, 24);

      raf = requestAnimationFrame(draw);
    }

    draw();
    const onResize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); };
  }, []);
  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />;
}

// ─────────────────────────────────────────────────────────────
// Canvas 4: Heatmap Internal Grid
// ─────────────────────────────────────────────────────────────
function InternalToolsCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w = (canvas.width = canvas.offsetWidth);
    let h = (canvas.height = canvas.offsetHeight);
    let t = 0, raf;

    const COLS = 8, ROWS = 5;
    const cells = Array.from({ length: COLS * ROWS }, () => Math.random());

    function draw() {
      t += 0.02;
      ctx.clearRect(0, 0, w, h);
      const cw = w / COLS, ch = h / ROWS;

      cells.forEach((base, i) => {
        const col = i % COLS, row = Math.floor(i / COLS);
        const val = 0.15 + (base * 0.5 + Math.sin(t + i * 0.4) * 0.25) * 0.6;
        ctx.fillStyle = `rgba(255,255,255,${Math.max(0.05, Math.min(0.9, val))})`;
        ctx.beginPath();
        ctx.roundRect(col * cw + 4, row * ch + 4, cw - 8, ch - 8, 6);
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    }

    draw();
    const onResize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); };
  }, []);
  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />;
}

// ─────────────────────────────────────────────────────────────
// Canvas 5: White Label Tree
// ─────────────────────────────────────────────────────────────
function WhiteLabelCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w = (canvas.width = canvas.offsetWidth);
    let h = (canvas.height = canvas.offsetHeight);
    let t = 0, raf;

    function draw() {
      t += 0.012;
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2, cy = h * 0.88;

      function branch(x, y, angle, len, depth) {
        if (depth === 0 || len < 4) return;
        const ex = x + Math.cos(angle) * len;
        const ey = y + Math.sin(angle) * len;
        const alpha = (depth / 5) * 0.55;
        ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(ex, ey);
        ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
        ctx.lineWidth = depth * 0.9; ctx.stroke();

        const swing = Math.sin(t + depth) * 0.07;
        branch(ex, ey, angle - 0.42 + swing, len * 0.72, depth - 1);
        branch(ex, ey, angle + 0.42 + swing, len * 0.72, depth - 1);
      }

      branch(cx, cy, -Math.PI / 2, h * 0.28, 5);

      ctx.fillStyle = 'rgba(255,255,255,0.6)';
      ctx.font = '500 11px Inter,sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('AHMV White-Label Engine', cx, cy + 18);

      raf = requestAnimationFrame(draw);
    }

    draw();
    const onResize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); };
  }, []);
  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />;
}

// ─────────────────────────────────────────────────────────────
// Master Service Data with Simplified Content & 1000+ Words Structure
// ─────────────────────────────────────────────────────────────
const servicesData = [
  {
    id: 'acquisition',
    num: '01',
    badge: 'AUTOMATED CLIENT ACQUISITION',
    title: 'Autonomous Client Acquisition Pipeline',
    headline: 'Capture leads from ads, qualify them instantly, and book meetings 24/7 without manual chasing.',
    sub: 'Stop losing interested prospects to slow response times. AHMV connects your ad channels directly to an AI qualification engine that chats, filters out tire-kickers, and books confirmed slots on your calendar in under 60 seconds.',
    Canvas: AcquisitionCanvas,
    stats: [
      { label: 'Response Speed', value: '< 60', suffix: 's' },
      { label: 'Booking Rate Increase', value: '3.4', suffix: 'x' },
      { label: 'Manual Chasing Saved', value: '100', suffix: '%' },
      { label: '24/7 Availability', value: '365', suffix: 'd' },
    ],
    overview: `Most businesses don't have a lead generation problem; they have a lead response problem. When a prospect submits an ad form on Meta or Google, every minute they wait drops your chances of closing them by over 80%. Human sales reps cannot respond instantly at midnight, during weekends, or when busy on calls.

Our Autonomous Client Acquisition Pipeline fixes this structural leak. The moment a lead enters your funnel from any source (Meta lead ads, Google forms, website forms, or outbound lists), our engine takes over. It initiates a natural conversational chat over WhatsApp or Email, asks your exact qualification questions, answers their questions instantly, checks your calendar availability, and locks in a confirmed booking.

By removing the delay between interest and interaction, your business books significantly more meetings from the exact same ad spend — without hiring an expensive 24/7 call center team.`,
    workflow: [
      { step: '01', title: 'Multi-Channel Lead Ingestion', desc: 'Captures leads in real-time from Meta Ads, Google Ads, LinkedIn forms, and website forms directly via webhooks.' },
      { step: '02', title: 'Instant Conversational Outreach', desc: 'Sends an automated, personalized message over WhatsApp or Email within 10-30 seconds of submission.' },
      { step: '03', title: 'Smart Qualification Dialogue', desc: 'Asks key screening questions (budget, timeframe, decision-maker authority) to filter out unqualified leads.' },
      { step: '04', title: 'Automated Calendar Sync', desc: 'Presents available meeting slots directly inside the chat and books confirmed appointments into your team CRM.' },
    ],
    features: [
      { title: 'Zero-Delay WhatsApp Router', desc: 'Instantly connects with leads on the channel they check most. Maintains full conversation context.' },
      { title: 'Custom Qualification Logic', desc: 'Configure strict rules so your sales team only spends time talking to qualified, high-intent buyers.' },
      { title: 'Automatic Lead Enrichment', desc: 'Pulls company size, industry, and contact verification before the sales call happens.' },
      { title: 'CRM & Calendar Integration', desc: 'Directly updates Google Calendar, Outlook, and your internal CRM with full chat logs and booking details.' },
    ],
    beforeAfter: [
      { area: 'Lead Response Time', before: '2 to 24 hours (manual follow-up)', after: 'Under 60 seconds (24/7 automated response)' },
      { area: 'Qualification Process', before: 'Sales reps waste time calling unqualified leads', after: 'AI pre-qualifies and filters out non-buyers' },
      { area: 'Meeting Booking', before: 'Back-and-forth emails to pick a time slot', after: '1-click calendar lock directly inside WhatsApp' },
      { area: 'Ad Spend ROI', before: '30-50% leads go cold due to slow outreach', after: 'Maximum conversion from existing ad budgets' },
    ],
    roadmap: [
      { phase: 'Phase 1: Architecture & Diagnostic', timeline: 'Days 1 - 3', desc: 'We audit your current lead channels, define qualification questions, and design your custom conversational script.' },
      { phase: 'Phase 2: Technical Build & Webhook Integration', timeline: 'Days 4 - 8', desc: 'We connect ad APIs, WhatsApp business endpoints, calendar integrations, and qualification rules in code.' },
      { phase: 'Phase 3: Testing & Live Deployment', timeline: 'Days 9 - 14', desc: 'End-to-end simulation tests, edge-case tuning, live deployment, and handoff dashboard for your sales team.' },
    ],
    faqs: [
      { q: 'Will the AI sound robotic or alienate our leads?', a: 'No. The system uses clean, concise, plain-spoken prompts tailored to your brand voice. It sounds like a prompt, professional booking assistant.' },
      { q: 'What happens if a lead asks a complex question outside the script?', a: 'The system recognizes out-of-scope questions and instantly flags your human sales rep while notifying the lead that an expert is reviewing their request.' },
      { q: 'Can we connect our existing WhatsApp Business account?', a: 'Yes. We integrate directly via official Meta WhatsApp Business Cloud APIs to keep your phone number and brand intact.' },
    ],
  },
  {
    id: 'crm',
    num: '02',
    badge: 'ONE INTEGRATED OPERATING SYSTEM',
    title: 'Enterprise Ecosystem Consolidation & Localized CRM',
    headline: 'Replace bloated SaaS tools with one clean operating system tailored to your exact business workflow.',
    sub: 'Stop paying monthly subscriptions for fragmented software that doesn’t talk to each other. We build a unified internal CRM and operating spine that houses your sales, operations, tasks, and finance in one clean interface.',
    Canvas: CRMCanvas,
    stats: [
      { label: 'SaaS Fees Cut', value: '100', suffix: '%' },
      { label: 'Data Fragmentation', value: '0', suffix: '%' },
      { label: 'Setup Time', value: '14', suffix: 'd' },
      { label: 'Operational Visibility', value: '100', suffix: '%' },
    ],
    overview: `Growing companies often end up with software sprawl: Salesforce or HubSpot for sales, Asana or Monday for tasks, spreadsheets for finance, and WhatsApp for team messaging. None of these tools share a clean data model. Your team spends hours manually re-entering data, deals fall through the cracks, and management has zero real-time visibility into actual performance.

AHMV builds a custom Localized Internal CRM and Operating System. Instead of forcing your company into rigid off-the-shelf software templates, we design the database and UI specifically around how your company actually operates.

We consolidate all sales pipelines, client projects, invoicing triggers, team tasks, and operational reporting into one central platform. You get zero monthly user licensing fees, total ownership over your data, and a single source of truth for your entire team.`,
    workflow: [
      { step: '01', title: 'Data & Workflow Mapping', desc: 'We audit your existing spreadsheets and software tools to map your true data taxonomy and operational pipeline.' },
      { step: '02', title: 'Custom Database Architecture', desc: 'We design a clean, relational data structure tailored to your business operations without unnecessary bloated fields.' },
      { step: '03', title: 'Unified Interface Development', desc: 'We build fast, responsive web dashboards for management, sales, project managers, and operational staff.' },
      { step: '04', title: 'Legacy Data Migration', desc: 'We clean and import all your historic client records, active deals, and operational logs into the new platform.' },
    ],
    features: [
      { title: 'Single Source of Truth', desc: 'All sales, project tracking, tasks, and client history reside in one clean, centralized dashboard.' },
      { title: 'Zero Monthly SaaS Licensing', desc: 'Custom software built for your business. Pay once for implementation with zero per-user subscription taxes.' },
      { title: 'Role-Based Access Control', desc: 'Custom permissions for founders, sales reps, project managers, and finance teams.' },
      { title: 'Automated Status Handoffs', desc: 'When a deal is marked "Closed Won", project tasks and invoicing workflows trigger automatically.' },
    ],
    beforeAfter: [
      { area: 'Software Costs', before: 'Thousands of dollars paid monthly across 4-6 SaaS apps', after: 'One custom OS owned completely by your company' },
      { area: 'Data Accuracy', before: 'Siloed data in spreadsheets with duplicate entries', after: '100% unified real-time database across all departments' },
      { area: 'Operational Visibility', before: 'Founders spend hours compiling manual weekly reports', after: 'Live, real-time executive dashboard available anytime' },
      { area: 'Team Efficiency', before: 'Toggling between multiple tabs and fragmented tools', after: 'Single intuitive web interface for all daily tasks' },
    ],
    roadmap: [
      { phase: 'Phase 1: Workflow & Data Schema Design', timeline: 'Days 1 - 4', desc: 'Map your exact pipelines, custom fields, user roles, and reporting requirements.' },
      { phase: 'Phase 2: Custom OS Build & Integration', timeline: 'Days 5 - 10', desc: 'Develop core database, frontend web portal, automated triggers, and reporting modules.' },
      { phase: 'Phase 3: Data Migration & Team Onboarding', timeline: 'Days 11 - 14', desc: 'Import clean historical records, conduct live team training, and launch full system.' },
    ],
    faqs: [
      { q: 'Can this replace our current CRM like HubSpot or Salesforce completely?', a: 'Yes. We migrate your contacts, pipeline stages, notes, and activity history into a cleaner, faster custom platform.' },
      { q: 'What happens as our team grows?', a: 'Because the platform is built on modern web standards, you can add unlimited team members without paying extra per-user licensing fees.' },
      { q: 'Is our company data secure?', a: 'Yes. We deploy your OS on dedicated secure cloud infrastructure with encrypted database backups and strict role-based access.' },
    ],
  },
  {
    id: 'predictive',
    num: '03',
    badge: 'ACTIVE INTEL & CONTENT AUTOMATION',
    title: 'Predictive Intelligence & Content Automation',
    headline: 'Automate your content distribution while active deal scoring tells you exactly when to nudge prospects.',
    sub: 'Keep your brand visible on autopilot and close deals faster. Our dual-engine publishes your content consistently on LinkedIn and Instagram while tracking proposal engagement to tell your sales team who is ready to buy.',
    Canvas: PredictiveCanvas,
    stats: [
      { label: 'Content Autopilot', value: '30', suffix: 'd' },
      { label: 'Follow-Up Speed', value: '1', suffix: 'click' },
      { label: 'Deal Velocity Gain', value: '45', suffix: '%' },
      { label: 'Hours Saved Weekly', value: '15', suffix: 'h' },
    ],
    overview: `Maintaining consistent brand presence on social media while actively managing sales deals is a major time sink for founders and executive teams. Content gets delayed because people get busy, and sales follow-ups are sent blindly based on arbitrary dates rather than real buyer intent.

Our Predictive Intelligence & Content Automation system solves both problems in parallel. First, it powers an automated content engine that formats, schedules, and publishes your brand updates across LinkedIn and Instagram on autopilot. Second, it attaches active tracking intelligence to your sales proposals and pitch documents.

When a prospect opens your proposal, spends time on your pricing page, or re-reads your scope of work, your team gets an instant alert. The system even drafts a context-aware follow-up message tailored to what the prospect was viewing, allowing you to close deals while buyer interest is at its absolute peak.`,
    workflow: [
      { step: '01', title: 'Content Engine Setup', desc: 'Establish brand voice, topic pillars, and automated scheduling workflows for LinkedIn and Instagram.' },
      { step: '02', title: 'Smart Proposal & Document Tracking', desc: 'Attach lightweight behavioral tracking to sent proposals, pitch decks, and price quotes.' },
      { step: '03', title: 'Real-Time Intent Scoring', desc: 'Monitor document dwell time, page views, and email re-opens to generate real-time deal interest scores.' },
      { step: '04', title: '1-Click Contextual Nudge', desc: 'System alerts your sales rep when intent is high and pre-drafts the exact follow-up message needed to close.' },
    ],
    features: [
      { title: 'Autopilot Content Publishing', desc: 'Schedule weeks of high-value social media posts across channels without manual posting.' },
      { title: 'Proposal Dwell-Time Intelligence', desc: 'See exactly which pages of your proposal your prospect spent time reading.' },
      { title: 'Instant Buyer Re-Engagement Alerts', desc: 'Get notified via Slack or WhatsApp the second a cold prospect re-opens your proposal.' },
      { title: 'AI-Powered Follow-Up Generator', desc: 'Generate relevant, personalized follow-up drafts based on specific prospect reading behavior.' },
    ],
    beforeAfter: [
      { area: 'Social Media Consistency', before: 'Sporadic posting when team finds spare time', after: '30+ days of consistent content running on autopilot' },
      { area: 'Sales Follow-Up Timing', before: 'Guessing when to call leads on arbitrary calendar dates', after: 'Contacting leads at the exact moment they inspect your pricing' },
      { area: 'Deal Context', before: '"Just checking in" generic emails that get ignored', after: 'Context-aware messages directly addressing what they reviewed' },
      { area: 'Closing Velocity', before: 'Deals stall in pipeline for weeks without clear signals', after: '45% faster time-to-close with intent-driven outreach' },
    ],
    roadmap: [
      { phase: 'Phase 1: Content & Intelligence Setup', timeline: 'Days 1 - 3', desc: 'Define content publishing channels, brand templates, and proposal tracking parameters.' },
      { phase: 'Phase 2: System Configuration & Triggers', timeline: 'Days 4 - 8', desc: 'Connect social publishing APIs, tracking pixels, intent scoring engine, and notification channels.' },
      { phase: 'Phase 3: Live Launch & Training', timeline: 'Days 9 - 12', desc: 'Test proposal tracking, initiate automated content calendar, and train sales team on 1-click follow-ups.' },
    ],
    faqs: [
      { q: 'Does proposal tracking require prospects to download any software?', a: 'No. Prospects simply click a secure web link to view your proposal in their browser cleanly on desktop or mobile.' },
      { q: 'Can we approve content posts before they go live?', a: 'Yes. You have a clean review dashboard to preview, edit, or approve all automated content beforehand.' },
      { q: 'Which social media platforms are supported?', a: 'LinkedIn (Personal profiles & Company pages), Instagram Business accounts, and Twitter/X.' },
    ],
  },
  {
    id: 'internal-tools',
    num: '04',
    badge: 'CUSTOM BACK-OFFICE SOFTWARE',
    title: 'Bespoke Internal Tools & Infrastructure Modernisation',
    headline: 'Replace fragile spreadsheets and manual routines with custom internal web software.',
    sub: 'Eliminate human data entry errors, spreadsheet corruption, and fragmented back-office handoffs. We build focused web apps that automate internal workflows from deal close to invoicing and fulfillment.',
    Canvas: InternalToolsCanvas,
    stats: [
      { label: 'Admin Hours Saved', value: '70', suffix: '%' },
      { label: 'Data Entry Errors', value: '0', suffix: 'errors' },
      { label: 'Build Time', value: '10-14', suffix: 'd' },
      { label: 'Process Speedup', value: '5', suffix: 'x' },
    ],
    overview: `Many established businesses run core operations on complex, fragile Excel workbooks, Google Sheets, and manual email chains. As transaction volume grows, these manual routines inevitably break. Invoices get missed, inventory records get corrupted, team handoffs are delayed, and management lacks accurate financial numbers.

AHMV designs and builds Bespoke Internal Tools. We take your messy back-office routines and convert them into clean, reliable, web-based software applications.

Whether you need a custom project management dashboard, an automated invoice generation system triggered by closed deals, or a inventory and fulfillment portal, we build clean software that runs reliably without broken formulas or manual copy-pasting.`,
    workflow: [
      { step: '01', title: 'Process Audit & Mapping', desc: 'We document your exact manual steps, spreadsheet formulas, and team handoff points.' },
      { step: '02', title: 'Software Architecture & Wireframing', desc: 'We design intuitive UI screens and database schemas tailored to your team’s daily operational needs.' },
      { step: '03', title: 'Custom Tool Development', desc: 'We engineer the internal web application with automated data pipelines, calculation logic, and validation.' },
      { step: '04', title: 'System Deployment & Integration', desc: 'We connect the tool to your existing software stack, import master data, and conduct hands-on staff training.' },
    ],
    features: [
      { title: 'Spreadsheet-to-Software Conversion', desc: 'Transform complex Excel models into fast, secure web applications with zero broken formulas.' },
      { title: 'Automated Deal-to-Invoice Flow', desc: 'Automatically generate invoices, contract agreements, and project tasks the moment a sale closes.' },
      { title: 'Real-Time Operational Dashboards', desc: 'Get clean visual charts for cash flow, project milestones, team velocity, and key operational metrics.' },
      { title: 'Role-Based Back-Office Portals', desc: 'Custom views for finance personnel, operations managers, field agents, and executive leadership.' },
    ],
    beforeAfter: [
      { area: 'Data Handling', before: 'Manual copy-pasting between spreadsheets and accounting apps', after: 'Automated digital data flow with zero human intervention' },
      { area: 'Error Rate', before: 'Accidental formula overwrites and missing client records', after: 'Strict data validation rules preventing improper inputs' },
      { area: 'Turnaround Time', before: 'Hours spent manually preparing invoices and job sheets', after: 'Instant 1-click automated document and task generation' },
      { area: 'Scalability', before: 'Spreadsheets freeze and lag as business transaction volume grows', after: 'Cloud database engineered to handle infinite growth seamlessly' },
    ],
    roadmap: [
      { phase: 'Phase 1: Operational Blueprinting', timeline: 'Days 1 - 4', desc: 'Analyze manual workflows, document business logic, and create software screen wireframes.' },
      { phase: 'Phase 2: Rapid Core Development', timeline: 'Days 5 - 10', desc: 'Build web application frontend, backend API connections, database tables, and automated logic.' },
      { phase: 'Phase 3: Integration & Team Handoff', timeline: 'Days 11 - 14', desc: 'Perform live user acceptance testing, data validation, deployment, and operational training.' },
    ],
    faqs: [
      { q: 'Do our employees need technical skills to use these custom web tools?', a: 'No. We design simple, intuitive user interfaces that require zero technical expertise. If your team can use a browser, they can use our tools.' },
      { q: 'Can these custom tools connect to accounting software like QuickBooks or Xero?', a: 'Yes. We integrate with major accounting, payment, and banking APIs for seamless automated bookkeeping.' },
      { q: 'What if our business process changes in the future?', a: 'All our software is built with modular code, making it easy to add new features, custom fields, or new workflow rules as you grow.' },
    ],
  },
  {
    id: 'white-label',
    num: '05',
    badge: 'AGENCY PARTNERSHIP ENGINE',
    title: 'White-Labeled AI System Partnership Program',
    headline: 'Deliver high-margin AI systems to your agency clients under your brand — while we handle 100% of the technical build.',
    sub: 'Expand your agency services without hiring expensive developers. We act as your silent backend engineering team, building custom AI pipelines, CRMs, and automation for your clients under your brand.',
    Canvas: WhiteLabelCanvas,
    stats: [
      { label: 'Agency Retainer Margin', value: '70', suffix: '%' },
      { label: 'Technical SLA Guarantee', value: '100', suffix: '%' },
      { label: 'Dev Hiring Cost Saved', value: '0', suffix: '$' },
      { label: 'Delivery Time', value: '14', suffix: 'd' },
    ],
    overview: `Marketing, web design, and PR agencies face a growing challenge: clients are demanding AI integration, custom CRMs, and operational automation. If you can’t offer these technical systems, clients leave for specialized tech partners. But hiring full-time AI engineers and backend developers is risky, expensive, and difficult to manage.

Our White-Labeled AI System Partnership Program gives your agency a complete technical engineering department instantly. You maintain the client relationship, set your own pricing, and present the final system under your brand.

AHMV operates silently behind the scenes. We participate in scoping, build the custom software architecture, handle API integrations, and provide technical SLA maintenance — allowing your agency to collect recurring high-margin retainers hands-free.`,
    workflow: [
      { step: '01', title: 'Partner Scoping & Proposal Support', desc: 'We help you scope the technical requirements for your client opportunity and provide fixed white-label pricing.' },
      { step: '02', title: 'Silent Backend Build', desc: 'Our engineering team builds the custom AI pipeline, CRM, or automation tool strictly according to specification.' },
      { step: '03', title: 'White-Labeled Client Handoff', desc: 'We deliver the completed system branded with your agency logos, documentation, and user guidelines.' },
      { step: '04', title: 'Ongoing Technical SLA', desc: 'We handle ongoing server maintenance, API updates, and technical support so your client stays sticky forever.' },
    ],
    features: [
      { title: '100% White-Labeled Delivery', desc: 'All software portals, documentation, and user interfaces are custom branded with your agency identity.' },
      { title: 'Fixed-Cost Partner Pricing', desc: 'Know your exact fulfillment cost upfront so you can lock in 50-70% profit margins on every project.' },
      { title: 'Zero Developer Overhead', desc: 'Access senior software engineers and AI builders on-demand without paying salaries or benefits.' },
      { title: 'High-Value Client Retention', desc: 'Position your agency as an indispensable tech partner rather than a replaceable creative vendor.' },
    ],
    beforeAfter: [
      { area: 'Agency Service Scope', before: 'Limited to basic marketing campaigns, ads, or web design', after: 'Comprehensive enterprise AI & operational software builds' },
      { area: 'Technical Risk', before: 'Turning down lucrative technical client projects', after: '100% guaranteed delivery backed by senior engineers' },
      { area: 'Retainer Margins', before: 'Low-margin creative services with high client churn', after: 'High-margin sticky software retainers that last for years' },
      { area: 'Engineering Costs', before: 'Expensive full-time developer hiring headaches', after: 'On-demand white-label fulfillment with zero fixed overhead' },
    ],
    roadmap: [
      { phase: 'Phase 1: Partnership Agreement & Onboarding', timeline: 'Day 1', desc: 'Establish white-label terms, partner communication channels, and review ready-to-sell service packages.' },
      { phase: 'Phase 2: Client Opportunity Scoping', timeline: 'As Needed', desc: 'Joint technical scoping calls (we join as your internal technical director) and fixed-price proposals.' },
      { phase: 'Phase 3: Fulfillment & Retainer Support', timeline: '10-14 Days', desc: 'Silent build, white-labeled client handoff, and ongoing SLA infrastructure management.' },
    ],
    faqs: [
      { q: 'Will AHMV ever contact our clients directly under the AHMV brand?', a: 'Never. We operate 100% white-label. If we join client calls, we represent ourselves as your agency’s internal technical engineering division.' },
      { q: 'How do we price these systems for our clients?', a: 'We provide you with clear wholesale fulfillment costs. Most partner agencies mark up our build prices by 2x to 3x and charge ongoing monthly retainer fees.' },
      { q: 'What types of agencies fit this program best?', a: 'B2B marketing agencies, web dev shops, performance marketing firms, and management consultancies looking to add technical AI services.' },
    ],
  },
];

// ─────────────────────────────────────────────────────────────
// Service Page Component with Rich Visual Infographics & GSAP Scroll Trigger
// ─────────────────────────────────────────────────────────────
function ServicePage({ service }) {
  const headRef = useRef(null);
  const overviewRef = useRef(null);
  const statsRef = useRef(null);
  const workflowRef = useRef(null);
  const featuresRef = useRef(null);
  const beforeAfterRef = useRef(null);
  const roadmapRef = useRef(null);
  const faqRef = useRef(null);

  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    // Scroll management handled globally in App.jsx ScrollToTop

    // Headline curtain reveal
    if (headRef.current) {
      gsap.set(headRef.current, { clipPath: 'inset(0 0 100% 0)' });
      gsap.to(headRef.current, { clipPath: 'inset(0 0 0% 0)', duration: 1.1, delay: 0.1, ease: 'expo.out' });
    }

    // Stats 3D rotateY flip
    if (statsRef.current) {
      const statCards = statsRef.current.querySelectorAll('.stat-box');
      gsap.set(statCards, { rotateY: -60, opacity: 0, scale: 0.9, transformPerspective: 800 });
      ScrollTrigger.create({
        trigger: statsRef.current,
        start: 'top 85%',
        onEnter: () => gsap.to(statCards, { rotateY: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.1, ease: 'back.out(1.6)' }),
        once: true,
      });
    }

    // Workflow steps staggered slide-up
    if (workflowRef.current) {
      const steps = workflowRef.current.querySelectorAll('.flow-card');
      gsap.set(steps, { y: 45, opacity: 0 });
      ScrollTrigger.create({
        trigger: workflowRef.current,
        start: 'top 82%',
        onEnter: () => gsap.to(steps, { y: 0, opacity: 1, duration: 0.75, stagger: 0.12, ease: 'power4.out' }),
        once: true,
      });
    }

    // Features grid staggered reveal
    if (featuresRef.current) {
      const featCards = featuresRef.current.querySelectorAll('.feat-box');
      gsap.set(featCards, { y: 50, opacity: 0, rotateX: 15, transformPerspective: 800 });
      ScrollTrigger.create({
        trigger: featuresRef.current,
        start: 'top 80%',
        onEnter: () => gsap.to(featCards, { y: 0, opacity: 1, rotateX: 0, duration: 0.8, stagger: 0.1, ease: 'power4.out' }),
        once: true,
      });
    }

    // Before/After comparison rows slide in from sides
    if (beforeAfterRef.current) {
      const rows = beforeAfterRef.current.querySelectorAll('.ba-row');
      rows.forEach((row, idx) => {
        gsap.set(row, { x: idx % 2 === 0 ? -40 : 40, opacity: 0 });
      });
      ScrollTrigger.create({
        trigger: beforeAfterRef.current,
        start: 'top 80%',
        onEnter: () => gsap.to(rows, { x: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'expo.out' }),
        once: true,
      });
    }

    // Roadmap cards scale-in
    if (roadmapRef.current) {
      const rCards = roadmapRef.current.querySelectorAll('.rm-card');
      gsap.set(rCards, { scale: 0.9, opacity: 0, filter: 'blur(6px)' });
      ScrollTrigger.create({
        trigger: roadmapRef.current,
        start: 'top 82%',
        onEnter: () => gsap.to(rCards, { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 0.8, stagger: 0.15, ease: 'back.out(1.5)' }),
        once: true,
      });
    }

  }, [service]);

  return (
    <div style={{ minHeight: '100vh', background: '#0A0A0B', color: '#FFF', fontFamily: 'var(--font-grotesk)' }}>
      
      {/* Top navigation bar */}
      <nav style={{ padding: '24px 40px', borderBottom: '1px solid rgba(255,255,255,0.08)', position: 'sticky', top: 0, background: 'rgba(10,10,11,0.92)', backdropFilter: 'blur(12px)', zIndex: 100 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link
            to="/"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.6)',
              letterSpacing: '0.04em', textTransform: 'uppercase', textDecoration: 'none',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#FFF'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M12 7H2M2 7L6 3M2 7L6 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to Home
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.4)', background: '#18181B', padding: '4px 10px', borderRadius: '4px' }}>
              SYSTEM {service.num}
            </span>
            <a
              href="#diagnostic"
              className="cta-main cta-main1"
              style={{ height: '38px', padding: '0 18px', fontSize: '12px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              Start Free Diagnostic
            </a>
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 40px 100px' }}>

        {/* HERO SECTION WITH 3D CANVAS */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '48px', alignItems: 'center', marginBottom: '80px' }} className="hero-split">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.4)' }}>{service.num}</span>
              <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#FFF', background: '#27272A', padding: '3px 8px', borderRadius: '4px', letterSpacing: '0.06em' }}>
                {service.badge}
              </span>
            </div>

            <h1
              ref={headRef}
              style={{
                fontSize: 'clamp(32px, 4.2vw, 60px)',
                fontWeight: 500,
                letterSpacing: '-0.03em',
                lineHeight: 1.05,
                marginBottom: '20px',
                color: '#FFF',
                willChange: 'clip-path',
              }}
            >
              {service.title}
            </h1>

            <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.6, marginBottom: '36px' }}>
              {service.headline}
            </p>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <a
                href="#diagnostic"
                className="cta-main cta-main3"
                style={{ height: '50px', padding: '0 28px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              >
                Start Diagnostic
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>

          {/* 3D Canvas visual box */}
          <div
            data-tilt
            style={{
              height: '380px',
              background: '#18181B',
              border: '1px solid #27272A',
              borderRadius: '20px',
              overflow: 'hidden',
              position: 'relative',
              boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
            }}
          >
            <div style={{ position: 'absolute', top: '16px', left: '16px', zIndex: 10, display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(10,10,11,0.75)', backdropFilter: 'blur(8px)', padding: '6px 12px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22C55E' }} />
              <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase' }}>
                LIVE ARCHITECTURE CANVAS
              </span>
            </div>
            <service.Canvas />
          </div>
        </div>

        {/* SECTION 1: KEY METRICS INFOGRAPHIC GRID */}
        <div ref={statsRef} style={{ marginBottom: '80px' }}>
          <p style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.4)', marginBottom: '16px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            SYSTEM IMPACT METRICS
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }} className="stats-grid-responsive">
            {service.stats.map((s, idx) => (
              <div
                key={idx}
                className="stat-box"
                data-tilt
                style={{
                  background: '#18181B',
                  border: '1px solid #27272A',
                  borderRadius: '14px',
                  padding: '24px 20px',
                  transformStyle: 'preserve-3d',
                }}
              >
                <div style={{ fontSize: '38px', fontWeight: 600, fontFamily: 'var(--font-mono)', color: '#FFF', lineHeight: 1 }}>
                  {s.value}{s.suffix}
                </div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginTop: '8px', fontFamily: 'var(--font-mono)' }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 2: EXECUTIVE OVERVIEW */}
        <div ref={overviewRef} style={{ marginBottom: '80px', background: '#18181B', border: '1px solid #27272A', borderRadius: '20px', padding: '40px' }}>
          <p style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.4)', marginBottom: '16px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            EXECUTIVE OVERVIEW
          </p>
          <h2 style={{ fontSize: '24px', fontWeight: 500, color: '#FFF', marginBottom: '20px' }}>
            Why This System Exists & What It Solves
          </h2>
          <div style={{ fontSize: '15px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, whiteSpace: 'pre-line' }}>
            {service.overview}
          </div>
        </div>

        {/* SECTION 3: STEP-BY-STEP WORKFLOW INFOGRAPHIC */}
        <div ref={workflowRef} style={{ marginBottom: '80px' }}>
          <p style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.4)', marginBottom: '16px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            OPERATIONAL INFOGRAPHIC FLOW
          </p>
          <h2 style={{ fontSize: '24px', fontWeight: 500, color: '#FFF', marginBottom: '32px' }}>
            How The System Operates Step-By-Step
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }} className="flow-grid-responsive">
            {service.workflow.map((w, i) => (
              <div
                key={i}
                className="flow-card"
                data-tilt
                style={{
                  background: '#18181B',
                  border: '1px solid #27272A',
                  borderRadius: '14px',
                  padding: '28px 20px',
                  position: 'relative',
                  transformStyle: 'preserve-3d',
                }}
              >
                <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.35)', marginBottom: '12px' }}>
                  STEP {w.step}
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: 500, color: '#FFF', marginBottom: '10px', lineHeight: 1.3 }}>
                  {w.title}
                </h3>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>
                  {w.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 4: CORE FEATURES & CAPABILITIES */}
        <div ref={featuresRef} style={{ marginBottom: '80px' }}>
          <p style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.4)', marginBottom: '16px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            SYSTEM CAPABILITIES
          </p>
          <h2 style={{ fontSize: '24px', fontWeight: 500, color: '#FFF', marginBottom: '32px' }}>
            Core Feature Modules
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }} className="features-grid-responsive">
            {service.features.map((f, i) => (
              <div
                key={i}
                className="feat-box"
                data-tilt
                style={{
                  background: '#18181B',
                  border: '1px solid #27272A',
                  borderRadius: '16px',
                  padding: '30px',
                  transformStyle: 'preserve-3d',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#FFF' }} />
                  <h3 style={{ fontSize: '17px', fontWeight: 500, color: '#FFF' }}>{f.title}</h3>
                </div>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.6 }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 5: BEFORE VS AFTER COMPARISON INFOGRAPHIC */}
        <div ref={beforeAfterRef} style={{ marginBottom: '80px' }}>
          <p style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.4)', marginBottom: '16px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            OPERATIONAL BLUEPRINT
          </p>
          <h2 style={{ fontSize: '24px', fontWeight: 500, color: '#FFF', marginBottom: '32px' }}>
            Before vs After Transformation
          </h2>

          <div style={{ background: '#18181B', border: '1px solid #27272A', borderRadius: '16px', overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '0.8fr 1.1fr 1.1fr', background: '#0A0A0B', borderBottom: '1px solid #27272A', padding: '16px 24px', fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.4)' }}>
              <span>OPERATIONAL AREA</span>
              <span style={{ color: '#EF4444' }}>BEFORE AHMV</span>
              <span style={{ color: '#22C55E' }}>AFTER AHMV SYSTEM</span>
            </div>

            {service.beforeAfter.map((ba, i) => (
              <div
                key={i}
                className="ba-row"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '0.8fr 1.1fr 1.1fr',
                  padding: '20px 24px',
                  borderBottom: i < service.beforeAfter.length - 1 ? '1px solid #27272A' : 'none',
                  alignItems: 'center',
                  fontSize: '13px',
                }}
              >
                <div style={{ fontWeight: 500, color: '#FFF', fontFamily: 'var(--font-mono)' }}>{ba.area}</div>
                <div style={{ color: 'rgba(255,255,255,0.45)' }}>{ba.before}</div>
                <div style={{ color: '#FFF', fontWeight: 500 }}>{ba.after}</div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 6: IMPLEMENTATION ROADMAP */}
        <div ref={roadmapRef} style={{ marginBottom: '80px' }}>
          <p style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.4)', marginBottom: '16px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            IMPLEMENTATION BLUEPRINT
          </p>
          <h2 style={{ fontSize: '24px', fontWeight: 500, color: '#FFF', marginBottom: '32px' }}>
            14-Day Build & Deployment Roadmap
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }} className="roadmap-grid-responsive">
            {service.roadmap.map((r, i) => (
              <div
                key={i}
                className="rm-card"
                data-tilt
                style={{
                  background: '#18181B',
                  border: '1px solid #27272A',
                  borderRadius: '16px',
                  padding: '28px',
                  transformStyle: 'preserve-3d',
                }}
              >
                <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: '8px' }}>
                  {r.timeline}
                </span>
                <h3 style={{ fontSize: '16px', fontWeight: 500, color: '#FFF', marginBottom: '12px' }}>{r.phase}</h3>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>{r.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 7: FAQS ACCORDION */}
        <div ref={faqRef} style={{ marginBottom: '80px' }}>
          <p style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.4)', marginBottom: '16px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            CLEAR ANSWERS
          </p>
          <h2 style={{ fontSize: '24px', fontWeight: 500, color: '#FFF', marginBottom: '32px' }}>
            Frequently Asked Questions
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {service.faqs.map((f, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={i}
                  style={{
                    background: '#18181B',
                    border: '1px solid #27272A',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    transition: 'border-color 0.2s ease',
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    style={{
                      width: '100%',
                      padding: '20px 24px',
                      background: 'none',
                      border: 'none',
                      color: '#FFF',
                      fontSize: '15px',
                      fontWeight: 500,
                      textAlign: 'left',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    <span>{f.q}</span>
                    <span style={{ fontSize: '18px', color: 'rgba(255,255,255,0.4)', transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }}>
                      +
                    </span>
                  </button>
                  {isOpen && (
                    <div style={{ padding: '0 24px 20px', fontSize: '14px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, borderTop: '1px solid #27272A', paddingTop: '16px' }}>
                      {f.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* BOTTOM CTA BANNER */}
        <div
          data-tilt
          style={{
            background: 'linear-gradient(135deg, #18181B 0%, #0A0A0B 100%)',
            border: '1px solid #3F3F46',
            borderRadius: '24px',
            padding: '50px',
            textAlign: 'center',
            transformStyle: 'preserve-3d',
          }}
        >
          <h2 style={{ fontSize: '28px', fontWeight: 500, color: '#FFF', marginBottom: '16px' }}>
            Ready to deploy {service.title}?
          </h2>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.6)', maxWidth: '520px', margin: '0 auto 32px' }}>
            Start with our structured operations diagnostic. We analyze how your business runs, identify bottlenecks, and present a clear proposal.
          </p>
          <a
            href="#diagnostic"
            className="cta-main cta-main3"
            style={{ height: '52px', padding: '0 32px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            Start Your Free Diagnostic
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        {/* OTHER SERVICES LINKS */}
        <div style={{ marginTop: '80px', paddingTop: '40px', borderTop: '1px solid #27272A' }}>
          <p style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.4)', marginBottom: '20px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            EXPLORE OTHER SYSTEMS
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }} className="other-services-grid">
            {servicesData.filter((s) => s.id !== service.id).map((s) => (
              <Link
                key={s.id}
                to={`/services/${s.id}`}
                style={{
                  background: '#18181B',
                  border: '1px solid #27272A',
                  borderRadius: '12px',
                  padding: '18px',
                  color: '#FFF',
                  textDecoration: 'none',
                  transition: 'border-color 0.2s ease',
                  display: 'block',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#FFF'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#27272A'; }}
              >
                <div style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.4)', marginBottom: '6px' }}>
                  {s.num}
                </div>
                <div style={{ fontSize: '13px', fontWeight: 500, lineHeight: 1.3 }}>
                  {s.title}
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-split { grid-template-columns: 1fr !important; }
          .stats-grid-responsive { grid-template-columns: 1fr 1fr !important; }
          .flow-grid-responsive { grid-template-columns: 1fr 1fr !important; }
          .roadmap-grid-responsive { grid-template-columns: 1fr !important; }
          .features-grid-responsive { grid-template-columns: 1fr !important; }
          .other-services-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          .stats-grid-responsive { grid-template-columns: 1fr !important; }
          .flow-grid-responsive { grid-template-columns: 1fr !important; }
          .other-services-grid { grid-template-columns: 1fr !important; }
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
          data-tilt
          style={{
            background: '#18181B',
            border: '1px solid #27272A',
            borderRadius: '16px',
            padding: '28px',
            display: 'block',
            color: '#FFF',
            textDecoration: 'none',
            position: 'relative',
            overflow: 'hidden',
            transition: 'border-color 0.25s ease',
            transformStyle: 'preserve-3d',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#27272A'; }}
        >
          <div style={{ height: '150px', marginBottom: '20px', borderRadius: '10px', overflow: 'hidden', background: '#0A0A0B' }}>
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
  const service = servicesData.find((s) => s.id === serviceId);

  if (!service) {
    return (
      <div style={{ minHeight: '100vh', background: '#0A0A0B', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.4)', marginBottom: '16px' }}>
            SYSTEM NOT FOUND
          </p>
          <Link to="/" style={{ color: '#FFF', textDecoration: 'underline' }}>
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return <ServicePage service={service} />;
}
