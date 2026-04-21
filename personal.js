// ============================================================
// personal.js
// Edit this file for: habits, prayers, schedule, gym, hygiene,
// cleanup, journal, books, progress — anything Personal OS
// ============================================================

'use strict';

// ── SCHEDULE DATA ──
// Edit times/titles here if your schedule changes
const SCHED = [
  { time:'6:00am',  title:'Wake + Water + Fajr',        desc:'Wake. Full glass water. Pray Fajr.',                      color:'var(--gold)',   tag:'POWER',  cls:'gold' },
  { time:'6:15am',  title:'5 Min Morning Walk',          desc:'Sunlight. Fresh air. Brain chemistry reset.',             color:'var(--green)',  tag:'HEALTH', cls:'green' },
  { time:'6:25am',  title:'Cyber Study — 45 mins',       desc:'Fresh brain = fastest learning. No phone.',              color:'var(--orange)', tag:'CAREER', cls:'orange' },
  { time:'7:10am',  title:'FG Business — 1 Task',        desc:'One task picked night before. Execute only that.',        color:'var(--blue)',   tag:'BIZ',    cls:'blue' },
  { time:'7:50am',  title:'Breakfast + Skincare + Ready',desc:'EAT. Face wash, moisturizer, SPF. Leave on time.',       color:'var(--green)',  tag:'HEALTH', cls:'green' },
  { time:'9:00am',  title:'Work — IT Support',            desc:'Be present. Eat proper lunch at 12:30.',                 color:'var(--blue)',   tag:'WORK',   cls:'blue' },
  { time:'12:30pm', title:'Dhuhr + Lunch',                desc:'Pray. Eat a real meal. 500ml water.',                    color:'var(--gold)',   tag:'PRAYER', cls:'gold' },
  { time:'3:45pm',  title:'Asr Prayer',                   desc:'Step away. Pray. 5 mins of reset.',                      color:'var(--gold)',   tag:'PRAYER', cls:'gold' },
  { time:'5:30pm',  title:'Work ends — Head home',        desc:'Go straight to desk. NOT bed. Change clothes, sit down.',color:'var(--red)',    tag:'GUARD',  cls:'red' },
  { time:'6:00pm',  title:'Gym / Workout',                desc:'Gym days: full session. Other days: 20 min walk.',       color:'var(--green)',  tag:'GYM',    cls:'green' },
  { time:'7:00pm',  title:'Maghrib + Dinner',             desc:'Pray. Eat. Rest.',                                        color:'var(--gold)',   tag:'PRAYER', cls:'gold' },
  { time:'7:45pm',  title:'Isha + Quran',                 desc:'Pray Isha. Read at least 1 page Quran.',                 color:'var(--gold)',   tag:'PRAYER', cls:'gold' },
  { time:'10:00pm', title:'Book Reading — 10 pages',      desc:'No phone. Just read. Build the habit.',                  color:'var(--purple)', tag:'GROWTH', cls:'purple' },
  { time:'11:00pm', title:'Journal + Wins + Plan tomorrow',desc:'3 wins. 1 FG task for morning. Set 6am alarm.',         color:'var(--gold)',   tag:'REFLECT',cls:'gold' },
  { time:'11:20pm', title:'Night Skincare + Sleep',        desc:'Face wash. Moisturizer. Phone away. Sleep.',             color:'var(--red)',    tag:'SLEEP',  cls:'red' },
];

// ── TAG COLORS ──
const TAG_BG = {
  gold:'rgba(201,168,76,.15)', green:'rgba(42,157,111,.15)',
  orange:'rgba(224,122,53,.15)', blue:'rgba(58,123,213,.15)',
  red:'rgba(217,95,75,.15)', purple:'rgba(124,92,191,.15)',
};
const TAG_COLOR = {
  gold:'var(--gold)', green:'var(--green)', orange:'var(--orange)',
  blue:'var(--blue)', red:'var(--red)',     purple:'var(--purple)',
};

// ── BASE GROCERY LIST ──
const BASE_GROCERY = [
  'Eggs x12 (~AED 8)', 'Chicken breast 500g (~AED 15)', 'Dal/lentils 500g (~AED 5)',
  'Paneer 200g (~AED 8)', 'Full fat milk 1L x2 (~AED 10)', 'Curd 400g x2 (~AED 12)',
  'Rice 1kg (~AED 7)', 'Bread/roti 1 pack (~AED 6)', 'Peanut butter 1 jar (~AED 15)',
  'Cucumber x3, Tomato x4, Onion x3 (~AED 8)', 'Spinach 1 bunch (~AED 4)',
  'Bananas x8 (~AED 6)', 'Apples x4 (~AED 8)', 'Watermelon small (~AED 10)',
  'Cashews 200g (~AED 12)', 'Almonds 200g (~AED 14)', 'Dates 250g (~AED 10)',
  'Dark chocolate 70%+ x2 (~AED 12)', 'Coconut water x4 (~AED 12)',
];

// ── BOOK DATA ──
const BOOKS = [
  { title: 'Atomic Habits',                     author: 'James Clear · Start here',       pages: 285 },
  { title: 'Rich Dad Poor Dad',                 author: 'Robert Kiyosaki · Read 2nd',     pages: 336 },
  { title: 'Why Has Nobody Told Me This Before',author: 'Dr. Julie Smith · Read 3rd',     pages: 256 },
];

// ── STATE ──
let selectedCat = '➕ Other';
let ideaFilter  = 'All';
let gymDays     = [];

// ============================================================
// PAGE HTML BUILDERS
// Each function returns HTML string injected into #mainArea
// ============================================================

