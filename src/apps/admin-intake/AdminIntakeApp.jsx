import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../shared/AppLayout';
import DataTable from '../shared/DataTable';
import StatusBadge from '../shared/StatusBadge';
import MetricCard from '../shared/MetricCard';
import IntakeInspector from './components/IntakeInspector';
import { getIntakes, saveIntake, removeIntake } from './data/intakesData';
import { saveDeal, getDeals } from '../crm/data/crmData';
import {
  Inbox,
  FileText,
  Download,
  Filter,
  Sparkles,
  PlusCircle,
  CheckCircle2,
  TrendingUp,
  AlertTriangle,
  Zap,
  Activity,
  Layers,
  ArrowRight,
} from 'lucide-react';

export default function AdminIntakeApp() {
  const [intakes, setIntakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIntake, setSelectedIntake] = useState(null);
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const navigate = useNavigate();

  const loadData = async () => {
    setLoading(true);
    const data = await getIntakes();
    setIntakes(data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleUpdateStatus = async (intakeId, newStatus) => {
    const intake = intakes.find((item) => item.id === intakeId);
    if (!intake) return;
    const updated = await saveIntake({ ...intake, status: newStatus }, intakes);
    setIntakes(updated);
    if (selectedIntake && selectedIntake.id === intakeId) {
      setSelectedIntake({ ...selectedIntake, status: newStatus });
    }
  };

  const handleConvertToCrm = async (intake) => {
    // 1. Create deal in CRM
    const newDeal = {
      id: `deal-${Date.now().toString().slice(-4)}`,
      company_name: intake.company_name || `${intake.contact_name}'s Venture`,
      contact_name: intake.contact_name,
      contact_email: intake.contact_email,
      stage: 'diagnosis',
      deal_value: 50000,
      currency: 'AED',
      probability: 40,
      bottleneck: intake.bottleneck || 'Operations Debt',
      system_interested: 'Executive Operations Command Center',
      lead_source: `Form (${intake.intake_type})`,
      tags: ['Converted from Intake', intake.business_type || 'B2B'],
      notes: `Converted directly from Intake #${intake.id}.\nEstimated Annual Debt: AED ${Number(intake.estimated_annual_debt || 0).toLocaleString()}`,
      created_at: new Date().toISOString(),
      activities: [
        {
          type: 'converted',
          title: 'Converted from Intake Submission',
          date: new Date().toISOString(),
          text: `Converted from ${intake.intake_type} by Admin Command Center.`,
        },
      ],
    };

    const currentDeals = await getDeals();
    await saveDeal(newDeal, currentDeals);

    // 2. Mark intake status as converted
    await handleUpdateStatus(intake.id, 'converted_to_crm');

    // 3. Alert and navigate to CRM
    alert(`✓ Intake #${intake.id} converted into active CRM Deal for "${newDeal.company_name}"!`);
    navigate('/crm');
  };

  const handleSimulateInbound = async () => {
    const companies = [
      { name: 'Oasis Logistics Group', contact: 'Zaid Haddad', email: 'zaid@oasislogistics.ae', bottleneck: 'Manual data entry', size: '26 to 50', debt: 145000 },
      { name: 'Meridian Capital Partners', contact: 'Sarah Jenkins', email: 's.jenkins@meridian.com', bottleneck: 'Finance or invoicing', size: '51 to 100', debt: 220000 },
      { name: 'Lumina Tech D2C', contact: 'Karim Mansour', email: 'karim@luminascent.com', bottleneck: 'Lead generation or follow-up', size: '11 to 25', debt: 88000 },
      { name: 'Vertex Aviation Group', contact: 'Farhan Al Qasimi', email: 'farhan@vertexaviation.ae', bottleneck: 'Data silos & no single source of truth', size: '50 to 150', debt: 310000 },
    ];
    const picked = companies[Math.floor(Math.random() * companies.length)];
    const mock = {
      id: `intake-${Date.now().toString().slice(-4)}`,
      intake_type: 'audit_60s',
      contact_name: picked.contact,
      contact_email: picked.email,
      company_name: picked.name,
      business_type: 'B2B services',
      team_size: picked.size,
      bottleneck: picked.bottleneck,
      goal: 'Less manual work',
      estimated_annual_debt: picked.debt,
      status: 'new',
      created_at: new Date().toISOString(),
      answers: {
        businessType: 'B2B services',
        teamSize: picked.size,
        lossArea: picked.bottleneck,
        improvementGoal: 'Operational velocity & single source of truth',
      },
    };

    const updated = await saveIntake(mock, intakes);
    setIntakes(updated);
  };

  const handleExportCSV = () => {
    const headers = ['ID', 'Type', 'Company', 'Contact', 'Email', 'Bottleneck', 'Estimated Debt', 'Status', 'Date'];
    const rows = intakes.map((i) => [
      `"${i.id}"`,
      `"${i.intake_type}"`,
      `"${i.company_name || ''}"`,
      `"${i.contact_name}"`,
      `"${i.contact_email}"`,
      `"${i.bottleneck}"`,
      i.estimated_annual_debt || 0,
      `"${i.status}"`,
      `"${i.created_at}"`,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `AHMV_Intakes_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered intakes
  const filteredIntakes = intakes.filter((item) => {
    const matchesType = typeFilter === 'all' || item.intake_type === typeFilter;
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesType && matchesStatus;
  });

  // Telemetry Aggregations
  const totalDebtIdentified = intakes.reduce((sum, item) => sum + (Number(item.estimated_annual_debt) || 0), 0);
  const convertedCount = intakes.filter((i) => i.status === 'converted_to_crm').length;
  const conversionRate = intakes.length > 0 ? Math.round((convertedCount / intakes.length) * 100) : 0;
  const newIntakesCount = intakes.filter((i) => i.status === 'new').length;

  const columns = [
    {
      key: 'id',
      label: 'Intake ID',
      width: '110px',
      render: (val) => (
        <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '11px', color: 'var(--whop-text-primary)' }}>
          #{val}
        </span>
      ),
    },
    {
      key: 'company_name',
      label: 'Prospect / Entity',
      render: (val, row) => (
        <div>
          <div style={{ fontWeight: 700, color: 'var(--whop-text-primary)' }}>{val || 'Individual'}</div>
          <div style={{ fontSize: '11px', color: 'var(--whop-text-muted)', fontFamily: 'var(--font-mono)' }}>
            {row.contact_name} · {row.contact_email}
          </div>
        </div>
      ),
    },
    {
      key: 'intake_type',
      label: 'Form Source',
      render: (val) => (
        <span
          style={{
            fontSize: '11px',
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
            background: 'var(--whop-surface-subtle)',
            border: '1px solid var(--whop-border)',
            padding: '3px 8px',
            borderRadius: '4px',
            textTransform: 'uppercase',
            color: 'var(--whop-text-secondary)',
          }}
        >
          {val.replace('_', ' ')}
        </span>
      ),
    },
    {
      key: 'bottleneck',
      label: 'Detected Bottleneck',
      render: (val) => (
        <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--whop-text-primary)' }}>
          {val || 'Operations'}
        </span>
      ),
    },
    {
      key: 'estimated_annual_debt',
      label: 'Est. Annual Loss',
      render: (val) => (
        <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--whop-danger)' }}>
          AED {Number(val || 0).toLocaleString()}
        </span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (val) => <StatusBadge status={val} />,
    },
    {
      key: 'created_at',
      label: 'Received',
      render: (val) => (
        <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--whop-text-muted)' }}>
          {new Date(val).toLocaleDateString()}
        </span>
      ),
    },
  ];

  return (
    <AppLayout
      activeApp="admin"
      title="Admin & Intake Feed"
      subtitle="Live Diagnostic Audits, Review Submissions & Operational Debt Telemetry"
      actionButton={
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button onClick={handleExportCSV} className="whop-btn whop-btn-secondary whop-btn-sm">
            <Download size={13} />
            <span>Export</span>
          </button>
          <button onClick={handleSimulateInbound} className="whop-btn whop-btn-primary whop-btn-sm" title="Simulate a real-time incoming 60s audit submission">
            <PlusCircle size={14} />
            <span>Simulate Inbound</span>
          </button>
        </div>
      }
    >
      {/* ── Key Telemetry Metric Cards ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        <MetricCard
          title="TOTAL INTAKES LOGGED"
          value={intakes.length}
          subtext="Audits, reviews & checkouts"
          icon={Inbox}
        />
        <MetricCard
          title="ANNUAL OP-DEBT IDENTIFIED"
          value={`AED ${totalDebtIdentified.toLocaleString()}`}
          subtext="Total customer operational leakage"
          trend="up"
          trendValue="+18.4%"
        />
        <MetricCard
          title="CONVERSION TO CRM DEALS"
          value={`${conversionRate}%`}
          subtext={`${convertedCount} intakes converted to pipeline`}
          badgeText="High Intent"
        />
        <MetricCard
          title="ACTIONABLE NEW AUDITS"
          value={newIntakesCount}
          subtext="Awaiting executive review"
          trend={newIntakesCount > 0 ? 'up' : 'down'}
          trendValue={`${newIntakesCount} new`}
        />
      </div>

      {/* ── Visual Bottleneck Topography & Ingestion Diagram ── */}
      <div
        className="whop-card"
        style={{
          padding: '24px 28px',
          marginBottom: '24px',
          display: 'grid',
          gridTemplateColumns: '1.2fr 0.8fr',
          gap: '24px',
          alignItems: 'center',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <Activity size={16} color="var(--whop-info)" />
            <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--whop-text-muted)', textTransform: 'uppercase' }}>
              60-SECOND AUDIT DIAGNOSTIC INGESTION PIPELINE
            </span>
          </div>
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--whop-text-primary)', marginBottom: '8px' }}>
            Automated Friction Detection & CRM Deal Ingestion
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--whop-text-secondary)', lineHeight: 1.5, margin: 0 }}>
            Incoming diagnostic submissions calculate operational debt in real time across labor, tooling, and lead drop-off. Click any submission to inspect answers or convert directly into an active CRM opportunity.
          </p>
        </div>

        {/* Visual Category Friction Breakdown */}
        <div style={{ background: 'var(--whop-surface-subtle)', border: '1px solid var(--whop-border)', borderRadius: '12px', padding: '16px' }}>
          <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--whop-text-muted)', marginBottom: '10px' }}>
            TOP DETECTED OPERATIONAL BOTTLENECKS
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px' }}>
                <span style={{ fontWeight: 600 }}>Manual Data Entry & Spreadsheets</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--whop-danger)' }}>48%</span>
              </div>
              <div style={{ height: '5px', background: 'var(--whop-border)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ width: '48%', height: '100%', background: 'var(--whop-danger)' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px' }}>
                <span style={{ fontWeight: 600 }}>Invoice Chasing & Billing Friction</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--whop-warning)' }}>32%</span>
              </div>
              <div style={{ height: '5px', background: 'var(--whop-border)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ width: '32%', height: '100%', background: 'var(--whop-warning)' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px' }}>
                <span style={{ fontWeight: 600 }}>Lead Response & Follow-up Velocity</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--whop-info)' }}>20%</span>
              </div>
              <div style={{ height: '5px', background: 'var(--whop-border)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ width: '20%', height: '100%', background: 'var(--whop-info)' }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Filter Bar ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--whop-text-muted)', textTransform: 'uppercase' }}>
            SOURCE:
          </span>
          <div className="whop-pill-tabs">
            {['all', 'audit_60s', 'operations_review', 'whop_checkout'].map((t) => (
              <button
                key={t}
                className={`whop-pill-tab ${typeFilter === t ? 'active' : ''}`}
                onClick={() => setTypeFilter(t)}
              >
                {t === 'all' ? 'All Sources' : t.replace('_', ' ').toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--whop-text-muted)', textTransform: 'uppercase' }}>
            STATUS:
          </span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              border: '1px solid var(--whop-border)',
              background: '#FFFFFF',
              color: 'var(--whop-text-primary)',
              fontSize: '12px',
              fontFamily: 'var(--font-mono)',
              fontWeight: 600,
            }}
          >
            <option value="all">All Statuses</option>
            <option value="new">● New</option>
            <option value="in_review">● In Review</option>
            <option value="converted_to_crm">● Converted to CRM</option>
            <option value="archived">● Archived</option>
          </select>
        </div>
      </div>

      {/* ── Tabular Data Grid ── */}
      <DataTable
        columns={columns}
        data={filteredIntakes}
        onRowClick={(row) => setSelectedIntake(row)}
        searchPlaceholder="Search by prospect company, name, email or bottleneck..."
        initialSortKey="created_at"
      />

      {/* ── Intake Inspector Drawer ── */}
      <IntakeInspector
        isOpen={Boolean(selectedIntake)}
        intake={selectedIntake}
        onClose={() => setSelectedIntake(null)}
        onUpdateStatus={handleUpdateStatus}
        onConvertToCrm={handleConvertToCrm}
      />
    </AppLayout>
  );
}
