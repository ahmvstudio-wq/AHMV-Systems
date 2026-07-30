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

// Play subtle haptic tick on hover (low frequency, very short decay)
export const playHoverSound = () => {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(150, ctx.currentTime); // Low frequency click

    gain.gain.setValueAtTime(0.006, ctx.currentTime); // Very soft volume
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.012); // Short decay (12ms)

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.012);
  } catch (e) {
    // Ignore audio restrictions
  }
};

// Play tactile key click on button press
export const playClickSound = () => {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(180, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + 0.018); // Short sweep downwards

    gain.gain.setValueAtTime(0.012, ctx.currentTime); // Soft volume
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.018); // Short decay (18ms)

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.018);
  } catch (e) {
    // Ignore audio restrictions
  }
};

// Play subtle low-frequency section entry pulse
export const playSuccessPulse = () => {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(100, now); // Low frequency thud (100Hz)
    osc.frequency.exponentialRampToValueAtTime(60, now + 0.15); // Sub-bass decay

    gain.gain.setValueAtTime(0.015, now); // Low volume
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.15);
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