function buildTodayPage() {
  return `
<div class="page active" id="p-today">

  <!-- HERO -->
  <div class="hero-dark">
    <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px;">
      <div>
        <div class="hero-tag">Personal OS · Day <span id="p-dayNum">1</span> of 90</div>
        <div class="hero-name">TODAY</div>
      </div>
      <div class="ring-wrap">
        <svg width="80" height="80" viewBox="0 0 80 80">
          <circle class="ring-bg" cx="40" cy="40" r="33"/>
          <circle class="ring-fill" id="p-ring" cx="40" cy="40" r="33" stroke-dasharray="207.3" stroke-dashoffset="207.3"/>
        </svg>
        <div class="ring-text"><div class="ring-pct" id="p-ringPct">0%</div><div class="ring-sub">TODAY</div></div>
      </div>
    </div>
    <div style="display:flex;gap:20px;margin-bottom:16px;">
      <div class="tc"><div style="font-family:'Bebas Neue',sans-serif;font-size:28px;color:var(--gold);" id="p-heroStreak">0</div><div style="font-size:9px;color:rgba(255,255,255,.35);font-family:'DM Mono',monospace;">CLEAN</div></div>
      <div class="tc"><div style="font-family:'Bebas Neue',sans-serif;font-size:28px;color:var(--gold);" id="p-heroPrayers">0/5</div><div style="font-size:9px;color:rgba(255,255,255,.35);font-family:'DM Mono',monospace;">PRAYERS</div></div>
      <div class="tc"><div style="font-family:'Bebas Neue',sans-serif;font-size:28px;color:var(--gold);" id="p-heroWins">0</div><div style="font-size:9px;color:rgba(255,255,255,.35);font-family:'DM Mono',monospace;">WINS</div></div>
      <div class="tc"><div style="font-family:'Bebas Neue',sans-serif;font-size:28px;color:var(--gold);" id="p-heroHabits">0/10</div><div style="font-size:9px;color:rgba(255,255,255,.35);font-family:'DM Mono',monospace;">HABITS</div></div>
    </div>
    <div style="font-family:'DM Mono',monospace;font-size:11px;color:rgba(255,255,255,.35);margin-bottom:12px;letter-spacing:1px;" id="p-heroDate"></div>
    <div class="hero-quote" id="p-heroQuote">Loading…</div>
    <div class="hero-quote-src" id="p-heroSrc">— Your Mentor</div>
  </div>

  <!-- SLEEP -->
  <div class="sec">😴 Sleep</div>
  <div class="sleep-card">
    <div style="display:flex;gap:10px;">
      <div style="flex:1;"><span class="sleep-lbl">BED TIME</span><input type="time" class="sleep-inp" id="sleepBed" onchange="calcSleep()"></div>
      <div style="flex:1;"><span class="sleep-lbl">WAKE TIME</span><input type="time" class="sleep-inp" id="sleepWake" onchange="calcSleep()"></div>
    </div>
    <div class="sleep-result" id="sleepResult">-- hrs</div>
    <div class="sleep-sub" id="sleepSub">Log your sleep above</div>
  </div>

  <!-- ENERGY -->
  <div style="margin-bottom:12px;">
    <div style="font-size:13px;font-weight:700;margin-bottom:8px;">⚡ Morning Energy</div>
    <div class="energy-row">
      <div class="energy-btn" onclick="setEnergy(this,1)"><span class="en-num">1</span><span class="en-lbl">Drained</span></div>
      <div class="energy-btn" onclick="setEnergy(this,2)"><span class="en-num">2</span><span class="en-lbl">Low</span></div>
      <div class="energy-btn" onclick="setEnergy(this,3)"><span class="en-num">3</span><span class="en-lbl">Okay</span></div>
      <div class="energy-btn" onclick="setEnergy(this,4)"><span class="en-num">4</span><span class="en-lbl">Good</span></div>
      <div class="energy-btn" onclick="setEnergy(this,5)"><span class="en-num">5</span><span class="en-lbl">Great</span></div>
    </div>
  </div>

  <!-- MOOD + GRATITUDE -->
  <div class="sec">😊 Mood & Gratitude</div>
  <div class="card">
    <div class="mood-row">
      <div class="mood-btn" onclick="setMood(this,'rough')">😔<span class="mood-lbl">Rough</span></div>
      <div class="mood-btn" onclick="setMood(this,'okay')">😐<span class="mood-lbl">Okay</span></div>
      <div class="mood-btn" onclick="setMood(this,'good')">🙂<span class="mood-lbl">Good</span></div>
      <div class="mood-btn" onclick="setMood(this,'great')">😄<span class="mood-lbl">Great</span></div>
    </div>
    <div style="font-size:13px;font-weight:700;margin-bottom:10px;">🤲 3 Things I'm Grateful For</div>
    <div class="grat-row"><div class="grat-num">1</div><input class="inp" id="grat1" placeholder="I'm grateful for…" style="margin-bottom:0;"></div>
    <div class="grat-row mt8"><div class="grat-num">2</div><input class="inp" id="grat2" placeholder="I'm grateful for…" style="margin-bottom:0;"></div>
    <div class="grat-row mt8"><div class="grat-num">3</div><input class="inp" id="grat3" placeholder="I'm grateful for…" style="margin-bottom:0;"></div>
    <button class="btn btn-gold btn-full mt8" onclick="saveGratitude()">Save Gratitude ✓</button>
  </div>

  <!-- PRAYERS -->
  <div class="sec">🕌 Prayers</div>
  <div class="prayer-row">
    <div class="prayer-btn" id="pr-fajr"    onclick="togglePrayer('fajr')">   <span class="pname">Fajr</span>   <span class="ptime">5:00am</span>  <span class="pcheck">☀️</span></div>
    <div class="prayer-btn" id="pr-dhuhr"   onclick="togglePrayer('dhuhr')">  <span class="pname">Dhuhr</span>  <span class="ptime">12:30pm</span> <span class="pcheck">🌤</span></div>
    <div class="prayer-btn" id="pr-asr"     onclick="togglePrayer('asr')">    <span class="pname">Asr</span>    <span class="ptime">3:45pm</span>  <span class="pcheck">🌅</span></div>
    <div class="prayer-btn" id="pr-maghrib" onclick="togglePrayer('maghrib')"><span class="pname">Maghrib</span><span class="ptime">6:15pm</span>  <span class="pcheck">🌙</span></div>
    <div class="prayer-btn" id="pr-isha"    onclick="togglePrayer('isha')">   <span class="pname">Isha</span>   <span class="ptime">7:45pm</span>  <span class="pcheck">⭐</span></div>
  </div>

  <!-- QTY TRACKING -->
  <div class="sec">📊 Tracking</div>
  <div class="qh" id="qh-water">
    <div class="qh-top"><div class="qh-icon">💧</div><div class="qh-name">Water</div><div class="qh-val" id="qv-water">0/8 glasses</div></div>
    <div class="qty-row">
      <div class="qty-btn" onclick="setQty('water',2,8)">2</div>
      <div class="qty-btn" onclick="setQty('water',4,8)">4</div>
      <div class="qty-btn" onclick="setQty('water',6,8)">6</div>
      <div class="qty-btn ok"  onclick="setQty('water',8,8)">8 ✓</div>
    </div>
  </div>
  <div class="qh" id="qh-quran">
    <div class="qh-top"><div class="qh-icon">📖</div><div class="qh-name">Quran Reading</div><div class="qh-val" id="qv-quran">Not done</div></div>
    <div class="qty-row">
      <div class="qty-btn ok"                  onclick="setQty('quran',1,1)" style="flex:2;">✓ Done — Alhamdulillah</div>
      <div class="qty-btn" style="flex:1;color:var(--red);border-color:var(--red);" onclick="setQty('quran',0,1)">✕ Missed</div>
    </div>
  </div>
  <div class="qh" id="qh-book">
    <div class="qh-top"><div class="qh-icon">📚</div><div class="qh-name">Book Reading</div><div class="qh-val" id="qv-book">0 pages</div></div>
    <div class="qty-row">
      <div class="qty-btn" onclick="setQty('book',5,10)">5 pg</div>
      <div class="qty-btn ok"  onclick="setQty('book',10,10)">10 ✓</div>
      <div class="qty-btn" onclick="setQty('book',15,10)">15 🔥</div>
      <div class="qty-btn" onclick="setQty('book',20,10)">20 💪</div>
    </div>
  </div>

  <!-- HABITS -->
  <div class="sec">✅ Habits</div>
  <div class="habit-grid">
    <div class="hcard" id="h-workout"     onclick="toggleHabit('workout')">    <div class="hcard-icon">💪</div><div class="hcard-name">Workout</div>      <div class="hcard-sub" id="h-workout-days">Gym days</div></div>
    <div class="hcard" id="h-walk"        onclick="toggleHabit('walk')">       <div class="hcard-icon">🚶</div><div class="hcard-name">Morning Walk</div>  <div class="hcard-sub">5 min outside</div></div>
    <div class="hcard" id="h-nophone"     onclick="toggleHabit('nophone')">    <div class="hcard-icon">📵</div><div class="hcard-name">No Phone Bed</div>  <div class="hcard-sub">Charge across room</div></div>
    <div class="hcard" id="h-family"      onclick="toggleHabit('family')">     <div class="hcard-icon">📞</div><div class="hcard-name">Family Call</div>   <div class="hcard-sub">India daily</div></div>
    <div class="hcard" id="h-wife"        onclick="toggleHabit('wife')">       <div class="hcard-icon">💑</div><div class="hcard-name">Wife Call</div>     <div class="hcard-sub">Daily</div></div>
    <div class="hcard" id="h-skincare"    onclick="toggleHabit('skincare')">   <div class="hcard-icon">🧴</div><div class="hcard-name">Skincare</div>      <div class="hcard-sub">AM + PM</div></div>
    <div class="hcard" id="h-teeth"       onclick="toggleHabit('teeth')">      <div class="hcard-icon">🦷</div><div class="hcard-name">Brush Teeth</div>  <div class="hcard-sub">AM + PM</div></div>
    <div class="hcard" id="h-shower"      onclick="toggleHabit('shower')">     <div class="hcard-icon">🚿</div><div class="hcard-name">Shower</div>        <div class="hcard-sub">Daily</div></div>
    <div class="hcard" id="h-supplements" onclick="toggleHabit('supplements')"><div class="hcard-icon">💊</div><div class="hcard-name">Supplements</div>   <div class="hcard-sub">Biotin+D3+Zinc</div></div>
    <div class="hcard" id="h-hairoil"     onclick="toggleHabit('hairoil')">    <div class="hcard-icon">💇</div><div class="hcard-name">Hair Oil</div>      <div class="hcard-sub">Friday night</div></div>
  </div>

  <!-- CLEAN DAYS -->
  <div class="streak-card mt16">
    <div style="font-family:'DM Mono',monospace;font-size:10px;color:rgba(255,255,255,.3);letter-spacing:3px;text-transform:uppercase;margin-bottom:8px;">🔒 CLEAN DAYS STREAK</div>
    <div style="display:flex;align-items:flex-end;gap:8px;">
      <div class="streak-num" id="p-cleanNum">0</div>
      <div class="streak-unit" style="margin-bottom:10px;">days clean</div>
    </div>
    <div class="streak-best" id="p-bestStreak">Best: 0 days</div>
    <div class="streak-msg"  id="p-streakMsg">Start today. Every day counts.</div>
    <div style="display:flex;gap:10px;">
      <button class="btn btn-gold" style="flex:1;" onclick="addCleanDay()">✓ Mark Today Clean</button>
      <button class="btn btn-ghost" onclick="resetStreak()">Reset</button>
    </div>
  </div>

  <!-- SCHEDULE MINI -->
  <div class="sec">⏰ Today's Schedule</div>
  <div id="p-schedMini"></div>

  <!-- TASKS -->
  <div class="sec">➕ Tasks</div>
  <div class="card">
    <input class="inp" id="taskTitle"  placeholder="Task name…">
    <input class="inp" id="taskRemark" placeholder="Remark (optional)…">
    <div class="cat-grid" id="catGrid"></div>
    <button class="btn btn-gold btn-full" onclick="addTask()">+ Add Task</button>
  </div>
  <div id="p-tasksList"><div class="empty">No tasks yet</div></div>

  <!-- WINS -->
  <div class="sec">🏆 Wins</div>
  <div style="display:flex;gap:8px;margin-bottom:10px;">
    <input class="inp" id="winInput" placeholder="Write a win…" style="flex:1;margin-bottom:0;" onkeydown="if(event.key==='Enter')addWin()">
    <button class="btn btn-green" onclick="addWin()">+</button>
  </div>
  <div id="p-winsList"><div class="empty">No wins yet</div></div>

  <!-- GROCERY -->
  <div class="sec">🛒 Weekly Grocery</div>
  <div style="display:flex;gap:8px;margin-bottom:8px;">
    <input class="inp" id="groceryInput" placeholder="Add item…" style="flex:1;margin-bottom:0;">
    <button class="btn btn-gold" onclick="addGrocery()">+</button>
  </div>
  <button class="btn btn-ghost btn-full mb8" onclick="loadBaseGrocery()">🔄 Load weekly base list</button>
  <div id="p-groceryList"><div class="empty">Tap load base list</div></div>
  <button class="btn btn-ghost btn-full mt8" style="border:1.5px dashed var(--border);color:var(--muted);" onclick="resetGrocery()">🗑 Clear for new week</button>
</div>`;
}

function buildProfilePage() {
  const diff = window.daysSinceStart ? daysSinceStart() : 1;
  const pct  = Math.round((diff / 90) * 100);
  const ccBal = parseInt(ls('cc_balance') || '20000');
  const ccPct = Math.round(((20000 - ccBal) / 20000) * 100);
  return `
<div class="page" id="p-profile">
  <div class="profile-hero">
    <div class="prof-avatar">F</div>
    <div class="prof-name">FAIZY</div>
    <div class="prof-tag">"Discipline. Faith. Financial Freedom." — Dubai, UAE</div>
    <div class="prof-grid">
      <div class="prof-stat"><div class="prof-stat-l">Age</div><div class="prof-stat-v">35</div><div class="prof-stat-s">Born 09 Apr 1991</div></div>
      <div class="prof-stat"><div class="prof-stat-l">Job</div><div class="prof-stat-v" style="font-size:15px;margin-top:2px;">IT Support</div><div class="prof-stat-s">AED 8,300/month</div></div>
      <div class="prof-stat"><div class="prof-stat-l">Journey</div><div class="prof-stat-v">Day <span id="prof-day">${diff}</span></div><div class="prof-stat-s">Started 21 Apr 2025</div></div>
      <div class="prof-stat"><div class="prof-stat-l">Weight Goal</div><div class="prof-stat-v">65 kg</div><div class="prof-stat-s">Currently ~60kg</div></div>
      <div class="prof-stat"><div class="prof-stat-l">City</div><div class="prof-stat-v" style="font-size:15px;margin-top:2px;">Dubai 🇦🇪</div><div class="prof-stat-s">Living alone</div></div>
      <div class="prof-stat"><div class="prof-stat-l">Clean Days</div><div class="prof-stat-v c-gold" id="prof-clean">${ls('cleanDays')||0}</div><div class="prof-stat-s">Best: <span id="prof-best">${ls('bestClean')||0}</span></div></div>
    </div>
  </div>

  <div class="sec">🎯 Short Term Goals (6 months)</div>
  <div class="card card-sm">
    <div class="goal-item"><div class="goal-ico">🔐</div><div class="goal-body"><div class="goal-title">Get Security+ Certificate</div><div class="goal-dl">Target: Oct 2025 · Exam ~$350</div></div></div>
    <div class="goal-item">
      <div class="goal-ico">💳</div>
      <div class="goal-body"><div class="goal-title">Pay Off Credit Card</div><div class="goal-dl">AED 20,000 → Zero · AED 1,500/month · ~14 months</div>
        <div class="pbar mt8"><div class="pbar-fill" style="width:${ccPct}%"></div></div>
        <div style="font-size:10px;color:var(--muted);margin-top:3px;">${ccPct}% paid off</div>
      </div>
    </div>
    <div class="goal-item"><div class="goal-ico">⚖️</div><div class="goal-body"><div class="goal-title">Reach 65kg</div><div class="goal-dl">Currently ~60kg · Gym 3x/week + food plan</div></div></div>
  </div>

  <div class="sec">🚀 Long Term Goals (1–3 years)</div>
  <div class="card card-sm">
    <div class="goal-item"><div class="goal-ico">🔒</div><div class="goal-body"><div class="goal-title">SOC Analyst — AED 12,000–20,000/month</div><div class="goal-dl">Deloitte · PwC · Accenture · Etisalat Digital</div></div></div>
    <div class="goal-item"><div class="goal-ico">💰</div><div class="goal-body"><div class="goal-title">Financial Freedom — Zero Debt</div><div class="goal-dl">All debt cleared · AED 25,000+ savings buffer</div></div></div>
    <div class="goal-item"><div class="goal-ico">💼</div><div class="goal-body"><div class="goal-title">FG Business Full Time</div><div class="goal-dl">Fourth Gate Trading · Electronics · Cars · Wholesale</div></div></div>
    <div class="goal-item"><div class="goal-ico">✈️</div><div class="goal-body"><div class="goal-title">Travel Outside UAE</div><div class="goal-dl">With savings · After debt cleared</div></div></div>
  </div>

  <div class="sec">🌱 Personal Goals</div>
  <div class="card card-sm">
    <div class="goal-item"><div class="goal-ico">🕌</div><div class="goal-body"><div class="goal-title">Pray All 5 Prayers Daily</div><div class="goal-dl">Every single day — no exceptions</div></div></div>
    <div class="goal-item"><div class="goal-ico">🔒</div><div class="goal-body"><div class="goal-title">Quit Bad Habits Completely</div><div class="goal-dl">Clean streak → permanent lifestyle</div></div></div>
    <div class="goal-item"><div class="goal-ico">📖</div><div class="goal-body"><div class="goal-title">Daily Quran Reading</div><div class="goal-dl">Minimum 1 page every day</div></div></div>
    <div class="goal-item"><div class="goal-ico">🏆</div><div class="goal-body"><div class="goal-title">Be Fully Consistent 90 Days</div><div class="goal-dl">Never miss twice — the only rule</div></div></div>
    <div class="goal-item"><div class="goal-ico">🤝</div><div class="goal-body"><div class="goal-title">Build Same-Vibe Friend Group Dubai</div><div class="goal-dl">People who match your energy and values</div></div></div>
  </div>

  <div class="sec">📅 90-Day Journey</div>
  <div class="card">
    <div class="flex-between mb8">
      <span class="c-muted" style="font-size:12px;">Day ${diff} of 90</span>
      <span class="mono c-gold" style="font-size:12px;">${pct}%</span>
    </div>
    <div class="pbar" style="height:12px;"><div class="pbar-fill" style="width:${pct}%"></div></div>
    <div style="font-size:11px;color:var(--muted);margin-top:8px;text-align:center;">Started: 21 April 2025 · Ends: 19 July 2025</div>
  </div>
</div>`;
}

