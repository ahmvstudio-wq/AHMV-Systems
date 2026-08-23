import React, { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { products } from '../data/productsData';

gsap.registerPlugin(ScrollTrigger);

export default function ProductDetailPage() {
  const { productId } = useParams();
  const product = products.find((p) => p.id === productId);
  const heroRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);

  if (!product) {
    return (
      <div style={{ minHeight: '100vh', background: '#FFFFFF', color: '#0A0A0B', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-grotesk)' }}>
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <p style={{ fontFamily: 'var(--font-mono)', color: 'rgba(0,0,0,0.4)', marginBottom: '16px' }}>
            PRODUCT NOT FOUND
          </p>
          <h1 style={{ fontSize: '28px', marginBottom: '24px' }}>System Architecture Not Found</h1>
          <Link to="/" style={{ color: '#0A0A0B', textDecoration: 'underline', fontFamily: 'var(--font-mono)' }}>
            ← Back to Homepage
          </Link>
        </div>
      </div>
    );
  }

  const otherProducts = products.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <div style={{ minHeight: '100vh', background: '#FFFFFF', color: '#0A0A0B', fontFamily: 'var(--font-grotesk)' }}>
      
      {/* Top sticky navigation bar */}
      <nav style={{ padding: '20px 32px', borderBottom: '1px solid #E4E4E7', position: 'sticky', top: 0, background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(12px)', zIndex: 100 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
              <img
                src="/logo.png.png"
                onError={(e) => { e.currentTarget.src = '/logo.png'; }}
                alt="AHMV Systems"
                style={{ height: '40px', width: 'auto', display: 'block' }}
              />
            </Link>
            <span style={{ color: '#E4E4E7' }}>/</span>
            <Link to="/#products" style={{ fontSize: '13px', color: '#71717A', textDecoration: 'none', fontFamily: 'var(--font-mono)' }}>
              Products
            </Link>
            <span style={{ color: '#E4E4E7' }}>/</span>
            <span style={{ fontSize: '13px', color: '#0A0A0B', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>
              {product.title}
            </span>
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <a
              href={product.checkoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-main cta-main1"
              style={{
                height: '40px',
                padding: '0 20px',
                background: '#0A0A0B',
                color: '#FFFFFF',
                borderRadius: '8px',
                fontSize: '12px',
                textDecoration: 'none',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span>Get Instant Access - Free</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Main Content Body */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 24px 100px' }}>
        
        {/* Breadcrumb & Category */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', background: '#F4F4F5', padding: '4px 10px', borderRadius: '6px', color: '#27272A', fontWeight: 600, textTransform: 'uppercase' }}>
            {product.category}
          </span>
          <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', background: '#0A0A0B', color: '#FFFFFF', padding: '4px 10px', borderRadius: '6px', fontWeight: 600 }}>
            {product.badge}
          </span>
        </div>

        {/* Hero Section */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '48px', alignItems: 'start', marginBottom: '64px' }} className="product-hero-grid">
          <div>
            <h1
              style={{
                fontSize: 'clamp(32px, 4.4vw, 56px)',
                fontWeight: 400,
                lineHeight: 1.08,
                letterSpacing: '-0.02em',
                marginBottom: '20px',
                color: '#0A0A0B',
              }}
            >
              {product.title}
            </h1>

            <p style={{ fontSize: '16px', lineHeight: 1.65, color: '#52525B', marginBottom: '32px', maxWidth: '640px' }}>
              {product.shortDesc}
            </p>

            {/* Target Audience Box */}
            <div style={{ background: '#F4F4F5', border: '1px solid #E4E4E7', borderRadius: '12px', padding: '20px 24px', marginBottom: '32px' }}>
              <p style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#71717A', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '6px', fontWeight: 600 }}>
                Built For
              </p>
              <p style={{ fontSize: '14px', color: '#0A0A0B', lineHeight: 1.5, margin: 0, fontWeight: 500 }}>
                {product.targetAudience}
              </p>
            </div>

            {/* Primary Action Button */}
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
              <a
                href={product.checkoutUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  height: '52px',
                  padding: '0 32px',
                  background: '#0A0A0B',
                  color: '#FFFFFF',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 600,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  textDecoration: 'none',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                }}
              >
                Claim Free Access via Whop →
              </a>

              <a
                href="/#contact"
                style={{
                  height: '52px',
                  padding: '0 24px',
                  border: '1px solid #E4E4E7',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontFamily: 'var(--font-mono)',
                  color: '#0A0A0B',
                  display: 'inline-flex',
                  alignItems: 'center',
                  textDecoration: 'none',
                  background: '#FFFFFF',
                }}
              >
                Book Custom Setup Call
              </a>
            </div>
          </div>

          {/* Quick Specification Card */}
          <div style={{ background: '#0A0A0B', color: '#FFFFFF', borderRadius: '20px', padding: '36px 32px', boxShadow: '0 12px 40px rgba(0,0,0,0.12)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.12)', paddingBottom: '20px', marginBottom: '24px' }}>
              <div>
                <p style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#A1A1AA', textTransform: 'uppercase', margin: 0 }}>
                  Live Price
                </p>
                <div style={{ fontSize: '32px', fontWeight: 600, fontFamily: 'var(--font-mono)', marginTop: '4px' }}>
                  {product.price}
                </div>
              </div>
              <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', background: 'rgba(34,197,94,0.15)', color: '#4ADE80', padding: '6px 12px', borderRadius: '6px', fontWeight: 600 }}>
                ● Active Access
              </span>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <p style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#A1A1AA', textTransform: 'uppercase', marginBottom: '8px' }}>
                Primary Impact
              </p>
              <div style={{ fontSize: '18px', fontWeight: 500 }}>
                ⚡ {product.highlightMetric}
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <p style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#A1A1AA', textTransform: 'uppercase', marginBottom: '8px' }}>
                Tech Architecture Stack
              </p>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {product.techStack.map((tech, i) => (
                  <span key={i} style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', background: 'rgba(255,255,255,0.1)', padding: '4px 10px', borderRadius: '4px', color: '#FFFFFF' }}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: '20px' }}>
              <p style={{ fontSize: '12px', color: '#A1A1AA', lineHeight: 1.5, margin: 0 }}>
                Hosted and provisioned directly into your Whop account with full architectural documentation and setup guides.
              </p>
            </div>
          </div>
        </div>

        {/* 4-Step Architecture Pipeline */}
        <div style={{ marginBottom: '64px', background: '#FFFFFF', border: '1px solid #E4E4E7', borderRadius: '20px', padding: '40px' }}>
          <p className="label diode pr" style={{ marginBottom: '14px', color: 'var(--mwg2-grey)', fontSize: '11px', letterSpacing: '0.06em' }}>
            STEP-BY-STEP DATA PIPELINE
          </p>
          <h2 style={{ fontSize: '28px', fontWeight: 500, marginBottom: '32px', letterSpacing: '-0.02em' }}>
            How {product.title} Operates
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }} className="pipeline-grid">
            {Object.entries(product.architecture).map(([key, desc], i) => (
              <div key={key} style={{ background: '#F4F4F5', borderRadius: '12px', padding: '24px 20px', position: 'relative' }}>
                <div style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#71717A', marginBottom: '12px' }}>
                  PHASE 0{i + 1}
                </div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: '#0A0A0B', lineHeight: 1.45 }}>
                  {desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Full Deliverables Matrix */}
        <div style={{ marginBottom: '64px' }}>
          <p className="label diode pr" style={{ marginBottom: '14px', color: 'var(--mwg2-grey)', fontSize: '11px', letterSpacing: '0.06em' }}>
            DELIVERABLES BREAKDOWN
          </p>
          <h2 style={{ fontSize: '28px', fontWeight: 500, marginBottom: '24px', letterSpacing: '-0.02em' }}>
            What Is Included in this System
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="deliverables-grid">
            {product.deliverables.map((item, idx) => (
              <div key={idx} style={{ background: '#FFFFFF', border: '1px solid #E4E4E7', borderRadius: '12px', padding: '20px 24px', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <span style={{ background: '#0A0A0B', color: '#FFFFFF', width: '22px', height: '22px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 'bold', flexShrink: 0 }}>
                  ✓
                </span>
                <span style={{ fontSize: '14px', color: '#27272A', lineHeight: 1.5, fontWeight: 500 }}>
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Direct Checkout Banner */}
        <div style={{ background: '#0A0A0B', color: '#FFFFFF', borderRadius: '24px', padding: '60px 48px', textAlign: 'center', marginBottom: '80px', boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}>
          <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', background: 'rgba(255,255,255,0.1)', padding: '6px 14px', borderRadius: '6px', color: '#FFFFFF', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Instant Access
          </span>
          <h2 style={{ fontSize: '36px', fontWeight: 400, marginTop: '20px', marginBottom: '16px', letterSpacing: '-0.02em' }}>
            Ready to deploy {product.title}?
          </h2>
          <p style={{ color: '#A1A1AA', fontSize: '15px', maxWidth: '540px', margin: '0 auto 32px', lineHeight: 1.6 }}>
            Claim your free system deployment on Whop with full documentation, integrations, and setup templates.
          </p>

          <a
            href={product.checkoutUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              height: '52px',
              padding: '0 36px',
              background: '#FFFFFF',
              color: '#0A0A0B',
              borderRadius: '8px',
              fontSize: '13px',
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              textDecoration: 'none',
            }}
          >
            Claim Free Access via Whop →
          </a>
        </div>

        {/* Explore Other Products Section */}
        <div style={{ borderTop: '1px solid #E4E4E7', paddingTop: '48px' }}>
          <p style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#71717A', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '24px', fontWeight: 600 }}>
            EXPLORE OTHER OPERATING PRODUCTS
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }} className="other-products-grid">
            {otherProducts.map((p) => (
              <Link
                key={p.id}
                to={`/products/${p.id}`}
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #E4E4E7',
                  borderRadius: '16px',
                  padding: '24px',
                  textDecoration: 'none',
                  color: '#0A0A0B',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#0A0A0B';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.04)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#E4E4E7';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div>
                  <div style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: '#71717A', marginBottom: '8px', fontWeight: 600, textTransform: 'uppercase' }}>
                    {p.category}
                  </div>
                  <h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px', lineHeight: 1.3 }}>
                    {p.title}
                  </h4>
                  <p style={{ fontSize: '12px', color: '#71717A', lineHeight: 1.5, margin: 0 }}>
                    {p.shortDesc.slice(0, 100)}...
                  </p>
                </div>

                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', fontFamily: 'var(--font-mono)' }}>
                  <span style={{ fontWeight: 700, color: '#0A0A0B' }}>{p.price}</span>
                  <span style={{ color: '#0A0A0B', fontWeight: 600 }}>Explore →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 900px) {
          .product-hero-grid { grid-template-columns: 1fr !important; }
          .pipeline-grid { grid-template-columns: 1fr 1fr !important; }
          .deliverables-grid { grid-template-columns: 1fr !important; }
          .other-products-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          .pipeline-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
