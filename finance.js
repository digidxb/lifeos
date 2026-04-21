// ============================================================
// finance.js
// Edit this file for: expenses, income, debt, credit card,
// savings, net worth, remittance — anything Finance OS
// ============================================================

'use strict';

// ============================================================
// PAGE HTML BUILDERS
// ============================================================

function buildOverviewPage() {
  return `
<div class="page" id="f-overview">
  <div class="fin-hero">
    <div class="hero-tag">Finance OS · Faizy</div>
    <div class="hero-name" style="color:white;">FINANCE</div>
    <div class="hero-sub">"Every dirham tracked is a dirham controlled."</div>
    <div class="g2" style="gap:10px;margin-bottom:12px;">
      <div class="fin-card"><div class="fin-card-l">Monthly Salary</div><div class="fin-card-v" style="color:#4dff91;">AED 8,300</div></div>
      <div class="fin-card"><div class="fin-card-l">This Month Spent</div><div class="fin-card-v" style="color:#ff6b6b;" id="f-totalSpent">AED 0</div></div>
      <div class="fin-card"><div class="fin-card-l">Available</div><div class="fin-card-v" style="color:#4d9fff;" id="f-available">AED 8,300</div></div>
      <div class="fin-card"><div class="fin-card-l">Total Saved</div><div class="fin-card-v" style="color:#ffd700;" id="f-totalSaved">AED 0</div></div>
    </div>
    <div class="alert alert-red" style="margin-bottom:0;">
      <strong>⚠️ CC Alert:</strong> AED 20,000+ rotating. Pay AED 1,500/month minimum. Clear in ~14 months. Stop using card today.
    </div>
  </div>

  <!-- MONTHLY BUDGET -->
  <div class="sec">📊 Monthly Budget</div>
  <div class="card">
    <div class="budget-row"><div class="budget-cat">🏠 Rent + Bills</div>      <div class="budget-right"><div class="budget-spent ok" id="b-rent">AED 0</div>      <div class="budget-limit">Limit: AED 2,500</div></div></div>
    <div class="budget-row"><div class="budget-cat">🍳 Food + Grocery</div>    <div class="budget-right"><div class="budget-spent" id="b-food">AED 0</div>          <div class="budget-limit">Limit: AED 800</div></div></div>
    <div class="budget-row"><div class="budget-cat">🚗 Transport</div>          <div class="budget-right"><div class="budget-spent" id="b-transport">AED 0</div>     <div class="budget-limit">Limit: AED 300</div></div></div>
    <div class="budget-row"><div class="budget-cat">🇮🇳 India Remittance</div>  <div class="budget-right"><div class="budget-spent" id="b-india">AED 0</div>        <div class="budget-limit">Fixed: AED 1,500</div></div></div>
    <div class="budget-row"><div class="budget-cat">💳 Card Payment</div>       <div class="budget-right"><div class="budget-spent" id="b-card">AED 0</div>          <div class="budget-limit">Min: AED 1,500</div></div></div>
    <div class="budget-row"><div class="budget-cat">🎉 Entertainment</div>      <div class="budget-right"><div class="budget-spent" id="b-fun">AED 0</div>           <div class="budget-limit">Limit: AED 300</div></div></div>
    <div class="budget-row" style="border-top:2px solid var(--border);padding-top:14px;margin-top:4px;">
      <div class="budget-cat" style="color:var(--green);font-weight:700;">💰 To Save</div>
      <div class="budget-right"><div class="budget-spent" style="color:var(--green);font-family:'DM Mono',monospace;font-size:13px;font-weight:700;" id="b-save">AED 900</div><div class="budget-limit">Target: AED 900+</div></div>
    </div>
  </div>

  <!-- NO SPEND -->
  <div class="sec">🚫 No Spend Days</div>
  <div class="card">
    <div style="font-size:12px;color:var(--muted);margin-bottom:10px;">Tap a day — green = no unnecessary spending</div>
    <div class="ns-grid" id="f-nsGrid"></div>
    <div style="display:flex;gap:12px;margin-top:10px;align-items:center;flex-wrap:wrap;">
      <div style="display:flex;align-items:center;gap:5px;font-size:11px;color:var(--muted);"><div style="width:12px;height:12px;border-radius:3px;background:var(--green)"></div>Clean</div>
      <div style="display:flex;align-items:center;gap:5px;font-size:11px;color:var(--muted);"><div style="width:12px;height:12px;border-radius:3px;background:var(--red-l);border:1px solid var(--red)"></div>Spent</div>
      <div style="font-family:'DM Mono',monospace;font-size:11px;color:var(--green);font-weight:700;" id="ns-count">0 clean days</div>
    </div>
  </div>
</div>`;
}

function buildExpensesPage() {
  return `
<div class="page" id="f-expenses">

  <!-- LOG EXPENSE -->
  <div class="sec">➕ Log Expense</div>
  <div class="card">
    <div class="inp-row">
      <input class="inp" id="spendDesc"   placeholder="What did you spend on?" style="flex:1;margin-bottom:0;">
      <input class="inp" id="spendAmount" type="number" placeholder="AED" style="width:90px;margin-bottom:0;">
    </div>
    <select class="inp mt8" id="spendCat">
      <option value="🏠 Rent/Bills">🏠 Rent/Bills</option>
      <option value="🍳 Food">🍳 Food</option>
      <option value="🛒 Grocery">🛒 Grocery</option>
      <option value="🚗 Transport">🚗 Transport</option>
      <option value="🇮🇳 India Remittance">🇮🇳 India Remittance</option>
      <option value="💳 Card Payment">💳 Card Payment</option>
      <option value="🎉 Entertainment">🎉 Entertainment</option>
      <option value="🧴 Personal Care">🧴 Personal Care</option>
      <option value="📱 Phone/Internet">📱 Phone/Internet</option>
      <option value="💼 FG Business">💼 FG Business</option>
      <option value="⚠️ Bad Habit">⚠️ Bad Habit</option>
      <option value="➕ Other">➕ Other</option>
    </select>
    <button class="btn btn-green btn-full" onclick="addExpense()">+ Log Expense</button>
  </div>

  <!-- LOG INCOME -->
  <div class="sec">💵 Log Income</div>
  <div class="card">
    <div class="inp-row">
      <input class="inp" id="incomeDesc"   placeholder="Income description…"  style="flex:1;margin-bottom:0;">
      <input class="inp" id="incomeAmount" type="number" placeholder="AED" style="width:90px;margin-bottom:0;">
    </div>
    <select class="inp mt8" id="incomeCat">
      <option value="💼 Salary">💼 Salary</option>
      <option value="💰 FG Business">💰 FG Business</option>
      <option value="🎁 Bonus">🎁 Bonus</option>
      <option value="📈 Investment">📈 Investment</option>
      <option value="🤝 Freelance">🤝 Freelance</option>
      <option value="💸 Extra Income">💸 Extra Income</option>
      <option value="➕ Other Income">➕ Other Income</option>
    </select>
    <button class="btn btn-blue btn-full" onclick="addIncome()">+ Log Income</button>
  </div>

  <!-- TODAY -->
  <div class="sec">📅 Today</div>
  <div class="card card-sm" style="margin-bottom:10px;">
    <div class="flex-between">
      <span style="font-size:13px;font-weight:600;">Today Spent</span>
      <span class="mono" style="font-size:18px;font-weight:700;color:var(--red);" id="f-todayTotal">AED 0</span>
    </div>
    <div style="font-size:11px;color:var(--muted);margin-top:2px;">Daily budget: AED 150 recommended</div>
  </div>
  <div id="f-todayList"><div class="empty">No transactions today</div></div>

  <!-- THIS MONTH -->
  <div class="sec">📊 This Month by Category</div>
  <div class="card" id="f-monthlyCats"><div class="empty">No expenses yet</div></div>

  <!-- INCOME THIS MONTH -->
  <div class="sec">💵 Income This Month</div>
  <div class="card" id="f-incomeList"><div class="empty">No income logged yet</div></div>

</div>`;
}

