/**
 * Premium sound synthesizers for the Dev Shree South Kitchen grand opening.
 * Created using native Web Audio API to guarantee 100% reliability, no external file loading,
 * and high-fidelity sound.
 */

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Synthesizes a realistic scissor cutting "snip" sound.
 */
function playSnip(ctx: AudioContext, time: number) {
  // Create noise buffer for the rustle/cut sound of ribbon
  const bufferSize = ctx.sampleRate * 0.15; // 150ms of sound
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  // Filter the noise to resemble scissors cutting fabric
  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(1000, time);
  filter.frequency.exponentialRampToValueAtTime(150, time + 0.12);
  filter.Q.setValueAtTime(3, time);

  // Envelope for the cutting sound
  const gainNode = ctx.createGain();
  gainNode.gain.setValueAtTime(0.0, time);
  gainNode.gain.linearRampToValueAtTime(0.6, time + 0.01);
  gainNode.gain.exponentialRampToValueAtTime(0.001, time + 0.12);

  noise.connect(filter);
  filter.connect(gainNode);
  gainNode.connect(ctx.destination);

  noise.start(time);
  noise.stop(time + 0.15);
}

/**
 * Synthesizes a traditional South Indian temple bell chime.
 * Uses fm-like inharmonic frequencies to get that rich metallic bronze chime.
 */
function playTempleBell(ctx: AudioContext, time: number, frequency: number, duration: number, volume: number) {
  const oscs: OscillatorNode[] = [];
  const gainNode = ctx.createGain();
  gainNode.gain.setValueAtTime(0, time);
  gainNode.gain.linearRampToValueAtTime(volume, time + 0.02);
  gainNode.gain.exponentialRampToValueAtTime(0.001, time + duration);

  // Traditional bell has multiple inharmonic partials
  const partials = [1.0, 1.2, 1.5, 2.0, 2.5, 3.2];
  const partialVolumes = [1.0, 0.6, 0.4, 0.3, 0.15, 0.1];

  partials.forEach((multiplier, i) => {
    const osc = ctx.createOscillator();
    // Use triangle waves for a warmer, richer metallic tone
    osc.type = i === 0 ? 'sine' : 'triangle';
    osc.frequency.setValueAtTime(frequency * multiplier, time);
    
    const pGain = ctx.createGain();
    pGain.gain.setValueAtTime(partialVolumes[i], time);
    // Overtones decay faster than the root fundamental frequency
    pGain.gain.exponentialRampToValueAtTime(0.001, time + duration * (1 / multiplier));

    osc.connect(pGain);
    pGain.connect(gainNode);
    oscs.push(osc);
  });

  // Reverb/Delay effect simulator
  const delay = ctx.createDelay();
  delay.delayTime.setValueAtTime(0.12, time);
  const feedback = ctx.createGain();
  feedback.gain.setValueAtTime(0.35, time);

  gainNode.connect(ctx.destination);
  gainNode.connect(delay);
  delay.connect(feedback);
  feedback.connect(delay);
  delay.connect(ctx.destination);

  oscs.forEach(osc => {
    osc.start(time);
    osc.stop(time + duration + 0.5);
  });
}

/**
 * Synthesizes a celebratory golden "Shehnai / Flute" majestic ascending arpeggio.
 * A shehnai has a distinctive nasal double-reed quality (which we can model with a saw/triangle mix).
 */
function playCelebrationFanfare(ctx: AudioContext, time: number) {
  const notes = [293.66, 329.63, 392.00, 440.00, 587.33, 659.25, 783.99, 880.00]; // Pentatonic scale (Bhupali/Mohanam theme)
  const duration = 0.15;

  notes.forEach((freq, idx) => {
    const noteTime = time + idx * 0.08;
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const bandpass = ctx.createBiquadFilter();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, noteTime);
    // Add custom vibrato for shehnai effect
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.value = 8; // 8Hz vibrato
    lfoGain.gain.value = freq * 0.03; // vibrato depth
    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);

    bandpass.type = 'bandpass';
    bandpass.frequency.setValueAtTime(freq * 1.5, noteTime);
    bandpass.Q.setValueAtTime(2, noteTime);

    gainNode.gain.setValueAtTime(0, noteTime);
    gainNode.gain.linearRampToValueAtTime(0.15, noteTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, noteTime + duration);

    osc.connect(bandpass);
    bandpass.connect(gainNode);
    gainNode.connect(ctx.destination);

    lfo.start(noteTime);
    osc.start(noteTime);
    
    lfo.stop(noteTime + duration + 0.1);
    osc.stop(noteTime + duration + 0.1);
  });
}

/**
 * Main sound function triggered when the ribbon is cut.
 */
export function playRibbonCutSound() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // 1. Snip sound at t = 0
    playSnip(ctx, now);

    // 2. Majestic South Indian bell ringing at t = 0.05
    playTempleBell(ctx, now + 0.05, 180, 2.5, 0.4); // Deep low bass bell
    playTempleBell(ctx, now + 0.1, 440, 1.8, 0.3);  // Clear mid bell
    playTempleBell(ctx, now + 0.15, 880, 1.2, 0.2); // Bright high chime

    // 3. Celebratory rising traditional melody at t = 0.3
    playCelebrationFanfare(ctx, now + 0.25);
  } catch (error) {
    console.warn('Web Audio API is blocked or unsupported:', error);
  }
}

/**
 * Play a gentle golden bell ding on hover or micro-interaction
 */
export function playHoverSound() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    playTempleBell(ctx, now, 587.33, 0.6, 0.08); // Tender note
  } catch (error) {
    // Fail silently
  }
}
