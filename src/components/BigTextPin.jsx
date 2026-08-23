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
    <section className="h-texts" ref={pinRef} style={{ padding: '120px var(--grid-margin)', background: '#FAF9F6' }}>
      <div className="title-l text-center" style={{ textTransform: 'none' }}>
        <p className="paragraph" style={{ color: '#0A0A0B', fontWeight: 600 }}>
          Seven systems.
        </p>
        <p className="paragraph text-g" style={{ color: '#71717A', fontWeight: 400 }}>
          One operating brain.
        </p>
      </div>
    </section>
  );
}