function buildDebtPage() {
  return `
<div class="page" id="f-debt">

  <!-- CREDIT CARD -->
  <div class="sec">💳 Credit Card</div>
  <div class="pill pill-red mb8">⚠️ Priority #1 — Stop the cycle</div>

  <div class="cc-card">
    <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:14px;">
      <div>
        <div style="font-size:9px;color:rgba(255,255,255,.4);font-family:'DM Mono',monospace;letter-spacing:2px;text-transform:uppercase;margin-bottom:4px;" id="cc-bankName">BANK NAME</div>
        <div style="font-family:'DM Mono',monospace;font-size:12px;color:rgba(255,255,255,.5);letter-spacing:2px;">CREDIT CARD</div>
      </div>
      <div style="text-align:right;">
        <div style="font-family:'Bebas Neue',sans-serif;font-size:36px;color:#ff6b6b;line-height:1;" id="cc-balance">AED 20,000</div>
        <div style="font-size:10px;color:rgba(255,255,255,.35);">Outstanding</div>
      </div>
    </div>
    <div class="g3" style="margin-bottom:12px;">
      <div style="background:rgba(255,255,255,.08);border-radius:8px;padding:10px;text-align:center;">
        <div style="font-family:'DM Mono',monospace;font-size:13px;font-weight:600;color:white;" id="cc-limit">25,000</div>
        <div style="font-size:9px;color:rgba(255,255,255,.35);margin-top:2px;">LIMIT</div>
      </div>
      <div style="background:rgba(255,255,255,.08);border-radius:8px;padding:10px;text-align:center;">
        <div style="font-family:'DM Mono',monospace;font-size:13px;font-weight:600;color:white;" id="cc-minpay">1,500</div>
        <div style="font-size:9px;color:rgba(255,255,255,.35);margin-top:2px;">PAYMENT</div>
      </div>
      <div style="background:rgba(255,255,255,.08);border-radius:8px;padding:10px;text-align:center;">
        <div style="font-family:'DM Mono',monospace;font-size:13px;font-weight:600;" id="cc-daysLeft">--</div>
        <div style="font-size:9px;color:rgba(255,255,255,.35);margin-top:2px;">DAYS TO DUE</div>
      </div>
    </div>
    <div style="background:rgba(255,255,255,.08);border-radius:8px;padding:10px;margin-bottom:8px;font-size:12px;color:rgba(255,255,255,.7);" id="cc-dueAlert">📅 Set due date below</div>
    <div style="background:rgba(42,157,111,.15);border-radius:8px;padding:10px;margin-bottom:10px;font-size:12px;color:#4dff91;" id="cc-payoffInfo">🎯 Payoff date: set payment amount below</div>
    <div style="background:rgba(255,215,0,.1);border-radius:8px;padding:8px 10px;font-size:12px;color:#ffd700;" id="cc-cashbackDisplay">💰 Total cashback received: AED 0</div>
    <div style="margin-top:12px;">
      <div style="display:flex;justify-content:space-between;font-size:10px;color:rgba(255,255,255,.4);margin-bottom:4px;"><span>Used</span><span id="cc-pct">80%</span></div>
      <div style="background:rgba(255,255,255,.1);border-radius:100px;height:6px;overflow:hidden;">
        <div style="height:100%;background:linear-gradient(90deg,var(--red),var(--orange));border-radius:100px;transition:width .5s;" id="cc-prog"></div>
      </div>
    </div>
  </div>

  <!-- UPDATE CC -->
  <div class="card">
    <div class="card-title">Update Card Details</div>
    <div class="inp-row">
      <input class="inp" id="cc-bank-inp" placeholder="Bank name (e.g. Emirates NBD)" style="flex:1;margin-bottom:0;">
      <input class="inp" id="cc-bal-inp"  type="number" placeholder="Current balance AED" style="flex:1;margin-bottom:0;">
    </div>
    <div class="inp-row mt8">
      <input class="inp" id="cc-lim-inp"  type="number" placeholder="Credit limit AED" style="flex:1;margin-bottom:0;">
      <input class="inp" id="cc-pay-inp"  type="number" placeholder="Monthly payment AED" style="flex:1;margin-bottom:0;">
    </div>
    <div class="inp-row mt8">
      <input class="inp" id="cc-due-inp"      type="date" style="flex:1;margin-bottom:0;">
      <input class="inp" id="cc-cashback-inp" type="number" placeholder="Cashback received AED" style="flex:1;margin-bottom:0;">
    </div>
    <button class="btn btn-green btn-full mt8" onclick="updateCC()">Update Card Details</button>
  </div>

  <!-- LOG CC TRANSACTION -->
  <div class="card">
    <div class="card-title">Log Card Transaction</div>
    <div class="inp-row">
      <input class="inp" id="cc-txn-desc" placeholder="Description" style="flex:1;margin-bottom:0;">
      <input class="inp" id="cc-txn-amt"  type="number" placeholder="AED" style="width:90px;margin-bottom:0;">
    </div>
    <select class="inp mt8" id="cc-txn-type">
      <option value="charge">💳 Charge (new spend on card)</option>
      <option value="payment">✅ Payment made to card</option>
    </select>
    <input class="inp" id="cc-txn-reason" placeholder="Reason (e.g. groceries, emergency)">
    <button class="btn btn-red btn-full" onclick="logCCTxn()">Log Transaction</button>
    <div style="margin-top:12px;" id="cc-txn-list"><div class="empty">No transactions yet</div></div>
  </div>

  <!-- STRATEGY -->
  <div class="card">
    <div class="card-title">🎯 Payoff Strategy</div>
    <div class="food-item"><div class="food-dot" style="background:var(--red)"></div><strong>Step 1:</strong> Stop using card for new purchases. Cash/debit only.</div>
    <div class="food-item"><div class="food-dot" style="background:var(--orange)"></div><strong>Step 2:</strong> Pay AED 1,500/month minimum — not just minimum due</div>
    <div class="food-item"><div class="food-dot" style="background:var(--gold)"></div><strong>Step 3:</strong> Any extra income — card first</div>
    <div class="food-item"><div class="food-dot" style="background:var(--green)"></div><strong>Step 4:</strong> Card at zero → redirect all to savings</div>
    <div class="food-tip" id="cc-strategy">💡 At AED 1,500/month: cleared in ~14 months. Stay consistent.</div>
  </div>

  <!-- OTHER DEBTS -->
  <div class="sec">➕ Other Debts</div>
  <div class="card">
    <input class="inp" id="debt-name"    placeholder="Debt name (e.g. Personal loan)">
    <div class="inp-row">
      <input class="inp" id="debt-amt"     type="number" placeholder="Total amount AED" style="flex:1;margin-bottom:0;">
      <input class="inp" id="debt-monthly" type="number" placeholder="Monthly payment" style="flex:1;margin-bottom:0;">
    </div>
    <div class="inp-row mt8">
      <input class="inp" id="debt-due"    type="date" style="flex:1;margin-bottom:0;">
      <input class="inp" id="debt-reason" placeholder="Reason" style="flex:1;margin-bottom:0;">
    </div>
    <button class="btn btn-green btn-full mt8" onclick="addDebt()">+ Add Debt</button>
  </div>
  <div id="f-debtList"></div>

</div>`;
}

