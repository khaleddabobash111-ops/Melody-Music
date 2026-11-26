/* Melody Music — Mobile PWA Controller */

const BUILTIN_TRACKS = [
  {
    id: 'midnight-drive',
    title: 'Midnight Drive',
    artist: 'Melody Artist',
    mood: 'Night',
    genre: 'Chillwave',
    duration: 168,
    palette: ['#2e4326', '#141e22', '#b9e47a'],
    artType: 'moon',
    notes: 'Soft headlights gliding through empty avenues.\nWarm analog chords, midnight pulse, and distant neon skies.\n\nKey: A minor • 86 BPM',
    synth: {
      bpm: 86,
      padStyle: 'synthwave',
      leadStyle: 'bell',
      drumStyle: 'pulse',
      chords: [
        [57, 60, 64, 67], // Am7
        [53, 57, 60, 64], // Fmaj7
        [48, 52, 55, 59], // Cmaj7
        [55, 59, 62, 67]  // G6
      ],
      melodyA: [72, null, 71, 69, null, 64, null, 67, 69, null, 72, null, 76, null, 74, null],
      melodyB: [76, null, 79, 76, 74, null, 72, null, 71, null, 72, 74, 72, null, 69, null]
    }
  },
  {
    id: 'golden-hour',
    title: 'Golden Hour',
    artist: 'Melody Artist',
    mood: 'Chill',
    genre: 'Warm Lo-Fi',
    duration: 152,
    palette: ['#4b3b22', '#1d1b18', '#f2c97d'],
    artType: 'sun',
    notes: 'Amber sunlight pouring across quiet rooms.\nSun-drenched electric piano chords with a gentle sunset groove.\n\nKey: C major • 80 BPM',
    synth: {
      bpm: 80,
      padStyle: 'rhodes',
      leadStyle: 'rhodes',
      drumStyle: 'lofi',
      chords: [
        [53, 57, 60, 64], // Fmaj7
        [52, 55, 59, 62], // Em7
        [50, 53, 57, 60], // Dm7
        [48, 52, 55, 59]  // Cmaj7
      ],
      melodyA: [72, null, 74, null, 76, null, 72, null, 71, null, 69, 67, null, 64, null, null],
      melodyB: [79, null, 76, 74, 72, null, 74, 76, 72, null, 69, null, 67, null, null, null]
    }
  },
  {
    id: 'quiet-places',
    title: 'Quiet Places',
    artist: 'Melody Artist',
    mood: 'Ambient',
    genre: 'Ambient Piano',
    duration: 184,
    palette: ['#243c35', '#111a1d', '#86e3ce'],
    artType: 'zen',
    notes: 'Still water, pine breeze, and room to breathe.\nFloating acoustic harmonies crafted for focus and calm.\n\nKey: G major • 70 BPM',
    synth: {
      bpm: 70,
      padStyle: 'piano',
      leadStyle: 'bell',
      drumStyle: 'ambient',
      chords: [
        [55, 59, 62, 66], // Gmaj7
        [52, 55, 59, 62], // Em7
        [48, 52, 55, 62], // Cadd9
        [50, 54, 57, 62]  // Dadd9
      ],
      melodyA: [74, null, null, 71, null, 67, null, null, 71, null, 74, null, 76, null, null, null],
      melodyB: [79, null, 78, null, 74, null, 71, null, 72, null, 71, null, 67, null, null, null]
    }
  },
  {
    id: 'neon-rain',
    title: 'Neon Rain',
    artist: 'Nova Echo',
    mood: 'Lo-Fi',
    genre: 'Lo-Fi Beats',
    duration: 144,
    palette: ['#2e2748', '#131320', '#b79eff'],
    artType: 'rain',
    notes: 'Raindrops tapping on a late-night café window.\nDusty lo-fi rhythm layered under dreamy minor ninth chords.\n\nKey: D minor • 78 BPM',
    synth: {
      bpm: 78,
      padStyle: 'rhodes',
      leadStyle: 'bell',
      drumStyle: 'lofi',
      chords: [
        [50, 53, 57, 60, 64], // Dm9
        [55, 58, 62, 65],     // Gm7
        [48, 52, 55, 58],     // C7
        [53, 57, 60, 64]      // Fmaj7
      ],
      melodyA: [74, null, 72, 69, null, 65, null, 69, 72, null, 74, null, 77, null, 76, null],
      melodyB: [77, null, 76, 74, 72, null, 69, null, 70, null, 69, 67, 65, null, null, null]
    }
  },
  {
    id: 'emerald-breeze',
    title: 'Emerald Breeze',
    artist: 'Solis',
    mood: 'Chill',
    genre: 'Chill Tropical',
    duration: 160,
    palette: ['#214537', '#111d1a', '#7be3a8'],
    artType: 'wave',
    notes: 'Warm ocean air drifting over coastal palms.\nBright marimba plucks paired with mellow deep bass.\n\nKey: F major • 94 BPM',
    synth: {
      bpm: 94,
      padStyle: 'rhodes',
      leadStyle: 'marimba',
      drumStyle: 'pulse',
      chords: [
        [53, 57, 60, 65], // F
        [50, 53, 57, 60], // Dm7
        [58, 62, 65, 69], // Bbmaj7
        [48, 52, 55, 60]  // C
      ],
      melodyA: [77, null, 74, 72, null, 74, 77, null, 79, null, 77, 74, 72, null, 69, null],
      melodyB: [81, null, 79, 77, 74, null, 77, null, 74, 72, null, 69, 72, null, null, null]
    }
  },
  {
    id: 'starlight-drift',
    title: 'Starlight Drift',
    artist: 'Luna Waves',
    mood: 'Ambient',
    genre: 'Deep Ambient',
    duration: 192,
    palette: ['#1c2e4a', '#0f1320', '#7cc7ff'],
    artType: 'cosmos',
    notes: 'Weightless drifting beneath a vast indigo sky.\nSlow evolving pads and shimmering high harmonic bells.\n\nKey: E minor • 68 BPM',
    synth: {
      bpm: 68,
      padStyle: 'cosmic',
      leadStyle: 'bell',
      drumStyle: 'ambient',
      chords: [
        [52, 55, 59, 64], // Em
        [48, 52, 55, 59], // Cmaj7
        [55, 59, 62, 67], // G
        [50, 54, 57, 62]  // D
      ],
      melodyA: [76, null, null, 79, null, 74, null, null, 71, null, null, 74, null, 76, null, null],
      melodyB: [83, null, 79, null, 76, null, 74, null, 76, null, 74, null, 71, null, null, null]
    }
  },
  {
    id: 'velvet-coffee',
    title: 'Velvet Coffee',
    artist: 'Cafe Milo',
    mood: 'Lo-Fi',
    genre: 'Jazz Hop',
    duration: 136,
    palette: ['#4a3128', '#1b1413', '#ebb38a'],
    artType: 'coffee',
    notes: 'Fresh espresso steam and morning vinyl crackle.\nLaid-back jazz chords with brushed percussion.\n\nKey: Bb major • 82 BPM',
    synth: {
      bpm: 82,
      padStyle: 'jazz',
      leadStyle: 'rhodes',
      drumStyle: 'jazz',
      chords: [
        [58, 62, 65, 69], // Bbmaj7
        [55, 58, 62, 65], // Gm7
        [48, 51, 55, 58], // Cm7
        [53, 57, 60, 63]  // F7
      ],
      melodyA: [74, null, 77, 74, 70, null, 72, null, 74, null, 72, 70, 69, null, null, null],
      melodyB: [77, null, 79, 77, 74, null, 72, 74, 70, null, 69, null, 65, null, null, null]
    }
  },
  {
    id: 'afterglow',
    title: 'Afterglow',
    artist: 'Melody Artist',
    mood: 'Night',
    genre: 'Indie Synth',
    duration: 176,
    palette: ['#4a2538', '#19131d', '#ff94b8'],
    artType: 'horizon',
    notes: 'Dusk fading into violet twilight.\nUplifting synth textures and a nostalgic late-evening pulse.\n\nKey: A major • 90 BPM',
    synth: {
      bpm: 90,
      padStyle: 'synthwave',
      leadStyle: 'bell',
      drumStyle: 'pulse',
      chords: [
        [57, 61, 64, 68], // Amaj7
        [54, 57, 61, 64], // F#m7
        [50, 54, 57, 61], // Dmaj7
        [52, 56, 59, 64]  // E
      ],
      melodyA: [76, null, 73, 76, null, 80, null, 76, 73, null, 71, 73, null, 69, null, null],
      melodyB: [81, null, 80, 76, 73, null, 76, null, 73, 71, null, 69, 71, null, null, null]
    }
  }
];

