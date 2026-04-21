// ============================================================
// app.js  — loads LAST after all other scripts
// Edit this file only if: navigation changes, new module added
// ============================================================

'use strict';

// ── CONSTANTS ──
// Edit these if your details change
const CFG = {
  name:       'Faizy',
  startDate:  '2026-04-21',   // your 90-day start — TODAY
  dob:        '1991-04-09',
  salary:     8300,
  ccDefault:  20000,
};

const TODAY = new Date().toDateString();
const MONTH = `${new Date().getFullYear()}-${new Date().getMonth()+1}`;

// ── QUOTES ──
// Add your own quotes here anytime
const QUOTES = [
  { text: "The man who wakes at 6am while Dubai sleeps is building a different life.", src: "Your Mentor" },
  { text: "Salah is not a break from your day. It is the foundation your day is built on.", src: "Islamic Wisdom" },
  { text: "Discipline is not punishment. It is the highest form of self-respect.", src: "Your Mentor" },
  { text: "Every dirham tracked is a dirham controlled.", src: "Your Mentor" },
  { text: "Every time you choose the desk over the bed, you choose your future.", src: "Your Mentor" },
  { text: "Small habits don't add up. They compound. 1% better every day.", src: "James Clear" },
  { text: "You are not stuck. You were just living without a system. Now you have one.", src: "Your Mentor" },
  { text: "Never miss twice. One miss is an accident. Two is a new habit forming.", src: "Your Mentor" },
  { text: "Financial freedom is not a destination. It is a daily decision.", src: "Your Mentor" },
  { text: "After every hardship comes ease. This is a promise from Allah.", src: "Quran 94:5" },
  { text: "A clean room is a clear mind. Start your environment. Your habits follow.", src: "Your Mentor" },
  { text: "You want same-vibe friends? Become the person those friends want to know.", src: "Your Mentor" },
  { text: "The credit card is not free money. It is your future income spent today.", src: "Your Mentor" },
  { text: "AED 500 saved today is the beginning of everything.", src: "Your Mentor" },
  { text: "Don't tell people your plans. Show them your results.", src: "Your Mentor" },
  { text: "The SOC title is 6 months of consistent 45-minute mornings.", src: "Your Mentor" },
  { text: "Fajr before the world wakes up. That hour is yours alone.", src: "Your Mentor" },
  { text: "Consistency over perfection. Show up imperfect. Show up anyway.", src: "Your Mentor" },
  { text: "Your loneliness in Dubai is temporary. Your discipline is permanent.", src: "Your Mentor" },
  { text: "The gym after work is where frustration becomes strength.", src: "Your Mentor" },
];

// ── PAGE TITLES ──
const PAGE_TITLES = {
  'p-today':    'Today',
  'p-profile':  'Profile & Goals',
  'p-schedule': 'Schedule',
  'p-growth':   'Growth',
  'p-hygiene':  'Hygiene',
  'p-cleanup':  'Cleanup',
  'p-journal':  'Journal',
  'p-progress': 'Progress',
  'f-overview': 'Overview',
  'f-expenses': 'Expenses',
  'f-debt':     'Debt & Credit',
  'f-savings':  'Savings',
  'f-networth': 'Net Worth',
  'f-reports':  'Reports',
};

// ── STATE ──
let currentModule = 'personal';
let currentPage   = 'p-today';

// ── EXPOSE CONSTANTS ──
// so personal.js and finance.js can use them
window.APP_TODAY  = TODAY;
window.APP_MONTH  = MONTH;
window.APP_CFG    = CFG;
window.APP_QUOTES = QUOTES;

// ── NAVIGATION ──
window.openModule = function(mod) {
  currentModule = mod;
  document.getElementById('homeScreen').style.display  = 'none';
  document.getElementById('appShell').style.display    = '';

  // show correct sidebar + drawer sections
  document.getElementById('sidebarPersonal').style.display = mod === 'personal' ? 'block' : 'none';
  document.getElementById('sidebarFinance').style.display  = mod === 'finance'  ? 'block' : 'none';
  document.getElementById('drawerPersonal').style.display  = mod === 'personal' ? 'block' : 'none';
  document.getElementById('drawerFinance').style.display   = mod === 'finance'  ? 'block' : 'none';

  buildMobileNav(mod);

  if (mod === 'personal') {
    navTo('p-today');
  } else {
    navTo('f-overview');
    if (window.updateFinanceOverview) updateFinanceOverview();
  }
};