function buildSchedulePage() {
  return `
<div class="page" id="p-schedule">
  <div class="sec">📅 Weekday Schedule</div>
  <div id="p-schedFull"></div>
  <div class="sec">🎉 Saturday — Growth Day</div>
  <div class="card">
    <div class="food-item"><div class="food-dot" style="background:var(--gold)"></div>6:00am — Wake, Fajr, walk</div>
    <div class="food-item"><div class="food-dot" style="background:var(--blue)"></div>7:00am — Deep work 2hrs (FG or Cyber)</div>
    <div class="food-item"><div class="food-dot" style="background:var(--muted)"></div>9:00am — Free, errands, relax</div>
    <div class="food-item"><div class="food-dot" style="background:var(--orange)"></div>2:00pm — Life cleanup</div>
    <div class="food-item"><div class="food-dot" style="background:var(--green)"></div>6:00pm — Friends, bowling, social 🎳</div>
    <div class="food-item"><div class="food-dot" style="background:var(--purple)"></div>11:00pm — Weekly prep + sleep</div>
  </div>
  <div class="sec">☀️ Sunday — Rest & Review</div>
  <div class="card">
    <div class="food-item"><div class="food-dot" style="background:var(--gold)"></div>6:00am — Wake, Fajr, slow morning</div>
    <div class="food-item"><div class="food-dot" style="background:var(--blue)"></div>7:00am — Weekly review 30 mins</div>
    <div class="food-item"><div class="food-dot" style="background:var(--green)"></div>7:30am — Quran, books, reflect</div>
    <div class="food-item"><div class="food-dot" style="background:var(--muted)"></div>Rest — Family calls, recharge</div>
    <div class="food-item"><div class="food-dot" style="background:var(--purple)"></div>10:00pm — Plan full week + sleep</div>
  </div>
</div>`;
}

function buildGrowthPage() {
  return `
<div class="page" id="p-growth">

  <!-- GYM DAYS -->
  <div class="sec">💪 Gym Days</div>
  <div class="card">
    <div style="font-size:13px;font-weight:600;margin-bottom:10px;">Select your 3 gym days (after work, 6:00pm)</div>
    <div class="gym-day-row" id="gymDayRow">
      <div class="gym-day-btn" onclick="toggleGymDay(this,'Mon')">Mon</div>
      <div class="gym-day-btn" onclick="toggleGymDay(this,'Tue')">Tue</div>
      <div class="gym-day-btn" onclick="toggleGymDay(this,'Wed')">Wed</div>
      <div class="gym-day-btn" onclick="toggleGymDay(this,'Thu')">Thu</div>
      <div class="gym-day-btn" onclick="toggleGymDay(this,'Fri')">Fri</div>
      <div class="gym-day-btn" onclick="toggleGymDay(this,'Sat')">Sat</div>
      <div class="gym-day-btn" onclick="toggleGymDay(this,'Sun')">Sun</div>
    </div>
    <div style="font-size:11px;color:var(--muted);margin-top:8px;" id="gymDaysLabel">No days selected yet</div>
    <button class="btn btn-green btn-full mt8" onclick="saveGymDays()">Save Gym Days</button>
  </div>

  <!-- WORKOUTS -->
  <div class="sec">🏋️ Workout Plans</div>
  <div class="pill pill-gold mb8">Goal: 60→65kg · After work 6pm</div>

  <div class="acc">
    <div class="acc-header" onclick="toggleAcc(this)">
      <div><div class="acc-title">Day A — Upper Body (Push)</div><div class="acc-sub">Chest · Shoulders · Triceps</div></div>
      <span class="acc-arrow">▼</span>
    </div>
    <div class="acc-body">
      <div class="ex-item"><div class="ex-ico">🤸</div><div class="ex-name">Push Ups</div>              <div class="ex-sets">4×12</div><input class="ex-input" id="ex-a1" placeholder="reps" onchange="saveReps('a1',this.value)"></div>
      <div class="ex-item"><div class="ex-ico">🏋️</div><div class="ex-name">Chest Press (DB)</div>      <div class="ex-sets">4×10</div><input class="ex-input" id="ex-a2" placeholder="reps" onchange="saveReps('a2',this.value)"></div>
      <div class="ex-item"><div class="ex-ico">🧗</div><div class="ex-name">Shoulder Press (DB)</div>   <div class="ex-sets">3×10</div><input class="ex-input" id="ex-a3" placeholder="reps" onchange="saveReps('a3',this.value)"></div>
      <div class="ex-item"><div class="ex-ico">💺</div><div class="ex-name">Tricep Dips</div>            <div class="ex-sets">3×12</div><input class="ex-input" id="ex-a4" placeholder="reps" onchange="saveReps('a4',this.value)"></div>
      <div class="ex-item"><div class="ex-ico">🧘</div><div class="ex-name">Plank (seconds)</div>        <div class="ex-sets">3×</div> <input class="ex-input" id="ex-a5" placeholder="secs" onchange="saveReps('a5',this.value)"></div>
      <div class="food-tip">Log reps each session to track weekly progress.</div>
    </div>
  </div>

  <div class="acc">
    <div class="acc-header" onclick="toggleAcc(this)">
      <div><div class="acc-title">Day B — Lower Body + Core</div><div class="acc-sub">Legs · Glutes · Abs</div></div>
      <span class="acc-arrow">▼</span>
    </div>
    <div class="acc-body">
      <div class="ex-item"><div class="ex-ico">🦵</div><div class="ex-name">Squats</div>                 <div class="ex-sets">4×15</div><input class="ex-input" id="ex-b1" placeholder="reps" onchange="saveReps('b1',this.value)"></div>
      <div class="ex-item"><div class="ex-ico">🚶</div><div class="ex-name">Lunges</div>                 <div class="ex-sets">3×12</div><input class="ex-input" id="ex-b2" placeholder="reps" onchange="saveReps('b2',this.value)"></div>
      <div class="ex-item"><div class="ex-ico">🦶</div><div class="ex-name">Calf Raises</div>            <div class="ex-sets">4×20</div><input class="ex-input" id="ex-b3" placeholder="reps" onchange="saveReps('b3',this.value)"></div>
      <div class="ex-item"><div class="ex-ico">🔄</div><div class="ex-name">Bicycle Crunches</div>       <div class="ex-sets">3×20</div><input class="ex-input" id="ex-b4" placeholder="reps" onchange="saveReps('b4',this.value)"></div>
      <div class="ex-item"><div class="ex-ico">🌉</div><div class="ex-name">Hip Thrusts</div>             <div class="ex-sets">3×15</div><input class="ex-input" id="ex-b5" placeholder="reps" onchange="saveReps('b5',this.value)"></div>
    </div>
  </div>

  <div class="acc">
    <div class="acc-header" onclick="toggleAcc(this)">
      <div><div class="acc-title">Day C — Back + Biceps (Pull)</div></div>
      <span class="acc-arrow">▼</span>
    </div>
    <div class="acc-body">
      <div class="ex-item"><div class="ex-ico">🏋️</div><div class="ex-name">Lat Pulldown / Pull-ups</div><div class="ex-sets">4×10</div><input class="ex-input" id="ex-c1" placeholder="reps" onchange="saveReps('c1',this.value)"></div>
      <div class="ex-item"><div class="ex-ico">🚣</div><div class="ex-name">Seated Row</div>             <div class="ex-sets">4×12</div><input class="ex-input" id="ex-c2" placeholder="reps" onchange="saveReps('c2',this.value)"></div>
      <div class="ex-item"><div class="ex-ico">💪</div><div class="ex-name">Bicep Curls (DB)</div>       <div class="ex-sets">3×12</div><input class="ex-input" id="ex-c3" placeholder="reps" onchange="saveReps('c3',this.value)"></div>
      <div class="ex-item"><div class="ex-ico">🔙</div><div class="ex-name">Face Pulls</div>             <div class="ex-sets">3×15</div><input class="ex-input" id="ex-c4" placeholder="reps" onchange="saveReps('c4',this.value)"></div>
      <div class="ex-item"><div class="ex-ico">🧘</div><div class="ex-name">Plank (seconds)</div>        <div class="ex-sets">3×</div> <input class="ex-input" id="ex-c5" placeholder="secs" onchange="saveReps('c5',this.value)"></div>
    </div>
  </div>

  <!-- FOOD -->
  <div class="sec">🍳 Food Plan</div>
  <div class="card">
    <div style="font-size:13px;font-weight:700;margin-bottom:8px;">🌅 Breakfast 7:50am</div>
    <div class="food-item"><div class="food-dot" style="background:var(--gold)"></div>3 eggs + 2 roti + banana + cashews</div>
    <div class="food-item"><div class="food-dot" style="background:var(--blue)"></div>Full fat milk or chai (less sugar)</div>
    <div style="font-size:13px;font-weight:700;margin:10px 0 8px;">☀️ Lunch 12:30pm</div>
    <div class="food-item"><div class="food-dot" style="background:var(--gold)"></div>Rice + chicken/dal + vegetable + 500ml water</div>
    <div style="font-size:13px;font-weight:700;margin:10px 0 8px;">🌙 Dinner after Maghrib</div>
    <div class="food-item"><div class="food-dot" style="background:var(--gold)"></div>2 roti + dal/chicken/paneer + salad</div>
    <div style="font-size:13px;font-weight:700;margin:10px 0 8px;">🥜 Snacks</div>
    <div class="food-item"><div class="food-dot" style="background:var(--orange)"></div>Cashews 15-20 · Almonds 8-10 · Dates 3-5</div>
    <div class="food-item"><div class="food-dot" style="background:var(--green)"></div>Banana + Apple + Watermelon daily</div>
    <div class="food-tip">💧 3 litres water daily. Dubai heat drains you. Never skip meals.</div>
  </div>

  <!-- SOC ROADMAP -->
  <div class="sec">🔐 SOC Analyst Roadmap</div>
  <div class="pill pill-gold mb8">45 mins/day · 6 months · AED 12-20k target</div>
  <div class="acc">
    <div class="acc-header" onclick="toggleAcc(this)"><div><div class="acc-title">Month 1 — Foundations</div><div class="acc-sub">Network + Linux + Security basics</div></div><span class="acc-arrow">▼</span></div>
    <div class="acc-body">
      <div class="rm-item"><div class="rm-bullet">→</div><div><div class="rm-title">Networking Basics</div><div class="rm-desc">IP, DNS, TCP/IP, OSI model, firewalls</div><span class="res-tag res-free">FREE</span> <span class="res-tag res-blue">Professor Messer YouTube</span></div></div>
      <div class="rm-item"><div class="rm-bullet">→</div><div><div class="rm-title">Linux Fundamentals</div><div class="rm-desc">Commands, file system, permissions</div><span class="res-tag res-free">FREE</span> <span class="res-tag res-blue">OverTheWire: Bandit</span></div></div>
    </div>
  </div>
  <div class="acc">
    <div class="acc-header" onclick="toggleAcc(this)"><div><div class="acc-title">Month 2 — Security+ + TryHackMe</div><div class="acc-sub">Splunk · SIEM · Log analysis</div></div><span class="acc-arrow">▼</span></div>
    <div class="acc-body">
      <div class="rm-item"><div class="rm-bullet">→</div><div><div class="rm-title">CompTIA Security+ Full Course</div><div class="rm-desc">Base certification. Opens MNC doors.</div><span class="res-tag res-paid">EXAM ~$350</span></div></div>
      <div class="rm-item"><div class="rm-bullet">→</div><div><div class="rm-title">TryHackMe SOC Level 1</div><div class="rm-desc">SIEM, log analysis, incident response</div><span class="res-tag res-free">FREE TIER</span></div></div>
      <div class="rm-item"><div class="rm-bullet">→</div><div><div class="rm-title">Splunk Fundamentals</div><div class="rm-desc">Most used SIEM in UAE companies</div><span class="res-tag res-free">FREE</span></div></div>
    </div>
  </div>
  <div class="acc">
    <div class="acc-header" onclick="toggleAcc(this)"><div><div class="acc-title">Month 3-4 — SOC Skills</div><div class="acc-sub">MITRE ATT&CK · Threat hunting</div></div><span class="acc-arrow">▼</span></div>
    <div class="acc-body">
      <div class="rm-item"><div class="rm-bullet">→</div><div><div class="rm-title">Log Analysis + MITRE ATT&CK</div><div class="rm-desc">Threat intel, IOCs, hunting basics</div><span class="res-tag res-free">FREE</span></div></div>
      <div class="rm-item"><div class="rm-bullet">→</div><div><div class="rm-title">Blue Team Labs Online</div><div class="rm-desc">Real SOC scenarios, hands-on practice</div><span class="res-tag res-free">FREE TIER</span></div></div>
    </div>
  </div>
  <div class="acc">
    <div class="acc-header" onclick="toggleAcc(this)"><div><div class="acc-title">Month 5-6 — Certs + Job Hunt</div><div class="acc-sub">Security+ exam → Apply to MNCs</div></div><span class="acc-arrow">▼</span></div>
    <div class="acc-body">
      <div class="rm-item"><div class="rm-bullet">→</div><div><div class="rm-title">Security+ Exam → Microsoft SC-200</div><div class="rm-desc">Two certs. UAE MNC doors open.</div><span class="res-tag res-paid">PRIORITY</span></div></div>
      <div class="rm-item"><div class="rm-bullet">→</div><div><div class="rm-title">Apply: Deloitte · PwC · Accenture · Etisalat Digital</div><div class="rm-desc">Target: AED 12,000–20,000/month</div><span class="res-tag res-free">TARGET</span></div></div>
    </div>
  </div>
</div>`;
}

