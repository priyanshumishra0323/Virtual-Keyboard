// Aliases for keys that share functionality or mappings
const codeAliases = {
  'Delete': 'Backspace',
  'NumpadEnter': 'Enter',
  'ControlRight': 'ControlLeft'
};

// Fallback text map for older browsers or keys without data-code
const fallbackKeyMap = {
  'escape': 'esc',
  'capslock': 'caps lock',
  'tab': 'tab ⮂',
  'enter': '↵ enter',
  'backspace': '← delete',
  'shiftleft': '⬆ shift',
  'shiftright': '⬆ shift',
  'controlleft': 'ctrl',
  'controlright': 'ctrl',
  'altleft': '⌥',
  'altright': '⌥',
  'metaleft': '⌘',
  'metaright': '⌘',
  ' ': 'space',
  'arrowleft': '◀',
  'arrowright': '▶',
  'arrowup': '▲',
  'arrowdown': '▼',
  'f1': 'f1', 'f2': 'f2', 'f3': 'f3', 'f4': 'f4',
  'f5': 'f5', 'f6': 'f6', 'f7': 'f7', 'f8': 'f8',
  'f9': 'f9', 'f10': 'f10', 'f11': 'f11', 'f12': 'f12',
  'printscreen': 'prt scn'
};

// Practice sentences pool for Practice Mode
const practiceSentences = [
  "The quick brown fox jumps over the lazy dog.",
  "Typing fast requires smooth rhythm, steady focus, and relaxed fingers.",
  "Mechanical keyboards provide crisp tactile feedback and deep keystrokes.",
  "Sphinx of black quartz, judge my vow with swift justice.",
  "Practice every day to build muscle memory and effortless typing speed.",
  "Clean and elegant code is easy to read, test, and maintain.",
  "Pack my box with five dozen liquor jugs before morning comes.",
  "Great software engineers write code for humans first and machines second.",
  "Mastering your keyboard shortcuts dramatically boosts your productivity.",
  "The five boxing wizards jump quickly into the dark mysterious forest."
];

// =========================================================
// APP STATE
// =========================================================
let currentMode = 'free'; // 'free' | 'practice'
let freeTypedText = '';
let practiceText = '';
let practiceCharIndex = 0;
let practiceErrors = 0;

let timerRunning = false;
let startTime = null;
let timerInterval = null;
let totalKeystrokes = 0;
let correctKeystrokes = 0;
let capsLockState = false;

// DOM Elements
const btnFreeMode = document.getElementById('btn-free-mode');
const btnPracticeMode = document.getElementById('btn-practice-mode');
const freeTypingView = document.getElementById('free-typing-view');
const practiceTypingView = document.getElementById('practice-typing-view');
const typedTextEl = document.getElementById('typed-text');
const freeCursorEl = document.getElementById('free-cursor');
const screenPlaceholder = document.getElementById('screen-placeholder');
const practiceTextContainer = document.getElementById('practice-text-container');
const btnNewText = document.getElementById('btn-new-text');
const practiceCompleteMsg = document.getElementById('practice-complete-msg');

const statWpm = document.getElementById('stat-wpm');
const statAccuracy = document.getElementById('stat-accuracy');
const statTime = document.getElementById('stat-time');
const statChars = document.getElementById('stat-chars');
const btnReset = document.getElementById('btn-reset');
const lastKeyEl = document.getElementById('last-key');
const screenModeInfo = document.getElementById('screen-mode-info');

// =========================================================
// TIMER & WPM CALCULATION
// =========================================================
function startTimerIfNeeded() {
  if (!timerRunning) {
    timerRunning = true;
    startTime = Date.now();
    timerInterval = setInterval(updateStatsDisplay, 250);
  }
}

function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
  timerRunning = false;
}

