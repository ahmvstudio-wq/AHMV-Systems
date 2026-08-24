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

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { playSuccessPulse } from './utils/audio';

// ── Homepage ──
function HomePage({ diagnosticData }) {
  const [activeVideoId, setActiveVideoId] = useState('MOD-01');
  const [auditModalOpen, setAuditModalOpen] = useState(false);

  useEffect(() => {
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
function ScrollToTop() {
  const { pathname } = useLocation();
  const navType = useNavigationType();

  useEffect(() => {
    if (navType !== 'POP') {
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 10);
    }
  }, [pathname, navType]);

  return null;
}

// ── Root ──
export default function App() {
  const [diagnosticData, setDiagnosticData] = useState(null);
  const [diagnosticComplete, setDiagnosticComplete] = useState(false);

  const handleDiagnosticComplete = (data) => {
    if (data) {
      setDiagnosticData(data);
    }
    setDiagnosticComplete(true);
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <BubbleCursor />
      
      {!diagnosticComplete ? (
        <DiagnosticFlow onComplete={handleDiagnosticComplete} />
      ) : (
        <Routes>
          <Route path="/" element={<HomePage diagnosticData={diagnosticData} />} />
          <Route path="/products/:productId" element={<ProductDetailPage />} />
          <Route path="/services/:serviceId" element={<ServiceRoute />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}
