// Web Audio API Synthesizer for Cyber HUD Sound Effects
let audioCtx = null;
let soundEnabled = true;

export const toggleSound = (enable) => {
  soundEnabled = enable;
  return soundEnabled;
};

export const isSoundEnabled = () => soundEnabled;

const getAudioContext = () => {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
};

// Play subtle high-tech blip on hover
export const playHoverSound = () => {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.04);

    gain.gain.setValueAtTime(0.015, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.04);
  } catch (e) {
    // Ignore audio autoplay restrictions
  }
};

// Play metallic cyber click on button press
export const playClickSound = () => {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(440, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.08);
  } catch (e) {
    // Ignore audio restrictions
  }
};

// Play diagnostic success pulse
export const playSuccessPulse = () => {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    osc1.type = 'sine';
    osc2.type = 'sine';
    osc1.frequency.setValueAtTime(523.25, now); // C5
    osc2.frequency.setValueAtTime(659.25, now + 0.05); // E5

    gain.gain.setValueAtTime(0.03, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);

    osc1.start(now);
    osc1.stop(now + 0.1);
    osc2.start(now + 0.05);
    osc2.stop(now + 0.2);
  } catch (e) {
    // Ignore
  }
};

// --- Ambient Synthesizer for Generative Space-Drone Music ---
let ambientCtx = null;
let ambientOscillators = [];
let ambientGains = [];
let ambientLFOs = [];
let isAmbientPlaying = false;

export const isAmbientMusicPlaying = () => isAmbientPlaying;

export const startAmbientMusic = () => {
  if (isAmbientPlaying) return;
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    
    ambientCtx = new AudioContext();
    if (ambientCtx.state === 'suspended') {
      ambientCtx.resume();
    }

    const mainGain = ambientCtx.createGain();
    mainGain.gain.setValueAtTime(0.2, ambientCtx.currentTime); // Master volume for ambient music (soft)

    const filter = ambientCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(320, ambientCtx.currentTime); // Lowpass for warm cinematic drone

    // 5-Note Harmonic Pad Chord: C2 (65.41Hz), G2 (98Hz), C3 (130.81Hz), E3 (164.81Hz), B3 (246.94Hz)
    const chords = [65.41, 98.00, 130.81, 164.81, 246.94];
    
    chords.forEach((freq, index) => {
      const osc = ambientCtx.createOscillator();
      const oscGain = ambientCtx.createGain();
      
      // Base gain
      const baseGain = index === 0 ? 0.08 : index === 1 ? 0.06 : 0.04;
      oscGain.gain.setValueAtTime(baseGain, ambientCtx.currentTime);

      // Create very slow LFO to modulate gain (creates swell/fade effects)
      const lfo = ambientCtx.createOscillator();
      lfo.frequency.setValueAtTime(0.03 + Math.random() * 0.04, ambientCtx.currentTime); // 0.03 Hz - 0.07 Hz

      const lfoGain = ambientCtx.createGain();
      lfoGain.gain.setValueAtTime(baseGain * 0.5, ambientCtx.currentTime); // Modulates gain by 50%

      lfo.connect(lfoGain);
      lfoGain.connect(oscGain.gain);

      osc.type = index === 0 ? 'triangle' : 'sine'; // Triangle for warm deep bass, sine for upper pads
      osc.frequency.setValueAtTime(freq, ambientCtx.currentTime);

      // Slight detune for chorus/stereo-widening effect
      osc.detune.setValueAtTime((Math.random() - 0.5) * 8, ambientCtx.currentTime);

      osc.connect(oscGain);
      oscGain.connect(filter);

      lfo.start();
      osc.start();

      ambientOscillators.push(osc);
      ambientGains.push(oscGain);
      ambientLFOs.push(lfo);
      ambientLFOs.push(lfoGain);
    });

    filter.connect(mainGain);
    mainGain.connect(ambientCtx.destination);
    
    isAmbientPlaying = true;
  } catch (e) {
    console.error("Ambient audio failed to start:", e);
  }
};

export const stopAmbientMusic = () => {
  if (!isAmbientPlaying) return;
  try {
    ambientOscillators.forEach(osc => {
      try { osc.stop(); } catch(e) {}
    });
    ambientLFOs.forEach(lfo => {
      try { lfo.stop(); } catch(e) {}
    });
    
    ambientOscillators = [];
    ambientGains = [];
    ambientLFOs = [];
    
    if (ambientCtx) {
      ambientCtx.close();
      ambientCtx = null;
    }
    
    isAmbientPlaying = false;
  } catch(e) {
    console.error("Failed to stop ambient music:", e);
  }
};

export const toggleAmbientMusic = () => {
  if (isAmbientPlaying) {
    stopAmbientMusic();
  } else {
    startAmbientMusic();
  }
  return isAmbientPlaying;
};