const EQ_PRESETS = {
  balanced: { bass: 0, mid: 0, treble: 0, label: 'EQ' },
  bass: { bass: 6.5, mid: 0.5, treble: 1, label: 'Bass+' },
  lofi: { bass: 3.5, mid: 2, treble: -4.5, label: 'Lo-Fi' },
  vocal: { bass: -1.5, mid: 4.5, treble: 3, label: 'Crystal' },
  night: { bass: -3, mid: 1, treble: -3.5, label: 'Night' }
};

const MOOD_CARDS = [
  { mood: 'Chill', desc: 'Warm & relaxed', bg: 'linear-gradient(135deg, #344a2a, #19241b)' },
  { mood: 'Lo-Fi', desc: 'Dusty beats & jazz', bg: 'linear-gradient(135deg, #433057, #1c1728)' },
  { mood: 'Ambient', desc: 'Focus & calm', bg: 'linear-gradient(135deg, #1d4446, #111e24)' },
  { mood: 'Night', desc: 'Late-night synth', bg: 'linear-gradient(135deg, #4c233a, #1d1421)' },
  { mood: 'All', desc: 'Full catalog', bg: 'linear-gradient(135deg, #3a4224, #1b1f16)' },
  { mood: 'Local', desc: 'Songs from phone', bg: 'linear-gradient(135deg, #273b4f, #131c26)' }
];

// Persistent storage helper
const STORAGE_KEY = 'melody_music_state_v1';
function loadStoredState() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}
function saveStoredState(partial) {
  try {
    const merged = { ...loadStoredState(), ...partial };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
  } catch {
    // Ignore storage quota errors
  }
}

