import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function BigTextPin() {
  const pinRef = useRef(null);

  useEffect(() => {
    if (pinRef.current) {
      gsap.fromTo(
        pinRef.current.querySelectorAll('.paragraph'),
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: pinRef.current,
            start: 'top 80%',
            end: 'bottom 50%',
            scrub: 1
          }
        }
      );
    }
  }, []);

  return (
    <section className="h-texts" ref={pinRef} style={{ padding: '120px var(--grid-margin)', background: 'var(--mwg2-black)' }}>
      <div className="title-l text-center" style={{ textTransform: 'none' }}>
        <p className="paragraph" style={{ color: 'var(--mwg2-white)', fontWeight: 600 }}>
          Five systems.
        </p>
        <p className="paragraph text-g" style={{ color: 'var(--text-grey)', fontWeight: 400 }}>
          One operating brain.
        </p>
      </div>
    </section>
  );
}
