// ============================================================
// firebase.js
// Edit this file only if: Firebase config changes
// DO NOT put any page logic here
// ============================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getFirestore, doc, setDoc, getDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// ── YOUR FIREBASE CONFIG ──
// To change: replace values below with your new config
const firebaseConfig = {
  apiKey:            "AIzaSyBIzfM7FO7v0Jp_A1AyZopjGugz5mkJ4a8",
  authDomain:        "lifeos-e4212.firebaseapp.com",
  projectId:         "lifeos-e4212",
  storageBucket:     "lifeos-e4212.firebasestorage.app",
  messagingSenderId: "777354647355",
  appId:             "1:777354647355:web:a5cda9ea5e36f47294c91e"
};

// ── INIT ──
const app = initializeApp(firebaseConfig);
const db  = getFirestore(app);

// ── SYNC STATUS UI ──
// Updates the sync dot in topbar + sidebar
function setSyncUI(status) {
  const map = {
    connecting: '🟡 Connecting…',
    synced:     '🟢 Synced',
    error:      '🔴 Offline — saved locally'
  };
  const text = map[status] || map.error;
  const els = ['syncDot', 'syncBadge'];
  els.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  });
  window._syncStatus = status;
}

// ── SAVE to Firestore ──
// key: string   data: any JSON-serializable value
async function fbSave(key, data) {
  try {
    await setDoc(
      doc(db, 'lifeos', key),
      { data, updated: Date.now() },
      { merge: true }
    );
    setSyncUI('synced');
  } catch (e) {
    setSyncUI('error');
  }
}

// ── LOAD from Firestore ──
// Returns data or null if not found
async function fbLoad(key) {
  try {
    const snap = await getDoc(doc(db, 'lifeos', key));
    if (snap.exists()) {
      setSyncUI('synced');
      return snap.data().data;
    }
  } catch (e) {
    setSyncUI('error');
  }
  return null;
}

// ── DUAL SAVE ──
// Always saves to localStorage immediately (instant)
// Then saves to Firebase async (cloud backup)
window.dsave = function(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
  fbSave(key, data); // async, non-blocking
};

// ── DUAL LOAD ──
// Returns localStorage first (instant)
// Firebase sync happens in background
window.dload = function(key) {
  const local = localStorage.getItem(key);
  // Background: pull from Firebase and update localStorage if newer
  fbLoad(key).then(fbData => {
    if (fbData !== null) {
      localStorage.setItem(key, JSON.stringify(fbData));
    }
  });
  return local ? JSON.parse(local) : null;
};

// ── SHORTHAND: ls() ──
// ls(key)        → load from localStorage (with Firebase bg sync)
// ls(key, data)  → save to localStorage + Firebase
window.ls = function(key, val) {
  if (val === undefined) return window.dload(key);
  window.dsave(key, val);
};

// ── EXPOSE for other scripts ──
window._fbSave = fbSave;
window._fbLoad = fbLoad;
window._setSyncUI = setSyncUI;

// ── INITIAL STATUS ──
setSyncUI('connecting');
// Test connection
fbLoad('__ping__').then(() => setSyncUI('synced')).catch(() => setSyncUI('error'));
