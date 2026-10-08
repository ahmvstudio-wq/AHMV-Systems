import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useParams, useLocation, useNavigationType } from 'react-router-dom';
import { bootAnimations } from './animations';

import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import TypographicProblem from './components/TypographicProblem';
import ProblemSection from './components/ProblemSection';
import InteractiveSystemGraph from './components/InteractiveSystemGraph';
import RoiCalculator from './components/RoiCalculator';
import ProcessSection from './components/ProcessSection';
import FounderSection from './components/FounderSection';
import FaqSection from './components/FaqSection';
import Footer from './components/Footer';
import ProductsSection from './components/ProductsSection';
import ProductDetailPage from './components/ProductDetailPage';
import DiagnosticAuditModal from './components/DiagnosticAuditModal';
import ServicePageRouter from './components/ServicePages';
import BubbleCursor from './components/BubbleCursor';
import DiagnosticFlow from './components/DiagnosticFlow';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';

// ── 3 Independent Enterprise Software Suites ──
import AppLauncher from './apps/AppLauncher';
import CrmApp from './apps/crm/CrmApp';
import AdminIntakeApp from './apps/admin-intake/AdminIntakeApp';
import AccountingErpApp from './apps/accounting-erp/AccountingErpApp';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { playSuccessPulse } from './utils/audio';

// ── Homepage ──
function HomePage({ diagnosticData }) {
  const [activeVideoId, setActiveVideoId] = useState('MOD-01');
  const [auditModalOpen, setAuditModalOpen] = useState(false);

  useEffect(() => {
    document.title = 'AHMV — AI-Native Business Systems';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'AHMV builds AI-native business systems including ERP/CRM platforms, AI agents, workflow automation, internal tools, and SaaS products.');
    }

    bootAnimations();

    gsap.registerPlugin(ScrollTrigger);

    const sections = [
      { id: 'hero', code: 'MOD-01' },
      { id: 'problem', code: 'MOD-02' },
      { id: 'roi-calculator', code: 'MOD-03' },
      { id: 'products', code: 'MOD-04' },
      { id: 'process', code: 'MOD-05' },
      { id: 'founder', code: 'MOD-07' },
      { id: 'faq', code: 'MOD-08' },
      { id: 'contact', code: 'MOD-09' },
    ];

    const triggers = [];
    let soundTimeout = null;

    const triggerSectionSound = () => {
      if (soundTimeout) clearTimeout(soundTimeout);
      soundTimeout = setTimeout(() => {
        playSuccessPulse();
      }, 50);
    };

    sections.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) {
        const trigger = ScrollTrigger.create({
          trigger: el,
          start: 'top 40%',
          end: 'bottom 40%',
          onEnter: () => {
            setActiveVideoId(sec.code);
            triggerSectionSound();
          },
          onEnterBack: () => {
            setActiveVideoId(sec.code);
            triggerSectionSound();
          },
        });
        triggers.push(trigger);
      }
    });

    return () => {
      triggers.forEach(t => t.kill());
      if (soundTimeout) clearTimeout(soundTimeout);
    };
  }, []);

  return (
    <div className="homepage-wrapper">
      <Navbar onOpenAudit={() => setAuditModalOpen(true)} />

      <main style={{ position: 'relative', zIndex: 1 }}>
        {/* HERO */}
        <HeroSection diagnosticData={diagnosticData} onActiveVideoChange={(id) => setActiveVideoId(id)} onOpenAudit={() => setAuditModalOpen(true)} />

        {/* TYPOGRAPHIC PROBLEM STATEMENT */}
        <TypographicProblem diagnosticData={diagnosticData} />

        {/* THE PROBLEM (DATA/STATS) */}
        <ProblemSection />

        {/* ROI & OPERATIONS LEAK CALCULATOR */}
        <RoiCalculator />

        {/* SERVICES & PRODUCTS - 4 VERTICALS, 10 SYSTEMS */}
        <ProductsSection onOpenAudit={() => setAuditModalOpen(true)} />

        {/* METHODOLOGY / PROCESS */}
        <ProcessSection />

        {/* FOUNDER STATEMENT */}
        <FounderSection />

        {/* FAQ */}
        <FaqSection />

        {/* LIVE INTERACTIVE DATA PIPELINE GRAPH */}
        <InteractiveSystemGraph />
      </main>

      {/* OPERATIONS ASSESSMENT & FOOTER */}
      <Footer />

      {/* 60s DIAGNOSTIC AUDIT MODAL */}
      <DiagnosticAuditModal isOpen={auditModalOpen} onClose={() => setAuditModalOpen(false)} />
    </div>
  );
}

