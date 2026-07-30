import React, { useState } from 'react';
import { DollarSign, TrendingUp, CreditCard, ShieldCheck, Award } from 'lucide-react';
import { playClickSound, playHoverSound } from '../utils/audio';

export default function FinancialMatrix() {
  const [selectedMonth, setSelectedMonth] = useState(3);

  const scalingMatrix = [
    {
      month: 'September',
      adBudget: '₹10,000',
      clientCount: 2,
      saasUsers: 0,
      grossRevText: '₹80,000',
      cumulativeText: '₹65,000',
      highlights: 'Initial onboarding pipeline engineering, domain warming, & first 2 retainers secured.',
    },
    {
      month: 'October',
      adBudget: '₹20,000',
      clientCount: 5,
      saasUsers: 0,
      grossRevText: '₹1,50,000',
      cumulativeText: '₹1,90,000',
      highlights: 'Reinvesting ad profits to expand Meta/Google lead form reach.',
    },
    {
      month: 'November',
      adBudget: '₹30,000',
      clientCount: 9,
      saasUsers: 5,
      grossRevText: '₹2,60,000',
      cumulativeText: '₹4,15,000',
      highlights: 'SaaS Pivot Initiate! Core custom codebase standardized at ₹5,000/mo.',
    },
    {
      month: 'December',
      adBudget: '₹40,000',
      clientCount: 14,
      saasUsers: 15,
      grossRevText: '₹4,10,000',
      cumulativeText: '₹7,80,000',
      highlights: 'Full compound velocity! Cumulative banked net profit reaches ₹7.8 Lakhs.',
    },
  ];

  const current = scalingMatrix[selectedMonth];

  return (
    <section id="about" className="light-section-wrapper light-padding">
      <div className="light-container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <span className="light-section-tag">05 // FINANCIAL ENGINEERING & COMMERCIALS</span>
          <h2 className="light-section-title">
            Dual-Tier Commercials<br />
            & Compounding Scale
          </h2>
          <p className="light-section-desc" style={{ margin: '0 auto' }}>
            A high-converting, dual-tier pricing model engineered to capture maximum volume while maintaining premium profit margins.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '32px',
          marginBottom: '40px',
        }} className="commercials-grid">
          
          {/* Core Pricing */}
          <div className="light-card">
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '20px',
              paddingBottom: '16px',
              borderBottom: '1px solid #e4e4e7',
            }}>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#71717a', fontWeight: 700 }}>MODEL 4.1</div>
                <h3 style={{ fontFamily: 'var(--font-syne)', fontSize: '22px', fontWeight: 800, color: '#09090b' }}>
                  Core Client Commercials
                </h3>
              </div>
              <DollarSign size={24} color="#09090b" />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{
                background: '#f8f8fa',
                border: '1px solid #e4e4e7',
                padding: '18px',
                borderRadius: '12px',
              }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#71717a' }}>UPFRONT SETUP FEE</div>
                <div style={{ fontFamily: 'var(--font-syne)', fontSize: '28px', fontWeight: 800, color: '#09090b' }}>
                  ₹25,000 <span style={{ fontSize: '13px', color: '#71717a', fontWeight: 400 }}>one-time onboarding</span>
                </div>
                <div style={{ fontSize: '12px', color: '#71717a', marginTop: '4px' }}>
                  Covers pipeline engineering, custom script setup, domain warming & CRM config.
                </div>
              </div>

              <div style={{
                background: '#ffffff',
                border: '2px solid #09090b',
                padding: '18px',
                borderRadius: '12px',
              }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#71717a', fontWeight: 700 }}>MONTHLY RECURRING RETAINER</div>
                <div style={{ fontFamily: 'var(--font-syne)', fontSize: '28px', fontWeight: 800, color: '#09090b' }}>
                  ₹15,000 <span style={{ fontSize: '13px', color: '#71717a', fontWeight: 400 }}>/ month</span>
                </div>
                <div style={{ fontSize: '12px', color: '#71717a', marginTop: '4px' }}>
                  Recurring management, monitoring, system optimization, and scaling.
                </div>
              </div>
            </div>
          </div>

          {/* Ad Protocol */}
          <div className="light-card">
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '20px',
              paddingBottom: '16px',
              borderBottom: '1px solid #e4e4e7',
            }}>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#71717a', fontWeight: 700 }}>PROTOCOL 4.2</div>
                <h3 style={{ fontFamily: 'var(--font-syne)', fontSize: '22px', fontWeight: 800, color: '#09090b' }}>
                  The 100% Ad Spend Protocol
                </h3>
              </div>
              <CreditCard size={24} color="#09090b" />
            </div>

            <p style={{ color: '#52525b', fontSize: '14px', lineHeight: 1.6, marginBottom: '20px' }}>
              A hard-and-fast operational law of AHMV Systems is that the client covers 100% of active advertisement spend directly.
            </p>

            <div style={{
              background: '#f4f4f5',
              border: '1px solid #e4e4e7',
              borderRadius: '12px',
              padding: '18px',
              marginBottom: '20px',
            }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#09090b', fontFamily: 'var(--font-mono)' }}>
                DIRECT BILLING INTEGRATION
              </div>
              <div style={{ fontSize: '13px', color: '#52525b', marginTop: '4px' }}>
                Client securely links corporate card to Meta/Google Business Manager. Recommended testing baseline: <strong>₹300 to ₹500 / day</strong>.
              </div>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '12px',
              fontFamily: 'var(--font-mono)',
              color: '#09090b',
              fontWeight: 700,
            }}>
              <ShieldCheck size={16} />
              <span>RESULT: AGENCY FEES REMAIN 100% UNTOUCHED PURE PROFIT</span>
            </div>
          </div>

        </div>

        {/* 4-Month Scaling Matrix Light Card */}
        <div className="light-card">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '28px',
            flexWrap: 'wrap',
            gap: '16px',
          }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#71717a', fontWeight: 700 }}>
                4.3 COMPOUNDING FINANCIAL SCALING MATRIX
              </div>
              <h3 style={{ fontFamily: 'var(--font-syne)', fontSize: '26px', fontWeight: 800, color: '#09090b' }}>
                4-Month Profit Runway Simulator
              </h3>
            </div>

            {/* Month Selectors */}
            <div style={{ display: 'flex', gap: '8px' }}>
              {scalingMatrix.map((item, idx) => (
                <button
                  key={item.month}
                  onClick={() => {
                    playClickSound();
                    setSelectedMonth(idx);
                  }}
                  onMouseEnter={playHoverSound}
                  style={{
                    background: selectedMonth === idx ? '#09090b' : '#f4f4f5',
                    color: selectedMonth === idx ? '#ffffff' : '#71717a',
                    border: `1px solid ${selectedMonth === idx ? '#09090b' : '#e4e4e7'}`,
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {item.month}
                </button>
              ))}
            </div>
          </div>

          {/* Details Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '20px',
            marginBottom: '24px',
          }} className="scaling-kpi-grid">
            
            <div style={{
              background: '#f8f8fa',
              border: '1px solid #e4e4e7',
              padding: '18px',
              borderRadius: '14px',
            }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#71717a' }}>REINVESTED AD BUDGET</div>
              <div style={{ fontFamily: 'var(--font-syne)', fontSize: '24px', fontWeight: 800, color: '#09090b' }}>
                {current.adBudget}
              </div>
            </div>

            <div style={{
              background: '#f8f8fa',
              border: '1px solid #e4e4e7',
              padding: '18px',
              borderRadius: '14px',
            }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#71717a' }}>ACTIVE CLIENTS</div>
              <div style={{ fontFamily: 'var(--font-syne)', fontSize: '24px', fontWeight: 800, color: '#09090b' }}>
                {current.clientCount} Clients
              </div>
              {current.saasUsers > 0 && (
                <div style={{ fontSize: '11px', color: '#71717a', fontFamily: 'var(--font-mono)' }}>
                  + {current.saasUsers} SaaS Users
                </div>
              )}
            </div>

            <div style={{
              background: '#f8f8fa',
              border: '1px solid #e4e4e7',
              padding: '18px',
              borderRadius: '14px',
            }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#71717a' }}>MONTHLY GROSS REVENUE</div>
              <div style={{ fontFamily: 'var(--font-syne)', fontSize: '24px', fontWeight: 800, color: '#09090b' }}>
                {current.grossRevText}
              </div>
            </div>

            <div style={{
              background: '#09090b',
              color: '#ffffff',
              padding: '18px',
              borderRadius: '14px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
            }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#a1a1aa', fontWeight: 700 }}>
                CUMULATIVE BANKED PROFIT
              </div>
              <div style={{ fontFamily: 'var(--font-syne)', fontSize: '26px', fontWeight: 800, color: '#ffffff' }}>
                {current.cumulativeText}
              </div>
            </div>

          </div>

          <div style={{
            background: '#f4f4f5',
            border: '1px solid #e4e4e7',
            borderRadius: '12px',
            padding: '18px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Award size={18} color="#09090b" />
              <span style={{ fontSize: '14px', color: '#52525b' }}>
                <strong>{current.month} Milestone:</strong> {current.highlights}
              </span>
            </div>

            {selectedMonth === 3 && (
              <span className="light-badge-pill" style={{ background: '#09090b', color: '#ffffff' }}>
                ₹7,80,000 ACCUMULATED BY DEC 31ST
              </span>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
