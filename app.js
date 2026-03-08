// Simple in-memory notes (in real app → use IndexedDB)
let notes = JSON.parse(localStorage.getItem('nibble-notes')) || [];

function renderNotes() {
  const list = document.getElementById('notesList');
  list.innerHTML = '';
  notes.forEach(note => {
    const li = document.createElement('li');
    li.textContent = note;
    list.appendChild(li);
  });
}

function addNote() {
  const input = document.getElementById('noteInput');
  const text = input.value.trim();
  if (text) {
    notes.push(text);
    localStorage.setItem('nibble-notes', JSON.stringify(notes));
    renderNotes();
    input.value = '';
  }
}

// Render on load
renderNotes();

// PWA install prompt (modern way – beforeinstallprompt event)
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  document.getElementById('installPrompt').style.display = 'block';
});

function installPWA() {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(choice => {
      if (choice.outcome === 'accepted') {
        console.log('PWA installed');
      }
      deferredPrompt = null;
      document.getElementById('installPrompt').style.display = 'none';
    });
  }
}

// Register service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log('Service Worker registered', reg))
      .catch(err => console.log('Service Worker failed', err));
  });
}