window.goHome = function() {
  document.getElementById('homeScreen').style.display = 'flex';
  document.getElementById('appShell').style.display   = 'none';
  updateHomeStats();
};

window.navTo = function(pageId, clickedMobItem) {
  currentPage = pageId;

  // hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const pg = document.getElementById(pageId);
  if (pg) pg.classList.add('active');

  // sidebar active state
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const sideNav = document.getElementById('snav-' + pageId);
  if (sideNav) sideNav.classList.add('active');

  // mobile nav active state
  document.querySelectorAll('.mob-item').forEach(n => n.classList.remove('active'));
  if (clickedMobItem) {
    const mobItem = clickedMobItem.closest('.mob-item');
    if (mobItem) mobItem.classList.add('active');
  }

  // topbar page title
  const tpl = document.getElementById('topBarPage');
  if (tpl) tpl.textContent = PAGE_TITLES[pageId] || pageId;

  window.scrollTo(0, 0);

  // trigger page-specific refresh
  if (pageId === 'p-progress' && window.updateProgressPage) updateProgressPage();
  if (pageId === 'p-profile'  && window.updateProfilePage)  updateProfilePage();
  if (pageId === 'f-overview' && window.updateFinanceOverview) updateFinanceOverview();
  if (pageId === 'f-networth' && window.updateNetworth) updateNetworth();
  if (pageId === 'f-reports'  && window.updateReports)  updateReports();
};

// ── MOBILE DRAWER ──
window.openDrawer = function() {
  document.getElementById('mobileDrawer').classList.add('open');
  document.getElementById('drawerOverlay').classList.add('open');
};
window.closeDrawer = function() {
  document.getElementById('mobileDrawer').classList.remove('open');
  document.getElementById('drawerOverlay').classList.remove('open');
};

// ── MOBILE BOTTOM NAV ──
function buildMobileNav(mod) {
  const nav = document.getElementById('mobileNav');
  if (!nav) return;

  const personalItems = [
    { id: 'p-today',    icon: '🏠', label: 'Today' },
    { id: 'p-profile',  icon: '👤', label: 'Goals' },
    { id: 'p-growth',   icon: '💪', label: 'Growth' },
    { id: 'p-hygiene',  icon: '🧴', label: 'Hygiene' },
    { id: 'p-cleanup',  icon: '✨', label: 'Cleanup' },
    { id: 'p-journal',  icon: '✍️', label: 'Journal' },
    { id: 'p-progress', icon: '📈', label: 'Progress' },
  ];

  const financeItems = [
    { id: 'f-overview', icon: '💰', label: 'Overview' },
    { id: 'f-expenses', icon: '💸', label: 'Expenses' },
    { id: 'f-debt',     icon: '💳', label: 'Debt' },
    { id: 'f-savings',  icon: '🏦', label: 'Savings' },
    { id: 'f-networth', icon: '📊', label: 'NetWorth' },
    { id: 'f-reports',  icon: '📄', label: 'Reports' },
  ];

  const items = mod === 'personal' ? personalItems : financeItems;

  nav.innerHTML = items.map((item, i) => `
    <div class="mob-item ${i === 0 ? 'active' : ''}" onclick="navTo('${item.id}', this)">
      <div class="mob-icon">${item.icon}</div>
      <div class="mob-label">${item.label}</div>
    </div>`).join('');
}

// ── HOME STATS ──
window.updateHomeStats = function() {
  const streak  = ls('cleanDays') || 0;
  const prayers = Object.values(ls('prayers_' + TODAY) || {}).filter(Boolean).length;
  const score   = ls('score_' + TODAY) || 0;
  const saved   = parseInt(ls('totalSaved') || '0');
  const ccBal   = parseInt(ls('cc_balance') || CFG.ccDefault);
  const expenses = ls('expenses_' + MONTH) || [];
  const spent   = expenses.reduce((s, e) => s + e.amount, 0);
  const balance = Math.max(0, CFG.salary - spent);

  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  set('h-streak',  streak);
  set('h-prayers', prayers + '/5');
  set('h-score',   score + '%');
  set('h-balance', fmt(balance));
  set('h-debt',    ccBal > 1000 ? Math.round(ccBal / 1000) + 'k' : ccBal);
  set('h-saved',   saved);
};

