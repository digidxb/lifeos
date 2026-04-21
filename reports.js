// ============================================================
// reports.js
// Edit this file for: PDF generation, print styling
// CSV reports are handled inside personal.js and finance.js
// ============================================================

'use strict';

// ── PDF DOWNLOAD ──
// Uses browser print-to-PDF for now (works everywhere, no library needed)
// To upgrade: swap in jsPDF or pdfmake library here later

window.downloadPDF = function(type) {
  const map = {
    personal: 'p-progress',
    finance:  'f-reports',
    profile:  'p-profile',
  };

  const pageId = map[type] || type;
  const page   = document.getElementById(pageId);
  if (!page) { alert('Page not found'); return; }

  // Create a print window with the page content + styles
  const win = window.open('', '_blank');
  if (!win) { alert('Allow popups to download PDF'); return; }

  const styles = Array.from(document.styleSheets)
    .map(ss => {
      try { return Array.from(ss.cssRules).map(r => r.cssText).join('\n'); }
      catch { return ''; }
    }).join('\n');

  win.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Life OS — ${type} Report</title>
      <style>
        ${styles}
        body { background: white; padding: 20px; max-width: 800px; margin: 0 auto; }
        .page { display: block !important; }
        #appShell, #homeScreen, #mobileNav, #sidebar, #topBar { display: none !important; }
        @media print {
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
      </style>
    </head>
    <body>
      <div style="font-family:'Bebas Neue',sans-serif;font-size:28px;margin-bottom:16px;color:#1a1714;">
        LIFE OS — ${type.toUpperCase()} REPORT
      </div>
      <div style="font-family:'DM Mono',monospace;font-size:11px;color:#9a9590;margin-bottom:24px;">
        Generated: ${new Date().toLocaleDateString('en-GB', {weekday:'long',year:'numeric',month:'long',day:'numeric'})}
        &nbsp;·&nbsp; Faizy · Dubai
      </div>
      ${page.innerHTML}
    </body>
    </html>
  `);

  win.document.close();
  win.focus();

  // slight delay so styles load before print dialog
  setTimeout(() => {
    win.print();
    win.close();
  }, 600);
};

// ── PRINT CURRENT PAGE ──
window.printCurrentPage = function() {
  window.print();
};