function updateStatsDisplay() {
  if (!startTime) return;

  const elapsedSeconds = Math.max(1, Math.floor((Date.now() - startTime) / 1000));
  const minutes = elapsedSeconds / 60;

  // Format Time (MM:SS)
  const m = String(Math.floor(elapsedSeconds / 60)).padStart(2, '0');
  const s = String(elapsedSeconds % 60).padStart(2, '0');
  statTime.textContent = `${m}:${s}`;

  let wpm = 0;
  let accuracy = 100;

  if (currentMode === 'free') {
    // Free typing WPM: (Total characters / 5) / minutes
    const standardWords = freeTypedText.length / 5;
    wpm = Math.round(standardWords / minutes);
    statChars.textContent = freeTypedText.length;
    statAccuracy.textContent = '100%';
  } else {
    // Practice Mode WPM: (Correct Characters / 5) / minutes
    const netCorrect = Math.max(0, practiceCharIndex - practiceErrors);
    const standardWords = netCorrect / 5;
    wpm = Math.round(standardWords / minutes);

    if (totalKeystrokes > 0) {
      accuracy = Math.max(0, Math.round(((totalKeystrokes - practiceErrors) / totalKeystrokes) * 100));
    }
    statChars.textContent = practiceCharIndex;
    statAccuracy.textContent = `${accuracy}%`;
  }

  statWpm.textContent = isNaN(wpm) ? 0 : wpm;
}

function resetAll() {
  stopTimer();
  startTime = null;
  totalKeystrokes = 0;
  correctKeystrokes = 0;
  freeTypedText = '';
  practiceCharIndex = 0;
  practiceErrors = 0;

  statWpm.textContent = '0';
  statAccuracy.textContent = '100%';
  statTime.textContent = '00:00';
  statChars.textContent = '0';
  lastKeyEl.textContent = '-';

  if (practiceCompleteMsg) {
    practiceCompleteMsg.style.display = 'none';
  }

  if (currentMode === 'free') {
    renderFreeView();
  } else {
    loadNewPracticeSentence();
  }
}

// =========================================================
// FREE TYPING MODE
// =========================================================
function renderFreeView() {
  typedTextEl.textContent = freeTypedText;
  if (freeTypedText.length === 0) {
    screenPlaceholder.style.display = 'inline';
    freeCursorEl.style.display = 'inline-block';
  } else {
    screenPlaceholder.style.display = 'none';
    freeCursorEl.style.display = 'inline-block';
  }
  // Auto scroll to bottom
  freeTypingView.scrollTop = freeTypingView.scrollHeight;
}

function handleFreeInput(char, code) {
  startTimerIfNeeded();
  totalKeystrokes++;

  if (code === 'Backspace' || char === 'Backspace') {
    if (freeTypedText.length > 0) {
      freeTypedText = freeTypedText.slice(0, -1);
    }
  } else if (code === 'Enter' || char === 'Enter') {
    freeTypedText += '\n';
  } else if (code === 'Tab' || char === 'Tab') {
    freeTypedText += '    '; // 4 spaces
  } else if (code === 'Space' || char === ' ') {
    freeTypedText += ' ';
  } else if (char && char.length === 1) {
    freeTypedText += char;
  }

  renderFreeView();
  updateStatsDisplay();
}

// =========================================================
// PRACTICE MODE
// =========================================================
function loadNewPracticeSentence() {
  const randomIndex = Math.floor(Math.random() * practiceSentences.length);
  practiceText = practiceSentences[randomIndex];
  practiceCharIndex = 0;
  practiceErrors = 0;
  totalKeystrokes = 0;
  stopTimer();
  startTime = null;

  statWpm.textContent = '0';
  statAccuracy.textContent = '100%';
  statTime.textContent = '00:00';
  statChars.textContent = '0';

  if (practiceCompleteMsg) {
    practiceCompleteMsg.style.display = 'none';
  }

  renderPracticeView();
}

function renderPracticeView() {
  practiceTextContainer.innerHTML = '';

  for (let i = 0; i < practiceText.length; i++) {
    const span = document.createElement('span');
    span.classList.add('char');
    span.textContent = practiceText[i];

    if (i < practiceCharIndex) {
      span.classList.add('correct');
    } else if (i === practiceCharIndex) {
      span.classList.add('current');
    } else {
      span.classList.add('pending');
    }

    practiceTextContainer.appendChild(span);
  }
}

