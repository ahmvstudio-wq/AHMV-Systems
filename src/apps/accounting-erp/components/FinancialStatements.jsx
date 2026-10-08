import React, { useState } from 'react';

export default function FinancialStatements({ accounts = [], invoices = [] }) {
  const [statementType, setStatementType] = useState('pl'); // 'pl' | 'balance_sheet' | 'cash_flow'
  const [period, setPeriod] = useState('YTD 2026');

  // Calculations from chart of accounts
  const revenueAccounts = accounts.filter((a) => a.category === 'revenue');
  const expenseAccounts = accounts.filter((a) => a.category === 'expense');
  const assetAccounts = accounts.filter((a) => a.category === 'asset');
  const liabilityAccounts = accounts.filter((a) => a.category === 'liability');
  const equityAccounts = accounts.filter((a) => a.category === 'equity');

  const totalRevenue = revenueAccounts.reduce((sum, a) => sum + (Number(a.balance) || 0), 0);
  const totalExpenses = expenseAccounts.reduce((sum, a) => sum + (Number(a.balance) || 0), 0);
  const grossProfit = totalRevenue;
  const netIncome = totalRevenue - totalExpenses;
  const netMargin = totalRevenue > 0 ? Math.round((netIncome / totalRevenue) * 100) : 0;

  const totalAssets = assetAccounts.reduce((sum, a) => sum + (Number(a.balance) || 0), 0);
  const totalLiabilities = liabilityAccounts.reduce((sum, a) => sum + (Number(a.balance) || 0), 0);
  const totalEquity = equityAccounts.reduce((sum, a) => sum + (Number(a.balance) || 0), 0) + netIncome;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* ── Subheader Period & Statement Toggle ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div className="whop-pill-tabs">
          <button
            className={`whop-pill-tab ${statementType === 'pl' ? 'active' : ''}`}
            onClick={() => setStatementType('pl')}
          >
            Profit & Loss (P&L)
          </button>
          <button
            className={`whop-pill-tab ${statementType === 'balance_sheet' ? 'active' : ''}`}
            onClick={() => setStatementType('balance_sheet')}
          >
            Balance Sheet
          </button>
          <button
            className={`whop-pill-tab ${statementType === 'cash_flow' ? 'active' : ''}`}
            onClick={() => setStatementType('cash_flow')}
          >
            Cash Flow Statement
          </button>
        </div>

        <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', background: '#FFFFFF', padding: '6px 14px', borderRadius: '8px', border: '1px solid var(--whop-border)', color: 'var(--whop-text-primary)', fontWeight: 700 }}>
          Reporting Currency: AED (د.إ) · Period: {period}
        </div>
      </div>

      {/* ── 1. Profit & Loss Statement (P&L) ── */}
      {statementType === 'pl' && (
        <div className="whop-card" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--whop-border)', paddingBottom: '16px', marginBottom: '24px' }}>
            <div>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--whop-text-primary)', margin: 0 }}>
                AHMV Systems — Statement of Profit & Loss
              </h3>
              <span style={{ fontSize: '12px', color: 'var(--whop-text-muted)', fontFamily: 'var(--font-mono)' }}>
                For the period ending October 2026 (Accrual Basis)
              </span>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--whop-text-muted)' }}>NET OPERATING MARGIN</span>
              <div style={{ fontSize: '22px', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--whop-success)' }}>
                {netMargin}%
              </div>
            </div>
          </div>

          {/* Revenue Breakdown */}
          <div style={{ marginBottom: '28px' }}>
            <div style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--whop-text-muted)', letterSpacing: '0.04em', marginBottom: '12px' }}>
              OPERATING REVENUE
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <tbody>
                {revenueAccounts.map((acc) => (
                  <tr key={acc.account_code} style={{ borderBottom: '1px solid var(--whop-border-light)' }}>
                    <td style={{ padding: '10px 0', color: 'var(--whop-text-primary)' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--whop-text-muted)', marginRight: '8px' }}>{acc.account_code}</span>
                      {acc.name}
                    </td>
                    <td style={{ padding: '10px 0', textAlign: 'right', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                      AED {Number(acc.balance).toLocaleString()}
                    </td>
                  </tr>
                ))}
                <tr style={{ fontWeight: 700, borderTop: '2px solid var(--whop-text-primary)' }}>
                  <td style={{ padding: '14px 0', fontSize: '14px' }}>TOTAL GROSS REVENUE</td>
                  <td style={{ padding: '14px 0', textAlign: 'right', fontSize: '15px', fontFamily: 'var(--font-mono)' }}>
                    AED {totalRevenue.toLocaleString()}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Operating Expenses Breakdown */}
          <div style={{ marginBottom: '28px' }}>
            <div style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--whop-text-muted)', letterSpacing: '0.04em', marginBottom: '12px' }}>
              OPERATING & INFRASTRUCTURE EXPENSES (OpEx)
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <tbody>
                {expenseAccounts.map((acc) => (
                  <tr key={acc.account_code} style={{ borderBottom: '1px solid var(--whop-border-light)' }}>
                    <td style={{ padding: '10px 0', color: 'var(--whop-text-primary)' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--whop-text-muted)', marginRight: '8px' }}>{acc.account_code}</span>
                      {acc.name}
                    </td>
                    <td style={{ padding: '10px 0', textAlign: 'right', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--whop-danger)' }}>
                      (AED {Number(acc.balance).toLocaleString()})
                    </td>
                  </tr>
                ))}
                <tr style={{ fontWeight: 700, borderTop: '2px solid var(--whop-text-primary)' }}>
                  <td style={{ padding: '14px 0', fontSize: '14px' }}>TOTAL OPERATING EXPENSES</td>
                  <td style={{ padding: '14px 0', textAlign: 'right', fontSize: '15px', fontFamily: 'var(--font-mono)', color: 'var(--whop-danger)' }}>
                    (AED {totalExpenses.toLocaleString()})
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Net Income Summary Card */}
          <div style={{ background: 'var(--whop-accent)', color: '#FFFFFF', borderRadius: '12px', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#A1A1AA', letterSpacing: '0.04em' }}>
                NET INCOME (EBITDA)
              </span>
              <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', marginTop: '2px' }}>
                Net Retained Operating Earnings
              </div>
            </div>
            <div style={{ fontSize: '30px', fontWeight: 800, fontFamily: 'var(--font-mono)', color: '#34D399' }}>
              AED {netIncome.toLocaleString()}
            </div>
          </div>
        </div>
      )}

      {/* ── 2. Balance Sheet Statement ── */}
      {statementType === 'balance_sheet' && (
        <div className="whop-card" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--whop-border)', paddingBottom: '16px', marginBottom: '24px' }}>
            <div>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--whop-text-primary)', margin: 0 }}>
                AHMV Systems — Statement of Financial Position (Balance Sheet)
              </h3>
              <span style={{ fontSize: '12px', color: 'var(--whop-text-muted)', fontFamily: 'var(--font-mono)' }}>
                As of October 2026 (Double-Entry Balance Verification)
              </span>
            </div>
            <span
              style={{
                background: totalAssets === totalLiabilities + totalEquity ? 'var(--whop-success-bg)' : 'var(--whop-danger-bg)',
                color: totalAssets === totalLiabilities + totalEquity ? 'var(--whop-success)' : 'var(--whop-danger)',
                border: `1px solid ${totalAssets === totalLiabilities + totalEquity ? 'var(--whop-success-border)' : 'var(--whop-danger-border)'}`,
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '11px',
                fontFamily: 'var(--font-mono)',
                fontWeight: 700,
              }}
            >
              {totalAssets === totalLiabilities + totalEquity ? '✓ EQUILIBRIUM BALANCED' : '⚠️ UNBALANCED LEDGER'}
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
            {/* Left Column: Assets */}
            <div>
              <div style={{ fontSize: '13px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--whop-text-muted)', letterSpacing: '0.04em', marginBottom: '12px' }}>
                CURRENT & FIXED ASSETS
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                <tbody>
                  {assetAccounts.map((acc) => (
                    <tr key={acc.account_code} style={{ borderBottom: '1px solid var(--whop-border-light)' }}>
                      <td style={{ padding: '10px 0', color: 'var(--whop-text-primary)' }}>
                        <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--whop-text-muted)', marginRight: '8px' }}>{acc.account_code}</span>
                        {acc.name}
                      </td>
                      <td style={{ padding: '10px 0', textAlign: 'right', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                        AED {Number(acc.balance).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                  <tr style={{ fontWeight: 800, borderTop: '2px solid var(--whop-text-primary)' }}>
                    <td style={{ padding: '14px 0', fontSize: '14px' }}>TOTAL ASSETS</td>
                    <td style={{ padding: '14px 0', textAlign: 'right', fontSize: '15px', fontFamily: 'var(--font-mono)' }}>
                      AED {totalAssets.toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Right Column: Liabilities & Equity */}
            <div>
              <div style={{ fontSize: '13px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--whop-text-muted)', letterSpacing: '0.04em', marginBottom: '12px' }}>
                LIABILITIES & SHAREHOLDERS EQUITY
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                <tbody>
                  {liabilityAccounts.map((acc) => (
                    <tr key={acc.account_code} style={{ borderBottom: '1px solid var(--whop-border-light)' }}>
                      <td style={{ padding: '10px 0', color: 'var(--whop-text-primary)' }}>
                        <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--whop-text-muted)', marginRight: '8px' }}>{acc.account_code}</span>
                        {acc.name}
                      </td>
                      <td style={{ padding: '10px 0', textAlign: 'right', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                        AED {Number(acc.balance).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                  {equityAccounts.map((acc) => (
                    <tr key={acc.account_code} style={{ borderBottom: '1px solid var(--whop-border-light)' }}>
                      <td style={{ padding: '10px 0', color: 'var(--whop-text-primary)' }}>
                        <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--whop-text-muted)', marginRight: '8px' }}>{acc.account_code}</span>
                        {acc.name}
                      </td>
                      <td style={{ padding: '10px 0', textAlign: 'right', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                        AED {Number(acc.balance).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                  <tr style={{ borderBottom: '1px solid var(--whop-border-light)' }}>
                    <td style={{ padding: '10px 0', color: 'var(--whop-text-primary)' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--whop-text-muted)', marginRight: '8px' }}>3999</span>
                      Current Year Retained Net Earnings
                    </td>
                    <td style={{ padding: '10px 0', textAlign: 'right', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                      AED {netIncome.toLocaleString()}
                    </td>
                  </tr>
                  <tr style={{ fontWeight: 800, borderTop: '2px solid var(--whop-text-primary)' }}>
                    <td style={{ padding: '14px 0', fontSize: '14px' }}>TOTAL LIABILITIES & EQUITY</td>
                    <td style={{ padding: '14px 0', textAlign: 'right', fontSize: '15px', fontFamily: 'var(--font-mono)' }}>
                      AED {(totalLiabilities + totalEquity).toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ── 3. Cash Flow Statement ── */}
      {statementType === 'cash_flow' && (
        <div className="whop-card" style={{ padding: '32px' }}>
          <div style={{ borderBottom: '1px solid var(--whop-border)', paddingBottom: '16px', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--whop-text-primary)', margin: 0 }}>
              AHMV Systems — Statement of Cash Flows
            </h3>
            <span style={{ fontSize: '12px', color: 'var(--whop-text-muted)', fontFamily: 'var(--font-mono)' }}>
              Direct Method · Cash and Cash Equivalents Runway Telemetry
            </span>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--whop-border-light)' }}>
                <td style={{ padding: '12px 0', fontWeight: 600 }}>Cash Inflow from Architecture Deployments & Retainers</td>
                <td style={{ padding: '12px 0', textAlign: 'right', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--whop-success)' }}>
                  +AED {totalRevenue.toLocaleString()}
                </td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--whop-border-light)' }}>
                <td style={{ padding: '12px 0', fontWeight: 600 }}>Cash Outflow for Server Infrastructure & LLM Compute</td>
                <td style={{ padding: '12px 0', textAlign: 'right', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--whop-danger)' }}>
                  -AED {totalExpenses.toLocaleString()}
                </td>
              </tr>
              <tr style={{ fontWeight: 800, borderTop: '2px solid var(--whop-text-primary)' }}>
                <td style={{ padding: '16px 0', fontSize: '14px' }}>NET CASH PROVIDED BY OPERATING ACTIVITIES</td>
                <td style={{ padding: '16px 0', textAlign: 'right', fontSize: '16px', fontFamily: 'var(--font-mono)', color: 'var(--whop-success)' }}>
                  +AED {netIncome.toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