// Generate rich bespoke SVG cover art per track
function buildArtworkSVG(track) {
  const [c1, c2, acc] = track.palette || ['#34452B', '#17201B', '#B9E47A'];
  const uid = `g_${track.id.replace(/[^a-zA-Z0-9]/g, '')}_${Math.floor(Math.random() * 9999)}`;
  let motif = '';

  switch (track.artType) {
    case 'moon':
      motif = `
        <circle cx="152" cy="70" r="32" fill="${acc}" fill-opacity="0.9"/>
        <circle cx="164" cy="64" r="28" fill="${c1}"/>
        <path d="M0 165 Q 60 132 120 154 T 240 148 L 240 240 L 0 240 Z" fill="${c2}" fill-opacity="0.85"/>
        <line x1="95" y1="240" x2="122" y2="152" stroke="${acc}" stroke-width="3" stroke-opacity="0.6" stroke-dasharray="8 8"/>
      `;
      break;
    case 'sun':
      motif = `
        <circle cx="120" cy="118" r="46" fill="${acc}" fill-opacity="0.88"/>
        <circle cx="120" cy="118" r="66" fill="${acc}" fill-opacity="0.16"/>
        <rect x="0" y="148" width="240" height="92" fill="${c2}" fill-opacity="0.72"/>
        <line x1="48" y1="168" x2="192" y2="168" stroke="${acc}" stroke-width="3" stroke-opacity="0.55" stroke-linecap="round"/>
        <line x1="74" y1="184" x2="166" y2="184" stroke="${acc}" stroke-width="2.5" stroke-opacity="0.35" stroke-linecap="round"/>
      `;
      break;
    case 'zen':
      motif = `
        <circle cx="120" cy="120" r="78" fill="none" stroke="${acc}" stroke-opacity="0.22" stroke-width="2"/>
        <circle cx="120" cy="120" r="52" fill="none" stroke="${acc}" stroke-opacity="0.42" stroke-width="2"/>
        <circle cx="120" cy="120" r="26" fill="${acc}" fill-opacity="0.24"/>
        <circle cx="120" cy="120" r="10" fill="${acc}"/>
      `;
      break;
    case 'rain':
      motif = `
        <rect x="34" y="110" width="38" height="130" rx="6" fill="${c2}" fill-opacity="0.8"/>
        <rect x="86" y="80" width="52" height="160" rx="6" fill="${c2}" fill-opacity="0.9"/>
        <rect x="152" y="124" width="48" height="116" rx="6" fill="${c2}" fill-opacity="0.75"/>
        <line x1="56" y1="30" x2="46" y2="70" stroke="${acc}" stroke-width="2.5" stroke-linecap="round" stroke-opacity="0.7"/>
        <line x1="116" y1="22" x2="106" y2="62" stroke="${acc}" stroke-width="2.5" stroke-linecap="round" stroke-opacity="0.85"/>
        <line x1="176" y1="38" x2="166" y2="78" stroke="${acc}" stroke-width="2.5" stroke-linecap="round" stroke-opacity="0.65"/>
        <rect x="98" y="102" width="10" height="14" rx="2" fill="${acc}" fill-opacity="0.75"/>
        <rect x="116" y="102" width="10" height="14" rx="2" fill="${acc}" fill-opacity="0.4"/>
      `;
      break;
    case 'wave':
      motif = `
        <path d="M0 120 Q 60 72 120 120 T 240 120 L 240 240 L 0 240 Z" fill="${acc}" fill-opacity="0.22"/>
        <path d="M0 148 Q 60 105 120 148 T 240 148 L 240 240 L 0 240 Z" fill="${acc}" fill-opacity="0.35"/>
        <path d="M0 178 Q 60 146 120 178 T 240 178 L 240 240 L 0 240 Z" fill="${c2}" fill-opacity="0.85"/>
        <circle cx="174" cy="64" r="22" fill="${acc}" fill-opacity="0.85"/>
      `;
      break;
    case 'cosmos':
      motif = `
        <ellipse cx="120" cy="120" rx="84" ry="28" transform="rotate(-22 120 120)" fill="none" stroke="${acc}" stroke-width="3" stroke-opacity="0.55"/>
        <circle cx="120" cy="120" r="34" fill="${acc}" fill-opacity="0.82"/>
        <circle cx="52" cy="58" r="3" fill="#fff" fill-opacity="0.8"/>
        <circle cx="186" cy="52" r="2.5" fill="#fff" fill-opacity="0.7"/>
        <circle cx="192" cy="176" r="3" fill="${acc}"/>
        <circle cx="62" cy="182" r="2" fill="#fff" fill-opacity="0.6"/>
      `;
      break;
    case 'coffee':
      motif = `
        <circle cx="120" cy="134" r="54" fill="${acc}" fill-opacity="0.16"/>
        <rect x="78" y="106" width="84" height="66" rx="18" fill="${acc}" fill-opacity="0.88"/>
        <path d="M162 118 C 184 118, 184 152, 162 152" fill="none" stroke="${acc}" stroke-width="8" stroke-linecap="round"/>
        <path d="M102 88 Q 96 74 104 62" fill="none" stroke="${acc}" stroke-width="4" stroke-linecap="round" stroke-opacity="0.65"/>
        <path d="M126 84 Q 120 68 128 54" fill="none" stroke="${acc}" stroke-width="4" stroke-linecap="round" stroke-opacity="0.85"/>
      `;
      break;
    case 'horizon':
      motif = `
        <circle cx="120" cy="130" r="54" fill="${acc}" fill-opacity="0.78"/>
        <path d="M0 152 L 62 116 L 122 156 L 178 112 L 240 156 L 240 240 L 0 240 Z" fill="${c2}" fill-opacity="0.9"/>
      `;
      break;
    default: // local vinyl
      motif = `
        <circle cx="120" cy="120" r="78" fill="#101216" stroke="${acc}" stroke-width="3" stroke-opacity="0.4"/>
        <circle cx="120" cy="120" r="58" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="1.5"/>
        <circle cx="120" cy="120" r="42" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="1.5"/>
        <circle cx="120" cy="120" r="24" fill="${acc}"/>
        <circle cx="120" cy="120" r="6" fill="#101216"/>
      `;
  }

  return `<svg viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="${uid}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${c1}"/>
        <stop offset="100%" stop-color="${c2}"/>
      </linearGradient>
    </defs>
    <rect width="240" height="240" fill="url(#${uid})"/>
    ${motif}
  </svg>`;
}

function formatTime(sec) {
  if (!isFinite(sec) || sec < 0) return '0:00';
  const s = Math.floor(sec);
  const mins = Math.floor(s / 60);
  const rem = s % 60;
  return `${mins}:${rem < 10 ? '0' : ''}${rem}`;
}

// Main App State
const stored = loadStoredState();
const engine = new window.MelodyAudioEngine();

const state = {
  tracks: [...BUILTIN_TRACKS],
  currentTrackId: BUILTIN_TRACKS[0].id,
  activeMood: 'All',
  activeView: 'home',
  activePlaylistId: null,
  sourceLabel: 'Melody Playlist',
  favorites: new Set(stored.favorites || ['midnight-drive', 'golden-hour']),
  recentIds: stored.recentIds || ['midnight-drive', 'golden-hour', 'quiet-places'],
  playlists: stored.playlists || [
    { id: 'pl-focus', name: 'Deep Focus', trackIds: ['quiet-places', 'starlight-drift', 'golden-hour'] },
    { id: 'pl-late', name: 'Late Night Vibes', trackIds: ['midnight-drive', 'neon-rain', 'afterglow'] }
  ],
  shuffle: false,
  repeat: 'all', // 'off' | 'all' | 'one'
  eqPreset: stored.eqPreset || 'balanced',
  eq: stored.eq || { bass: 0, mid: 0, treble: 0 },
  volume: typeof stored.volume === 'number' ? stored.volume : 0.85,
  sleepTimerEnd: null,
  sleepEndOfTrack: false,
  isSeeking: false,
  playlistModalTrackId: null
};

// DOM References
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

const elShell = $('.app-shell');
const elPlayerSheet = $('#player-sheet');
const elModalBackdrop = $('#modal-backdrop');
const elFileInput = $('#audio-file-input');
const elSeekSlider = $('#seek-slider');
const elToast = $('#toast');
const elCanvas = $('#visualizer-canvas');
const canvasCtx = elCanvas.getContext('2d');
const freqData = new Uint8Array(64);
const smoothBars = new Float32Array(28);

let toastTimeout = null;
function showToast(msg) {
  elToast.textContent = msg;
  elToast.classList.add('show');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => elToast.classList.remove('show'), 2300);
}

function getCurrentTrack() {
  return state.tracks.find((t) => t.id === state.currentTrackId) || state.tracks[0];
}

