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

function findKeyElement(e) {
  const code = codeAliases[e.code] || e.code;

  // 1. Direct and unambiguous match by data-code (handles Shifted keys, Left/Right keys)
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

document.addEventListener('keydown', (e) => {
  // Prevent default scrolling on Space / Arrows and tab focus jumping away
  if (['Tab', 'Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
    e.preventDefault();
  }

  const keyEl = findKeyElement(e);
  if (keyEl) {
    keyEl.classList.add('pressed');
  }
});

document.addEventListener('keyup', (e) => {
  const keyEl = findKeyElement(e);
  if (keyEl) {
    keyEl.classList.remove('pressed');
  }
});

// Clear all active pressed states when the browser window loses focus (e.g. Alt+Tab, Windows key)
window.addEventListener('blur', () => {
  document.querySelectorAll('.key.pressed').forEach((key) => {
    key.classList.remove('pressed');
  });
});
