import React, { useState } from 'react';
import { Clock, Droplets, UserCheck, Moon, Sun, ShieldAlert, Globe, Plane, Heart, Home, DollarSign, ShieldCheck } from 'lucide-react';
import { playClickSound, playHoverSound } from '../utils/audio';

export default function ExecutiveRoutine() {
  const [activeSlot, setActiveSlot] = useState(1);

  const scheduleSlots = [
    {
      time: '04:30 AM - 05:00 AM',
      title: 'Faith & Morning Hydration',
      icon: Sun,
      category: 'Spiritual & Metabolism',
      details: 'Wake up, perform Wudu, and pray Fajr. Consume 500ml of cold water immediately to trigger cellular metabolism and rapidly flush out morning facial puffiness.',
    },
    {
      time: '05:00 AM - 06:30 AM',
      title: 'Core System Engineering Block',
      icon: Clock,
      category: 'Deep Work Window',
      details: 'The highest mental clarity window. Devoted entirely to writing custom scraping scripts, configuring Claude API loops, and auditing ad campaign metrics while the mind is fresh and uninterrupted.',
    },
    {
      time: '06:30 AM - 07:00 AM',
      title: 'Domestic Automation & Shower',
      icon: Droplets,
      category: 'Physical & Meal Prep',
      details: 'Cool or cold shower to close skin pores and tighten facial definition. Boil the daily egg baseline and prepare low-cost soya chunk portions for the day.',
    },
    {
      time: '07:00 AM Sharp',
      title: '🛑 THE BUSINESS HARD-STOP',
      icon: ShieldAlert,
      category: 'Corporate Execution',
      details: 'Sit at the laptop. From this exact second forward, all physical goals are handled. The day belongs 100% to corporate execution, sales outreach, and development for AHMV Systems.',
    },
    {
      time: '08:30 AM',
      title: 'Meal 1: Desk Breakfast',
      icon: Clock,
      category: 'High-Protein Fuel',
      details: 'Consume 3 boiled eggs and 2 whole-wheat rotis directly at the desk while handling initial communication or administrative tasks.',
    },
    {
      time: '12:30 PM - 01:00 PM',
      title: 'Midday Spiritual Break & Reset',
      icon: Sun,
      category: 'Spiritual Reset',
      details: 'Step away from the screen, refresh Wudu, and pray Dhuhr to cleanly clear out operational stress.',
    },
    {
      time: '01:00 PM',
      title: 'Meal 2: Core Fuel Lunch',
      icon: Clock,
      category: 'Budget Fuel',
      details: 'Consume prepped bulk chicken cuts (cooked with bone to optimize budget), 1 cup of white rice, and raw cucumbers.',
    },
    {
      time: '01:30 PM - 04:00 PM',
      title: 'General Operations & NIOS Study',
      icon: Clock,
      category: 'Ops & Academic',
      details: 'Execute daily client operations, manage inbound communications, and dedicate a strict block to clearing academic coursework (NIOS).',
    },
    {
      time: '04:00 PM - 04:20 PM',
      title: 'Afternoon Prayer & Snack',
      icon: Sun,
      category: 'High Protein',
      details: 'Pray Asr. Consume 50g to 100g of seasoned boiled soya chunks to hit high protein numbers cheaply.',
    },
    {
      time: '04:20 PM - 06:30 PM',
      title: 'Evening Lead & Pipeline Operations',
      icon: Clock,
      category: 'Pipeline Ops',
      details: 'Monitor ad sets, respond to prospect inquiries, and review system operations.',
    },
    {
      time: '06:30 PM',
      title: 'Maghrib Prayer & Low-Sodium Dinner',
      icon: Moon,
      category: 'Recovery',
      details: 'Pray Maghrib. Consume a light dinner with family, keeping sodium (salt) levels extremely low to guarantee a sharp, unbloated face tomorrow morning.',
    },
    {
      time: '07:30 PM',
      title: 'Isha Prayer & Digital Blackout',
      icon: Moon,
      category: 'Complete Recovery',
      details: 'Pray Isha. Shut down business laptop, wash face with cold water, practice posture alignment, and head directly to sleep to secure 7 to 8 hours of deep recovery.',
    },
  ];

  return (
    <section id="founder" className="light-section-wrapper light-padding">
      <div className="light-container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <span className="light-section-tag">06 // EXECUTIVE ROUTINE & GLOBAL PIVOT</span>
          <h2 className="light-section-title">
            Founder Optimization &<br />
            Long-Term Global Vision
          </h2>
          <p className="light-section-desc" style={{ margin: '0 auto' }}>
            To sustain intense custom software engineering, campaign monitoring, and NIOS schooling, 
            the founder operates on a strict, automated daily schedule with background desk health protocols.
          </p>
        </div>

        {/* Health HUD Metrics Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '24px',
          marginBottom: '40px',
        }} className="health-hud-grid">
          
          <div className="light-card" style={{ padding: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <Droplets size={22} color="#09090b" />
              <div>
                <h4 style={{ fontFamily: 'var(--font-syne)', fontSize: '18px', fontWeight: 800, color: '#09090b' }}>
                  The 4+ Liter Water Law
                </h4>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#71717a', fontWeight: 700 }}>
                  DESK FACIAL CHISELING PROTOCOL
                </div>
              </div>
            </div>
            <p style={{ color: '#52525b', fontSize: '13px', lineHeight: 1.6 }}>
              Keep a 1-liter container next to keyboard at all times. Consuming 4+ liters of water daily forces subcutaneous fluid release, 
              completely chiseling the face and sharpening jawline profile entirely from your desk chair.
            </p>
          </div>

          <div className="light-card" style={{ padding: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <UserCheck size={22} color="#09090b" />
              <div>
                <h4 style={{ fontFamily: 'var(--font-syne)', fontSize: '18px', fontWeight: 800, color: '#09090b' }}>
                  The Posture Commandment
                </h4>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#71717a', fontWeight: 700 }}>
                  DOMINANT FOUNDER PRESENCE
                </div>
              </div>
            </div>
            <p style={{ color: '#52525b', fontSize: '13px', lineHeight: 1.6 }}>
              Never slouch or lean forward into the screen. Slouching creates a false double chin and weak presence. 
              Keep shoulders pulled back, spine perfectly straight, and screen elevated to eye-level.
            </p>
          </div>

        </div>

        {/* Master Schedule Light Card */}
        <div className="light-card" style={{ marginBottom: '50px' }}>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: '#71717a',
            fontWeight: 700,
            marginBottom: '20px',
          }}>
            5.1 MASTER DAILY TIME-BLOCK SCHEDULE (04:30 AM ➔ 07:30 PM)
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr',
            gap: '32px',
          }} className="schedule-grid">
            
            {/* Slot List */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              maxHeight: '400px',
              overflowY: 'auto',
              paddingRight: '8px',
            }}>
              {scheduleSlots.map((slot, idx) => {
                const isActive = activeSlot === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => {
                      playClickSound();
                      setActiveSlot(idx);
                    }}
                    onMouseEnter={playHoverSound}
                    style={{
                      background: isActive ? '#09090b' : '#f8f8fa',
                      color: isActive ? '#ffffff' : '#09090b',
                      border: `1px solid ${isActive ? '#09090b' : '#e4e4e7'}`,
                      padding: '12px 16px',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <slot.icon size={16} color={isActive ? '#ffffff' : '#71717a'} />
                      <div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: isActive ? '#ffffff' : '#71717a' }}>
                          {slot.time}
                        </div>
                        <div style={{ fontSize: '13px', fontWeight: 600, color: isActive ? '#ffffff' : '#09090b' }}>
                          {slot.title}
                        </div>
                      </div>
                    </div>
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '9px',
                      color: isActive ? '#ffffff' : '#71717a',
                      border: `1px solid ${isActive ? '#ffffff' : '#e4e4e7'}`,
                      padding: '2px 8px',
                      borderRadius: '4px',
                    }}>
                      {slot.category}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Display Box */}
            <div style={{
              background: '#09090b',
              color: '#ffffff',
              borderRadius: '20px',
              padding: '32px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: '#a1a1aa',
                marginBottom: '8px',
              }}>
                ACTIVE BLOCK: {scheduleSlots[activeSlot].time}
              </div>

              <h3 style={{
                fontFamily: 'var(--font-syne)',
                fontSize: '24px',
                fontWeight: 800,
                color: '#ffffff',
                marginBottom: '16px',
              }}>
                {scheduleSlots[activeSlot].title}
              </h3>

              <p style={{
                color: '#ffffff',
                fontSize: '14px',
                lineHeight: 1.6,
                background: 'rgba(255, 255, 255, 0.08)',
                padding: '16px',
                borderRadius: '12px',
                borderLeft: '3px solid #ffffff',
              }}>
                {scheduleSlots[activeSlot].details}
              </p>
            </div>

          </div>

        </div>

        {/* Global Vision Section */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span className="light-section-tag">GLOBAL PIVOT // OMAN ➔ DUBAI ➔ US</span>
          <h3 style={{ fontFamily: 'var(--font-syne)', fontSize: '32px', fontWeight: 800, color: '#09090b' }}>
            International Expansion & Enterprise Goals
          </h3>
        </div>

        {/* Roadmap Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px',
          marginBottom: '40px',
        }} className="roadmap-grid">
          
          <div className="light-card" style={{ padding: '32px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#71717a', fontWeight: 700, marginBottom: '12px' }}>
              PHASE 1: SEP - DEC 2026
            </div>
            <h4 style={{ fontFamily: 'var(--font-syne)', fontSize: '18px', fontWeight: 800, color: '#09090b', marginBottom: '10px' }}>
              India Proof-of-Concept
            </h4>
            <p style={{ color: '#52525b', fontSize: '13px', lineHeight: 1.6, marginBottom: '16px' }}>
              Build massive technical proof of concept in Indian market, generating ₹7,80,000 in accumulated banked net profit runway.
            </p>
            <span className="light-badge-pill">
              ₹7.8L BANKED RUNWAY
            </span>
          </div>

          <div className="light-card" style={{ padding: '32px', border: '2px solid #09090b' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#09090b', fontWeight: 700, marginBottom: '12px' }}>
              PHASE 2: JANUARY 2027
            </div>
            <h4 style={{ fontFamily: 'var(--font-syne)', fontSize: '18px', fontWeight: 800, color: '#09090b', marginBottom: '10px' }}>
              Strategic Oman Relocation
            </h4>
            <p style={{ color: '#52525b', fontSize: '13px', lineHeight: 1.6, marginBottom: '16px' }}>
              Execute strategic international relocation to Muscat, Oman using the ₹7.8L runway to establish GCC corporate headquarters.
            </p>
            <span className="light-badge-pill" style={{ background: '#09090b', color: '#ffffff' }}>
              <Plane size={12} /> OMAN HEADQUARTERS
            </span>
          </div>

          <div className="light-card" style={{ padding: '32px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#71717a', fontWeight: 700, marginBottom: '12px' }}>
              PHASE 3: 2027 ONWARD
            </div>
            <h4 style={{ fontFamily: 'var(--font-syne)', fontSize: '18px', fontWeight: 800, color: '#09090b', marginBottom: '10px' }}>
              Dubai & US Currency Scale
            </h4>
            <p style={{ color: '#52525b', fontSize: '13px', lineHeight: 1.6, marginBottom: '16px' }}>
              Pivot marketing framework to high-ticket Dubai & US corporate niches, capturing hands-free recurring SaaS revenue in AED & USD.
            </p>
            <span className="light-badge-pill">
              <DollarSign size={12} /> AED & USD REVENUE
            </span>
          </div>

        </div>

        {/* Milestones Card */}
        <div className="light-card">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '24px',
            flexWrap: 'wrap',
            gap: '12px',
          }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#71717a', fontWeight: 700 }}>
                THE ULTIMATE WHY & FOUNDER DRIVERS
              </div>
              <h4 style={{ fontFamily: 'var(--font-syne)', fontSize: '24px', fontWeight: 800, color: '#09090b' }}>
                Strategic Enterprise Milestones
              </h4>
            </div>
            <ShieldCheck size={28} color="#09090b" />
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '24px',
          }} className="milestone-grid">
            
            <div style={{
              background: '#f8f8fa',
              border: '1px solid #e4e4e7',
              borderRadius: '16px',
              padding: '20px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '16px',
            }}>
              <Home size={24} color="#09090b" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <h5 style={{ fontFamily: 'var(--font-syne)', fontSize: '18px', fontWeight: 800, color: '#09090b', marginBottom: '4px' }}>
                  Parents 3BHK Home Sponsorship
                </h5>
                <p style={{ color: '#52525b', fontSize: '13px', lineHeight: 1.5 }}>
                  Comfortably funding a spacious, premium 3BHK home for the parents using hands-free recurring corporate software profits.
                </p>
              </div>
            </div>

            <div style={{
              background: '#f8f8fa',
              border: '1px solid #e4e4e7',
              borderRadius: '16px',
              padding: '20px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '16px',
            }}>
              <Heart size={24} color="#09090b" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <h5 style={{ fontFamily: 'var(--font-syne)', fontSize: '18px', fontWeight: 800, color: '#09090b', marginBottom: '4px' }}>
                  Family Umrah Trip Sponsorship
                </h5>
                <p style={{ color: '#52525b', fontSize: '13px', lineHeight: 1.5 }}>
                  Safely financing their upcoming sacred Umrah pilgrimage to Makkah & Madinah with zero financial stress or debt.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