function getFilteredTracks() {
  if (state.activePlaylistId) {
    const pl = state.playlists.find((p) => p.id === state.activePlaylistId);
    if (pl) {
      return pl.trackIds.map((id) => state.tracks.find((t) => t.id === id)).filter(Boolean);
    }
  }
  if (state.activeMood === 'All') return state.tracks;
  if (state.activeMood === 'Local') return state.tracks.filter((t) => t.isLocal);
  return state.tracks.filter((t) => t.mood === state.activeMood);
}

function setGreeting() {
  const hr = new Date().getHours();
  let text = 'Good evening.';
  if (hr < 12) text = 'Good morning.';
  else if (hr < 18) text = 'Good afternoon.';
  $('#greeting-title').textContent = text;
}

// Rendering Helpers
function createTrackRowHTML(track) {
  const isCurrent = track.id === state.currentTrackId;
  const liked = state.favorites.has(track.id);
  return `
    <div class="track-row ${isCurrent ? 'active' : ''}" data-track-id="${track.id}">
      <div class="track-thumb">${buildArtworkSVG(track)}</div>
      <div class="track-info">
        <div class="track-title">${escapeHTML(track.title)}</div>
        <div class="track-sub">
          ${track.isLocal ? '<span class="local-badge">Device</span>' : ''}
          <span>${escapeHTML(track.artist)} • ${escapeHTML(track.genre || track.mood)}</span>
        </div>
      </div>
      <div class="track-right">
        ${isCurrent
          ? '<div class="playing-bars" aria-hidden="true"><span></span><span></span><span></span></div>'
          : `<span class="track-dur">${formatTime(track.duration)}</span>`}
        <button class="track-heart ${liked ? 'liked' : ''}" data-like-id="${track.id}" aria-label="Toggle favorite">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
      </div>
    </div>
  `;
}

function escapeHTML(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderHome() {
  const current = getCurrentTrack();
  // Hero card
  $('#hero-title').textContent = current.title;
  $('#hero-artist').textContent = `${current.artist} • ${current.genre || current.mood}`;
  $('#hero-badge').textContent = engine.isPlaying ? 'NOW PLAYING' : 'READY TO PLAY';
  $('#hero-play-label').textContent = engine.isPlaying ? 'Pause' : 'Play Now';
  const heroIcon = $('#btn-hero-play svg');
  if (heroIcon) {
    heroIcon.innerHTML = engine.isPlaying
      ? '<rect x="6" y="4" width="4.5" height="16" rx="1.5"/><rect x="13.5" y="4" width="4.5" height="16" rx="1.5"/>'
      : '<path d="M8 5.14v14l11-7-11-7z"/>';
  }
  $('#hero-art').innerHTML = buildArtworkSVG(current);

  // Carousel
  const carouselEl = $('#featured-carousel');
  carouselEl.innerHTML = state.tracks.slice(0, 6).map((t) => `
    <div class="mix-card ${t.id === state.currentTrackId ? 'playing' : ''}" data-track-id="${t.id}">
      <div class="mix-cover">
        ${buildArtworkSVG(t)}
        <div class="mix-play-dot">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
            ${t.id === state.currentTrackId && engine.isPlaying
              ? '<rect x="6" y="5" width="4" height="14"/><rect x="14" y="5" width="4" height="14"/>'
              : '<path d="M8 5.14v14l11-7-11-7z"/>'}
          </svg>
        </div>
      </div>
      <div class="mix-title">${escapeHTML(t.title)}</div>
      <div class="mix-sub">${escapeHTML(t.genre || t.mood)}</div>
    </div>
  `).join('');

  // Track list
  const filtered = getFilteredTracks();
  let heading = state.activeMood === 'All' ? 'All Tracks' : state.activeMood === 'Local' ? 'My Phone Music' : `${state.activeMood} Mix`;
  if (state.activePlaylistId) {
    const pl = state.playlists.find((p) => p.id === state.activePlaylistId);
    if (pl) heading = `Playlist: ${pl.name}`;
  }
  $('#playlist-heading').textContent = heading;
  $('#track-count').textContent = `${filtered.length} track${filtered.length === 1 ? '' : 's'}`;

  const listEl = $('#home-track-list');
  if (filtered.length === 0) {
    listEl.innerHTML = `<div class="empty-state">${
      state.activeMood === 'Local'
        ? 'No files loaded yet. Tap the + button above to play MP3 or WAV files from your phone!'
        : 'No tracks in this filter yet.'
    }</div>`;
  } else {
    listEl.innerHTML = filtered.map(createTrackRowHTML).join('');
  }
}

function renderSearch() {
  const q = $('#search-input').value.trim().toLowerCase();
  const clearBtn = $('#search-clear');
  clearBtn.classList.toggle('hidden', q.length === 0);

  if (q.length > 0) {
    const matches = state.tracks.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.artist.toLowerCase().includes(q) ||
        (t.mood && t.mood.toLowerCase().includes(q)) ||
        (t.genre && t.genre.toLowerCase().includes(q))
    );
    $('#search-results-section').classList.remove('hidden');
    $('#search-count').textContent = `${matches.length}`;
    $('#search-track-list').innerHTML =
      matches.length > 0
        ? matches.map(createTrackRowHTML).join('')
        : '<div class="empty-state">No matching songs found.</div>';
  } else {
    $('#search-results-section').classList.add('hidden');
  }

  $('#mood-grid').innerHTML = MOOD_CARDS.map((m) => `
    <button class="mood-tile" style="background: ${m.bg}" data-browse-mood="${m.mood}">
      <strong>${m.mood === 'Local' ? 'My Files' : m.mood}</strong>
      <span>${m.desc}</span>
    </button>
  `).join('');
}

function renderLibrary() {
  const likedTracks = state.tracks.filter((t) => state.favorites.has(t.id));
  const localCount = state.tracks.filter((t) => t.isLocal).length;

  $('#stat-liked-count').textContent = likedTracks.length;
  $('#stat-playlists-count').textContent = state.playlists.length;
  $('#stat-local-count').textContent = localCount;
  $('#liked-count-label').textContent = `${likedTracks.length} track${likedTracks.length === 1 ? '' : 's'}`;

  // Custom playlists
  const plContainer = $('#custom-playlists-list');
  if (state.playlists.length === 0) {
    plContainer.innerHTML = '<div class="empty-state">Create a playlist to organize your favorite tracks.</div>';
  } else {
    plContainer.innerHTML = state.playlists.map((pl) => `
      <div class="playlist-item" data-open-playlist="${pl.id}">
        <div class="playlist-item-left">
          <div class="playlist-badge">${escapeHTML(pl.name.charAt(0).toUpperCase())}</div>
          <div>
            <strong>${escapeHTML(pl.name)}</strong>
            <span>${pl.trackIds.length} track${pl.trackIds.length === 1 ? '' : 's'}</span>
          </div>
        </div>
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" style="color:var(--accent-bright)">
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      </div>
    `).join('');
  }

  // Liked tracks
  $('#liked-track-list').innerHTML =
    likedTracks.length > 0
      ? likedTracks.map(createTrackRowHTML).join('')
      : '<div class="empty-state">Tap the heart on any song to save it here.</div>';

  // Recently played
  const recents = state.recentIds
    .map((id) => state.tracks.find((t) => t.id === id))
    .filter(Boolean)
    .slice(0, 6);
  $('#recent-track-list').innerHTML =
    recents.length > 0
      ? recents.map(createTrackRowHTML).join('')
      : '<div class="empty-state">Songs you play will appear here.</div>';
}

