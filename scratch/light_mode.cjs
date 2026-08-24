const fs = require('fs');
const path = 'src/components/ServicePages.jsx';
let content = fs.readFileSync(path, 'utf8');

const replacements = [
  { from: /background: '#0A0A0B'/g, to: "background: '#FAFAFA'" },
  { from: /color: '#FFFFFF'/g, to: "color: '#09090B'" },
  { from: /color: 'rgba\\(255,255,255,0.5\\)'/g, to: "color: 'rgba(0,0,0,0.5)'" },
  { from: /background: 'rgba\\(10,10,11,0.92\\)'/g, to: "background: 'rgba(250,250,250,0.92)'" },
  { from: /borderBottom: '1px solid rgba\\(255,255,255,0.06\\)'/g, to: "borderBottom: '1px solid rgba(0,0,0,0.08)'" },
  { from: /background: '#FFFFFF', color: '#0A0A0B'/g, to: "background: '#09090B', color: '#FFFFFF'" },
  { from: /color = '#FFF'/g, to: "color = '#09090B'" },
  { from: /background: '#111113'/g, to: "background: '#FFFFFF'" },
  { from: /border: '1px solid rgba\\(255,255,255,0.06\\)'/g, to: "border: '1px solid rgba(0,0,0,0.08)'" },
  { from: /borderTop: i > 0 \? '1px solid rgba\\(255,255,255,0.04\\)'/g, to: "borderTop: i > 0 ? '1px solid rgba(0,0,0,0.06)'" },
  { from: /background: 'rgba\\(17,17,19,0.9\\)'/g, to: "background: 'rgba(255,255,255,0.9)'" },
  { from: /background: 'rgba\\(255,255,255,0.06\\)'/g, to: "background: 'rgba(0,0,0,0.04)'" },
  { from: /borderTop: '1px solid rgba\\(255,255,255,0.04\\)'/g, to: "borderTop: '1px solid rgba(0,0,0,0.06)'" },
  { from: /color: 'rgba\\(255,255,255,0.05\\)'/g, to: "color: 'rgba(0,0,0,0.05)'" },
  { from: /background: isOpen \? '#111113' : '#0A0A0B'/g, to: "background: isOpen ? '#F4F4F5' : '#FFFFFF'" },
  { from: /background = '#111113'/g, to: "background = '#F4F4F5'" },
  { from: /background = '#0A0A0B'/g, to: "background = '#FFFFFF'" },
  { from: /background: '#18181B'/g, to: "background: '#F4F4F5'" },
  { from: /color: '#E4E4E7'/g, to: "color: '#18181B'" },
  { from: /color: '#D4D4D8'/g, to: "color: '#27272A'" },
  { from: /color: '#3F3F46'/g, to: "color: '#A1A1AA'" },
  { from: /color: '#71717A'/g, to: "color: '#52525B'" }
];

replacements.forEach(({ from, to }) => {
  content = content.replace(from, to);
});

fs.writeFileSync(path, content, 'utf8');