function buildHygienePage() {
  return `
<div class="page" id="p-hygiene">
  <div class="sec">🌅 Morning Routine (8 mins)</div>
  <div class="card">
    <div class="hg-step"><div class="hg-num">1</div><div><div class="hg-title">Brush Teeth — 2 full minutes</div><div class="hg-desc">Fluoride toothpaste. Brush tongue. Spit, don't rinse immediately.</div><span class="hg-prod">Colgate Total / Sensodyne</span></div></div>
    <div class="hg-step"><div class="hg-num">2</div><div><div class="hg-title">Face Wash</div><div class="hg-desc">Wet face, apply cleanser, 30 seconds massage, rinse with cold water.</div><span class="hg-prod">CeraVe Foaming Cleanser</span></div></div>
    <div class="hg-step"><div class="hg-num">3</div><div><div class="hg-title">Moisturizer</div><div class="hg-desc">Apply while face is slightly damp. Neck too.</div><span class="hg-prod">Neutrogena Hydro Boost</span></div></div>
    <div class="hg-step"><div class="hg-num">4</div><div><div class="hg-title">SPF 50+ Sunscreen</div><div class="hg-desc">Dubai UV is brutal. Apply every single morning before leaving.</div><span class="hg-prod">La Roche-Posay SPF50+ or Altruist</span></div></div>
    <div class="hg-step"><div class="hg-num">5</div><div><div class="hg-title">Deodorant</div><div class="hg-desc">Both underarms. Keep one at work too.</div><span class="hg-prod">Dove Men+ or Nivea Sensitive</span></div></div>
    <div class="hg-step"><div class="hg-num">6</div><div><div class="hg-title">Supplements (with breakfast)</div><div class="hg-desc">Non-negotiable every morning.</div><span class="hg-prod">Biotin 5000mcg + Vitamin D3 + Zinc</span></div></div>
  </div>

  <div class="sec">🌙 Night Routine (7 mins)</div>
  <div class="card">
    <div class="hg-step"><div class="hg-num">1</div><div><div class="hg-title">Brush Teeth + Mouthwash</div><div class="hg-desc">Most important brush of the day. Floss 3x/week minimum.</div><span class="hg-prod">Listerine Cool Mint</span></div></div>
    <div class="hg-step"><div class="hg-num">2</div><div><div class="hg-title">Face Wash</div><div class="hg-desc">Remove sweat, dust, SPF from the day.</div><span class="hg-prod">Same cleanser as morning</span></div></div>
    <div class="hg-step"><div class="hg-num">3</div><div><div class="hg-title">Night Moisturizer</div><div class="hg-desc">Thicker than morning. Face and neck.</div><span class="hg-prod">CeraVe PM Moisturizing Lotion</span></div></div>
    <div class="hg-step"><div class="hg-num">4</div><div><div class="hg-title">Body Lotion</div><div class="hg-desc">Arms, legs, elbows. Dubai AC makes skin very dry.</div><span class="hg-prod">Vaseline Intensive Care or Nivea Body</span></div></div>
    <div class="hg-step"><div class="hg-num">5</div><div><div class="hg-title">Nail Check (Sunday only)</div><div class="hg-desc">Trim every Sunday. Keep clean always.</div><span class="hg-prod">Nail clipper set</span></div></div>
  </div>

  <div class="sec">💇 Weekly — Hair (Friday Night)</div>
  <div class="card">
    <div class="hg-step"><div class="hg-num">1</div><div><div class="hg-title">Scalp Oil Massage — 10 mins</div><div class="hg-desc">Mix castor oil + coconut oil. Massage into scalp. Leave overnight.</div><span class="hg-prod">Castor Oil + Coconut Oil (Dabur or any)</span></div></div>
    <div class="hg-step"><div class="hg-num">2</div><div><div class="hg-title">Saturday Wash — Nizoral Shampoo</div><div class="hg-desc">Wash out oil. Wednesday also use Nizoral. Only 2x/week max.</div><span class="hg-prod">Nizoral Anti-Dandruff Shampoo</span></div></div>
    <div class="hg-step"><div class="hg-num">3</div><div><div class="hg-title">Weekly Face Scrub (Saturday)</div><div class="hg-desc">Exfoliate dead skin. Gentle circles, 60 seconds, rinse cold.</div><span class="hg-prod">St. Ives Apricot Scrub or Cetaphil</span></div></div>
  </div>

  <div class="sec">🛍 Shopping List</div>
  <div class="card">
    <div class="alert alert-gold">One-time setup: ~AED 150–200. Lasts 2-3 months.</div>
    <div class="tog" onclick="this.classList.toggle('done')"><div class="tog-box"><span class="tog-tick">✓</span></div><div class="tog-body"><div class="tog-title">CeraVe Foaming Cleanser</div><div class="tog-sub">~AED 35</div></div></div>
    <div class="tog" onclick="this.classList.toggle('done')"><div class="tog-box"><span class="tog-tick">✓</span></div><div class="tog-body"><div class="tog-title">Neutrogena Hydro Boost Moisturizer</div><div class="tog-sub">~AED 40</div></div></div>
    <div class="tog" onclick="this.classList.toggle('done')"><div class="tog-box"><span class="tog-tick">✓</span></div><div class="tog-body"><div class="tog-title">Altruist / La Roche-Posay SPF 50+</div><div class="tog-sub">~AED 15–50</div></div></div>
    <div class="tog" onclick="this.classList.toggle('done')"><div class="tog-box"><span class="tog-tick">✓</span></div><div class="tog-body"><div class="tog-title">CeraVe PM Night Lotion</div><div class="tog-sub">~AED 35</div></div></div>
    <div class="tog" onclick="this.classList.toggle('done')"><div class="tog-box"><span class="tog-tick">✓</span></div><div class="tog-body"><div class="tog-title">Nizoral Anti-Dandruff Shampoo</div><div class="tog-sub">~AED 30</div></div></div>
    <div class="tog" onclick="this.classList.toggle('done')"><div class="tog-box"><span class="tog-tick">✓</span></div><div class="tog-body"><div class="tog-title">Castor Oil + Coconut Oil</div><div class="tog-sub">~AED 20</div></div></div>
    <div class="tog" onclick="this.classList.toggle('done')"><div class="tog-box"><span class="tog-tick">✓</span></div><div class="tog-body"><div class="tog-title">Biotin 5000mcg + D3 + Zinc supplements</div><div class="tog-sub">~AED 50–70</div></div></div>
    <div class="tog" onclick="this.classList.toggle('done')"><div class="tog-box"><span class="tog-tick">✓</span></div><div class="tog-body"><div class="tog-title">Vaseline / Nivea Body Lotion</div><div class="tog-sub">~AED 15</div></div></div>
    <div class="tog" onclick="this.classList.toggle('done')"><div class="tog-box"><span class="tog-tick">✓</span></div><div class="tog-body"><div class="tog-title">Listerine Mouthwash</div><div class="tog-sub">~AED 20</div></div></div>
    <div class="tog" onclick="this.classList.toggle('done')"><div class="tog-box"><span class="tog-tick">✓</span></div><div class="tog-body"><div class="tog-title">Dove Men+ Deodorant</div><div class="tog-sub">~AED 12</div></div></div>
  </div>
</div>`;
}