function handlePracticeInput(char, code) {
  if (practiceCharIndex >= practiceText.length) return;

  startTimerIfNeeded();
  totalKeystrokes++;

  if (code === 'Backspace' || char === 'Backspace') {
    if (practiceCharIndex > 0) {
      practiceCharIndex--;
      const span = practiceTextContainer.children[practiceCharIndex];
      if (span) {
        span.className = 'char current';
      }
      if (practiceTextContainer.children[practiceCharIndex + 1]) {
        practiceTextContainer.children[practiceCharIndex + 1].className = 'char pending';
      }
    }
    updateStatsDisplay();
    return;
  }

  const targetChar = practiceText[practiceCharIndex];
  let typedChar = char;
  if (code === 'Space' || char === ' ') {
    typedChar = ' ';
  }

  if (typedChar && typedChar.length === 1) {
    const currentSpan = practiceTextContainer.children[practiceCharIndex];

    if (typedChar === targetChar) {
      currentSpan.className = 'char correct';
    } else {
      currentSpan.className = 'char incorrect';
      practiceErrors++;
    }

    practiceCharIndex++;

    if (practiceCharIndex < practiceText.length) {
      practiceTextContainer.children[practiceCharIndex].className = 'char current';
    } else {
      // Completed!
      stopTimer();
      updateStatsDisplay();
      if (practiceCompleteMsg) {
        practiceCompleteMsg.style.display = 'block';
      }
    }
  }

  updateStatsDisplay();
}

// =========================================================
// MODE TOGGLE
// =========================================================
function switchMode(newMode) {
  if (currentMode === newMode) return;
  currentMode = newMode;
  resetAll();

  if (newMode === 'free') {
    btnFreeMode.classList.add('active');
    btnPracticeMode.classList.remove('active');
    freeTypingView.style.display = 'block';
    practiceTypingView.style.display = 'none';
    screenModeInfo.textContent = 'Free Typing Mode';
    renderFreeView();
  } else {
    btnPracticeMode.classList.add('active');
    btnFreeMode.classList.remove('active');
    freeTypingView.style.display = 'none';
    practiceTypingView.style.display = 'block';
    screenModeInfo.textContent = 'Practice Mode';
    loadNewPracticeSentence();
  }
}

btnFreeMode.addEventListener('click', () => switchMode('free'));
btnPracticeMode.addEventListener('click', () => switchMode('practice'));
btnReset.addEventListener('click', resetAll);
btnNewText.addEventListener('click', loadNewPracticeSentence);

// =========================================================
// VIRTUAL KEYBOARD MATCHING & VISUALS
// =========================================================
function findKeyElement(e) {
  const code = codeAliases[e.code] || e.code;

  // 1. Direct match by data-code
  if (code) {
    const keyEl = document.querySelector(`.key[data-code="${code}"]`);
    if (keyEl) return keyEl;
  }

  // 2. Fallback matching by letter text content
  const codeKey = (e.code || '').toLowerCase();
  const normalKey = (e.key || '').toLowerCase();
  const targetText = fallbackKeyMap[codeKey] || fallbackKeyMap[normalKey] || normalKey;

  const keys = document.querySelectorAll('.key');
  for (const key of keys) {
    const letterEl = key.querySelector('.letter');
    if (letterEl && letterEl.textContent.trim().toLowerCase() === targetText) {
      return key;
    }
  }

  return null;
}

function updateLastKeyBadge(keyLabel) {
  if (lastKeyEl) {
    lastKeyEl.textContent = keyLabel || '-';
  }
}