function renderPlayerUI() {
  const track = getCurrentTrack();
  const liked = state.favorites.has(track.id);
  const glowColor = (track.palette && track.palette[2]) || '#9bcb55';
  document.documentElement.style.setProperty('--track-glow', hexToRgba(glowColor, 0.32));

  elShell.classList.toggle('is-playing', engine.isPlaying);

  // Mini player
  $('#mini-title').textContent = track.title;
  $('#mini-artist').textContent = track.artist;
  $('#mini-art').innerHTML = buildArtworkSVG(track);
  $('#mini-like-btn').classList.toggle('liked', liked);

  // Full player
  $('#player-title').textContent = track.title;
  $('#player-artist').textContent = `${track.artist} • ${track.genre || track.mood}`;
  $('#player-source-name').textContent = state.sourceLabel;
  $('#player-artwork-visual').innerHTML = buildArtworkSVG(track);
  $('#lyrics-body').textContent = track.notes || 'Imported from your device.\nEnjoy full equalizer & live visualizer support.';
  $('#quality-tag').textContent = track.isLocal ? 'LOCAL AUDIO • HI-FI' : 'STUDIO SYNTH • 48kHz';
  $('#btn-player-like').classList.toggle('liked', liked);

  // Play / Pause SVG icons
  const playPath = '<path d="M8 5.14v14l11-7-11-7z"/>';
  const pausePath = '<rect x="6" y="4" width="4.5" height="16" rx="1.5"/><rect x="13.5" y="4" width="4.5" height="16" rx="1.5"/>';
  $('#mini-play-icon').innerHTML = engine.isPlaying ? pausePath : playPath;
  $('#main-play-icon').innerHTML = engine.isPlaying ? pausePath : playPath;

  // Shuffle & Repeat
  $('#btn-shuffle').classList.toggle('active', state.shuffle);
  $('#btn-repeat').classList.toggle('active', state.repeat !== 'off');
  $('#repeat-one-badge').classList.toggle('hidden', state.repeat !== 'one');

  // Duration
  $('#time-total').textContent = formatTime(engine.getDuration());

  updateMediaSession(track);
}

function renderAll() {
  renderHome();
  renderSearch();
  renderLibrary();
  renderPlayerUI();
}

function hexToRgba(hex, alpha) {
  const clean = hex.replace('#', '');
  if (clean.length !== 6) return `rgba(155, 203, 85, ${alpha})`;
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// Playback Actions
function selectAndPlay(trackId, autoPlay = true) {
  const track = state.tracks.find((t) => t.id === trackId);
  if (!track) return;

  const isSame = state.currentTrackId === trackId;
  state.currentTrackId = trackId;

  // Update recent history
  state.recentIds = [trackId, ...state.recentIds.filter((id) => id !== trackId)].slice(0, 12);
  saveStoredState({ recentIds: state.recentIds });

  if (!isSame || engine.currentTrack?.id !== trackId) {
    engine.loadTrack(track, autoPlay);
  } else if (autoPlay) {
    if (engine.isPlaying) engine.pause();
    else engine.play();
  }

  renderAll();
}

function togglePlayPause() {
  if (!engine.currentTrack) {
    engine.loadTrack(getCurrentTrack(), true);
  } else if (engine.isPlaying) {
    engine.pause();
  } else {
    engine.play();
  }
  renderAll();
}

function playNext(fromAutoEnd = false) {
  if (fromAutoEnd && state.sleepEndOfTrack) {
    state.sleepEndOfTrack = false;
    updateSleepPill();
    engine.pause();
    renderAll();
    showToast('Sleep timer paused playback');
    return;
  }

  if (fromAutoEnd && state.repeat === 'one') {
    engine.seek(0);
    engine.play();
    renderAll();
    return;
  }

  const list = getFilteredTracks().length > 0 ? getFilteredTracks() : state.tracks;
  const idx = list.findIndex((t) => t.id === state.currentTrackId);

  if (state.shuffle && list.length > 1) {
    let nextIdx = idx;
    while (nextIdx === idx) {
      nextIdx = Math.floor(Math.random() * list.length);
    }
    selectAndPlay(list[nextIdx].id, true);
    return;
  }

  if (idx === list.length - 1 && fromAutoEnd && state.repeat === 'off') {
    engine.pause();
    engine.seek(0);
    renderAll();
    return;
  }

  const nextTrack = list[(idx + 1) % list.length];
  selectAndPlay(nextTrack.id, true);
}

function playPrev() {
  if (engine.getCurrentTime() > 3) {
    engine.seek(0);
    return;
  }
  const list = getFilteredTracks().length > 0 ? getFilteredTracks() : state.tracks;
  const idx = list.findIndex((t) => t.id === state.currentTrackId);
  const prevTrack = list[(idx - 1 + list.length) % list.length];
  selectAndPlay(prevTrack.id, true);
}

function toggleFavorite(trackId) {
  if (state.favorites.has(trackId)) {
    state.favorites.delete(trackId);
    showToast('Removed from Liked Songs');
  } else {
    state.favorites.add(trackId);
    showToast('Saved to Liked Songs');
  }
  saveStoredState({ favorites: Array.from(state.favorites) });
  renderAll();
}

// Local Audio Import
function handleFileImport(files) {
  const audioFiles = Array.from(files).filter((f) => f.type.startsWith('audio/') || /\.(mp3|wav|m4a|ogg|flac|aac|opus)$/i.test(f.name));
  if (audioFiles.length === 0) {
    showToast('Please pick an audio file (MP3, WAV, M4A, OGG)');
    return;
  }

  const palettes = [
    ['#2b4135', '#131d19', '#b9e47a'],
    ['#3c2d4a', '#171320', '#c9a6ff'],
    ['#4a3a26', '#1c1813', '#f2cf84'],
    ['#223c4e', '#101a24', '#82d4ff']
  ];

  let firstImportedId = null;
  audioFiles.forEach((file, i) => {
    const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[_-]+/g, ' ').trim();
    const parts = cleanName.split(' - ');
    const artist = parts.length > 1 ? parts[0].trim() : 'My Device';
    const title = parts.length > 1 ? parts.slice(1).join(' - ').trim() : cleanName;
    const id = `local-${Date.now()}-${i}`;
    const url = URL.createObjectURL(file);

    const newTrack = {
      id,
      title: title || 'Audio Track',
      artist,
      mood: 'Local',
      genre: 'Local Audio',
      duration: 0,
      isLocal: true,
      audioUrl: url,
      palette: palettes[i % palettes.length],
      artType: 'vinyl'
    };

    state.tracks.unshift(newTrack);
    if (!firstImportedId) firstImportedId = id;
  });

  showToast(`Added ${audioFiles.length} track${audioFiles.length > 1 ? 's' : ''} from device`);
  selectAndPlay(firstImportedId, true);
  openPlayerSheet();
}