function buildCleanupPage() {
  return `
<div class="page" id="p-cleanup">
  <div style="display:flex;gap:8px;margin-bottom:16px;flex-wrap:wrap;">
    <button class="btn btn-sm btn-gold"  onclick="showCleanTab('daily')">📅 Daily</button>
    <button class="btn btn-sm btn-ghost" onclick="showCleanTab('weekly')">📆 Weekly</button>
    <button class="btn btn-sm btn-ghost" onclick="showCleanTab('monthly')">🗓 Monthly</button>
    <button class="btn btn-sm btn-ghost" onclick="showCleanTab('rooms')">🏠 By Room</button>
  </div>

  <!-- DAILY -->
  <div id="clean-daily">
    <div class="alert alert-gold">10 minutes every day. Non-negotiable.</div>
    <div style="margin-bottom:16px;">
      <div class="cl-sec-title">🛏 Room <span class="cl-badge cl-daily">DAILY</span></div>
      <div class="tog" onclick="toggleClean(this,'d-r1')"><div class="tog-box"><span class="tog-tick">✓</span></div><div class="tog-body"><div class="tog-title">Make bed within 2 mins of waking</div></div></div>
      <div class="tog" onclick="toggleClean(this,'d-r2')"><div class="tog-box"><span class="tog-tick">✓</span></div><div class="tog-body"><div class="tog-title">No clothes on floor — hang or fold</div></div></div>
      <div class="tog" onclick="toggleClean(this,'d-r3')"><div class="tog-box"><span class="tog-tick">✓</span></div><div class="tog-body"><div class="tog-title">Phone charged across room from bed</div></div></div>
    </div>
    <div style="margin-bottom:16px;">
      <div class="cl-sec-title">🍳 Kitchen <span class="cl-badge cl-daily">DAILY</span></div>
      <div class="tog" onclick="toggleClean(this,'d-k1')"><div class="tog-box"><span class="tog-tick">✓</span></div><div class="tog-body"><div class="tog-title">Wash dishes immediately after eating</div></div></div>
      <div class="tog" onclick="toggleClean(this,'d-k2')"><div class="tog-box"><span class="tog-tick">✓</span></div><div class="tog-body"><div class="tog-title">Wipe stove after every use</div></div></div>
      <div class="tog" onclick="toggleClean(this,'d-k3')"><div class="tog-box"><span class="tog-tick">✓</span></div><div class="tog-body"><div class="tog-title">Sink — no food residue overnight</div></div></div>
    </div>
    <div>
      <div class="cl-sec-title">🖥 Desk <span class="cl-badge cl-daily">DAILY</span></div>
      <div class="tog" onclick="toggleClean(this,'d-d1')"><div class="tog-box"><span class="tog-tick">✓</span></div><div class="tog-body"><div class="tog-title">Clear desk before sleep</div></div></div>
      <div class="tog" onclick="toggleClean(this,'d-d2')"><div class="tog-box"><span class="tog-tick">✓</span></div><div class="tog-body"><div class="tog-title">Only: laptop, notebook, water bottle, pen</div></div></div>
    </div>
  </div>

  <!-- WEEKLY -->
  <div id="clean-weekly" style="display:none;">
    <div class="alert alert-blue">Every Saturday — 45 minutes deep clean.</div>
    <div style="margin-bottom:16px;">
      <div class="cl-sec-title">🛏 Bedroom <span class="cl-badge cl-weekly">WEEKLY</span></div>
      <div class="tog" onclick="toggleClean(this,'w-r1')"><div class="tog-box"><span class="tog-tick">✓</span></div><div class="tog-body"><div class="tog-title">Vacuum or sweep floor</div></div></div>
      <div class="tog" onclick="toggleClean(this,'w-r2')"><div class="tog-box"><span class="tog-tick">✓</span></div><div class="tog-body"><div class="tog-title">Change bed sheets</div></div></div>
      <div class="tog" onclick="toggleClean(this,'w-r3')"><div class="tog-box"><span class="tog-tick">✓</span></div><div class="tog-body"><div class="tog-title">Wipe all surfaces — shelf, table, mirror</div></div></div>
      <div class="tog" onclick="toggleClean(this,'w-r4')"><div class="tog-box"><span class="tog-tick">✓</span></div><div class="tog-body"><div class="tog-title">Open window — 10 min fresh air</div></div></div>
    </div>
    <div style="margin-bottom:16px;">
      <div class="cl-sec-title">🍳 Kitchen <span class="cl-badge cl-weekly">WEEKLY</span></div>
      <div class="tog" onclick="toggleClean(this,'w-k1')"><div class="tog-box"><span class="tog-tick">✓</span></div><div class="tog-body"><div class="tog-title">Fridge — remove expired items</div></div></div>
      <div class="tog" onclick="toggleClean(this,'w-k2')"><div class="tog-box"><span class="tog-tick">✓</span></div><div class="tog-body"><div class="tog-title">Deep clean stove + countertops</div></div></div>
      <div class="tog" onclick="toggleClean(this,'w-k3')"><div class="tog-box"><span class="tog-tick">✓</span></div><div class="tog-body"><div class="tog-title">Mop kitchen floor</div></div></div>
    </div>
    <div>
      <div class="cl-sec-title">💻 Digital <span class="cl-badge cl-weekly">WEEKLY</span></div>
      <div class="tog" onclick="toggleClean(this,'w-di1')"><div class="tog-box"><span class="tog-tick">✓</span></div><div class="tog-body"><div class="tog-title">Email inbox — archive everything, inbox zero</div></div></div>
      <div class="tog" onclick="toggleClean(this,'w-di2')"><div class="tog-box"><span class="tog-tick">✓</span></div><div class="tog-body"><div class="tog-title">Downloads folder — delete old files</div></div></div>
      <div class="tog" onclick="toggleClean(this,'w-di3')"><div class="tog-box"><span class="tog-tick">✓</span></div><div class="tog-body"><div class="tog-title">Screen time check — under 30 min social?</div></div></div>
    </div>
  </div>

  <!-- MONTHLY -->
  <div id="clean-monthly" style="display:none;">
    <div class="alert alert-gold">First Sunday every month — 2 hour deep reset.</div>
    <div style="margin-bottom:16px;">
      <div class="cl-sec-title">💻 Laptop Files <span class="cl-badge cl-monthly">MONTHLY</span></div>
      <div class="tog" onclick="toggleClean(this,'m-l1')"><div class="tog-box"><span class="tog-tick">✓</span></div><div class="tog-body"><div class="tog-title">Desktop — delete everything, active projects only</div></div></div>
      <div class="tog" onclick="toggleClean(this,'m-l2')"><div class="tog-box"><span class="tog-tick">✓</span></div><div class="tog-body"><div class="tog-title">4 folders: Work / FG Biz / Cyber / Personal</div></div></div>
      <div class="tog" onclick="toggleClean(this,'m-l3')"><div class="tog-box"><span class="tog-tick">✓</span></div><div class="tog-body"><div class="tog-title">Uninstall apps not used in 3 months</div></div></div>
      <div class="tog" onclick="toggleClean(this,'m-l4')"><div class="tog-box"><span class="tog-tick">✓</span></div><div class="tog-body"><div class="tog-title">Hard disks — label each, update index</div></div></div>
    </div>
    <div style="margin-bottom:16px;">
      <div class="cl-sec-title">📱 Digital Life <span class="cl-badge cl-monthly">MONTHLY</span></div>
      <div class="tog" onclick="toggleClean(this,'m-di1')"><div class="tog-box"><span class="tog-tick">✓</span></div><div class="tog-body"><div class="tog-title">Unfollow anything that drains you</div></div></div>
      <div class="tog" onclick="toggleClean(this,'m-di2')"><div class="tog-box"><span class="tog-tick">✓</span></div><div class="tog-body"><div class="tog-title">Follow: cybersecurity, business, fitness, Islamic</div></div></div>
      <div class="tog" onclick="toggleClean(this,'m-di3')"><div class="tog-box"><span class="tog-tick">✓</span></div><div class="tog-body"><div class="tog-title">LinkedIn — update skills, headline, activity</div></div></div>
      <div class="tog" onclick="toggleClean(this,'m-di4')"><div class="tog-box"><span class="tog-tick">✓</span></div><div class="tog-body"><div class="tog-title">Phone — delete unused apps</div></div></div>
    </div>
    <div>
      <div class="cl-sec-title">🏠 Full Room Reset <span class="cl-badge cl-monthly">MONTHLY</span></div>
      <div class="tog" onclick="toggleClean(this,'m-r1')"><div class="tog-box"><span class="tog-tick">✓</span></div><div class="tog-body"><div class="tog-title">Move furniture, vacuum underneath</div></div></div>
      <div class="tog" onclick="toggleClean(this,'m-r2')"><div class="tog-box"><span class="tog-tick">✓</span></div><div class="tog-body"><div class="tog-title">Bathroom deep clean — tiles, toilet, mirror</div></div></div>
      <div class="tog" onclick="toggleClean(this,'m-r3')"><div class="tog-box"><span class="tog-tick">✓</span></div><div class="tog-body"><div class="tog-title">Review finances — monthly report download</div></div></div>
      <div class="tog" onclick="toggleClean(this,'m-r4')"><div class="tog-box"><span class="tog-tick">✓</span></div><div class="tog-body"><div class="tog-title">Monthly life review journal entry</div></div></div>
    </div>
  </div>

  <!-- BY ROOM -->
  <div id="clean-rooms" style="display:none;">
    <div class="acc">
      <div class="acc-header" onclick="toggleAcc(this)"><div><div class="acc-title">🛏 Bedroom</div></div><span class="acc-arrow">▼</span></div>
      <div class="acc-body">
        <div class="tog" onclick="toggleClean(this,'ro-r1')"><div class="tog-box"><span class="tog-tick">✓</span></div><div class="tog-body"><div class="tog-title">Bed made</div><div class="tog-sub">Daily</div></div></div>
        <div class="tog" onclick="toggleClean(this,'ro-r2')"><div class="tog-box"><span class="tog-tick">✓</span></div><div class="tog-body"><div class="tog-title">Clothes off floor</div><div class="tog-sub">Daily</div></div></div>
        <div class="tog" onclick="toggleClean(this,'ro-r3')"><div class="tog-box"><span class="tog-tick">✓</span></div><div class="tog-body"><div class="tog-title">Vacuumed</div><div class="tog-sub">Weekly</div></div></div>
        <div class="tog" onclick="toggleClean(this,'ro-r4')"><div class="tog-box"><span class="tog-tick">✓</span></div><div class="tog-body"><div class="tog-title">Sheets changed</div><div class="tog-sub">Weekly</div></div></div>
      </div>
    </div>
    <div class="acc">
      <div class="acc-header" onclick="toggleAcc(this)"><div><div class="acc-title">🍳 Kitchen</div></div><span class="acc-arrow">▼</span></div>
      <div class="acc-body">
        <div class="tog" onclick="toggleClean(this,'ro-k1')"><div class="tog-box"><span class="tog-tick">✓</span></div><div class="tog-body"><div class="tog-title">Dishes washed</div><div class="tog-sub">After every meal</div></div></div>
        <div class="tog" onclick="toggleClean(this,'ro-k2')"><div class="tog-box"><span class="tog-tick">✓</span></div><div class="tog-body"><div class="tog-title">Stove wiped</div><div class="tog-sub">After every use</div></div></div>
        <div class="tog" onclick="toggleClean(this,'ro-k3')"><div class="tog-box"><span class="tog-tick">✓</span></div><div class="tog-body"><div class="tog-title">Fridge cleaned</div><div class="tog-sub">Weekly</div></div></div>
      </div>
    </div>
    <div class="acc">
      <div class="acc-header" onclick="toggleAcc(this)"><div><div class="acc-title">🚿 Bathroom</div></div><span class="acc-arrow">▼</span></div>
      <div class="acc-body">
        <div class="tog" onclick="toggleClean(this,'ro-b1')"><div class="tog-box"><span class="tog-tick">✓</span></div><div class="tog-body"><div class="tog-title">Sink wiped after use</div><div class="tog-sub">Daily</div></div></div>
        <div class="tog" onclick="toggleClean(this,'ro-b2')"><div class="tog-box"><span class="tog-tick">✓</span></div><div class="tog-body"><div class="tog-title">Toilet + floor cleaned</div><div class="tog-sub">Weekly</div></div></div>
        <div class="tog" onclick="toggleClean(this,'ro-b3')"><div class="tog-box"><span class="tog-tick">✓</span></div><div class="tog-body"><div class="tog-title">Mirror cleaned</div><div class="tog-sub">Weekly</div></div></div>
      </div>
    </div>
    <div class="acc">
      <div class="acc-header" onclick="toggleAcc(this)"><div><div class="acc-title">🖥 Desk / Workspace</div></div><span class="acc-arrow">▼</span></div>
      <div class="acc-body">
        <div class="tog" onclick="toggleClean(this,'ro-d1')"><div class="tog-box"><span class="tog-tick">✓</span></div><div class="tog-body"><div class="tog-title">Clear before sleep</div><div class="tog-sub">Daily</div></div></div>
        <div class="tog" onclick="toggleClean(this,'ro-d2')"><div class="tog-box"><span class="tog-tick">✓</span></div><div class="tog-body"><div class="tog-title">Cable management</div><div class="tog-sub">Weekly</div></div></div>
        <div class="tog" onclick="toggleClean(this,'ro-d3')"><div class="tog-box"><span class="tog-tick">✓</span></div><div class="tog-body"><div class="tog-title">Laptop files organized</div><div class="tog-sub">Monthly</div></div></div>
      </div>
    </div>
  </div>
</div>`;
}

