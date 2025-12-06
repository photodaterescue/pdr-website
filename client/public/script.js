// ========================================================
// HERO ROTATOR – matches the behaviour used in the web app
// ========================================================

const phrases = [
  "Restore real photo dates from Google, Apple, WhatsApp, OneDrive and more.",
  "Make your chaotic photo library finally make sense again.",
  "Undo years of broken timestamps across clouds, phones, and apps.",
  "Clean, correct dates for every photo you’ve ever backed up or downloaded.",
  "Fix Google, Apple, WhatsApp, OneDrive and old scans — all in one click.",
  "Bring order to years of mixed Android + iPhone timelines in seconds.",
  "Fix photos spread across multiple Google accounts, exports, and old device backups.",
  "Repair every bad timestamp created by Takeout exports, app downloads, or file transfers.",
  "Make decades of photos appear in the right order — everywhere.",
  "Turn messy folders into a clean, reliable photo history.",
];

let idx = 0;
const heroEl = document.getElementById("hero-phrase");
const dotsContainer = document.getElementById("hero-dots");

function renderDots() {
  if (!dotsContainer) return;
  dotsContainer.innerHTML = "";
  phrases.forEach((_, i) => {
    const dot = document.createElement("div");
    dot.className = "hero-dot" + (i === idx ? " active" : "");
    dotsContainer.appendChild(dot);
  });
}

function showPhrase() {
  if (!heroEl) return;
  heroEl.style.opacity = 0;
  setTimeout(() => {
    heroEl.textContent = phrases[idx];
    heroEl.style.opacity = 1;
    renderDots();
  }, 800);
}

if (heroEl && dotsContainer) {
  showPhrase();
  setInterval(() => {
    idx = (idx + 1) % phrases.length;
    showPhrase();
  }, 20000);
}