// ── Service page wrapper ──
function ServiceRoute() {
  const { serviceId } = useParams();
  useEffect(() => { bootAnimations(); }, [serviceId]);
  return <ServicePageRouter serviceId={serviceId} />;
}

// ── Scroll Management ──
if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

const scrollPositions = { '/': 0 };
let lastHomeScroll = 0;

function ScrollManager() {
  const { pathname } = useLocation();
  const navType = useNavigationType();

  // Save scroll position continuously for the current path
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
      scrollPositions[pathname] = y;
      if (pathname === '/') {
        lastHomeScroll = y;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  // Restore or reset scroll on navigation
  useEffect(() => {
    if (pathname === '/') {
      // Returning to homepage: restore exact scroll position
      const savedPosition = scrollPositions['/'] ?? lastHomeScroll ?? 0;
      
      const restoreScroll = () => {
        window.scrollTo({ top: savedPosition, left: 0, behavior: 'instant' });
        document.documentElement.scrollTop = savedPosition;
        document.body.scrollTop = savedPosition;
        if (ScrollTrigger) {
          ScrollTrigger.refresh();
        }
      };

      restoreScroll();
      requestAnimationFrame(restoreScroll);
      const t1 = setTimeout(restoreScroll, 20);
      const t2 = setTimeout(restoreScroll, 80);
      const t3 = setTimeout(restoreScroll, 200);
      const t4 = setTimeout(restoreScroll, 400);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        clearTimeout(t4);
      };
    } else {
      // Navigating to any app, service or detail page: ALWAYS start at absolute top (0, 0)
      const resetToTop = () => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      };

      resetToTop();
      requestAnimationFrame(resetToTop);
      const t1 = setTimeout(resetToTop, 10);
      const t2 = setTimeout(resetToTop, 50);
      const t3 = setTimeout(resetToTop, 150);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    }
  }, [pathname, navType]);

  return null;
}

// ── App Content Switcher with Direct Route Loading ──
function AppContent() {
  const [diagnosticData, setDiagnosticData] = useState(null);

  const handleDiagnosticComplete = (data) => {
    if (data) {
      setDiagnosticData(data);
    }
  };

  return (
    <>
      <ScrollManager />
      <BubbleCursor />

      <Routes>
        {/* Main Website Routes */}
        <Route path="/" element={<HomePage diagnosticData={diagnosticData} />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/diagnostic" element={<DiagnosticFlow onComplete={handleDiagnosticComplete} />} />
        <Route path="/products/:productId" element={<ProductDetailPage />} />
        <Route path="/services/:serviceId" element={<ServiceRoute />} />

        {/* 3 Enterprise Software Applications */}
        <Route path="/apps" element={<AppLauncher />} />
        <Route path="/crm" element={<CrmApp />} />
        <Route path="/apps/crm" element={<CrmApp />} />
        <Route path="/admin" element={<AdminIntakeApp />} />
        <Route path="/apps/admin" element={<AdminIntakeApp />} />
        <Route path="/accounting" element={<AccountingErpApp />} />
        <Route path="/apps/accounting" element={<AccountingErpApp />} />
      </Routes>
    </>
  );
}

// ── Root ──
export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