function buildJournalPage() {
  return `
<div class="page" id="p-journal">
  <div class="sec">✍️ Today's Journal</div>
  <div class="card">
    <div style="font-family:'DM Mono',monospace;font-size:10px;color:var(--muted);margin-bottom:8px;letter-spacing:1px;" id="journalDateLabel">Today</div>
    <textarea class="inp" id="journalText" placeholder="How are you really feeling? Write freely — no one sees this but you…" style="min-height:120px;"></textarea>
    <button class="btn btn-gold btn-full" onclick="saveJournal()">Save Entry ✓</button>
  </div>

  <div class="sec">💡 Ideas</div>
  <div class="card">
    <div class="cat-filter-row">
      <div class="cf active" onclick="filterIdeas(this,'All')">All</div>
      <div class="cf" onclick="filterIdeas(this,'Business')">💼 Business</div>
      <div class="cf" onclick="filterIdeas(this,'App')">📱 App</div>
      <div class="cf" onclick="filterIdeas(this,'Career')">🔐 Career</div>
      <div class="cf" onclick="filterIdeas(this,'Life')">🌱 Life</div>
    </div>
    <div style="display:flex;gap:8px;margin-bottom:10px;">
      <select id="ideaCat" class="inp" style="flex:0 0 auto;width:120px;margin-bottom:0;"><option>Business</option><option>App</option><option>Career</option><option>Life</option></select>
      <input class="inp" id="ideaInput" placeholder="Your idea…" style="flex:1;margin-bottom:0;">
      <button class="btn btn-gold" onclick="addIdea()">+</button>
    </div>
    <div id="p-ideasList"><div class="empty">No ideas yet</div></div>
  </div>

  <div class="sec">📚 Books Progress</div>
  <div class="card">
    ${BOOKS.map((b,i)=>`
    <div class="book-item">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:6px;">
        <div><div class="book-name">${b.title}</div><div class="book-author">${b.author}</div></div>
        <div class="book-pages" id="b${i+1}p">0/${b.pages}</div>
      </div>
      <div class="pbar"><div class="pbar-fill" id="b${i+1}f" style="width:0%"></div></div>
      <div class="book-btns">
        <button class="book-btn book-minus" onclick="updateBook(${i+1},-10)">-10</button>
        <button class="book-btn book-plus"  onclick="updateBook(${i+1},10)">+10 pages</button>
      </div>
    </div>`).join('')}
  </div>

  <div class="sec">📊 Weekly Review</div>
  <div class="card">
    <div class="mb8"><label class="inp-label">What went well?</label><textarea class="inp" id="rev1" placeholder="Your wins…" style="min-height:60px;"></textarea></div>
    <div class="mb8"><label class="inp-label">What did I struggle with?</label><textarea class="inp" id="rev2" placeholder="Be honest…" style="min-height:60px;"></textarea></div>
    <div class="mb8"><label class="inp-label">What will I do differently?</label><textarea class="inp" id="rev3" placeholder="One or two changes…" style="min-height:60px;"></textarea></div>
    <div class="mb8"><label class="inp-label">How is my energy overall?</label><textarea class="inp" id="rev4" placeholder="Tired? Motivated?…" style="min-height:60px;"></textarea></div>
    <button class="btn btn-gold btn-full" onclick="saveReview()">Save Weekly Review ✓</button>
  </div>

  <div class="sec">📝 Upgrade Notes</div>
  <div class="card">
    <div style="font-size:12px;color:var(--muted);margin-bottom:10px;line-height:1.6;">Write anything to add or fix. Bring to your mentor after 7 days.</div>
    <textarea class="inp" id="upgradeNotes" placeholder="e.g. Add new habit, change finance section…" style="min-height:80px;"></textarea>
    <button class="btn btn-gold btn-full" onclick="saveUpgradeNotes()">Save Notes ✓</button>
  </div>
</div>`;
}

function buildProgressPage() {
  return `
<div class="page" id="p-progress">
  <div class="score-hero">
    <div style="font-family:'DM Mono',monospace;font-size:10px;color:rgba(255,255,255,.3);letter-spacing:3px;text-transform:uppercase;margin-bottom:8px;">OVERALL LIFE SCORE</div>
    <div class="life-score" id="p-lifeScore">0</div>
    <div class="life-score-sub" id="p-lifeScoreSub">Keep going. Every day counts.</div>
    <div class="score-areas">
      <div class="score-area"><div class="score-area-name">🕌 Spiritual</div><div class="score-area-bar"><div class="score-area-fill" id="sa-spiritual" style="width:0%;background:var(--gold)"></div></div><div class="score-area-val" id="sv-spiritual">0%</div></div>
      <div class="score-area"><div class="score-area-name">💪 Physical</div><div class="score-area-bar"><div class="score-area-fill" id="sa-physical" style="width:0%;background:var(--green)"></div></div><div class="score-area-val" id="sv-physical">0%</div></div>
      <div class="score-area"><div class="score-area-name">🔐 Career</div><div class="score-area-bar"><div class="score-area-fill" id="sa-career" style="width:0%;background:var(--orange)"></div></div><div class="score-area-val" id="sv-career">0%</div></div>
      <div class="score-area"><div class="score-area-name">🧠 Mental</div><div class="score-area-bar"><div class="score-area-fill" id="sa-mental" style="width:0%;background:var(--blue)"></div></div><div class="score-area-val" id="sv-mental">0%</div></div>
    </div>
  </div>

  <div class="card">
    <div class="card-title">📅 30-Day Calendar</div>
    <div class="cal-grid" id="p-calGrid"></div>
    <div class="cal-legend">
      <div class="cal-leg-item"><div class="cal-dot" style="background:var(--green)"></div>Great 80%+</div>
      <div class="cal-leg-item"><div class="cal-dot" style="background:rgba(42,157,111,.4)"></div>Good 50%+</div>
      <div class="cal-leg-item"><div class="cal-dot" style="background:var(--gold-l);border:1px solid var(--gold)"></div>Partial</div>
      <div class="cal-leg-item"><div class="cal-dot" style="background:var(--surface)"></div>Missed</div>
    </div>
  </div>

  <div class="card">
    <div class="card-title">💾 Download Reports</div>
    <button class="dl-btn" onclick="downloadPersonalReport('daily')"   style="background:linear-gradient(135deg,#1a3a2a,#2d5a3a);">📊 Daily Report (CSV)</button>
    <button class="dl-btn" onclick="downloadPersonalReport('weekly')"  style="background:linear-gradient(135deg,#1a2a3a,#2d3a5a);">📈 Weekly Report (CSV)</button>
    <button class="dl-btn" onclick="downloadPersonalReport('monthly')" style="background:linear-gradient(135deg,#2a1a3a,#3a2d5a);">📅 Monthly Report (CSV)</button>
    <button class="dl-btn" onclick="downloadApp()"                      style="background:linear-gradient(135deg,#1a1714,#2d2520);">💾 Download Full App</button>
  </div>
</div>`;
}

// ============================================================
// INJECT ALL PAGES INTO #mainArea
// ============================================================
function injectPersonalPages() {
  const main = document.getElementById('mainArea');
  if (!main) return;
  main.innerHTML =
    buildTodayPage() +
    buildProfilePage() +
    buildSchedulePage() +
    buildGrowthPage() +
    buildHygienePage() +
    buildCleanupPage() +
    buildJournalPage() +
    buildProgressPage();
}

// ============================================================
// LOGIC FUNCTIONS
// ============================================================

// ── SCHEDULE ──
function buildScheduleHTML() {
  const saved = ls('sched_' + APP_TODAY) || [];
  return SCHED.map((s, i) => `
    <div class="sched-item ${saved[i] ? 'done' : ''}" onclick="toggleSched(this,${i})">
      <div class="sched-time">${s.time}</div>
      <div class="sched-dot" style="background:${s.color}"></div>
      <div class="sched-body"><div class="sched-title">${s.title}</div><div class="sched-desc">${s.desc}</div></div>
      <span class="sched-tag" style="background:${TAG_BG[s.cls]};color:${TAG_COLOR[s.cls]};">${s.tag}</span>
      <div class="sched-done">✓</div>
    </div>`).join('');
}

function renderSchedule() {
  ['p-schedMini', 'p-schedFull'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = buildScheduleHTML();
  });
  updateRing();
}

window.toggleSched = function(el, idx) {
  el.classList.toggle('done');
  const saved = ls('sched_' + APP_TODAY) || [];
  saved[idx] = el.classList.contains('done');
  ls('sched_' + APP_TODAY, saved);
  document.querySelectorAll('.sched-item').forEach((item, i) => {
    if (i % SCHED.length === idx) item.classList.toggle('done', !!saved[idx]);
  });
  updateRing();
  saveDayScore();
};

function updateRing() {
  const saved = ls('sched_' + APP_TODAY) || [];
  const done  = saved.filter(Boolean).length;
  const pct   = SCHED.length ? Math.round((done / SCHED.length) * 100) : 0;
  const offset = 207.3 - (207.3 * (pct / 100));
  const ring = document.getElementById('p-ring');
  if (ring) {
    ring.style.strokeDashoffset = offset;
    ring.style.stroke = pct >= 80 ? 'var(--green)' : pct >= 50 ? 'var(--gold)' : 'var(--orange)';
  }
  const rp = document.getElementById('p-ringPct');
  if (rp) rp.textContent = pct + '%';
}

// ── SLEEP ──
window.calcSleep = function() {
  const bed  = document.getElementById('sleepBed')?.value;
  const wake = document.getElementById('sleepWake')?.value;
  if (!bed || !wake) return;
  let [bh, bm] = bed.split(':').map(Number);
  let [wh, wm] = wake.split(':').map(Number);
  let diff = (wh * 60 + wm) - (bh * 60 + bm);
  if (diff < 0) diff += 1440;
  const hrs = Math.floor(diff / 60), mins = diff % 60;
  const r = document.getElementById('sleepResult');
  const s = document.getElementById('sleepSub');
  if (r) r.textContent = hrs + 'h ' + mins + 'm';
  if (s) {
    if (hrs >= 7) s.textContent = 'Good sleep ✓ Energy will be strong today';
    else if (hrs >= 6) s.textContent = 'Okay. Aim for 7+ tonight.';
    else s.textContent = '⚠️ Low sleep causes evening crashes and bad habits.';
  }
  ls('sleep_' + APP_TODAY, { bed, wake, hrs, mins });
};

function loadSleep() {
  const s = ls('sleep_' + APP_TODAY);
  if (!s) return;
  const sb = document.getElementById('sleepBed');
  const sw = document.getElementById('sleepWake');
  if (sb) sb.value = s.bed;
  if (sw) sw.value = s.wake;
  calcSleep();
}

