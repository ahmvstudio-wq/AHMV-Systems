import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import { bootAnimations } from './animations';

import Navbar from './components/Navbar';
import AwwwardsBanner from './components/AwwwardsBanner';
import HeroSection from './components/HeroSection';
import LearnSection from './components/LearnSection';
import DifferentSection from './components/DifferentSection';
import ProcessSection from './components/ProcessSection';
import BigTextPin from './components/BigTextPin';
import FeaturesSection from './components/FeaturesSection';
import CardsSection from './components/CardsSection';
import AboutSection from './components/AboutSection';
import FounderSection from './components/FounderSection';
import Footer from './components/Footer';
import OnScreenBadge from './components/OnScreenBadge';
import ServicePageRouter from './components/ServicePages';
import BubbleCursor from './components/BubbleCursor';
import AmbientPlayer from './components/AmbientPlayer';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { playSuccessPulse } from './utils/audio';

// ── Homepage ──
function HomePage() {
  const [activeVideoId, setActiveVideoId] = useState('MOD-01');

  useEffect(() => {
    bootAnimations();

    gsap.registerPlugin(ScrollTrigger);

    const sections = [
      { id: 'hero', code: 'MOD-01' },
      { id: 'positioning', code: 'MOD-02' },
      { id: 'different', code: 'MOD-03' },
      { id: 'process', code: 'MOD-04' },
      { id: 'services', code: 'MOD-05' },
      { id: 'about', code: 'MOD-06' },
      { id: 'founder', code: 'MOD-07' },
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
      <AwwwardsBanner />
      <Navbar />

      <main style={{ position: 'relative', zIndex: 1 }}>
        {/* HOME */}
        <HeroSection onActiveVideoChange={(id) => setActiveVideoId(id)} />
        <LearnSection />

        {/* WHY AHMV */}
        <DifferentSection />

        {/* PROCESS */}
        <ProcessSection />

        {/* SERVICES */}
        <BigTextPin />
        <FeaturesSection />
        <CardsSection />

        {/* ABOUT */}
        <AboutSection />

        {/* FOUNDER */}
        <FounderSection />
      </main>

      <Footer />
      <OnScreenBadge activeIndex={activeVideoId} />
    </div>
  );
}

// ── Service page wrapper ──
function ServiceRoute() {
  const { serviceId } = useParams();
  useEffect(() => { bootAnimations(); }, [serviceId]);
  return <ServicePageRouter serviceId={serviceId} />;
}

// ── Root ──
export default function App() {
  return (
    <BrowserRouter>
      <BubbleCursor />
      <AmbientPlayer />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services/:serviceId" element={<ServiceRoute />} />
      </Routes>
    </BrowserRouter>
  );
}