// =========================================================
// PHYSICAL KEYBOARD EVENTS
// =========================================================
document.addEventListener('keydown', (e) => {
  // Prevent browser scroll or Tab focus jumping when typing
  if (['Tab', 'Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
    e.preventDefault();
  }

  // Visual key press highlight
  const keyEl = findKeyElement(e);
  if (keyEl) {
    keyEl.classList.add('pressed');
  }

  // Caps lock detection
  if (e.getModifierState) {
    capsLockState = e.getModifierState('CapsLock');
  }

  // Ignore solo modifier keys for typing (Shift, Ctrl, Alt, Meta alone)
  if (['Shift', 'Control', 'Alt', 'Meta', 'CapsLock', 'Escape'].includes(e.key)) {
    updateLastKeyBadge(e.key);
    return;
  }

  updateLastKeyBadge(e.key === ' ' ? 'Space' : e.key);

  // Route to active typing mode
  if (currentMode === 'free') {
    handleFreeInput(e.key, e.code);
  } else {
    handlePracticeInput(e.key, e.code);
  }
});

document.addEventListener('keyup', (e) => {
  const keyEl = findKeyElement(e);
  if (keyEl) {
    keyEl.classList.remove('pressed');
  }
});

// Clear all active pressed states when the browser window loses focus
window.addEventListener('blur', () => {
  document.querySelectorAll('.key.pressed').forEach((key) => {
    key.classList.remove('pressed');
  });
});

// =========================================================
// VIRTUAL KEYBOARD CLICK & TOUCH TYPING
// =========================================================
function getVirtualKeyChar(keyEl) {
  const code = keyEl.getAttribute('data-code') || '';
  const letterEl = keyEl.querySelector('.letter');
  const letterText = letterEl ? letterEl.textContent.trim() : '';

  if (code === 'Backspace') return { char: 'Backspace', code: 'Backspace' };
  if (code === 'Enter') return { char: 'Enter', code: 'Enter' };
  if (code === 'Space') return { char: ' ', code: 'Space' };
  if (code === 'Tab') return { char: 'Tab', code: 'Tab' };

  if (code.startsWith('Key') && letterText.length === 1) {
    const char = capsLockState ? letterText.toUpperCase() : letterText.toLowerCase();
    return { char, code };
  }

  if (code.startsWith('Digit') && letterText.length === 1) {
    return { char: letterText, code };
  }

  // Common punctuation keys
  const punctuationMap = {
    'Minus': '-',
    'Equal': '=',
    'BracketLeft': '[',
    'BracketRight': ']',
    'Backslash': '\\',
    'Semicolon': ';',
    'Quote': "'",
    'Comma': ',',
    'Period': '.',
    'Slash': '/',
    'Backquote': '`'
  };

  if (punctuationMap[code]) {
    return { char: punctuationMap[code], code };
  }

  if (code === 'CapsLock') {
    capsLockState = !capsLockState;
    keyEl.classList.toggle('active-caps', capsLockState);
    return { char: 'CapsLock', code: 'CapsLock' };
  }

  return { char: letterText, code };
}

// Attach click / touch handlers to all virtual keys
document.querySelectorAll('.key').forEach((keyEl) => {
  keyEl.addEventListener('pointerdown', (e) => {
    // Visual press
    keyEl.classList.add('pressed');

    const { char, code } = getVirtualKeyChar(keyEl);
    if (!char) return;

    // Ignore modifiers
    if (['ShiftLeft', 'ShiftRight', 'ControlLeft', 'AltLeft', 'AltRight', 'MetaLeft', 'MetaRight', 'Fn', 'Escape', 'PrintScreen', 'CapsLock'].includes(code)) {
      updateLastKeyBadge(char);
      return;
    }

    updateLastKeyBadge(char === ' ' ? 'Space' : char);

    if (currentMode === 'free') {
      handleFreeInput(char, code);
    } else {
      handlePracticeInput(char, code);
    }
  });

  keyEl.addEventListener('pointerup', () => {
    keyEl.classList.remove('pressed');
  });

  keyEl.addEventListener('pointerleave', () => {
    keyEl.classList.remove('pressed');
  });
});

// Enable CSS :active pseudo-class state on touch devices
document.addEventListener('touchstart', () => {}, { passive: true });

// Initial render
renderFreeView();