// Navigation & Sheets
function switchView(viewName) {
  state.activeView = viewName;
  $$('.view').forEach((v) => v.classList.toggle('active', v.id === `view-${viewName}`));
  $$('.nav-item').forEach((n) => n.classList.toggle('active', n.dataset.view === viewName));
  $('#main-content').scrollTop = 0;
}

function openPlayerSheet() {
  elPlayerSheet.classList.add('open');
  elPlayerSheet.setAttribute('aria-hidden', 'false');
}

function closePlayerSheet() {
  elPlayerSheet.classList.remove('open');
  elPlayerSheet.setAttribute('aria-hidden', 'true');
}

function openModal(modalId) {
  elModalBackdrop.classList.remove('hidden');
  $$('.modal-sheet').forEach((m) => m.classList.toggle('hidden', m.id !== modalId));

  if (modalId === 'modal-queue') renderQueueModal();
  if (modalId === 'modal-playlist') renderPlaylistModal();
  if (modalId === 'modal-sleep') renderSleepModal();
}

function closeModals() {
  elModalBackdrop.classList.add('hidden');
  $$('.modal-sheet').forEach((m) => m.classList.add('hidden'));
}

// Queue, Sleep Timer & Playlist Modals
function renderQueueModal() {
  const list = getFilteredTracks().length > 0 ? getFilteredTracks() : state.tracks;
  $('#queue-list').innerHTML = list.map(createTrackRowHTML).join('');
}

function renderSleepModal() {
  let msg = 'Pause playback automatically after a set time.';
  if (state.sleepEndOfTrack) msg = 'Playback will pause after the current track finishes.';
  else if (state.sleepTimerEnd) {
    const rem = Math.max(0, Math.ceil((state.sleepTimerEnd - Date.now()) / 1000));
    msg = `Pausing in ${formatTime(rem)}.`;
  }
  $('#sleep-status-text').textContent = msg;
}

function setSleepTimer(val) {
  state.sleepTimerEnd = null;
  state.sleepEndOfTrack = false;

  if (val === 'end') {
    state.sleepEndOfTrack = true;
    showToast('Sleep timer: end of track');
  } else {
    const mins = Number(val);
    if (mins > 0) {
      state.sleepTimerEnd = Date.now() + mins * 60 * 1000;
      showToast(`Sleep timer set for ${mins} min`);
    } else {
      showToast('Sleep timer off');
    }
  }
  updateSleepPill();
  closeModals();
}

function updateSleepPill() {
  const pill = $('#btn-open-sleep');
  const label = $('#sleep-pill-label');
  if (state.sleepEndOfTrack) {
    pill.classList.add('active');
    label.textContent = '1 track';
  } else if (state.sleepTimerEnd) {
    const remSec = Math.max(0, Math.ceil((state.sleepTimerEnd - Date.now()) / 1000));
    if (remSec <= 0) {
      state.sleepTimerEnd = null;
      engine.pause();
      renderAll();
      showToast('Sleep timer finished');
      pill.classList.remove('active');
      label.textContent = 'Timer';
    } else {
      pill.classList.add('active');
      label.textContent = formatTime(remSec);
    }
  } else {
    pill.classList.remove('active');
    label.textContent = 'Timer';
  }
}

function renderPlaylistModal() {
  const trackId = state.playlistModalTrackId;
  $('#playlist-modal-title').textContent = trackId ? 'Add to Playlist' : 'Your Playlists';

  const container = $('#playlist-modal-list');
  if (state.playlists.length === 0) {
    container.innerHTML = '<div class="empty-state">No playlists yet. Create one above!</div>';
    return;
  }

  container.innerHTML = state.playlists.map((pl) => {
    const hasTrack = trackId && pl.trackIds.includes(trackId);
    return `
      <button class="option-item ${hasTrack ? 'active' : ''}" data-toggle-pl="${pl.id}">
        <span>${escapeHTML(pl.name)} (${pl.trackIds.length})</span>
        <span>${hasTrack ? 'Added ✓' : trackId ? '+ Add' : 'Open'}</span>
      </button>
    `;
  }).join('');
}

// Equalizer Controls
function applyEQState(presetName = null) {
  if (presetName && EQ_PRESETS[presetName]) {
    const p = EQ_PRESETS[presetName];
    state.eqPreset = presetName;
    state.eq = { bass: p.bass, mid: p.mid, treble: p.treble };
  }

  engine.setEQ(state.eq.bass, state.eq.mid, state.eq.treble);
  engine.setVolume(state.volume);

  $('#eq-bass').value = state.eq.bass;
  $('#eq-mid').value = state.eq.mid;
  $('#eq-treble').value = state.eq.treble;
  $('#eq-volume').value = Math.round(state.volume * 100);

  $('#eq-bass-val').textContent = `${state.eq.bass > 0 ? '+' : ''}${state.eq.bass} dB`;
  $('#eq-mid-val').textContent = `${state.eq.mid > 0 ? '+' : ''}${state.eq.mid} dB`;
  $('#eq-treble-val').textContent = `${state.eq.treble > 0 ? '+' : ''}${state.eq.treble} dB`;
  $('#eq-volume-val').textContent = `${Math.round(state.volume * 100)}%`;

  updateRangeFill($('#eq-bass'));
  updateRangeFill($('#eq-mid'));
  updateRangeFill($('#eq-treble'));
  updateRangeFill($('#eq-volume'));

  $$('#eq-presets .chip').forEach((c) => c.classList.toggle('active', c.dataset.preset === state.eqPreset));
  const pillLabel = EQ_PRESETS[state.eqPreset]?.label || 'Custom';
  $('#eq-pill-label').textContent = pillLabel;
  $('#btn-open-eq').classList.toggle('active', state.eqPreset !== 'balanced');

  saveStoredState({ eqPreset: state.eqPreset, eq: state.eq, volume: state.volume });
}