// ── DAY SCORE ──
// Called after any habit/prayer/task change
window.saveDayScore = function() {
  const prayers  = Object.values(ls('prayers_' + TODAY) || {}).filter(Boolean).length;
  const habits   = Object.values(ls('habits_'  + TODAY) || {}).filter(Boolean).length;
  const qty      = ls('qty_' + TODAY) || {};
  const sched    = (ls('sched_' + TODAY) || []).filter(Boolean).length;
  const wins     = (ls('wins_'  + TODAY) || []).length;
  const mood     = ls('mood_'   + TODAY) ? 1 : 0;

  const total = prayers
    + habits
    + (qty.water >= 8 ? 1 : 0)
    + (qty.quran >= 1 ? 1 : 0)
    + (qty.book  >= 10 ? 1 : 0)
    + Math.min(sched, 5)
    + Math.min(wins, 3)
    + mood;

  const max   = 5 + 10 + 3 + 5 + 3 + 1;
  const score = Math.round((total / max) * 100);
  ls('score_' + TODAY, score);

  const el = document.getElementById('h-score');
  if (el) el.textContent = score + '%';
  return score;
};

// ── FORMAT NUMBER ──
window.fmt = n => Number(n).toLocaleString();

// ── DAY COUNT ──
window.daysSinceStart = function() {
  return Math.min(90, Math.floor((new Date() - new Date(CFG.startDate)) / 86400000) + 1);
};

// ── WEEK KEY ──
window.getWeekKey = function() {
  const d = new Date();
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(new Date().setDate(diff)).toDateString();
};

// ── ACCORDION ──
window.toggleAcc = function(header) {
  const body = header.nextElementSibling;
  body.classList.toggle('open');
  header.classList.toggle('open');
};

// ── DATE INIT ──
// Called AFTER pages are injected so elements exist in DOM
function initDate() {
  const now  = new Date();
  const diff = daysSinceStart();
  const opts = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };

  // e.g. "Tuesday, 21 April 2026"
  set('topBarDate', now.toLocaleDateString('en-GB', opts));

  // full date in hero + journal
  const fullDate = now.toLocaleDateString('en-GB', opts); // "Tuesday, 21 April 2026"
  set('journalDateLabel', fullDate);
  set('p-heroDate',       fullDate);
  set('home-dayTag',      'DAY ' + diff + ' OF 90');
  set('journalDateLabel', now.toLocaleDateString('en-GB', opts));
  set('p-dayNum',         diff);

  // daily quote — index by day of month
  const q = QUOTES[now.getDate() % QUOTES.length];
  set('p-heroQuote', '"' + q.text + '"');
  set('p-heroSrc',   '— ' + q.src);
  set('homeQuote',   '"' + q.text + '" — ' + q.src);
}

// ── FONT FALLBACK ──
// If Google Fonts fails to load, inject system fallback so Bebas Neue titles still look bold
function applyFontFallback() {
  const testEl = document.createElement('span');
  testEl.style.cssText = 'font-family:"Bebas Neue";font-size:72px;visibility:hidden;position:absolute;';
  testEl.textContent = 'X';
  document.body.appendChild(testEl);
  const w = testEl.offsetWidth;
  document.body.removeChild(testEl);
  // if width is same as serif fallback, font didn't load — patch CSS
  if (w < 30) {
    const style = document.createElement('style');
    style.textContent = `.bebas,.hero-name,.home-title,.topbar-title,.life-score,.streak-num,.sbox-num,.ring-pct,.prof-name { font-family: Impact, "Arial Black", sans-serif !important; letter-spacing: 1px; }`;
    document.head.appendChild(style);
  }
}

// ── INIT ──
document.addEventListener('DOMContentLoaded', function() {
  // 1. inject pages first (personal.js + finance.js)
  if (window.initPersonal) initPersonal();
  if (window.initFinance)  initFinance();

  // 2. now set dates + quotes (elements exist now)
  initDate();

  // 3. stats + score
  updateHomeStats();
  saveDayScore();

  // 4. font check after short delay
  setTimeout(applyFontFallback, 1500);
});
