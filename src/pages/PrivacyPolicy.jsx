import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function PrivacyPolicy() {
  useEffect(() => {
    document.title = 'Privacy Policy — AHMV';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Privacy Policy for AHMV — AI-native business systems, software, and technology solutions.');
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
            Privacy Policy
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
              1. Overview & Scope
            </h2>
            <p style={{ marginBottom: '12px' }}>
              This Privacy Policy describes how <strong>AHMV</strong> ("AHMV", "we", "us", or "our"), a sole proprietorship established in January 2026 and located in Bengaluru, Karnataka, India, collects, uses, processes, and protects your personal information when you visit our website at <a href="https://ahmv.si" style={{ color: '#0A0A0B', textDecoration: 'underline' }}>https://ahmv.si</a>, use our software products and platforms, or engage with our software engineering and operational services.
            </p>
            <p>
              We are committed to respecting your privacy and ensuring transparency in all our data handling practices.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#0A0A0B', letterSpacing: '-0.01em', marginBottom: '12px' }}>
              2. Information We Collect
            </h2>
            <p style={{ marginBottom: '12px' }}>
              We collect information directly provided by you, as well as limited technical telemetry required to operate and secure our digital services:
            </p>
            <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li>
                <strong>Contact and Business Inquiries:</strong> When you submit an inquiry, request an Operations Review, or contact us, we collect your name, business email address, company name, business type, and descriptions of operational bottlenecks or system requirements.
              </li>
              <li>
                <strong>Engagement & Consultation Data:</strong> Information shared during client discovery, architecture planning, system audits, and technical evaluations.
              </li>
              <li>
                <strong>Technical & Usage Data:</strong> Internet Protocol (IP) address, browser type, device identifiers, referring URLs, operating system, and standard server log metrics when accessing our web infrastructure.
              </li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#0A0A0B', letterSpacing: '-0.01em', marginBottom: '12px' }}>
              3. How We Use Your Information
            </h2>
            <p style={{ marginBottom: '12px' }}>
              AHMV processes collected data strictly for legitimate operational and business purposes, including:
            </p>
            <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li>Providing, deploying, and maintaining AI-native business systems, ERP/CRM platforms, and workflow automation software.</li>
              <li>Evaluating and responding to diagnostic audit requests, consultation inquiries, and customer support communications.</li>
              <li>Developing and improving our proprietary platforms, tools, and SaaS solutions.</li>
              <li>Protecting the security, integrity, and operational availability of our website and infrastructure.</li>
              <li>Complying with applicable legal, regulatory, and tax obligations under the laws of India.</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#0A0A0B', letterSpacing: '-0.01em', marginBottom: '12px' }}>
              4. AI Systems & Data Processing Practices
            </h2>
            <p style={{ marginBottom: '12px' }}>
              As a provider of AI-native business systems, AHMV maintains rigorous standards regarding artificial intelligence and machine learning pipelines:
            </p>
            <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li>Client-specific business data and proprietary information are strictly segregated and never used to train public foundation models without explicit written authorization.</li>
              <li>Automated processing pipelines operate under the principle of least privilege, processing only the data parameters necessary to execute designated workflows.</li>
              <li>All client project data, API credentials, and database records remain governed by specific bilateral service agreements.</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#0A0A0B', letterSpacing: '-0.01em', marginBottom: '12px' }}>
              5. Data Sharing & Third-Party Service Providers
            </h2>
            <p style={{ marginBottom: '12px' }}>
              We do not sell, rent, or trade your personal information. We may share limited data with trusted third-party infrastructure and service providers solely to the extent necessary to deliver our services (such as cloud hosting, database infrastructure, and analytics), subject to strict confidentiality terms.
            </p>
            <p>
              We may also disclose information if required to do so by applicable law, court order, or governmental regulation.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#0A0A0B', letterSpacing: '-0.01em', marginBottom: '12px' }}>
              6. Data Retention & Security
            </h2>
            <p style={{ marginBottom: '12px' }}>
              We implement industry-standard administrative, technical, and physical safeguards to protect information against unauthorized access, loss, misuse, or alteration. Data is retained only for as long as necessary to fulfill the purposes outlined in this policy or as required by statutory record-keeping obligations.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#0A0A0B', letterSpacing: '-0.01em', marginBottom: '12px' }}>
              7. Your Rights & Inquiries
            </h2>
            <p style={{ marginBottom: '12px' }}>
              Depending on your jurisdiction, you may have the right to request access to, correction of, or deletion of your personal data held by AHMV. To exercise any of these rights, or to submit a question regarding our privacy practices, please contact us at the details below.
            </p>
          </section>

          <section style={{ borderTop: '1px solid #E4E4E7', paddingTop: '28px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#0A0A0B', letterSpacing: '-0.01em', marginBottom: '12px' }}>
              8. Contact & Company Details
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