function buildSavingsPage() {
  return `
<div class="page" id="f-savings">

  <!-- OVERVIEW -->
  <div class="sec">💰 Savings Overview</div>
  <div class="card">
    <div class="g2 mb16">
      <div class="sbox"><div class="sbox-num c-green" id="s-total">0</div><div class="sbox-label">TOTAL SAVED (AED)</div></div>
      <div class="sbox"><div class="sbox-num c-gold"  id="s-month">0</div><div class="sbox-label">THIS MONTH (AED)</div></div>
    </div>
    <div class="inp-row">
      <input class="inp" id="s-amt"  type="number" placeholder="Amount (AED)" style="flex:1;margin-bottom:0;">
      <input class="inp" id="s-note" placeholder="Note (optional)" style="flex:1;margin-bottom:0;">
    </div>
    <button class="btn btn-green btn-full mt8" onclick="addSaving()">+ Add Saving</button>
    <div style="margin-top:12px;" id="s-history"><div class="empty">No savings logged yet</div></div>
  </div>

  <!-- MILESTONES -->
  <div class="sec">🏆 Milestones</div>
  <div class="milestone" id="mil-1000">
    <div class="mil-row"><div><div class="mil-name">🥉 AED 1,000 — Emergency buffer starts</div></div><div class="mil-amt">1,000</div></div>
    <div class="pbar"><div class="pbar-fill" id="mil-1000-fill" style="width:0%"></div></div>
    <div style="font-size:11px;color:var(--muted);margin-top:4px;" id="mil-1000-sub">0 / 1,000</div>
  </div>
  <div class="milestone" id="mil-5000">
    <div class="mil-row"><div><div class="mil-name">🥈 AED 5,000 — One month fund</div></div><div class="mil-amt">5,000</div></div>
    <div class="pbar"><div class="pbar-fill" id="mil-5000-fill" style="width:0%"></div></div>
    <div style="font-size:11px;color:var(--muted);margin-top:4px;" id="mil-5000-sub">0 / 5,000</div>
  </div>
  <div class="milestone" id="mil-10000">
    <div class="mil-row"><div><div class="mil-name">🥇 AED 10,000 — Real security begins</div></div><div class="mil-amt">10,000</div></div>
    <div class="pbar"><div class="pbar-fill" id="mil-10000-fill" style="width:0%"></div></div>
    <div style="font-size:11px;color:var(--muted);margin-top:4px;" id="mil-10000-sub">0 / 10,000</div>
  </div>
  <div class="milestone" id="mil-25000">
    <div class="mil-row"><div><div class="mil-name">💎 AED 25,000 — 3 months fund + financially free feeling</div></div><div class="mil-amt">25,000</div></div>
    <div class="pbar"><div class="pbar-fill" id="mil-25000-fill" style="width:0%"></div></div>
    <div style="font-size:11px;color:var(--muted);margin-top:4px;" id="mil-25000-sub">0 / 25,000</div>
  </div>

  <!-- REMITTANCE -->
  <div class="sec">🇮🇳 India Remittance</div>
  <div class="card">
    <div class="g3 mb16">
      <div class="sbox"><div class="sbox-num" style="color:var(--blue);" id="r-month">0</div><div class="sbox-label">THIS MONTH</div></div>
      <div class="sbox"><div class="sbox-num" style="color:var(--blue);" id="r-total">0</div><div class="sbox-label">ALL TIME</div></div>
      <div class="sbox"><div class="sbox-num c-gold" id="r-count">0</div><div class="sbox-label">TRANSFERS</div></div>
    </div>
    <div class="inp-row">
      <input class="inp" id="r-amt"  type="number" placeholder="Amount (AED)" style="flex:1;margin-bottom:0;">
      <input class="inp" id="r-note" placeholder="Note" style="flex:1;margin-bottom:0;">
    </div>
    <button class="btn btn-blue btn-full mt8" onclick="addRemittance()">+ Log Transfer to India</button>
    <div style="margin-top:12px;" id="r-list"><div class="empty">No transfers yet</div></div>
  </div>

</div>`;
}

function buildNetworthPage() {
  return `
<div class="page" id="f-networth">

  <div class="nw-card">
    <div class="hero-tag">NET WORTH</div>
    <div class="nw-num" id="nw-total" style="color:#4dff91;">AED 0</div>
    <div style="font-size:12px;color:rgba(255,255,255,.4);margin-bottom:16px;">Assets minus Liabilities</div>
    <div class="g2">
      <div style="background:rgba(42,157,111,.15);border-radius:10px;padding:12px;">
        <div style="font-size:10px;color:rgba(255,255,255,.4);margin-bottom:4px;">TOTAL ASSETS</div>
        <div style="font-family:'Bebas Neue',sans-serif;font-size:28px;color:#4dff91;" id="nw-assets">0</div>
      </div>
      <div style="background:rgba(217,95,75,.15);border-radius:10px;padding:12px;">
        <div style="font-size:10px;color:rgba(255,255,255,.4);margin-bottom:4px;">TOTAL LIABILITIES</div>
        <div style="font-family:'Bebas Neue',sans-serif;font-size:28px;color:#ff6b6b;" id="nw-liabilities">0</div>
      </div>
    </div>
  </div>

  <!-- ASSETS -->
  <div class="sec">📈 Assets</div>
  <div class="card">
    <div id="assetsList"><div class="empty">No assets added yet</div></div>
    <div style="padding-top:14px;border-top:1px solid var(--border);margin-top:8px;">
      <div style="font-size:14px;font-weight:700;margin-bottom:10px;">+ Add Asset</div>
      <input class="inp" id="asset-name" placeholder="Asset name (e.g. Cash savings, FG Business value)">
      <div class="inp-row">
        <input class="inp" id="asset-val" type="number" placeholder="Value (AED)" style="flex:1;margin-bottom:0;">
        <select class="inp" id="asset-type" style="flex:1;margin-bottom:0;">
          <option value="💵 Cash">💵 Cash</option>
          <option value="🏦 Savings">🏦 Savings</option>
          <option value="💼 FG Business">💼 FG Business</option>
          <option value="🥇 Gold/Jewellery">🥇 Gold/Jewellery</option>
          <option value="🚗 Vehicle">🚗 Vehicle</option>
          <option value="📈 Investment">📈 Investment</option>
          <option value="➕ Other">➕ Other</option>
        </select>
      </div>
      <button class="btn btn-green btn-full mt8" onclick="addAsset()">+ Add Asset</button>
    </div>
  </div>

  <!-- LIABILITIES -->
  <div class="sec">📉 Liabilities</div>
  <div class="card">
    <div id="liabilitiesList"><div class="empty">No liabilities added yet</div></div>
    <div style="padding-top:14px;border-top:1px solid var(--border);margin-top:8px;">
      <div style="font-size:14px;font-weight:700;margin-bottom:10px;">+ Add Liability</div>
      <input class="inp" id="liab-name" placeholder="Liability name (e.g. Credit card, Loan)">
      <div class="inp-row">
        <input class="inp" id="liab-val" type="number" placeholder="Amount owed (AED)" style="flex:1;margin-bottom:0;">
        <input class="inp" id="liab-due" type="date" style="flex:1;margin-bottom:0;">
      </div>
      <button class="btn btn-red btn-full mt8" onclick="addLiability()">+ Add Liability</button>
    </div>
  </div>

</div>`;
}

