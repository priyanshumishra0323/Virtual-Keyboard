# ⌨️ Virtual TypeFlow

> An interactive, responsive mechanical keyboard simulator and typing practice web application built with pure HTML5, CSS3, and modern Vanilla JavaScript.

---

## 📖 Table of Contents

- [About The Project](#about-the-project)
- [Features](#features)
- [Demo / Live Preview](#demo--live-preview)
- [Screenshots](#screenshots)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [How to Install and Run](#how-to-install-and-run)
- [How to Use](#how-to-use)
- [Keyboard Layout](#keyboard-layout)
- [Typing Practice Instructions](#typing-practice-instructions)
- [Future Improvements](#future-improvements)
- [What I Learned](#what-i-learned)
- [Contributing](#contributing)
- [Author](#author)
- [License](#license)

---

## 📌 About The Project

**Virtual TypeFlow** is a lightweight, zero-dependency browser application that blends the aesthetic and tactile feel of a physical mechanical keyboard with a real-time typing trainer.

Whether you want to test physical keyboard keys, inspect key codes, practice typing speed with live WPM tracking, or simply interact with responsive 3D keycaps, this project delivers an engaging, distraction-free environment directly in the browser.

### Key Highlights:
- **Zero Dependencies**: Pure standard web technologies — no frameworks, no libraries, no build step required.
- **Dual Functionality**: Works both as an interactive mechanical keyboard simulator and a guided typing practice tool.
- **Realistic 3D Keycaps**: Features layered inset drop-shadows, subtle bevels, and pressed-down motion that mimics physical mechanical switches.
- **Live Performance Metrics**: Real-time Words Per Minute (WPM), percentage accuracy, elapsed time, and character counts.

---

## ✨ Features

### 1. Dual Typing Modes
- **✍️ Free Typing Mode**:
  - Open scratchpad typing area with an inline blinking cursor.
  - Type freely using your physical keyboard or by tapping keys on the virtual board.
  - Automatically tracks gross WPM, total characters typed, and elapsed time.
  - Supports standard keys including `Backspace`, `Enter` (new line), `Tab` (indentation), and `Space`.

- **🎯 Guided Practice Mode**:
  - Curated bank of randomized typing sentences (pangrams, coding axioms, and typing drills).
  - Real-time character highlighting:
    - ⚪ **Pending**: Subtle muted text waiting to be typed.
    - 🟢 **Correct**: Highlighted green upon accurate keystroke.
    - 🔴 **Incorrect**: Highlighted red when a wrong key is pressed.
  - Auto-scrolling to keep the current active character visible.
  - "New Sentence" button to switch drills on demand.
  - Completion banner upon finishing each sentence.

### 2. Live Performance Dashboard
- **⚡ WPM (Words Per Minute)**: Dynamically calculated using the standard formula `(characters / 5) / elapsed minutes`.
- **🎯 Accuracy (%)**: Precise accuracy rate reflecting correct vs. total keystrokes, with backspace error correction history.
- **⏱️ Timer (MM:SS)**: Automatically starts on your very first keystroke and pauses upon sentence completion or reset.
- **🔢 Character Counter**: Tracks character count in real time.
- **🔄 Session Reset**: One-click reset button to clear data and start fresh.

### 3. Realistic 78-Key Virtual Keyboard
- **Complete Layout**: 6 functional rows featuring `Esc`, `F1`–`F12`, `PrtScn`, number row, full QWERTY alphanumeric keys, arrow cluster, and Mac-style modifier keys (`⌘`, `⌥`, `fn`, `ctrl`, `shift`).
- **Real-Time Physical Keyboard Sync**: Pressing any key on your physical keyboard immediately highlights the corresponding virtual key on screen with realistic depression depth (`translateY` + compressed shadow).
- **Active CapsLock Indicator**: Synchronizes with your system CapsLock state (`e.getModifierState('CapsLock')`) with a glowing green LED indicator border.
- **Interactive Click & Touch**: Every virtual key responds to mouse clicks and touchscreen taps.
- **"Last Key" Badge**: Header indicator displaying the most recently pressed key in real time.

### 4. Responsiveness & Accessibility
- **Fluid Layout**: Flexbox proportions engineered so all 6 rows sum to exact 15.0 flex units, guaranteeing flush edges across screen sizes.
- **Screen Fit**: Compact vertical sizing designed to fit comfortably on standard laptop screens (1366×768) without vertical scrolling.
- **Mobile Support**: Horizontal touch scrolling container with helpful orientation hint for small devices.
- **WCAG AA Compliant**: High-contrast text labels (`#9ca3af`, `#8e8e98`), semantic HTML roles (`role="button"`, `role="region"`), ARIA live announcements (`aria-live="polite"`), and clear keyboard `:focus-visible` outlines.

---

## 🌐 Demo / Live Preview

- **Live URL**: [https://virtual-typeflow.vercel.app/]

---

## 📸 Screenshots

### Keyboard & Application Preview
<img width="1366" height="509" alt="Virtual Mechanical Keyboard Preview" src="https://github.com/user-attachments/assets/4ee869ad-c591-4e40-917b-cb66b5215505" />


<!--
### Practice Mode View
![Practice Mode Screenshot](path/to/practice-mode-screenshot.png)
-->

---

## 🛠️ Technologies Used

- **HTML5**: Semantic elements (`<header>`, `<main>`, `<section>`), accessible ARIA attributes (`aria-label`, `aria-live`, `aria-pressed`, `role="button"`).
- **CSS3**: Modern Flexbox, CSS nesting, custom gradients, multi-layer 3D box-shadows, smooth transitions, and responsive `@media` queries.
- **Vanilla JavaScript (ES6+)**:
  - `KeyboardEvent` API (`keydown`, `keyup`, `e.code`, `e.key`, `e.getModifierState`).
  - Pointer Events API (`pointerdown`, `pointerup`, `pointerleave`) for universal mouse and touch handling.
  - `setInterval` based real-time statistics and timer engine.
  - History-aware character tracking array for backspace error math.

---

## 📁 Project Structure

```text
Virtual-typeflow/
│
├── index.html         # Main application markup (UI layout, stats header, keyboard structure)
├── keyboard.css          # Styling (3D mechanical keycaps, themes, responsive queries)
├── keyboard.js           # Core logic (typing engine, WPM calculation, event listeners)
└── README.md             # Project documentation and guide
```

---

## 🚀 How to Install and Run

This project requires **no external packages, Node.js, or complex build setups**. You can run it instantly on any computer with a web browser.

### Option 1: Direct File Open (Quickest)
1. Clone or download this repository:
   ```bash
   git clone https://github.com/priyanshumishra0323/Virtual-typeflow
   ```
2. Navigate into the project folder:
   ```bash
   cd Virtual-typeflow
   ```
3. Double-click `index.html` or right-click and choose **Open with > Chrome / Firefox / Edge / Safari**.

---

### Option 2: Using VS Code Live Server (Recommended for Development)
1. Open the project folder in **Visual Studio Code**.
2. Install the **Live Server** extension by *Ritwick Dey* (if not already installed).
3. Right-click `index.html` and click **"Open with Live Server"**.
4. The app will launch automatically at `http://127.0.0.1:5500/index.html`.

---

### Option 3: Local Python HTTP Server
If you prefer running a local server via terminal:

```bash
# Python 3
python3 -m http.server 8000
```
Then open `http://localhost:8000/index.html` in your browser.

---

## 🎮 How to Use

1. **Select a Mode**:
   - Click **✍️ Free Typing** to freely type anything.
   - Click **🎯 Practice Mode** to load a randomized guided sentence drill.
2. **Start Typing**:
   - Press keys on your physical keyboard, or click/tap keys on the virtual keyboard.
   - The session timer and WPM counter will start automatically as soon as you type your first character.
3. **Inspect Active Keys**:
   - Watch the virtual keyboard press down in real time as you hit keys.
   - Look at the **Last Key** badge in the screen header to confirm which key was detected.
4. **Use Modifier Keys**:
   - Toggle `CapsLock` to see the glowing green indicator light up.
   - Use `Shift`, `Backspace`, `Enter`, and `Tab` as you normally would.
5. **Reset Anytime**:
   - Click the **🔄 Reset** button in the top right to restart timer and clear statistics.

---

## ⌨️ Keyboard Layout

The virtual typeflow features a comprehensive **78-key layout** distributed across 6 balanced rows:

| Row | Keys Included | Key Functions / Details |
| :--- | :--- | :--- |
| **Row 1** | `Esc`, `F1` – `F12`, `PrtScn` | Escape, 12 Function keys, Print Screen |
| **Row 2** | `~`, `1`–`0`, `-`, `=`, `← Delete` | Number row, symbols, and Backspace/Delete |
| **Row 3** | `Tab ⮂`, `Q`–`P`, `[`, `]`, `\` | Tab key, top alphanumeric row, brackets, backslash |
| **Row 4** | `Caps Lock`, `A`–`L`, `;`, `'`, `↵ Enter` | Caps Lock with active green LED glow, home row, Return/Enter |
| **Row 5** | `⬆ Shift`, `Z`–`M`, `,`, `.`, `/`, `⬆ Shift`, `▲` | Left/Right Shift keys, bottom row, and Up Arrow |
| **Row 6** | `fn`, `ctrl`, `⌥ opt`, `⌘ cmd`, `Space`, `⌘ cmd`, `⌥ opt`, `◀`, `▼`, `▶` | Bottom modifiers, wide Spacebar, and Left/Down/Right Arrows |

---

## 🎯 Typing Practice Instructions

In **Practice Mode**, your goal is to type the displayed sentence accurately and quickly:

1. **Watch the Active Character**: The cursor underlines the active character you need to type next.
2. **Color Indicators**:
   - **Green**: Keystroke was correct. The cursor advances to the next character.
   - **Red**: Keystroke was incorrect.
3. **Correcting Mistakes**:
   - Press **`Backspace`** to step back.
   - Correcting an erroneous keystroke reverses the error count, restoring your overall accuracy score.
4. **Finishing a Sentence**:
   - When the last character is completed, the timer stops automatically.
   - A success banner will appear: `🎉 Great job! Press New Sentence to continue.`
   - Click **🎲 New Sentence** to load a fresh text and start your next drill.

---

## 🔮 Future Improvements

Here is a list of features planned for future updates. You can track, check off, or add new items:

- [ ] **Sound Effects**: Realistic mechanical switch audio clicks (Blue, Brown, and Red switch profiles with a mute toggle).
- [ ] **Custom Practice Text**: Ability for users to paste their own custom paragraphs or upload `.txt` files.
- [ ] **Difficulty Levels**: Categorized practice drills (Beginner, Intermediate, Advanced, Coding & Special Characters).
- [ ] **Theme Selector**: Light mode, Cyberpunk, Retro Terminal, and OLED High-Contrast color themes.
- [ ] **Local High Scores & History**: Save best WPM and accuracy records to browser `localStorage`.
- [ ] **Visual Finger Placement Guide**: Highlight recommended fingers for touch-typing on each key.

---

## 🧠 What I Learned

Building and refining this project provided hands-on experience with:

- **Keyboard Events API**: Mapping standard `e.code` and `e.key` values, handling aliases (`NumpadEnter`, `Delete`/`Backspace`), and synchronizing CapsLock state via `e.getModifierState('CapsLock')`.
- **Typing Metric Mathematics**: Implementing gross WPM formulas `((characters / 5) / minutes)` and history-aware accuracy tracking that accurately updates on backspaces.
- **Advanced 3D CSS Styling**: Crafting realistic keycaps using multi-layered box-shadows (`inset` bevels + ambient drop shadows) and tactile pressed transformations.
- **Preventing Browser Conflicts**: Suppressing default browser actions for keys like `Space` (page scroll) and `Tab` (focus shifting) during active typing sessions.
- **Responsive Layout Design**: Calibrating flexbox proportions and vertical height limits to ensure seamless display on laptops without unwanted scrolling.
- **Web Accessibility (WCAG)**: Applying ARIA attributes, semantic roles, high-contrast color standards, and focus-visible rings for keyboard-only navigation.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository.
2. Create your feature branch:
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add some AmazingFeature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/AmazingFeature
   ```
5. Open a Pull Request.

---

## 👤 Author

**Priyanshu Mishra**
- **GitHub**: [@priyanshumishra0323](https://github.com/priyanshumishra0323)
- **Repository**: [Virtual-Keyboard](https://github.com/priyanshumishra0323/Virtual-Keyboard)
<!-- Optional links you can add:
- **LinkedIn**: [Your LinkedIn Profile](https://linkedin.com/in/your-profile)
- **Portfolio**: [Your Website](https://yourportfolio.com)
- **Email**: your.email@example.com
-->

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

