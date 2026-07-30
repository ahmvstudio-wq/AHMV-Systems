import React from 'react';

export default function OnScreenBadge({ activeIndex = '100' }) {
  return (
    <div className="on-screen">
      <span className="wording">On screen</span>
      <span className="light"></span>
      <span className="index" style={{ color: 'var(--yellow)', fontWeight: 700 }}>
        #{activeIndex}
      </span>
    </div>
  );
}