function updateRangeFill(input) {
  const min = Number(input.min);
  const max = Number(input.max);
  const val = Number(input.value);
  const pct = ((val - min) / (max - min)) * 100;
  input.style.setProperty('--val', `${pct}%`);
}

// Lock-Screen Media Session
function updateMediaSession(track) {
  if (!('mediaSession' in navigator)) return;
  try {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: track.title,
      artist: track.artist,
      album: track.genre || 'Melody Music'
    });
    navigator.mediaSession.playbackState = engine.isPlaying ? 'playing' : 'paused';
  } catch {
    // Ignore unsupported browsers
  }
}

if ('mediaSession' in navigator) {
  try {
    navigator.mediaSession.setActionHandler('play', () => { engine.play(); renderAll(); });
    navigator.mediaSession.setActionHandler('pause', () => { engine.pause(); renderAll(); });
    navigator.mediaSession.setActionHandler('previoustrack', () => playPrev());
    navigator.mediaSession.setActionHandler('nexttrack', () => playNext(false));
  } catch {
    // Ignore unsupported actions
  }
}

// 60fps UI Progress & Audio Visualizer Loop
function animationTick() {
  const cur = engine.getCurrentTime();
  const dur = engine.getDuration();
  const pct = dur > 0 ? Math.min(100, (cur / dur) * 100) : 0;

  $('#mini-progress-fill').style.width = `${pct}%`;

  if (!state.isSeeking) {
    elSeekSlider.value = Math.round(pct * 10);
    elSeekSlider.style.setProperty('--val', `${pct}%`);
    $('#time-current').textContent = formatTime(cur);
  }

  // Draw live spectrum bars on artwork canvas
  const w = elCanvas.width;
  const h = elCanvas.height;
  canvasCtx.clearRect(0, 0, w, h);

  const hasAudio = engine.getFrequencyData(freqData);
  const barCount = smoothBars.length;
  const gap = 4;
  const barW = (w - 32 - gap * (barCount - 1)) / barCount;
  const track = getCurrentTrack();
  const accent = (track.palette && track.palette[2]) || '#b9e47a';

  canvasCtx.fillStyle = accent;
  for (let i = 0; i < barCount; i++) {
    const binIdx = Math.min(freqData.length - 1, Math.floor((i / barCount) * 38) + 1);
    const target = hasAudio ? (freqData[binIdx] / 255) * (h - 18) : 4;
    smoothBars[i] += (Math.max(4, target) - smoothBars[i]) * 0.24;

    const bh = smoothBars[i];
    const x = 16 + i * (barW + gap);
    const y = h - bh - 8;

    canvasCtx.globalAlpha = hasAudio ? 0.85 : 0.28;
    canvasCtx.beginPath();
    if (canvasCtx.roundRect) {
      canvasCtx.roundRect(x, y, barW, bh, 3);
    } else {
      canvasCtx.rect(x, y, barW, bh);
    }
    canvasCtx.fill();
  }
  canvasCtx.globalAlpha = 1;

  requestAnimationFrame(animationTick);
}