function buildReportsPage() {
  return `
<div class="page" id="f-reports">

  <div class="sec">📊 Monthly Summary</div>
  <div class="card">
    <div class="g2">
      <div class="sbox"><div style="font-size:10px;color:var(--muted);margin-bottom:4px;">INCOME</div><div class="sbox-num c-green">8,300</div></div>
      <div class="sbox"><div style="font-size:10px;color:var(--muted);margin-bottom:4px;">SPENT</div>  <div class="sbox-num c-red"   id="rep-spent">0</div></div>
      <div class="sbox"><div style="font-size:10px;color:var(--muted);margin-bottom:4px;">SAVED</div>  <div class="sbox-num c-gold"  id="rep-saved">0</div></div>
      <div class="sbox"><div style="font-size:10px;color:var(--muted);margin-bottom:4px;">TO INDIA</div><div class="sbox-num" style="color:var(--blue);" id="rep-india">0</div></div>
    </div>
  </div>

  <div class="sec">📈 Spending by Category</div>
  <div class="card" id="f-catBreakdown"><div class="empty">No expenses yet</div></div>

  <div class="sec">💾 Download Reports</div>
  <div class="card">
    <div style="font-size:12px;color:var(--muted);margin-bottom:12px;line-height:1.6;">
      Full data from your start date to today. Download monthly and bring to your mentor for review.
    </div>
    <button class="dl-btn" onclick="downloadFinReport('daily')"   style="background:linear-gradient(135deg,#1a3a2a,#2d5a3a);">📊 Today (CSV)</button>
    <button class="dl-btn" onclick="downloadFinReport('weekly')"  style="background:linear-gradient(135deg,#1a2a3a,#2d3a5a);">📈 This Week (CSV)</button>
    <button class="dl-btn" onclick="downloadFinReport('monthly')" style="background:linear-gradient(135deg,#2a1a0a,#3a2d1a);">📅 This Month (CSV)</button>
    <button class="dl-btn" onclick="downloadFinReport('yearly')"  style="background:linear-gradient(135deg,#2a2a1a,#3a3a1a);">📆 This Year (CSV)</button>
    <button class="dl-btn" onclick="downloadFinReport('alltime')" style="background:linear-gradient(135deg,#1a1a2a,#2a2a3a);">🗄 All Time (CSV)</button>
    <button class="dl-btn" onclick="downloadApp()"                style="background:linear-gradient(135deg,#1a1714,#2d2520);">💾 Download Full App</button>
  </div>

</div>`;
}

// ============================================================
// INJECT ALL FINANCE PAGES
// ============================================================
function injectFinancePages() {
  const main = document.getElementById('mainArea');
  if (!main) return;
  // append after personal pages
  main.innerHTML +=
    buildOverviewPage() +
    buildExpensesPage() +
    buildDebtPage() +
    buildSavingsPage() +
    buildNetworthPage() +
    buildReportsPage();
}

// ============================================================
// LOGIC FUNCTIONS
// ============================================================

// ── EXPENSES ──
window.addExpense = function() {
  const desc   = document.getElementById('spendDesc')?.value.trim();
  const amount = parseFloat(document.getElementById('spendAmount')?.value);
  const cat    = document.getElementById('spendCat')?.value;
  if (!desc || !amount) return;
  const expenses = ls('expenses_' + APP_MONTH) || [];
  expenses.push({
    id: Date.now(), desc, amount, cat, date: APP_TODAY,
    time: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
  });
  ls('expenses_' + APP_MONTH, expenses);
  document.getElementById('spendDesc').value   = '';
  document.getElementById('spendAmount').value = '';
  renderExpenses();
  updateFinanceOverview();
  updateBudget();
};

window.deleteExpense = function(id) {
  ls('expenses_' + APP_MONTH, (ls('expenses_' + APP_MONTH) || []).filter(e => e.id !== id));
  renderExpenses();
  updateFinanceOverview();
  updateBudget();
};

function renderExpenses() {
  const expenses  = ls('expenses_' + APP_MONTH) || [];
  const todayExp  = expenses.filter(e => e.date === APP_TODAY);
  const el        = document.getElementById('f-todayList');
  if (!el) return;
  const total = todayExp.reduce((s, e) => s + e.amount, 0);
  const tt    = document.getElementById('f-todayTotal');
  if (tt) tt.textContent = 'AED ' + fmt(total);
  if (!todayExp.length) { el.innerHTML = '<div class="empty">No transactions today</div>'; return; }
  el.innerHTML = todayExp.sort((a, b) => b.id - a.id).map(e => `
    <div class="spend-item">
      <div class="spend-ico">${e.cat.split(' ')[0]}</div>
      <div class="spend-body"><div class="spend-name">${e.desc}</div><div class="spend-cat">${e.cat} · ${e.time || ''}</div></div>
      <div class="spend-amt" style="color:var(--red);">-AED ${e.amount}</div>
      <button class="del-btn" onclick="deleteExpense(${e.id})">✕</button>
    </div>`).join('');
}

// ── INCOME ──
window.addIncome = function() {
  const desc   = document.getElementById('incomeDesc')?.value.trim();
  const amount = parseFloat(document.getElementById('incomeAmount')?.value);
  const cat    = document.getElementById('incomeCat')?.value;
  if (!desc || !amount) return;
  const income = ls('income_' + APP_MONTH) || [];
  income.push({ id: Date.now(), desc, amount, cat, date: APP_TODAY });
  ls('income_' + APP_MONTH, income);
  document.getElementById('incomeDesc').value   = '';
  document.getElementById('incomeAmount').value = '';
  renderIncome();
  updateFinanceOverview();
};

function renderIncome() {
  const income = ls('income_' + APP_MONTH) || [];
  const el     = document.getElementById('f-incomeList');
  if (!el) return;
  if (!income.length) { el.innerHTML = '<div class="empty">No income logged yet</div>'; return; }
  const total = income.reduce((s, i) => s + i.amount, 0);
  el.innerHTML = `<div style="font-family:'DM Mono',monospace;font-size:13px;font-weight:700;color:var(--green);margin-bottom:10px;">Total: AED ${fmt(total)}</div>` +
    income.sort((a, b) => b.id - a.id).map(i => `
      <div class="spend-item">
        <div class="spend-ico">${i.cat.split(' ')[0]}</div>
        <div class="spend-body"><div class="spend-name">${i.desc}</div><div class="spend-cat">${i.cat} · ${i.date}</div></div>
        <div class="spend-amt" style="color:var(--green);">+AED ${i.amount}</div>
        <button class="del-btn" onclick="deleteIncome(${i.id})">✕</button>
      </div>`).join('');
}

window.deleteIncome = function(id) {
  ls('income_' + APP_MONTH, (ls('income_' + APP_MONTH) || []).filter(i => i.id !== id));
  renderIncome();
  updateFinanceOverview();
};