// ── ENERGY ──
window.setEnergy = function(el, val) {
  document.querySelectorAll('.energy-btn').forEach(b => b.classList.remove('sel'));
  el.classList.add('sel');
  ls('energy_' + APP_TODAY, val);
};
function loadEnergy() {
  const val = ls('energy_' + APP_TODAY);
  if (!val) return;
  document.querySelectorAll('.energy-btn').forEach(b => {
    if (b.getAttribute('onclick')?.includes(',' + val + ')')) b.classList.add('sel');
  });
}

// ── MOOD ──
window.setMood = function(el, mood) {
  document.querySelectorAll('.mood-btn').forEach(b => b.classList.remove('sel'));
  el.classList.add('sel');
  ls('mood_' + APP_TODAY, mood);
  saveDayScore();
};
function loadMood() {
  const mood = ls('mood_' + APP_TODAY);
  if (!mood) return;
  document.querySelectorAll('.mood-btn').forEach(b => {
    if (b.getAttribute('onclick')?.includes("'" + mood + "'")) b.classList.add('sel');
  });
}

// ── GRATITUDE ──
window.saveGratitude = function() {
  ls('grat_' + APP_TODAY, {
    g1: document.getElementById('grat1')?.value,
    g2: document.getElementById('grat2')?.value,
    g3: document.getElementById('grat3')?.value,
  });
  alert('Gratitude saved ✓');
};
function loadGratitude() {
  const g = ls('grat_' + APP_TODAY) || {};
  ['grat1','grat2','grat3'].forEach((id, i) => {
    const el = document.getElementById(id);
    if (el && g['g' + (i + 1)]) el.value = g['g' + (i + 1)];
  });
}

// ── PRAYERS ──
window.togglePrayer = function(name) {
  const el = document.getElementById('pr-' + name);
  if (!el) return;
  el.classList.toggle('done');
  const saved = ls('prayers_' + APP_TODAY) || {};
  saved[name] = el.classList.contains('done');
  ls('prayers_' + APP_TODAY, saved);
  const count = Object.values(saved).filter(Boolean).length;
  const hp  = document.getElementById('p-heroPrayers');  if (hp)  hp.textContent  = count + '/5';
  const hom = document.getElementById('h-prayers');      if (hom) hom.textContent = count + '/5';
  saveDayScore();
};
function loadPrayers() {
  const saved = ls('prayers_' + APP_TODAY) || {};
  Object.keys(saved).forEach(n => {
    if (saved[n]) document.getElementById('pr-' + n)?.classList.add('done');
  });
  const count = Object.values(saved).filter(Boolean).length;
  const hp  = document.getElementById('p-heroPrayers');  if (hp)  hp.textContent  = count + '/5';
  const hom = document.getElementById('h-prayers');      if (hom) hom.textContent = count + '/5';
}

// ── QTY HABITS ──
window.setQty = function(name, val, target) {
  const saved = ls('qty_' + APP_TODAY) || {};
  saved[name] = val;
  ls('qty_' + APP_TODAY, saved);
  const card  = document.getElementById('qh-' + name);
  const label = document.getElementById('qv-' + name);
  if (card) {
    card.querySelectorAll('.qty-btn').forEach(b => b.classList.remove('sel', 'ok'));
    const clicked = Array.from(card.querySelectorAll('.qty-btn'))
      .find(b => b.getAttribute('onclick')?.includes(',' + val + ','));
    if (clicked) clicked.classList.add(val >= target ? 'ok' : 'sel');
    if (val >= target) card.classList.add('done'); else card.classList.remove('done');
  }
  if (label) {
    if (name === 'water')  label.textContent = val + '/8 glasses';
    else if (name === 'quran') label.textContent = val === 1 ? 'Done ✓ Alhamdulillah' : 'Missed today';
    else label.textContent = val + ' pages';
  }
  saveDayScore();
};
function loadQty() {
  const saved = ls('qty_' + APP_TODAY) || {};
  if (saved.water !== undefined) setQty('water', saved.water, 8);
  if (saved.quran !== undefined) setQty('quran', saved.quran, 1);
  if (saved.book  !== undefined) setQty('book',  saved.book,  10);
}

// ── HABITS ──
window.toggleHabit = function(name) {
  const el = document.getElementById('h-' + name);
  if (!el) return;
  el.classList.toggle('done');
  const saved = ls('habits_' + APP_TODAY) || {};
  saved[name] = el.classList.contains('done');
  ls('habits_' + APP_TODAY, saved);
  updateHabitCount();
  saveDayScore();
};
function loadHabits() {
  const saved = ls('habits_' + APP_TODAY) || {};
  Object.keys(saved).forEach(n => {
    if (saved[n]) document.getElementById('h-' + n)?.classList.add('done');
  });
  updateHabitCount();
}
function updateHabitCount() {
  const saved = ls('habits_' + APP_TODAY) || {};
  const count = Object.values(saved).filter(Boolean).length;
  const el = document.getElementById('p-heroHabits');
  if (el) el.textContent = count + '/10';
}

// ── GYM DAYS ──
window.toggleGymDay = function(el, day) {
  el.classList.toggle('active');
  const active = Array.from(document.querySelectorAll('.gym-day-btn.active')).map(b => b.textContent);
  const label  = document.getElementById('gymDaysLabel');
  if (label) label.textContent = active.length ? 'Gym: ' + active.join(' · ') : 'No days selected yet';
};
window.saveGymDays = function() {
  const days = Array.from(document.querySelectorAll('.gym-day-btn.active')).map(b => b.textContent);
  if (days.length !== 3) { alert('Please select exactly 3 days'); return; }
  gymDays = days;
  ls('gymDays', days);
  const el = document.getElementById('h-workout-days');
  if (el) el.textContent = days.join(' · ');
  alert('Gym days saved: ' + days.join(', ') + ' ✓');
};
function loadGymDays() {
  const saved = ls('gymDays') || [];
  if (!saved.length) return;
  gymDays = saved;
  document.querySelectorAll('.gym-day-btn').forEach(b => {
    if (saved.includes(b.textContent)) b.classList.add('active');
  });
  const label = document.getElementById('gymDaysLabel');
  if (label) label.textContent = 'Gym: ' + saved.join(' · ');
  const el = document.getElementById('h-workout-days');
  if (el) el.textContent = saved.join(' · ');
}

// ── CLEAN DAYS ──
function loadCleanDays() {
  const d    = parseInt(ls('cleanDays')  || '0');
  const best = parseInt(ls('bestClean') || '0');
  const set  = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  set('p-cleanNum',    d);
  set('p-bestStreak',  'Best: ' + best + ' days');
  set('p-heroStreak',  d);
  set('h-streak',      d);
  set('prof-clean',    d);
  set('prof-best',     best);
  setStreakMsg(d);
}
function setStreakMsg(d) {
  const msgs = [
    'Start today. Every day counts.',
    'Day 1! Don\'t break the chain 🔥',
    '2 days! Brain already healing.',
    '3 days! You proved you can.',
    '4 days. Urges getting weaker.',
    '5 days! Real momentum.',
    '6 days. One more for a week!',
    '7 DAYS! New you is forming. 🏆',
  ];
  const el = document.getElementById('p-streakMsg');
  if (el) el.textContent = d >= 8 ? d + ' days clean. Absolutely winning. 🔥' : (msgs[d] || msgs[0]);
}
window.addCleanDay = function() {
  const d    = parseInt(ls('cleanDays') || '0') + 1;
  const best = Math.max(d, parseInt(ls('bestClean') || '0'));
  ls('cleanDays', d);
  ls('bestClean', best);
  const el = document.getElementById('p-cleanNum');
  if (el) { el.textContent = d; el.style.color = 'var(--green)'; el.style.transform = 'scale(1.2)'; setTimeout(() => { el.style.color = 'var(--gold)'; el.style.transform = 'scale(1)'; }, 400); }
  ['p-heroStreak','h-streak','prof-clean'].forEach(id => { const e = document.getElementById(id); if (e) e.textContent = d; });
  ['p-bestStreak'].forEach(id => { const e = document.getElementById(id); if (e) e.textContent = 'Best: ' + best + ' days'; });
  const pb = document.getElementById('prof-best'); if (pb) pb.textContent = best;
  setStreakMsg(d);
};
window.resetStreak = function() {
  if (confirm('Reset clean days to 0?')) { ls('cleanDays', 0); loadCleanDays(); }
};

// ── TASKS ──
function buildCatGrid() {
  const cats = ['🕌 Prayer','📖 Quran','💪 Workout','🔐 Cyber','💼 FG Biz','🧹 Cleanup','📚 Book','🛒 Grocery','💻 Work','➕ Other'];
  const grid = document.getElementById('catGrid');
  if (!grid) return;
  grid.innerHTML = cats.map(c => `<div class="cat-btn ${c === selectedCat ? 'sel' : ''}" onclick="selectCat(this,'${c}')">${c}</div>`).join('');
}
window.selectCat = function(el, cat) {
  document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('sel'));
  el.classList.add('sel');
  selectedCat = cat;
};
window.addTask = function() {
  const title  = document.getElementById('taskTitle')?.value.trim();
  const remark = document.getElementById('taskRemark')?.value.trim();
  if (!title) return;
  const tasks = ls('tasks_' + APP_TODAY) || [];
  tasks.push({ id: Date.now(), title, remark, cat: selectedCat, done: false });
  ls('tasks_' + APP_TODAY, tasks);
  document.getElementById('taskTitle').value  = '';
  document.getElementById('taskRemark').value = '';
  renderTasks();
};
function renderTasks() {
  const tasks = ls('tasks_' + APP_TODAY) || [];
  const el    = document.getElementById('p-tasksList');
  if (!el) return;
  if (!tasks.length) { el.innerHTML = '<div class="empty">No tasks yet</div>'; return; }
  el.innerHTML = tasks.map(t => `
    <div class="task-item ${t.done ? 'done' : ''}">
      <div class="task-chk" onclick="toggleTask(${t.id})"><span style="color:white;font-size:11px;${t.done ? '' : 'opacity:0'}">✓</span></div>
      <div class="task-body">
        <div class="task-name">${t.title}</div>
        ${t.remark ? `<div class="task-rem">${t.remark}</div>` : ''}
        <span class="task-badge">${t.cat}</span>
      </div>
      <button class="del-btn" onclick="deleteTask(${t.id})">✕</button>
    </div>`).join('');
}
window.toggleTask = function(id) {
  const tasks = ls('tasks_' + APP_TODAY) || [];
  const t = tasks.find(t => t.id === id);
  if (t) t.done = !t.done;
  ls('tasks_' + APP_TODAY, tasks);
  renderTasks();
};
window.deleteTask = function(id) {
  ls('tasks_' + APP_TODAY, (ls('tasks_' + APP_TODAY) || []).filter(t => t.id !== id));
  renderTasks();
};

// ── WINS ──
window.addWin = function() {
  const val = document.getElementById('winInput')?.value.trim();
  if (!val) return;
  const wins = ls('wins_' + APP_TODAY) || [];
  wins.push(val);
  ls('wins_' + APP_TODAY, wins);
  document.getElementById('winInput').value = '';
  renderWins();
  const hw = document.getElementById('p-heroWins');
  if (hw) hw.textContent = wins.length;
};
function renderWins() {
  const wins = ls('wins_' + APP_TODAY) || [];
  const el   = document.getElementById('p-winsList');
  if (!el) return;
  if (!wins.length) { el.innerHTML = '<div class="empty">No wins yet</div>'; return; }
  el.innerHTML = wins.map((w, i) => `
    <div class="win-item">
      <div class="win-dot"></div>
      <div class="win-txt">${w}</div>
      <button class="del-btn" onclick="deleteWin(${i})">✕</button>
    </div>`).join('');
  const hw = document.getElementById('p-heroWins');
  if (hw) hw.textContent = wins.length;
}
window.deleteWin = function(idx) {
  const wins = ls('wins_' + APP_TODAY) || [];
  wins.splice(idx, 1);
  ls('wins_' + APP_TODAY, wins);
  renderWins();
};