// Event Wiring
function bindEvents() {
  // Bottom Nav
  $$('.nav-item').forEach((btn) => {
    btn.addEventListener('click', () => switchView(btn.dataset.view));
  });

  // Mood filter chips
  $('#mood-chips').addEventListener('click', (e) => {
    const chip = e.target.closest('.chip');
    if (!chip) return;
    state.activePlaylistId = null;
    state.activeMood = chip.dataset.mood;
    state.sourceLabel = state.activeMood === 'All' ? 'Melody Playlist' : `${state.activeMood} Mix`;
    $$('#mood-chips .chip').forEach((c) => c.classList.toggle('active', c === chip));
    renderHome();
  });

  // Hero buttons
  $('#btn-hero-play').addEventListener('click', () => togglePlayPause());
  $('#btn-hero-shuffle').addEventListener('click', () => {
    state.shuffle = true;
    const list = getFilteredTracks().length > 0 ? getFilteredTracks() : state.tracks;
    const pick = list[Math.floor(Math.random() * list.length)];
    selectAndPlay(pick.id, true);
    showToast('Shuffle mode enabled');
  });

  // Delegated track clicks & heart clicks across whole app
  elShell.addEventListener('click', (e) => {
    const likeBtn = e.target.closest('[data-like-id]');
    if (likeBtn) {
      e.stopPropagation();
      toggleFavorite(likeBtn.dataset.likeId);
      return;
    }

    const trackRow = e.target.closest('[data-track-id]');
    if (trackRow) {
      const id = trackRow.dataset.trackId;
      selectAndPlay(id, true);
      if (trackRow.closest('#modal-queue')) closeModals();
      return;
    }

    const moodTile = e.target.closest('[data-browse-mood]');
    if (moodTile) {
      const mood = moodTile.dataset.browseMood;
      state.activePlaylistId = null;
      state.activeMood = mood;
      state.sourceLabel = mood === 'All' ? 'Melody Playlist' : `${mood} Mix`;
      $$('#mood-chips .chip').forEach((c) => c.classList.toggle('active', c.dataset.mood === mood));
      switchView('home');
      renderHome();
      return;
    }

    const openPl = e.target.closest('[data-open-playlist]');
    if (openPl) {
      const pl = state.playlists.find((p) => p.id === openPl.dataset.openPlaylist);
      if (pl) {
        state.activePlaylistId = pl.id;
        state.sourceLabel = pl.name;
        $$('#mood-chips .chip').forEach((c) => c.classList.remove('active'));
        switchView('home');
        renderHome();
      }
      return;
    }
  });

  // Search input
  $('#search-input').addEventListener('input', renderSearch);
  $('#search-clear').addEventListener('click', () => {
    $('#search-input').value = '';
    renderSearch();
  });

  // Import Audio buttons
  const triggerImport = () => elFileInput.click();
  $('#btn-import-top').addEventListener('click', triggerImport);
  $('#btn-import-card').addEventListener('click', triggerImport);
  elFileInput.addEventListener('change', (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileImport(e.target.files);
      elFileInput.value = '';
    }
  });

  // Mini player
  $('#mini-open-player').addEventListener('click', openPlayerSheet);
  $('#mini-play-btn').addEventListener('click', (e) => { e.stopPropagation(); togglePlayPause(); });
  $('#mini-next-btn').addEventListener('click', (e) => { e.stopPropagation(); playNext(false); });
  $('#mini-like-btn').addEventListener('click', (e) => { e.stopPropagation(); toggleFavorite(state.currentTrackId); });

  // Full player controls
  $('#btn-collapse-player').addEventListener('click', closePlayerSheet);
  $('#btn-close-player').addEventListener('click', closePlayerSheet);
  $('#btn-play-main').addEventListener('click', togglePlayPause);
  $('#btn-next').addEventListener('click', () => playNext(false));
  $('#btn-prev').addEventListener('click', playPrev);
  $('#btn-player-like').addEventListener('click', () => toggleFavorite(state.currentTrackId));

  $('#btn-lyrics-toggle').addEventListener('click', () => {
    const ov = $('#lyrics-overlay');
    const nowHidden = ov.classList.toggle('hidden');
    $('#btn-lyrics-toggle').classList.toggle('active', !nowHidden);
  });

  $('#btn-shuffle').addEventListener('click', () => {
    state.shuffle = !state.shuffle;
    renderPlayerUI();
    showToast(state.shuffle ? 'Shuffle On' : 'Shuffle Off');
  });

  $('#btn-repeat').addEventListener('click', () => {
    state.repeat = state.repeat === 'off' ? 'all' : state.repeat === 'all' ? 'one' : 'off';
    renderPlayerUI();
    showToast(state.repeat === 'one' ? 'Repeat One' : state.repeat === 'all' ? 'Repeat All' : 'Repeat Off');
  });

  // Seeking
  elSeekSlider.addEventListener('input', () => {
    state.isSeeking = true;
    const pct = Number(elSeekSlider.value) / 10;
    elSeekSlider.style.setProperty('--val', `${pct}%`);
    $('#time-current').textContent = formatTime((pct / 100) * engine.getDuration());
  });
  const commitSeek = () => {
    if (!state.isSeeking) return;
    const pct = Number(elSeekSlider.value) / 1000;
    engine.seek(pct * engine.getDuration());
    state.isSeeking = false;
  };
  elSeekSlider.addEventListener('change', commitSeek);
  elSeekSlider.addEventListener('pointerup', commitSeek);

  // Swipe down on player sheet header to close on mobile
  let touchStartY = 0;
  $('.player-top').addEventListener('touchstart', (e) => { touchStartY = e.touches[0].clientY; }, { passive: true });
  $('.player-top').addEventListener('touchend', (e) => {
    const dy = e.changedTouches[0].clientY - touchStartY;
    if (dy > 60) closePlayerSheet();
  }, { passive: true });

  // Modals triggers
  $('#btn-eq-top').addEventListener('click', () => openModal('modal-eq'));
  $('#btn-open-eq').addEventListener('click', () => openModal('modal-eq'));
  $('#btn-open-sleep').addEventListener('click', () => openModal('modal-sleep'));
  $('#btn-open-queue').addEventListener('click', () => openModal('modal-queue'));
  $('#btn-add-to-playlist').addEventListener('click', () => {
    state.playlistModalTrackId = state.currentTrackId;
    openModal('modal-playlist');
  });
  $('#btn-new-playlist').addEventListener('click', () => {
    state.playlistModalTrackId = null;
    openModal('modal-playlist');
  });

  // Close modals
  $$('.modal-close').forEach((b) => b.addEventListener('click', closeModals));
  elModalBackdrop.addEventListener('click', (e) => {
    if (e.target === elModalBackdrop) closeModals();
  });

  // EQ presets & sliders
  $('#eq-presets').addEventListener('click', (e) => {
    const chip = e.target.closest('.chip');
    if (!chip) return;
    applyEQState(chip.dataset.preset);
  });

  ['bass', 'mid', 'treble'].forEach((band) => {
    $(`#eq-${band}`).addEventListener('input', (e) => {
      state.eqPreset = 'custom';
      state.eq[band] = Number(e.target.value);
      applyEQState();
    });
  });

  $('#eq-volume').addEventListener('input', (e) => {
    state.volume = Number(e.target.value) / 100;
    applyEQState();
  });

  // Sleep timer options
  $('#sleep-options').addEventListener('click', (e) => {
    const opt = e.target.closest('.option-item');
    if (!opt) return;
    setSleepTimer(opt.dataset.minutes);
  });

  // Playlist modal create & toggle
  $('#new-playlist-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const input = $('#new-playlist-input');
    const name = input.value.trim();
    if (!name) return;
    const newPl = {
      id: `pl-${Date.now()}`,
      name,
      trackIds: state.playlistModalTrackId ? [state.playlistModalTrackId] : []
    };
    state.playlists.unshift(newPl);
    saveStoredState({ playlists: state.playlists });
    input.value = '';
    showToast(`Created "${name}"`);
    renderPlaylistModal();
    renderLibrary();
  });

  $('#playlist-modal-list').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-toggle-pl]');
    if (!btn) return;
    const pl = state.playlists.find((p) => p.id === btn.dataset.togglePl);
    if (!pl) return;

    if (state.playlistModalTrackId) {
      const tid = state.playlistModalTrackId;
      if (pl.trackIds.includes(tid)) {
        pl.trackIds = pl.trackIds.filter((id) => id !== tid);
        showToast(`Removed from ${pl.name}`);
      } else {
        pl.trackIds.push(tid);
        showToast(`Added to ${pl.name}`);
      }
      saveStoredState({ playlists: state.playlists });
      renderPlaylistModal();
      renderLibrary();
    } else {
      state.activePlaylistId = pl.id;
      state.sourceLabel = pl.name;
      closeModals();
      switchView('home');
      renderHome();
    }
  });

  // Engine callbacks
  engine.onEnded = () => playNext(true);
  engine.onDurationChange = () => renderAll();
}

// Initialize
setGreeting();
engine.loadTrack(getCurrentTrack(), false);
applyEQState();
bindEvents();
renderAll();
requestAnimationFrame(animationTick);
setInterval(updateSleepPill, 1000);

// Register PWA Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  });
}
