import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function TermsOfService() {
  useEffect(() => {
    document.title = 'Terms of Service — AHMV';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Terms of Service governing use of AHMV AI-native business systems, platforms, and technology services.');
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#FFFFFF', color: '#0A0A0B', fontFamily: 'var(--font-grotesk)' }}>
      <Navbar />

      <main style={{ maxWidth: '860px', margin: '0 auto', padding: '140px 24px 80px' }}>
        {/* Header Breadcrumb & Title */}
        <div style={{ marginBottom: '48px', borderBottom: '1px solid #E4E4E7', paddingBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <Link to="/" style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: '#71717A', textDecoration: 'none' }}>
              AHMV
            </Link>
            <span style={{ fontSize: '12px', color: '#D4D4D8' }}>/</span>
            <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: '#0A0A0B', fontWeight: 600 }}>
              LEGAL
            </span>
          </div>

          <h1 style={{ fontSize: 'clamp(32px, 4.5vw, 48px)', fontWeight: 500, letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: '16px' }}>
            Terms of Service
          </h1>

          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', fontSize: '13px', color: '#71717A', fontFamily: 'var(--font-mono)' }}>
            <span>Effective Date: January 1, 2026</span>
            <span>Last Updated: January 2026</span>
            <span>Entity: AHMV</span>
          </div>
        </div>

        {/* Legal Content */}
        <div style={{ fontSize: '15px', lineHeight: 1.75, color: '#3F3F46', display: 'flex', flexDirection: 'column', gap: '36px' }}>
          
          <section>
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#0A0A0B', letterSpacing: '-0.01em', marginBottom: '12px' }}>
              1. Acceptance of Terms
            </h2>
            <p style={{ marginBottom: '12px' }}>
              These Terms of Service ("Terms") constitute a legally binding agreement between you or the entity you represent ("Client", "User", or "you") and <strong>AHMV</strong> ("AHMV", "we", "us", or "our"), a sole proprietorship registered in January 2026 and based in Bengaluru, Karnataka, India.
            </p>
            <p>
              By accessing or using our website (<a href="https://ahmv.si" style={{ color: '#0A0A0B', textDecoration: 'underline' }}>https://ahmv.si</a>), our software platforms, or any engineering services provided by AHMV, you agree to be bound by these Terms.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#0A0A0B', letterSpacing: '-0.01em', marginBottom: '12px' }}>
              2. Scope of Services & Products
            </h2>
            <p style={{ marginBottom: '12px' }}>
              AHMV develops and deploys AI-native business systems, enterprise workflow automations, custom ERP/CRM platforms, internal business infrastructure, and standalone SaaS software products.
            </p>
            <p>
              Specific project scopes, deliverables, timelines, milestones, and commercial fees for bespoke engagements are governed by written statements of work, invoices, or service agreements agreed upon between the parties.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#0A0A0B', letterSpacing: '-0.01em', marginBottom: '12px' }}>
              3. Intellectual Property & Ownership
            </h2>
            <p style={{ marginBottom: '12px' }}>
              Unless otherwise expressly stipulated in a specific written agreement:
            </p>
            <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li>
                <strong>Client Deliverables:</strong> Upon full payment of agreed fees, the Client owns the custom deliverables, custom application code, and proprietary client business data produced specifically for the Client under an executed agreement.
              </li>
              <li>
                <strong>AHMV Background IP & Platforms:</strong> AHMV retains all rights, title, and interest in and to its pre-existing codebases, core framework architectures, modular system templates, pre-engineered building blocks, and proprietary SaaS platforms.
              </li>
              <li>
                <strong>Third-Party Components:</strong> Any third-party software, open-source libraries, or external APIs integrated into a project remain subject to their respective licenses.
              </li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#0A0A0B', letterSpacing: '-0.01em', marginBottom: '12px' }}>
              4. Client Obligations & Acceptable Use
            </h2>
            <p style={{ marginBottom: '12px' }}>
              You agree to use AHMV websites, products, and services only for lawful business purposes. You agree not to:
            </p>
            <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li>Use any system to transmit unlawful, defamatory, infringing, or malicious content.</li>
              <li>Reverse engineer, decompile, or compromise the security of any platform or tool provided by AHMV.</li>
              <li>Deploy automated scraping or denial-of-service activities against AHMV infrastructure.</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#0A0A0B', letterSpacing: '-0.01em', marginBottom: '12px' }}>
              5. Warranties & Disclaimers
            </h2>
            <p style={{ marginBottom: '12px' }}>
              AHMV warrants that services will be performed with professional diligence and in accordance with agreed technical specifications.
            </p>
            <p>
              Except as expressly set forth in a binding contract, our website and materials are provided "as is" without warranty of any kind. AHMV does not guarantee specific external business metrics, market performance, or third-party platform uptime outside its direct control.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#0A0A0B', letterSpacing: '-0.01em', marginBottom: '12px' }}>
              6. Limitation of Liability
            </h2>
            <p style={{ marginBottom: '12px' }}>
              To the maximum extent permitted by applicable law, in no event shall AHMV be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or business opportunities, arising out of or in connection with the use of our website or services.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#0A0A0B', letterSpacing: '-0.01em', marginBottom: '12px' }}>
              7. Governing Law & Dispute Resolution
            </h2>
            <p style={{ marginBottom: '12px' }}>
              These Terms shall be governed by and construed in accordance with the substantive laws of India. Any dispute or claim arising out of or relating to these Terms shall be subject to the exclusive jurisdiction of the competent courts in Bengaluru, Karnataka, India.
            </p>
          </section>

          <section style={{ borderTop: '1px solid #E4E4E7', paddingTop: '28px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#0A0A0B', letterSpacing: '-0.01em', marginBottom: '12px' }}>
              8. Contact & Entity Information
            </h2>
            <div style={{ background: '#F4F4F5', border: '1px solid #E4E4E7', borderRadius: '12px', padding: '24px', fontFamily: 'var(--font-mono)', fontSize: '13px', lineHeight: 1.8 }}>
              <div><strong>Company:</strong> AHMV</div>
              <div><strong>Legal Structure:</strong> Sole Proprietorship</div>
              <div><strong>Founded:</strong> January 2026</div>
              <div><strong>Location:</strong> Bengaluru, Karnataka, India</div>
              <div><strong>Official Email:</strong> <a href="mailto:cultlike@ahmv.si" style={{ color: '#0A0A0B' }}>cultlike@ahmv.si</a></div>
              <div><strong>Website:</strong> <a href="https://ahmv.si" style={{ color: '#0A0A0B' }}>https://ahmv.si</a></div>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
