// ========================================================
// HERO ROTATOR – matches the behaviour used in the web app
// ========================================================

const phrases = [
  "Restore real photo dates from Google, Apple, WhatsApp, OneDrive and more.",
  "Find any photo in seconds — search by date, place, person, or any metadata.",
  "Undo years of broken timestamps across clouds, phones, and apps.",
  "Name a person once. PDR finds them in every photo, across every year.",
  "Repair Takeout exports, WhatsApp dumps, iCloud downloads — all in one click.",
  "Photos become stories — automatic Memories curated by year, event, and person.",
  "Fix photos spread across multiple Google accounts, exports, and old device backups.",
  "Spin off Holidays, Family, Friends, Pets — any custom library from one Master.",
  "Make decades of photos appear in the right order — everywhere.",
  "Everything runs on your computer. No cloud, no account, no uploading.",
];

let idx = 0;
const AUTO_MS = 20000;
const PAUSE_MS = 5000;
let autoInterval = null;
let resumeTimeout = null;

const heroEl = document.getElementById("hero-phrase");
const dotsContainer = document.getElementById("hero-dots");
const rotatorEl = document.querySelector(".hero-rotator");

function renderDots() {
  if (!dotsContainer) return;
  dotsContainer.innerHTML = "";
  phrases.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "hero-dot" + (i === idx ? " active" : "");
    dot.setAttribute("aria-label", `Show phrase ${i + 1} of ${phrases.length}`);
    if (i === idx) dot.setAttribute("aria-current", "true");
    dot.addEventListener("click", () => goTo(i, true));
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

function startAuto() {
  if (autoInterval) return;
  autoInterval = setInterval(() => {
    idx = (idx + 1) % phrases.length;
    showPhrase();
  }, AUTO_MS);
}

function stopAuto() {
  if (autoInterval) {
    clearInterval(autoInterval);
    autoInterval = null;
  }
}

function pauseThenResume() {
  stopAuto();
  if (resumeTimeout) clearTimeout(resumeTimeout);
  resumeTimeout = setTimeout(() => {
    resumeTimeout = null;
    startAuto();
  }, PAUSE_MS);
}

function goTo(newIdx, fromUser) {
  const len = phrases.length;
  idx = ((newIdx % len) + len) % len;
  showPhrase();
  if (fromUser) pauseThenResume();
}

if (heroEl && dotsContainer) {
  showPhrase();
  startAuto();
}

if (rotatorEl) {
  rotatorEl.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      goTo(idx - 1, true);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      goTo(idx + 1, true);
    }
  });

  let touchStartX = null;
  let touchStartY = null;
  rotatorEl.addEventListener(
    "touchstart",
    (e) => {
      const t = e.touches[0];
      touchStartX = t.clientX;
      touchStartY = t.clientY;
    },
    { passive: true }
  );
  rotatorEl.addEventListener("touchend", (e) => {
    if (touchStartX == null) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStartX;
    const dy = t.clientY - touchStartY;
    touchStartX = null;
    touchStartY = null;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
      goTo(idx + (dx < 0 ? 1 : -1), true);
    }
  });
}

// ========================================================
// HAMBURGER MENU TOGGLE
// ========================================================

const hamburger = document.querySelector(".nav-hamburger");
const mobileNav = document.querySelector(".mobile-nav");

if (hamburger && mobileNav) {
  const iconOpen = hamburger.querySelector(".icon-open");
  const iconClose = hamburger.querySelector(".icon-close");

  function openMenu() {
    mobileNav.classList.add("is-open");
    hamburger.setAttribute("aria-expanded", "true");
    if (iconOpen) iconOpen.style.display = "none";
    if (iconClose) iconClose.style.display = "block";
  }

  function closeMenu() {
    mobileNav.classList.remove("is-open");
    hamburger.setAttribute("aria-expanded", "false");
    if (iconOpen) iconOpen.style.display = "block";
    if (iconClose) iconClose.style.display = "none";
  }

  hamburger.addEventListener("click", () => {
    mobileNav.classList.contains("is-open") ? closeMenu() : openMenu();
  });

  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
}
