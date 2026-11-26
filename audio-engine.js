/* Melody Music — Web Audio Studio Engine + Local Audio Player */

class MelodyAudioEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.analyser = null;
    this.bassFilter = null;
    this.midFilter = null;
    this.trebleFilter = null;
    this.compressor = null;
    this.reverbNode = null;
    this.reverbGain = null;
    this.delayNode = null;
    this.delayFeedback = null;
    this.delayWet = null;
    this.noiseBuffer = null;

    // Local HTMLAudioElement pipeline
    this.audioEl = new Audio();
    this.audioEl.preload = 'metadata';
    this.mediaSource = null;

    // Playback state
    this.currentTrack = null;
    this.isPlaying = false;
    this.mode = 'synth'; // 'synth' | 'file'
    this.volume = 0.85;
    this.eq = { bass: 0, mid: 0, treble: 0 };

    // Synth timeline state
    this.playOffset = 0;
    this.playStartCtxTime = 0;
    this.nextStepIndex = 0;
    this.schedulerTimer = null;

    // Callbacks
    this.onEnded = null;
    this.onDurationChange = null;

    this.audioEl.addEventListener('ended', () => {
      if (this.mode === 'file' && this.isPlaying) {
        this.isPlaying = false;
        if (this.onEnded) this.onEnded();
      }
    });

    this.audioEl.addEventListener('loadedmetadata', () => {
      if (this.mode === 'file' && this.currentTrack && isFinite(this.audioEl.duration)) {
        this.currentTrack.duration = this.audioEl.duration;
        if (this.onDurationChange) this.onDurationChange(this.audioEl.duration);
      }
    });
  }

  ensureContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();

      this.bassFilter = this.ctx.createBiquadFilter();
      this.bassFilter.type = 'lowshelf';
      this.bassFilter.frequency.value = 95;
      this.bassFilter.gain.value = this.eq.bass;

      this.midFilter = this.ctx.createBiquadFilter();
      this.midFilter.type = 'peaking';
      this.midFilter.frequency.value = 1100;
      this.midFilter.Q.value = 1.0;
      this.midFilter.gain.value = this.eq.mid;

      this.trebleFilter = this.ctx.createBiquadFilter();
      this.trebleFilter.type = 'highshelf';
      this.trebleFilter.frequency.value = 5200;
      this.trebleFilter.gain.value = this.eq.treble;

      this.compressor = this.ctx.createDynamicsCompressor();
      this.compressor.threshold.value = -16;
      this.compressor.knee.value = 18;
      this.compressor.ratio.value = 3.5;
      this.compressor.attack.value = 0.008;
      this.compressor.release.value = 0.18;

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = this.volume;

      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 128;
      this.analyser.smoothingTimeConstant = 0.82;

      // Warm algorithmic reverb
      this.reverbNode = this.ctx.createConvolver();
      this.reverbNode.buffer = this._createReverbImpulse(1.9, 2.6);
      this.reverbGain = this.ctx.createGain();
      this.reverbGain.gain.value = 0.28;

      // Dreamy echo delay
      this.delayNode = this.ctx.createDelay(1.0);
      this.delayNode.delayTime.value = 0.36;
      this.delayFeedback = this.ctx.createGain();
      this.delayFeedback.gain.value = 0.28;
      this.delayWet = this.ctx.createGain();
      this.delayWet.gain.value = 0.22;

      this.delayNode.connect(this.delayFeedback);
      this.delayFeedback.connect(this.delayNode);
      this.delayNode.connect(this.delayWet);
      this.delayWet.connect(this.bassFilter);

      this.reverbNode.connect(this.reverbGain);
      this.reverbGain.connect(this.bassFilter);

      // Master bus chain
      this.bassFilter.connect(this.midFilter);
      this.midFilter.connect(this.trebleFilter);
      this.trebleFilter.connect(this.compressor);
      this.compressor.connect(this.masterGain);
      this.masterGain.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);

      // Connect HTMLAudioElement into same EQ/Analyser chain
      this.mediaSource = this.ctx.createMediaElementSource(this.audioEl);
      this.mediaSource.connect(this.bassFilter);

      // Pre-build soft white noise buffer for percussion
      this.noiseBuffer = this._createNoiseBuffer();
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  _createReverbImpulse(duration, decay) {
    const rate = this.ctx.sampleRate;
    const length = Math.floor(rate * duration);
    const impulse = this.ctx.createBuffer(2, length, rate);
    for (let ch = 0; ch < 2; ch++) {
      const data = impulse.getChannelData(ch);
      let last = 0;
      for (let i = 0; i < length; i++) {
        const env = Math.pow(1 - i / length, decay);
        const white = Math.random() * 2 - 1;
        // One-pole lowpass so reverb is warm, never harsh
        last = last * 0.72 + white * 0.28;
        data[i] = last * env;
      }
    }
    return impulse;
  }

  _createNoiseBuffer() {
    const rate = this.ctx.sampleRate;
    const buffer = this.ctx.createBuffer(1, rate * 0.5, rate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    return buffer;
  }

  midiToFreq(midi) {
    return 440 * Math.pow(2, (midi - 69) / 12);
  }

  loadTrack(track, autoPlay = false) {
    this._stopScheduler();
    this.audioEl.pause();

    this.currentTrack = track;
    this.playOffset = 0;
    this.isPlaying = false;

    if (track.isLocal && track.audioUrl) {
      this.mode = 'file';
      this.audioEl.src = track.audioUrl;
      this.audioEl.currentTime = 0;
    } else {
      this.mode = 'synth';
    }

    if (autoPlay) {
      this.play();
    }
  }

  play() {
    if (!this.currentTrack) return;
    this.ensureContext();

    if (this.mode === 'file') {
      this.isPlaying = true;
      this.audioEl.play().catch(() => {});
      return;
    }

    if (this.isPlaying) return;
    this.isPlaying = true;
    const stepDur = this._getStepDuration(this.currentTrack);
    this.playStartCtxTime = this.ctx.currentTime;
    this.nextStepIndex = Math.floor(this.playOffset / stepDur);

    if (this.delayNode && this.currentTrack.synth) {
      this.delayNode.delayTime.setTargetAtTime(stepDur * 1.5, this.ctx.currentTime, 0.05);
    }

    this._scheduleAhead();
    this.schedulerTimer = setInterval(() => this._scheduleAhead(), 55);
  }

  pause() {
    if (!this.isPlaying) return;
    if (this.mode === 'file') {
      this.audioEl.pause();
      this.isPlaying = false;
      return;
    }

    this.playOffset = this.getCurrentTime();
    this.isPlaying = false;
    this._stopScheduler();
  }

  seek(seconds) {
    if (!this.currentTrack) return;
    const dur = this.getDuration();
    const clamped = Math.max(0, Math.min(seconds, dur));

    if (this.mode === 'file') {
      this.audioEl.currentTime = clamped;
      return;
    }

    this.playOffset = clamped;
    if (this.isPlaying && this.ctx) {
      this.playStartCtxTime = this.ctx.currentTime;
      const stepDur = this._getStepDuration(this.currentTrack);
      this.nextStepIndex = Math.floor(clamped / stepDur);
    }
  }

  getCurrentTime() {
    if (!this.currentTrack) return 0;
    if (this.mode === 'file') {
      return this.audioEl.currentTime || 0;
    }
    if (!this.isPlaying || !this.ctx) {
      return this.playOffset;
    }
    const elapsed = this.playOffset + (this.ctx.currentTime - this.playStartCtxTime);
    return Math.min(elapsed, this.currentTrack.duration);
  }

  getDuration() {
    if (!this.currentTrack) return 0;
    if (this.mode === 'file' && isFinite(this.audioEl.duration) && this.audioEl.duration > 0) {
      return this.audioEl.duration;
    }
    return this.currentTrack.duration || 160;
  }

  setVolume(val) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.03);
    }
  }

  setEQ(bass, mid, treble) {
    this.eq = { bass, mid, treble };
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    this.bassFilter.gain.setTargetAtTime(bass, t, 0.04);
    this.midFilter.gain.setTargetAtTime(mid, t, 0.04);
    this.trebleFilter.gain.setTargetAtTime(treble, t, 0.04);
  }

  getFrequencyData(targetArray) {
    if (!this.analyser || !this.isPlaying) {
      targetArray.fill(0);
      return false;
    }
    this.analyser.getByteFrequencyData(targetArray);
    return true;
  }

  _stopScheduler() {
    if (this.schedulerTimer) {
      clearInterval(this.schedulerTimer);
      this.schedulerTimer = null;
    }
  }

  _getStepDuration(track) {
    const bpm = (track.synth && track.synth.bpm) || 84;
    return 60 / bpm / 2; // 8th-note steps
  }

  _scheduleAhead() {
    if (!this.isPlaying || this.mode !== 'synth' || !this.currentTrack) return;
    const track = this.currentTrack;
    const stepDur = this._getStepDuration(track);
    const currentPos = this.getCurrentTime();

    if (currentPos >= track.duration - 0.05) {
      this.isPlaying = false;
      this.playOffset = 0;
      this._stopScheduler();
      if (this.onEnded) this.onEnded();
      return;
    }

    const lookaheadSec = 0.22;
    const horizonPos = currentPos + lookaheadSec;

    while (this.nextStepIndex * stepDur < horizonPos) {
      const stepTimeInSong = this.nextStepIndex * stepDur;
      if (stepTimeInSong >= track.duration) break;
      const scheduleAt = this.playStartCtxTime + (stepTimeInSong - this.playOffset);
      if (scheduleAt >= this.ctx.currentTime - 0.04) {
        this._triggerStep(track.synth, this.nextStepIndex, Math.max(scheduleAt, this.ctx.currentTime + 0.005), stepDur, stepTimeInSong / track.duration);
      }
      this.nextStepIndex++;
    }
  }

  _triggerStep(cfg, stepIndex, time, stepDur, songProgress) {
    const stepInBar = stepIndex % 8; // 8 eighth-notes per bar
    const barIndex = Math.floor(stepIndex / 8);
    const chordIndex = barIndex % cfg.chords.length;
    const chord = cfg.chords[chordIndex];
    const section = Math.floor(barIndex / 4) % 4; // 0: intro/A, 1: full A, 2: B lift, 3: chill bridge

    // Gentle fade-out on final 5% of song
    const envScale = songProgress > 0.94 ? Math.max(0.08, (1 - songProgress) / 0.06) : 1.0;

    // 1. Warm Chord Pad / Electric Piano on beat 1 of each bar (and soft syncopation in B)
    if (stepInBar === 0) {
      this._playChord(chord, time, stepDur * 7.6, cfg.padStyle, 0.14 * envScale);
    } else if (stepInBar === 5 && (cfg.padStyle === 'rhodes' || cfg.padStyle === 'jazz') && section !== 0) {
      this._playChord(chord.slice(1), time, stepDur * 2.4, cfg.padStyle, 0.07 * envScale);
    }

    // 2. Deep Sub Bass following chord root
    const rootMidi = chord[0] - 12;
    if (stepInBar === 0 || (stepInBar === 4 && section >= 1) || (stepInBar === 6 && cfg.drumStyle === 'pulse')) {
      const bassNote = stepInBar === 6 ? rootMidi + 7 : rootMidi;
      this._playBass(bassNote, time, stepDur * (stepInBar === 0 ? 3.5 : 1.8), 0.24 * envScale);
    }

    // 3. Expressive Lead Melody / Arpeggio
    const melodyPattern = section === 2 && cfg.melodyB ? cfg.melodyB : cfg.melodyA;
    const melodyPos = stepIndex % melodyPattern.length;
    const melodyNote = melodyPattern[melodyPos];
    if (melodyNote !== null && melodyNote !== undefined) {
      // Slight humanization and dynamic phrasing
      const vel = (section === 0 ? 0.10 : 0.15) * envScale;
      const transpose = section === 3 && cfg.padStyle === 'cosmic' ? 12 : 0;
      this._playLead(melodyNote + transpose, time, stepDur * 1.9, cfg.leadStyle, vel);
    }

    // 4. Soft Percussion (enters smoothly after bar 1, or omitted for pure ambient)
    if (cfg.drumStyle !== 'ambient' && barIndex >= 1 && section !== 3) {
      this._playDrums(cfg.drumStyle, stepInBar, time, envScale);
    }
  }

  _playChord(notes, time, duration, style, gainVal) {
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(style === 'cosmic' ? 900 : style === 'synthwave' ? 1650 : 1450, time);
    filter.frequency.exponentialRampToValueAtTime(520, time + duration);

    const env = this.ctx.createGain();
    const attack = style === 'cosmic' || style === 'piano' ? 0.35 : 0.045;
    env.gain.setValueAtTime(0.0001, time);
    env.gain.linearRampToValueAtTime(gainVal / Math.sqrt(notes.length), time + attack);
    env.gain.exponentialRampToValueAtTime(0.0008, time + duration);

    filter.connect(env);
    env.connect(this.bassFilter);
    env.connect(this.reverbNode);

    notes.forEach((midi, idx) => {
      const osc = this.ctx.createOscillator();
      osc.type = style === 'synthwave' ? 'sawtooth' : idx % 2 === 0 ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(this.midiToFreq(midi), time);
      osc.detune.setValueAtTime((idx - 1.5) * 4.5, time);
      osc.connect(filter);
      osc.start(time);
      osc.stop(time + duration + 0.05);
    });
  }

  _playBass(midi, time, duration, gainVal) {
    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(this.midiToFreq(midi), time);

    const sub = this.ctx.createOscillator();
    sub.type = 'triangle';
    sub.frequency.setValueAtTime(this.midiToFreq(midi), time);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 260;

    const env = this.ctx.createGain();
    env.gain.setValueAtTime(0.0001, time);
    env.gain.linearRampToValueAtTime(gainVal, time + 0.025);
    env.gain.exponentialRampToValueAtTime(0.001, time + duration);

    const subGain = this.ctx.createGain();
    subGain.gain.value = 0.25;

    osc.connect(filter);
    sub.connect(subGain);
    subGain.connect(filter);
    filter.connect(env);
    env.connect(this.bassFilter);

    osc.start(time);
    sub.start(time);
    osc.stop(time + duration + 0.04);
    sub.stop(time + duration + 0.04);
  }

  _playLead(midi, time, duration, style, gainVal) {
    const freq = this.midiToFreq(midi);
    const osc = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();

    if (style === 'marimba') {
      osc.type = 'sine';
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(freq * 2, time);
    } else if (style === 'bell') {
      osc.type = 'triangle';
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(freq * 2, time);
    } else {
      osc.type = 'triangle';
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(freq, time);
      osc2.detune.value = 6;
    }
    osc.frequency.setValueAtTime(freq, time);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(style === 'marimba' ? 2400 : 2100, time);
    filter.frequency.exponentialRampToValueAtTime(620, time + duration);

    const env = this.ctx.createGain();
    env.gain.setValueAtTime(0.0001, time);
    env.gain.linearRampToValueAtTime(gainVal, time + 0.018);
    env.gain.exponentialRampToValueAtTime(0.0008, time + duration);

    const mix2 = this.ctx.createGain();
    mix2.gain.value = 0.22;

    osc.connect(filter);
    osc2.connect(mix2);
    mix2.connect(filter);
    filter.connect(env);
    env.connect(this.bassFilter);
    env.connect(this.reverbNode);
    env.connect(this.delayNode);

    osc.start(time);
    osc2.start(time);
    osc.stop(time + duration + 0.05);
    osc2.stop(time + duration + 0.05);
  }

  _playDrums(style, stepInBar, time, envScale) {
    // Soft Kick
    const kickSteps = style === 'pulse' ? [0, 3, 4] : style === 'jazz' ? [0, 5] : [0, 4];
    if (kickSteps.includes(stepInBar)) {
      const osc = this.ctx.createOscillator();
      const env = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(118, time);
      osc.frequency.exponentialRampToValueAtTime(42, time + 0.11);
      env.gain.setValueAtTime(0.28 * envScale, time);
      env.gain.exponentialRampToValueAtTime(0.001, time + 0.22);
      osc.connect(env);
      env.connect(this.bassFilter);
      osc.start(time);
      osc.stop(time + 0.24);
    }

    // Soft Rim / Snare on beats 2 & 4 (steps 2, 6)
    if (stepInBar === 2 || stepInBar === 6) {
      const src = this.ctx.createBufferSource();
      src.buffer = this.noiseBuffer;
      const bp = this.ctx.createBiquadFilter();
      bp.type = 'bandpass';
      bp.frequency.value = style === 'jazz' ? 2100 : 1550;
      bp.Q.value = 1.4;
      const env = this.ctx.createGain();
      env.gain.setValueAtTime(0.09 * envScale, time);
      env.gain.exponentialRampToValueAtTime(0.001, time + 0.11);
      src.connect(bp);
      bp.connect(env);
      env.connect(this.bassFilter);
      env.connect(this.reverbNode);
      src.start(time);
      src.stop(time + 0.12);
    }

    // Gentle Hi-Hat / Shaker
    if (stepInBar % 2 === 1 || style === 'lofi') {
      const src = this.ctx.createBufferSource();
      src.buffer = this.noiseBuffer;
      const hp = this.ctx.createBiquadFilter();
      hp.type = 'highpass';
      hp.frequency.value = 7200;
      const env = this.ctx.createGain();
      const hatGain = stepInBar % 2 === 0 ? 0.022 : 0.04;
      env.gain.setValueAtTime(hatGain * envScale, time);
      env.gain.exponentialRampToValueAtTime(0.0008, time + 0.045);
      src.connect(hp);
      hp.connect(env);
      env.connect(this.bassFilter);
      src.start(time);
      src.stop(time + 0.055);
    }
  }
}

window.MelodyAudioEngine = MelodyAudioEngine;