// ── BUDGET ──
function updateBudget() {
  const expenses = ls('expenses_' + APP_MONTH) || [];
  const totals   = {};
  expenses.forEach(e => { if (!totals[e.cat]) totals[e.cat] = 0; totals[e.cat] += e.amount; });

  const catMap = {
    '🏠': { id: 'b-rent',      limit: 2500 },
    '🍳': { id: 'b-food',      limit: 800 },
    '🛒': { id: 'b-food',      limit: 800 },
    '🚗': { id: 'b-transport', limit: 300 },
    '🇮🇳': { id: 'b-india',   limit: 1500 },
    '💳': { id: 'b-card',      limit: 1500 },
    '🎉': { id: 'b-fun',       limit: 300 },
  };

  // aggregate by budget bucket
  const buckets = {};
  Object.keys(totals).forEach(cat => {
    const emoji = cat.split(' ')[0];
    const mapping = catMap[emoji];
    if (mapping) {
      if (!buckets[mapping.id]) buckets[mapping.id] = { spent: 0, limit: mapping.limit };
      buckets[mapping.id].spent += totals[cat];
    }
  });

  Object.keys(buckets).forEach(bid => {
    const el = document.getElementById(bid);
    if (!el) return;
    const { spent, limit } = buckets[bid];
    el.textContent = 'AED ' + fmt(spent);
    el.className   = 'budget-spent ' + (spent > limit ? 'over' : 'ok');
  });

  const totalSpent = expenses.reduce((s, e) => s + e.amount, 0);
  const bs = document.getElementById('b-save');
  if (bs) bs.textContent = 'AED ' + fmt(Math.max(0, 8300 - totalSpent));

  // monthly category breakdown
  const mc = document.getElementById('f-monthlyCats');
  if (mc) {
    if (!Object.keys(totals).length) { mc.innerHTML = '<div class="empty">No expenses yet</div>'; return; }
    mc.innerHTML = '<div class="g2">' +
      Object.entries(totals).sort((a, b) => b[1] - a[1]).map(([cat, amt]) => `
        <div class="sbox">
          <div style="font-size:11px;font-weight:600;margin-bottom:4px;">${cat}</div>
          <div style="font-family:'DM Mono',monospace;font-size:18px;font-weight:700;color:var(--red);">AED ${fmt(amt)}</div>
        </div>`).join('') + '</div>';
  }
}

// ── OVERVIEW UPDATE ──
window.updateFinanceOverview = function() {
  const expenses   = ls('expenses_' + APP_MONTH) || [];
  const totalSpent = expenses.reduce((s, e) => s + e.amount, 0);
  const totalSaved = parseInt(ls('totalSaved') || '0');

  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  set('f-totalSpent', 'AED ' + fmt(totalSpent));
  set('f-available',  'AED ' + fmt(Math.max(0, 8300 - totalSpent)));
  set('f-totalSaved', 'AED ' + totalSaved);

  updateBudget();
  buildNSGrid();
  renderExpenses();
  renderIncome();
};

// ── NO SPEND GRID ──
function buildNSGrid() {
  const grid = document.getElementById('f-nsGrid');
  if (!grid) return;
  const today = new Date();
  let html = '', clean = 0;
  for (let i = 29; i >= 0; i--) {
    const d   = new Date(today);
    d.setDate(d.getDate() - i);
    const key = 'nospend_' + d.toDateString();
    const st  = localStorage.getItem(key);
    if (st === 'clean') clean++;
    html += `<div class="ns-day ${st || 'empty'}" onclick="toggleNS('${d.toDateString()}',this)" title="${d.toLocaleDateString('en-GB',{month:'short',day:'numeric'})}">${d.getDate()}</div>`;
  }
  grid.innerHTML = html;
  const nc = document.getElementById('ns-count');
  if (nc) nc.textContent = clean + ' clean day' + (clean !== 1 ? 's' : '');
}

window.toggleNS = function(dateStr, el) {
  const key = 'nospend_' + dateStr;
  const cur = localStorage.getItem(key);
  if (!cur)             { localStorage.setItem(key, 'clean'); el.className = 'ns-day clean'; }
  else if (cur==='clean') { localStorage.setItem(key, 'spent'); el.className = 'ns-day spent'; }
  else                  { localStorage.removeItem(key);        el.className = 'ns-day empty'; }
  buildNSGrid();
};

// ── CREDIT CARD ──
window.updateCC = function() {
  const bank = document.getElementById('cc-bank-inp')?.value.trim();
  const bal  = parseFloat(document.getElementById('cc-bal-inp')?.value)  || 20000;
  const lim  = parseFloat(document.getElementById('cc-lim-inp')?.value)  || 25000;
  const pay  = parseFloat(document.getElementById('cc-pay-inp')?.value)  || 1500;
  const due  = document.getElementById('cc-due-inp')?.value;
  const cb   = parseFloat(document.getElementById('cc-cashback-inp')?.value) || 0;
  ls('cc_balance',  bal);
  ls('cc_limit',    lim);
  ls('cc_payment',  pay);
  ls('cc_cashback', cb);
  if (bank) ls('cc_bank', bank);
  if (due)  ls('cc_due',  due);
  loadCC();
  alert('Card details updated ✓');
};

function loadCC() {
  const bal  = parseFloat(ls('cc_balance')  || '20000');
  const lim  = parseFloat(ls('cc_limit')    || '25000');
  const pay  = parseFloat(ls('cc_payment')  || '1500');
  const cb   = parseFloat(ls('cc_cashback') || '0');
  const due  = ls('cc_due');
  const bank = ls('cc_bank') || 'BANK NAME';
  const pct  = Math.round((bal / lim) * 100);

  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  set('cc-bankName',        bank.toUpperCase());
  set('cc-balance',         'AED ' + fmt(bal));
  set('cc-limit',           fmt(lim));
  set('cc-minpay',          fmt(pay));
  set('cc-pct',             pct + '%');
  set('cc-cashbackDisplay', '💰 Total cashback received: AED ' + fmt(cb));

  const prog = document.getElementById('cc-prog');
  if (prog) prog.style.width = pct + '%';

  // days to due
  if (due) {
    const days = Math.ceil((new Date(due) - new Date()) / 86400000);
    const dl   = document.getElementById('cc-daysLeft');
    if (dl) {
      dl.textContent = days <= 0 ? 'OVERDUE' : days;
      dl.style.color = days <= 5 ? '#ff6b6b' : '#4dff91';
    }
    const da = document.getElementById('cc-dueAlert');
    if (da) {
      da.textContent = days <= 0 ? '⚠️ Payment OVERDUE — pay immediately!'
        : days <= 5 ? '⚠️ Due in ' + days + ' days — pay now!'
        : '📅 Due in ' + days + ' days';
      da.style.background = days <= 5 ? 'rgba(217,95,75,.2)' : 'rgba(255,255,255,.08)';
    }
  }

  // payoff date
  const months = pay > 0 ? Math.ceil(bal / pay) : 999;
  const payoffDate = new Date();
  payoffDate.setMonth(payoffDate.getMonth() + months);
  const pi = document.getElementById('cc-payoffInfo');
  if (pi) {
    pi.textContent = pay >= 1500
      ? '🎯 Payoff: ~' + payoffDate.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' }) + ' — stay consistent!'
      : '⚠️ Increase to AED 1,500/month to clear faster';
  }

  const st = document.getElementById('cc-strategy');
  if (st) st.textContent = '💡 At AED ' + fmt(pay) + '/month: cleared in ~' + months + ' months. ' + (pay >= 1500 ? 'Good pace!' : 'Increase payment to clear faster.');
}

