import React from 'react';
import { ArrowRight } from 'lucide-react';
import { playClickSound, playHoverSound } from '../utils/audio';

export default function HeroHUD() {
  return (
    <section className="meuze-hero-wrapper">
      <div className="meuze-hero-container">
        
        {/* Left-Aligned Unframed Hero Content - Exact 1:1 clone of MEUZE screenshot */}
        <div className="meuze-hero-content">
          
          {/* Main Headline */}
          <h1 className="meuze-headline">
            The intelligence layer beneath<br />
            every operation.
          </h1>

          {/* Subtext Paragraph with AHMV Content */}
          <p className="meuze-subtext">
            AHMV Systems builds the full-stack AI growth engine for high-growth enterprises. 
            From client acquisition to CRM consolidation to internal tools, every lead, 
            every campaign, every signal flows through one intelligence layer.
          </p>

          {/* Electric Blue Primary CTA Button matching MEUZE screenshot */}
          <div>
            <a
              href="#process"
              onMouseEnter={playHoverSound}
              onClick={playClickSound}
              className="btn-meuze-blue"
            >
              <span>BOOK A DEMO</span>
              <ArrowRight size={15} />
            </a>
          </div>

        </div>

      </div>

      {/* Bottom Right Line Indicator - Exact 1:1 match to MEUZE screenshot */}
      <div className="meuze-bottom-indicator desktop-only">
        <div className="meuze-bottom-line"></div>
        <div className="meuze-bottom-text">Live data. Every signal.</div>
      </div>
    </section>
  );
}