// ── GROCERY ──
window.loadBaseGrocery = function() {
  const wk       = getWeekKey();
  const existing = ls('grocery_' + wk) || [];
  const ids      = existing.map(i => i.text);
  BASE_GROCERY.forEach(text => {
    if (!ids.includes(text)) existing.push({ id: Date.now() + Math.random(), text, bought: false });
  });
  ls('grocery_' + wk, existing);
  renderGrocery();
};
window.addGrocery = function() {
  const val = document.getElementById('groceryInput')?.value.trim();
  if (!val) return;
  const wk    = getWeekKey();
  const items = ls('grocery_' + wk) || [];
  items.push({ id: Date.now(), text: val, bought: false });
  ls('grocery_' + wk, items);
  document.getElementById('groceryInput').value = '';
  renderGrocery();
};
function renderGrocery() {
  const wk    = getWeekKey();
  const items = ls('grocery_' + wk) || [];
  const el    = document.getElementById('p-groceryList');
  if (!el) return;
  if (!items.length) { el.innerHTML = '<div class="empty">Tap load base list or add items</div>'; return; }
  const bought = items.filter(i => i.bought).length;
  el.innerHTML = `<div style="font-size:11px;color:var(--muted);margin-bottom:8px;font-family:'DM Mono',monospace;">${bought}/${items.length} items got</div>` +
    items.map(item => `
      <div class="g-item ${item.bought ? 'bought' : ''}">
        <div class="g-chk" onclick="toggleGrocery(${item.id})"><span style="color:white;font-size:11px;${item.bought ? '' : 'opacity:0'}">✓</span></div>
        <span class="g-txt">${item.text}</span>
        <button class="del-btn" onclick="deleteGrocery(${item.id})">✕</button>
      </div>`).join('');
}
window.toggleGrocery = function(id) {
  const wk    = getWeekKey();
  const items = ls('grocery_' + wk) || [];
  const item  = items.find(i => i.id === id);
  if (item) item.bought = !item.bought;
  ls('grocery_' + wk, items);
  renderGrocery();
};
window.deleteGrocery = function(id) {
  const wk = getWeekKey();
  ls('grocery_' + wk, (ls('grocery_' + wk) || []).filter(i => i.id !== id));
  renderGrocery();
};
window.resetGrocery = function() {
  if (confirm('Clear grocery list for new week?')) {
    localStorage.removeItem('grocery_' + getWeekKey());
    renderGrocery();
  }
};

// ── CLEANUP ──
window.toggleClean = function(el, key) {
  el.classList.toggle('done');
  const saved = ls('cleanup') || {};
  saved[key]  = el.classList.contains('done');
  ls('cleanup', saved);
};
function loadCleanup() {
  const saved = ls('cleanup') || {};
  document.querySelectorAll('.tog').forEach(el => {
    const oc    = el.getAttribute('onclick') || '';
    const match = oc.match(/'([^']+)'\)/);
    if (match && saved[match[1]]) el.classList.add('done');
  });
}
window.showCleanTab = function(tab) {
  ['daily','weekly','monthly','rooms'].forEach(t => {
    const el = document.getElementById('clean-' + t);
    if (el) el.style.display = t === tab ? 'block' : 'none';
  });
  const tabMap = { daily: 0, weekly: 1, monthly: 2, rooms: 3 };
  document.querySelectorAll('#p-cleanup .btn').forEach((b, i) => {
    b.className = 'btn btn-sm ' + (i === tabMap[tab] ? 'btn-gold' : 'btn-ghost');
  });
};

// ── JOURNAL ──
window.saveJournal = function() {
  ls('journal_' + APP_TODAY, document.getElementById('journalText')?.value);
  alert('Saved ✓');
};
function loadJournal() {
  const s  = ls('journal_' + APP_TODAY);
  const el = document.getElementById('journalText');
  if (s && el) el.value = s;
}
window.saveReview = function() {
  ls('review_' + getWeekKey(), {
    r1: document.getElementById('rev1')?.value,
    r2: document.getElementById('rev2')?.value,
    r3: document.getElementById('rev3')?.value,
    r4: document.getElementById('rev4')?.value,
  });
  alert('Weekly review saved ✓');
};
function loadReview() {
  const r = ls('review_' + getWeekKey()) || {};
  ['rev1','rev2','rev3','rev4'].forEach((id, i) => {
    const el = document.getElementById(id);
    if (el && r['r' + (i + 1)]) el.value = r['r' + (i + 1)];
  });
}
window.saveUpgradeNotes = function() {
  ls('upgradeNotes', document.getElementById('upgradeNotes')?.value);
  alert('Saved ✓ Bring to mentor after 7 days.');
};
function loadUpgradeNotes() {
  const s  = ls('upgradeNotes');
  const el = document.getElementById('upgradeNotes');
  if (s && el) el.value = s;
}

// ── IDEAS ──
window.addIdea = function() {
  const val = document.getElementById('ideaInput')?.value.trim();
  const cat = document.getElementById('ideaCat')?.value;
  if (!val) return;
  const ideas = ls('ideas') || [];
  ideas.unshift({
    id: Date.now(), text: val, cat,
    date: new Date().toLocaleDateString('en-GB', { month: 'short', day: 'numeric' }),
  });
  ls('ideas', ideas);
  document.getElementById('ideaInput').value = '';
  renderIdeas();
};
function renderIdeas() {
  const ideas    = ls('ideas') || [];
  const filtered = ideaFilter === 'All' ? ideas : ideas.filter(i => i.cat === ideaFilter);
  const el       = document.getElementById('p-ideasList');
  if (!el) return;
  if (!filtered.length) { el.innerHTML = '<div class="empty">No ideas yet</div>'; return; }
  el.innerHTML = filtered.map(idea => `
    <div class="idea-item">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
        <span class="idea-badge idea-${idea.cat}">${idea.cat}</span>
        <button class="del-btn" onclick="deleteIdea(${idea.id})">✕</button>
      </div>
      <div class="idea-text">${idea.text}</div>
      <div class="idea-date">${idea.date}</div>
    </div>`).join('');
}
window.filterIdeas = function(el, cat) {
  document.querySelectorAll('.cf').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
  ideaFilter = cat;
  renderIdeas();
};
window.deleteIdea = function(id) {
  ls('ideas', (ls('ideas') || []).filter(i => i.id !== id));
  renderIdeas();
};

// ── BOOKS ──
window.updateBook = function(n, delta) {
  const total = BOOKS[n - 1].pages;
  let p = parseInt(ls('book' + n) || '0') + delta;
  p = Math.max(0, Math.min(total, p));
  ls('book' + n, p);
  const ep = document.getElementById('b' + n + 'p');
  const ef = document.getElementById('b' + n + 'f');
  if (ep) ep.textContent = p + '/' + total;
  if (ef) ef.style.width  = Math.round((p / total) * 100) + '%';
};
function loadBooks() {
  BOOKS.forEach((b, i) => {
    const n  = i + 1;
    const p  = parseInt(ls('book' + n) || '0');
    const ep = document.getElementById('b' + n + 'p');
    const ef = document.getElementById('b' + n + 'f');
    if (ep) ep.textContent = p + '/' + b.pages;
    if (ef) ef.style.width  = Math.round((p / b.pages) * 100) + '%';
  });
}

// ── REPS ──
window.saveReps = function(key, val) { ls('reps_' + key, val); };
function loadReps() {
  ['a1','a2','a3','a4','a5','b1','b2','b3','b4','b5','c1','c2','c3','c4','c5'].forEach(k => {
    const val = ls('reps_' + k);
    const el  = document.getElementById('ex-' + k);
    if (el && val) el.value = val;
  });
}

// ── PROGRESS PAGE ──
window.updateProgressPage = function() {
  const prayers  = Object.values(ls('prayers_' + APP_TODAY) || {}).filter(Boolean).length;
  const habits   = Object.values(ls('habits_'  + APP_TODAY) || {}).filter(Boolean).length;
  const qty      = ls('qty_'   + APP_TODAY) || {};
  const sched    = (ls('sched_' + APP_TODAY) || []).filter(Boolean).length;
  const wins     = (ls('wins_'  + APP_TODAY) || []).length;

  const spiritual = Math.round(((prayers / 5) * .7 + (qty.quran >= 1 ? .3 : 0)) * 100);
  const physical  = Math.round(((habits / 10) * .5 + (qty.water >= 8 ? .3 : 0) + (qty.book >= 10 ? .2 : 0)) * 100);
  const career    = Math.round((sched / SCHED.length) * 100);
  const mental    = Math.min(100, Math.round((wins / 3) * 100));
  const overall   = Math.round((spiritual + physical + career + mental) / 4);

  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  set('p-lifeScore', overall);
  const sub = document.getElementById('p-lifeScoreSub');
  if (sub) {
    if (overall >= 80) sub.textContent = 'Exceptional. You are winning 🔥';
    else if (overall >= 60) sub.textContent = 'Strong day. Keep pushing.';
    else if (overall >= 40) sub.textContent = 'Getting there. Don\'t stop.';
    else sub.textContent = 'Every journey starts somewhere. Begin.';
  }

  [['spiritual', spiritual, 'var(--gold)'], ['physical', physical, 'var(--green)'],
   ['career', career, 'var(--orange)'],    ['mental',   mental,   'var(--blue)']
  ].forEach(([area, val, color]) => {
    const sa = document.getElementById('sa-' + area);
    const sv = document.getElementById('sv-' + area);
    if (sa) { sa.style.width = val + '%'; sa.style.background = color; }
    if (sv) sv.textContent = val + '%';
  });

  buildCalendar();
};

window.updateProfilePage = function() {
  const diff = daysSinceStart();
  const pct  = Math.round((diff / 90) * 100);
  const set  = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  set('prof-day',        diff);
  set('prof-clean',      ls('cleanDays') || 0);
  set('prof-best',       ls('bestClean') || 0);
};

function buildCalendar() {
  const grid  = document.getElementById('p-calGrid');
  if (!grid) return;
  const today = new Date();
  let html    = '';
  for (let i = 29; i >= 0; i--) {
    const d     = new Date(today);
    d.setDate(d.getDate() - i);
    const key   = d.toDateString();
    const score = parseInt(ls('score_' + key) || '-1');
    const isToday = key === APP_TODAY;
    let cls = 'cal-day';
    if (score < 0)       cls += ' cal-missed';
    else if (score >= 80) cls += ' cal-great';
    else if (score >= 50) cls += ' cal-good';
    else if (score > 0)   cls += ' cal-partial';
    else                  cls += ' cal-missed';
    if (isToday) cls += ' cal-today';
    html += `<div class="${cls}">${d.getDate()}</div>`;
  }
  grid.innerHTML = html;
}

// ── INIT PERSONAL ──
window.initPersonal = function() {
  injectPersonalPages();

  // set day number in hero
  const dn = document.getElementById('p-dayNum');
  if (dn) dn.textContent = daysSinceStart();

  // set date in journal
  const jdl = document.getElementById('journalDateLabel');
  if (jdl) jdl.textContent = new Date().toLocaleDateString('en-GB', { weekday:'long', year:'numeric', month:'long', day:'numeric' });

  renderSchedule();
  buildCatGrid();
  loadPrayers();
  loadQty();
  loadHabits();
  loadCleanDays();
  loadMood();
  loadGratitude();
  loadSleep();
  loadEnergy();
  loadGymDays();
  renderTasks();
  renderWins();
  renderGrocery();
  loadCleanup();
  loadJournal();
  loadReview();
  loadUpgradeNotes();
  loadBooks();
  loadReps();
  renderIdeas();
};