// ── CC TRANSACTIONS ──
window.logCCTxn = function() {
  const desc   = document.getElementById('cc-txn-desc')?.value.trim();
  const amt    = parseFloat(document.getElementById('cc-txn-amt')?.value);
  const type   = document.getElementById('cc-txn-type')?.value;
  const reason = document.getElementById('cc-txn-reason')?.value.trim();
  if (!desc || !amt) return;

  const txns = ls('cc_txns') || [];
  txns.unshift({ id: Date.now(), desc, amt, type, reason, date: APP_TODAY });
  ls('cc_txns', txns);

  // update balance
  let bal = parseFloat(ls('cc_balance') || '20000');
  if (type === 'charge')  bal += amt;
  if (type === 'payment') bal  = Math.max(0, bal - amt);
  ls('cc_balance', bal);

  document.getElementById('cc-txn-desc').value   = '';
  document.getElementById('cc-txn-amt').value    = '';
  document.getElementById('cc-txn-reason').value = '';
  loadCC();
  renderCCTxns();
};

function renderCCTxns() {
  const txns = ls('cc_txns') || [];
  const el   = document.getElementById('cc-txn-list');
  if (!el) return;
  if (!txns.length) { el.innerHTML = '<div class="empty">No transactions yet</div>'; return; }
  el.innerHTML = txns.slice(0, 10).map(t => `
    <div class="spend-item">
      <div class="spend-ico">${t.type === 'payment' ? '✅' : '💳'}</div>
      <div class="spend-body">
        <div class="spend-name">${t.desc}</div>
        <div class="spend-cat">${t.reason || t.type} · ${t.date}</div>
      </div>
      <div class="spend-amt" style="color:${t.type === 'payment' ? 'var(--green)' : 'var(--red)'};">
        ${t.type === 'payment' ? '-' : '+'}AED ${t.amt}
      </div>
      <button class="del-btn" onclick="deleteCCTxn(${t.id})">✕</button>
    </div>`).join('');
}

window.deleteCCTxn = function(id) {
  ls('cc_txns', (ls('cc_txns') || []).filter(t => t.id !== id));
  renderCCTxns();
};

// ── OTHER DEBTS ──
window.addDebt = function() {
  const name    = document.getElementById('debt-name')?.value.trim();
  const amt     = parseFloat(document.getElementById('debt-amt')?.value);
  const monthly = parseFloat(document.getElementById('debt-monthly')?.value) || 0;
  const due     = document.getElementById('debt-due')?.value;
  const reason  = document.getElementById('debt-reason')?.value.trim();
  if (!name || !amt) return;
  const debts = ls('other_debts') || [];
  debts.push({ id: Date.now(), name, amt, monthly, due, reason, paid: 0 });
  ls('other_debts', debts);
  ['debt-name','debt-reason'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
  ['debt-amt','debt-monthly'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
  const dd = document.getElementById('debt-due'); if (dd) dd.value = '';
  renderDebts();
};

function renderDebts() {
  const debts = ls('other_debts') || [];
  const el    = document.getElementById('f-debtList');
  if (!el) return;
  if (!debts.length) { el.innerHTML = ''; return; }
  el.innerHTML = debts.map(d => {
    const remaining = d.amt - d.paid;
    const months    = d.monthly > 0 ? Math.ceil(remaining / d.monthly) : 0;
    const payoff    = new Date();
    if (months) payoff.setMonth(payoff.getMonth() + months);
    const pct = Math.round((d.paid / d.amt) * 100);
    let dueHtml = '';
    if (d.due) {
      const days = Math.ceil((new Date(d.due) - new Date()) / 86400000);
      dueHtml = `<div style="background:${days <= 5 ? 'var(--red-l)' : 'var(--green-l)'};border-radius:8px;padding:8px 12px;font-size:12px;color:${days <= 5 ? 'var(--red)' : 'var(--green)'};font-weight:600;margin-bottom:8px;">
        ${days <= 0 ? '⚠️ OVERDUE' : days <= 5 ? '⚠️ Due in ' + days + ' days' : '📅 Due in ' + days + ' days'}
      </div>`;
    }
    return `
    <div class="debt-item">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:10px;">
        <div><div style="font-size:15px;font-weight:700;">${d.name}</div>${d.reason ? `<div style="font-size:11px;color:var(--muted);margin-top:2px;">${d.reason}</div>` : ''}</div>
        <div style="text-align:right;"><div style="font-family:'Bebas Neue',sans-serif;font-size:28px;color:var(--red);line-height:1;">AED ${fmt(remaining)}</div><div style="font-size:10px;color:var(--muted);">of AED ${fmt(d.amt)}</div></div>
      </div>
      ${dueHtml}
      ${months ? `<div style="background:var(--green-l);border-radius:8px;padding:8px 12px;font-size:12px;color:var(--green);font-weight:600;margin-bottom:10px;">🎯 Payoff: ~${payoff.toLocaleDateString('en-GB',{month:'short',year:'numeric'})} at AED ${fmt(d.monthly)}/month</div>` : ''}
      <div style="margin-bottom:10px;">
        <div style="display:flex;justify-content:space-between;font-size:11px;color:var(--muted);margin-bottom:4px;"><span>Paid: AED ${fmt(d.paid)}</span><span>${pct}%</span></div>
        <div class="pbar"><div class="pbar-fill pbar-fill-green" style="width:${pct}%"></div></div>
      </div>
      <div style="display:flex;gap:8px;">
        <input type="number" id="dp-${d.id}" class="inp" placeholder="Payment AED" style="flex:1;margin-bottom:0;">
        <button class="btn btn-green btn-sm" onclick="payDebt(${d.id})">Pay</button>
        <button class="btn btn-red btn-sm"   onclick="deleteDebt(${d.id})">Del</button>
      </div>
    </div>`;
  }).join('');
}

window.payDebt = function(id) {
  const debts = ls('other_debts') || [];
  const d     = debts.find(d => d.id === id);
  const val   = parseFloat(document.getElementById('dp-' + id)?.value) || 0;
  if (d && val > 0) { d.paid = Math.min(d.amt, d.paid + val); }
  ls('other_debts', debts);
  renderDebts();
};

window.deleteDebt = function(id) {
  if (confirm('Delete this debt?')) {
    ls('other_debts', (ls('other_debts') || []).filter(d => d.id !== id));
    renderDebts();
  }
};

// ── SAVINGS ──
window.addSaving = function() {
  const amount = parseFloat(document.getElementById('s-amt')?.value);
  const note   = document.getElementById('s-note')?.value.trim();
  if (!amount) return;
  const savings = ls('savings_history') || [];
  savings.push({ id: Date.now(), amount, note, date: APP_TODAY, month: APP_MONTH });
  ls('savings_history', savings);
  const total = savings.reduce((s, sv) => s + sv.amount, 0);
  ls('totalSaved', total);
  document.getElementById('s-amt').value  = '';
  document.getElementById('s-note').value = '';
  updateSavings();
};

window.updateSavings = function() {
  const savings     = ls('savings_history') || [];
  const total       = savings.reduce((s, sv) => s + sv.amount, 0);
  const monthSaved  = savings.filter(s => s.month === APP_MONTH).reduce((s, sv) => s + sv.amount, 0);

  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  set('s-total',       fmt(total));
  set('s-month',       fmt(monthSaved));
  set('f-totalSaved',  'AED ' + total);

  // milestones
  [[1000,'1000'],[5000,'5000'],[10000,'10000'],[25000,'25000']].forEach(([target, key]) => {
    const pct  = Math.min(100, Math.round((total / target) * 100));
    const fill = document.getElementById('mil-' + key + '-fill');
    const sub  = document.getElementById('mil-' + key + '-sub');
    const card = document.getElementById('mil-' + key);
    if (fill) fill.style.width = pct + '%';
    if (sub)  sub.textContent  = fmt(total) + ' / ' + fmt(target);
    if (card) { if (total >= target) card.classList.add('reached'); else card.classList.remove('reached'); }
  });

  // savings history
  const sh = document.getElementById('s-history');
  if (sh) {
    if (!savings.length) { sh.innerHTML = '<div class="empty">No savings logged yet</div>'; return; }
    sh.innerHTML = savings.sort((a,b)=>b.id-a.id).slice(0,8).map(s => `
      <div class="spend-item">
        <div class="spend-ico">💰</div>
        <div class="spend-body"><div class="spend-name">${s.note || 'Saving'}</div><div class="spend-cat">${s.date}</div></div>
        <div class="spend-amt" style="color:var(--green);">+AED ${s.amount}</div>
        <button class="del-btn" onclick="deleteSaving(${s.id})">✕</button>
      </div>`).join('');
  }
};

window.deleteSaving = function(id) {
  const savings = (ls('savings_history') || []).filter(s => s.id !== id);
  ls('savings_history', savings);
  const total = savings.reduce((s, sv) => s + sv.amount, 0);
  ls('totalSaved', total);
  updateSavings();
};

// ── REMITTANCE ──
window.addRemittance = function() {
  const amount = parseFloat(document.getElementById('r-amt')?.value);
  const note   = document.getElementById('r-note')?.value.trim();
  if (!amount) return;
  const remit = ls('remittance') || [];
  remit.push({ id: Date.now(), amount, note, date: APP_TODAY, month: APP_MONTH });
  ls('remittance', remit);
  document.getElementById('r-amt').value  = '';
  document.getElementById('r-note').value = '';
  renderRemittance();
};

function renderRemittance() {
  const remit      = ls('remittance') || [];
  const total      = remit.reduce((s, r) => s + r.amount, 0);
  const monthTotal = remit.filter(r => r.month === APP_MONTH).reduce((s, r) => s + r.amount, 0);

  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  set('r-total', fmt(total));
  set('r-month', fmt(monthTotal));
  set('r-count', remit.length);

  const el = document.getElementById('r-list');
  if (!el) return;
  if (!remit.length) { el.innerHTML = '<div class="empty">No transfers yet</div>'; return; }
  el.innerHTML = remit.sort((a,b)=>b.id-a.id).slice(0,10).map(r => `
    <div class="remit-item">
      <div style="font-size:20px;">🇮🇳</div>
      <div class="remit-body"><div class="remit-desc">${r.note || 'Transfer to India'}</div><div class="remit-date">${r.date}</div></div>
      <div class="remit-amt">AED ${r.amount}</div>
      <button class="del-btn" onclick="deleteRemittance(${r.id})">✕</button>
    </div>`).join('');
}

window.deleteRemittance = function(id) {
  ls('remittance', (ls('remittance') || []).filter(r => r.id !== id));
  renderRemittance();
};

// ── ASSETS ──
window.addAsset = function() {
  const name = document.getElementById('asset-name')?.value.trim();
  const val  = parseFloat(document.getElementById('asset-val')?.value);
  const type = document.getElementById('asset-type')?.value;
  if (!name || !val) return;
  const assets = ls('assets') || [];
  assets.push({ id: Date.now(), name, val, type });
  ls('assets', assets);
  document.getElementById('asset-name').value = '';
  document.getElementById('asset-val').value  = '';
  renderAssets();
  updateNetworth();
};

function renderAssets() {
  const assets = ls('assets') || [];
  const el     = document.getElementById('assetsList');
  if (!el) return;
  if (!assets.length) { el.innerHTML = '<div class="empty">No assets added yet</div>'; return; }
  const total = assets.reduce((s, a) => s + a.val, 0);
  el.innerHTML = `<div style="font-family:'DM Mono',monospace;font-size:13px;font-weight:700;color:var(--green);margin-bottom:10px;">Total: AED ${fmt(total)}</div>` +
    assets.map(a => `
      <div class="asset-item">
        <div><div class="asset-name">${a.name}</div><div class="asset-sub">${a.type}</div></div>
        <div style="display:flex;align-items:center;gap:10px;">
          <div class="asset-val c-green">AED ${fmt(a.val)}</div>
          <button class="del-btn" onclick="deleteAsset(${a.id})">✕</button>
        </div>
      </div>`).join('');
}

window.deleteAsset = function(id) {
  ls('assets', (ls('assets') || []).filter(a => a.id !== id));
  renderAssets();
  updateNetworth();
};

// ── LIABILITIES ──
window.addLiability = function() {
  const name = document.getElementById('liab-name')?.value.trim();
  const val  = parseFloat(document.getElementById('liab-val')?.value);
  const due  = document.getElementById('liab-due')?.value;
  if (!name || !val) return;
  const liabs = ls('liabilities') || [];
  liabs.push({ id: Date.now(), name, val, due });
  ls('liabilities', liabs);
  document.getElementById('liab-name').value = '';
  document.getElementById('liab-val').value  = '';
  const ld = document.getElementById('liab-due'); if (ld) ld.value = '';
  renderLiabilities();
  updateNetworth();
};

function renderLiabilities() {
  const liabs = ls('liabilities') || [];
  const el    = document.getElementById('liabilitiesList');
  if (!el) return;
  if (!liabs.length) { el.innerHTML = '<div class="empty">No liabilities added yet</div>'; return; }
  const total = liabs.reduce((s, l) => s + l.val, 0);
  el.innerHTML = `<div style="font-family:'DM Mono',monospace;font-size:13px;font-weight:700;color:var(--red);margin-bottom:10px;">Total: AED ${fmt(total)}</div>` +
    liabs.map(l => `
      <div class="asset-item">
        <div><div class="asset-name">${l.name}</div>${l.due ? `<div class="asset-sub">Due: ${l.due}</div>` : ''}</div>
        <div style="display:flex;align-items:center;gap:10px;">
          <div class="asset-val c-red">AED ${fmt(l.val)}</div>
          <button class="del-btn" onclick="deleteLiability(${l.id})">✕</button>
        </div>
      </div>`).join('');
}

window.deleteLiability = function(id) {
  ls('liabilities', (ls('liabilities') || []).filter(l => l.id !== id));
  renderLiabilities();
  updateNetworth();
};

// ── NET WORTH ──
window.updateNetworth = function() {
  const assets = ls('assets')      || [];
  const liabs  = ls('liabilities') || [];
  const totalA = assets.reduce((s, a) => s + a.val, 0);
  const totalL = liabs.reduce((s,  l) => s + l.val, 0);
  const nw     = totalA - totalL;

  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  const nwEl = document.getElementById('nw-total');
  if (nwEl) {
    nwEl.textContent = 'AED ' + fmt(Math.abs(nw));
    nwEl.style.color = nw >= 0 ? '#4dff91' : '#ff6b6b';
  }
  set('nw-assets',      fmt(totalA));
  set('nw-liabilities', fmt(totalL));
  renderAssets();
  renderLiabilities();
};

// ── REPORTS ──
window.updateReports = function() {
  const expenses  = ls('expenses_' + APP_MONTH) || [];
  const totalSpent = expenses.reduce((s, e) => s + e.amount, 0);
  const totalSaved = parseInt(ls('totalSaved') || '0');
  const remit      = ls('remittance') || [];
  const indiaMonth = remit.filter(r => r.month === APP_MONTH).reduce((s, r) => s + r.amount, 0);

  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  set('rep-spent', fmt(totalSpent));
  set('rep-saved', fmt(totalSaved));
  set('rep-india', fmt(indiaMonth));

  // category breakdown
  const cats = {};
  expenses.forEach(e => { if (!cats[e.cat]) cats[e.cat] = 0; cats[e.cat] += e.amount; });
  const el = document.getElementById('f-catBreakdown');
  if (el) {
    if (!Object.keys(cats).length) { el.innerHTML = '<div class="empty">No expenses yet</div>'; return; }
    el.innerHTML = '<div class="g2">' +
      Object.entries(cats).sort((a,b)=>b[1]-a[1]).map(([cat,amt])=>`
        <div class="sbox">
          <div style="font-size:11px;font-weight:600;margin-bottom:4px;">${cat}</div>
          <div style="font-family:'DM Mono',monospace;font-size:18px;font-weight:700;color:var(--red);">AED ${fmt(amt)}</div>
        </div>`).join('') + '</div>';
  }
};

// ── DOWNLOAD APP ──
window.downloadApp = function() {
  const html = document.documentElement.outerHTML;
  const blob = new Blob([html], { type: 'text/html' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = 'LifeOS_Faizy.html';
  a.click();
  URL.revokeObjectURL(url);
};

// ── CSV DOWNLOAD ──
window.downloadFinReport = function(type) {
  const now      = new Date();
  const expenses = ls('expenses_' + APP_MONTH) || [];
  const income   = ls('income_'   + APP_MONTH) || [];
  const savings  = ls('savings_history')        || [];
  const remit    = ls('remittance')             || [];

  let rows = [];
  rows.push(['Life OS Finance Report']);
  rows.push(['Type', type]);
  rows.push(['Generated', now.toLocaleDateString('en-GB')]);
  rows.push(['']);

  // filter by period
  let filteredExp = expenses;
  let filteredInc = income;
  if (type === 'daily') {
    filteredExp = expenses.filter(e => e.date === APP_TODAY);
    filteredInc = income.filter(i  => i.date  === APP_TODAY);
  }
  if (type === 'weekly') {
    const weekStart = new Date(); weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    filteredExp = expenses.filter(e => new Date(e.date) >= weekStart);
    filteredInc = income.filter(i  => new Date(i.date)  >= weekStart);
  }

  rows.push(['EXPENSES']);
  rows.push(['Date','Description','Category','Amount AED']);
  filteredExp.forEach(e => rows.push([e.date, e.desc, e.cat, e.amount]));
  rows.push(['TOTAL SPENT','','', filteredExp.reduce((s,e)=>s+e.amount,0)]);
  rows.push(['']);

  rows.push(['INCOME']);
  rows.push(['Date','Description','Category','Amount AED']);
  filteredInc.forEach(i => rows.push([i.date, i.desc, i.cat, i.amount]));
  rows.push(['TOTAL INCOME','','', filteredInc.reduce((s,i)=>s+i.amount,0)]);
  rows.push(['']);

  rows.push(['SAVINGS HISTORY']);
  rows.push(['Date','Note','Amount AED']);
  savings.forEach(s => rows.push([s.date, s.note||'Saving', s.amount]));
  rows.push(['TOTAL SAVED','','', savings.reduce((s,sv)=>s+sv.amount,0)]);
  rows.push(['']);

  rows.push(['INDIA REMITTANCE']);
  rows.push(['Date','Note','Amount AED']);
  remit.forEach(r => rows.push([r.date, r.note||'Transfer', r.amount]));
  rows.push(['TOTAL SENT','','', remit.reduce((s,r)=>s+r.amount,0)]);
  rows.push(['']);

  rows.push(['CREDIT CARD']);
  rows.push(['Balance AED', ls('cc_balance')||20000]);
  rows.push(['Limit AED',   ls('cc_limit')  ||25000]);
  rows.push(['Bank',        ls('cc_bank')   ||'N/A']);
  rows.push(['Cashback AED',ls('cc_cashback')||0]);

  const csv  = rows.map(r => r.map(c => '"' + String(c).replace(/"/g,'""') + '"').join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = `LifeOS_Finance_${type}_${now.toISOString().split('T')[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
};

window.downloadPersonalReport = function(type) {
  const now     = new Date();
  const prayers = ls('prayers_' + APP_TODAY) || {};
  const habits  = ls('habits_'  + APP_TODAY) || {};
  const qty     = ls('qty_'     + APP_TODAY) || {};
  const wins    = ls('wins_'    + APP_TODAY) || [];
  const tasks   = ls('tasks_'   + APP_TODAY) || [];
  const score   = ls('score_'   + APP_TODAY) || 0;

  let rows = [];
  rows.push(['Life OS Personal Report']);
  rows.push(['Type', type]);
  rows.push(['Date', APP_TODAY]);
  rows.push(['Score', score + '%']);
  rows.push(['Clean Days', ls('cleanDays')||0]);
  rows.push(['']);
  rows.push(['PRAYERS']);
  ['fajr','dhuhr','asr','maghrib','isha'].forEach(p => rows.push([p, prayers[p] ? 'Done' : 'Missed']));
  rows.push(['']);
  rows.push(['HABITS']);
  Object.keys(habits).forEach(h => rows.push([h, habits[h] ? 'Done' : 'Missed']));
  rows.push(['']);
  rows.push(['QUANTITY']);
  rows.push(['Water', (qty.water||0) + ' glasses']);
  rows.push(['Quran', qty.quran >= 1 ? 'Done' : 'Missed']);
  rows.push(['Book',  (qty.book||0)  + ' pages']);
  rows.push(['']);
  rows.push(['WINS']);
  wins.forEach((w,i) => rows.push(['Win '+(i+1), w]));
  rows.push(['']);
  rows.push(['TASKS']);
  tasks.forEach(t => rows.push([t.cat, t.title, t.done ? 'Done' : 'Pending']));
  rows.push(['']);
  rows.push(['BOOKS']);
  [1,2,3].forEach(n => rows.push(['Book '+n, (ls('book'+n)||0) + ' pages read']));

  const csv  = rows.map(r => r.map(c => '"' + String(c).replace(/"/g,'""') + '"').join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = `LifeOS_Personal_${type}_${now.toISOString().split('T')[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
};

// ── INIT FINANCE ──
window.initFinance = function() {
  injectFinancePages();
  loadCC();
  renderCCTxns();
  renderDebts();
  updateSavings();
  renderRemittance();
  renderAssets();
  renderLiabilities();
};
