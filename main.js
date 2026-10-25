/* main.js */
(function() {
  'use strict';

  // --- Demo bar dismiss ---
  const demoBar = document.getElementById('demoBar');
  const dismissBtn = document.getElementById('dismissDemoBar');
  if (dismissBtn && demoBar) {
    if (localStorage.getItem('pcDemoDismissed') === 'true') demoBar.style.display = 'none';
    dismissBtn.addEventListener('click', () => {
      demoBar.style.display = 'none';
      localStorage.setItem('pcDemoDismissed', 'true');
    });
  }

  // --- Hero petals (max 10) ---
  const petalsContainer = document.getElementById('petals');
  if (petalsContainer && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    for (let i = 0; i < 10; i++) {
      const petal = document.createElement('span');
      petal.className = 'petal';
      petal.style.left = (Math.random() * 100) + '%';
      petal.style.animationDuration = (6 + Math.random() * 6) + 's';
      petal.style.animationDelay = (Math.random() * 6) + 's';
      petal.style.opacity = (0.4 + Math.random() * 0.4).toFixed(2);
      petalsContainer.appendChild(petal);
    }
  }

  // --- Style gallery ---
  const styleData = [
    { id: 1, name: 'Box Braids — Classic', cat: 'box', cls: '', label: 'Box Braids' },
    { id: 2, name: 'Box Braids — Jumbo', cat: 'box', cls: 'alt1', label: 'Box Braids' },
    { id: 3, name: 'Knotless — Shoulder', cat: 'knotless', cls: 'alt2', label: 'Knotless' },
    { id: 4, name: 'Knotless — Waist', cat: 'knotless', cls: 'alt3', label: 'Knotless' },
    { id: 5, name: 'Cornrows — Straight Back', cat: 'cornrows', cls: 'alt4', label: 'Cornrows' },
    { id: 6, name: 'Cornrows — Custom', cat: 'cornrows', cls: 'alt5', label: 'Cornrows' },
    { id: 7, name: 'Twists — Two-Strand', cat: 'twists', cls: 'alt1', label: 'Twists' },
    { id: 8, name: 'Twists — Senegalese', cat: 'twists', cls: 'alt2', label: 'Twists' },
    { id: 9, name: 'Weave — Sew-In', cat: 'weaves', cls: 'alt3', label: 'Weaves' },
    { id: 10, name: 'Wig — Custom Install', cat: 'weaves', cls: 'alt4', label: 'Wigs' },
    { id: 11, name: 'Colour — Full', cat: 'colour', cls: 'alt5', label: 'Colour' },
    { id: 12, name: 'Colour — Highlights', cat: 'colour', cls: '', label: 'Colour' },
    { id: 13, name: 'Natural — Deep Condition', cat: 'natural', cls: 'alt1', label: 'Natural Care' },
    { id: 14, name: 'Natural — Trim & Shape', cat: 'natural', cls: 'alt2', label: 'Natural Care' }
  ];

  const styleGrid = document.getElementById('styleGrid');
  const chips = document.querySelectorAll('.chip');
  let currentStyles = styleData;
  let lightboxIndex = 0;

  function renderStyles(filter) {
    if (!styleGrid) return;
    currentStyles = filter === 'all' ? styleData : styleData.filter(s => s.cat === filter);
    styleGrid.innerHTML = currentStyles.map((s, i) => `
      <div class="masonry-item" data-index="${i}" tabindex="0" role="button" aria-label="View ${s.name}">
        <div class="masonry-swatch ${s.cls}">
          <span class="masonry-label">${s.name}</span>
        </div>
      </div>
    `).join('');
    styleGrid.querySelectorAll('.masonry-item').forEach(item => {
      item.addEventListener('click', () => openLightbox(parseInt(item.dataset.index, 10)));
      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox(parseInt(item.dataset.index, 10));
        }
      });
    });
  }

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      renderStyles(chip.dataset.filter);
    });
  });

  if (styleGrid) renderStyles('all');

  // --- Lightbox ---
  const lightbox = document.getElementById('lightbox');
  const lightboxContent = document.getElementById('lightboxContent');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  function openLightbox(index) {
    if (!lightbox || currentStyles.length === 0) return;
    lightboxIndex = index;
    const s = currentStyles[lightboxIndex];
    lightboxContent.innerHTML = `<div><span class="masonry-label">${s.name}</span></div>`;
    lightboxContent.className = 'lightbox-content ' + (s.cls || '');
    lightbox.classList.add('open');
    lightbox.focus();
  }

  function closeLightbox() { if (lightbox) lightbox.classList.remove('open'); }
  function prevLightbox() {
    if (currentStyles.length === 0) return;
    lightboxIndex = (lightboxIndex - 1 + currentStyles.length) % currentStyles.length;
    openLightbox(lightboxIndex);
  }
  function nextLightbox() {
    if (currentStyles.length === 0) return;
    lightboxIndex = (lightboxIndex + 1) % currentStyles.length;
    openLightbox(lightboxIndex);
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxPrev) lightboxPrev.addEventListener('click', prevLightbox);
  if (lightboxNext) lightboxNext.addEventListener('click', nextLightbox);
  if (lightbox) {
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevLightbox();
      if (e.key === 'ArrowRight') nextLightbox();
    });
  }

  // --- Booking form ---
  const priceMap = {
    'Box Braids': { Shoulder: 350, 'Mid-back': 450, Waist: 550, duration: '3–6 hrs' },
    'Knotless Braids': { Shoulder: 400, 'Mid-back': 500, Waist: 600, duration: '4–7 hrs' },
    'Cornrows': { Shoulder: 200, 'Mid-back': 200, Waist: 200, duration: '1.5–3 hrs' },
    'Twists': { Shoulder: 300, 'Mid-back': 380, Waist: 460, duration: '3–5 hrs' },
    'Weaves and Wigs': { Shoulder: 250, 'Mid-back': 350, Waist: 350, duration: '2–4 hrs' },
    'Colour': { Shoulder: 300, 'Mid-back': 300, Waist: 300, duration: '2–4 hrs' },
    'Natural Care': { Shoulder: 120, 'Mid-back': 120, Waist: 120, duration: '1–2 hrs' }
  };

  const bookingForm = document.getElementById('bookingForm');
  const summaryStyle = document.getElementById('summaryStyle');
  const summaryLength = document.getElementById('summaryLength');
  const summaryStylist = document.getElementById('summaryStylist');
  const summaryDate = document.getElementById('summaryDate');
  const summaryTime = document.getElementById('summaryTime');
  const summaryPrice = document.getElementById('summaryPrice');
  const summaryDuration = document.getElementById('summaryDuration');
  const stylistSelect = document.getElementById('stylistSelect');
  const bookingDate = document.getElementById('bookingDate');
  const timeChips = document.querySelectorAll('.time-chip');
  const styleOptions = document.querySelectorAll('.style-option');
  const lengthOptions = document.querySelectorAll('.length-option');
  const bookingSuccess = document.getElementById('bookingSuccess');
  const bookingWhatsapp = document.getElementById('bookingWhatsapp');
  const bookingRef = document.getElementById('bookingRef');
  const addToCalendarBtn = document.getElementById('addToCalendarBtn');

  const bookingState = { style: null, length: null, time: null };

  function updateSummary() {
    if (summaryStyle) summaryStyle.textContent = bookingState.style || '—';
    if (summaryLength) summaryLength.textContent = bookingState.length || '—';
    if (summaryStylist) summaryStylist.textContent = stylistSelect?.value || 'No preference';
    if (summaryDate) summaryDate.textContent = bookingDate?.value || '—';
    if (summaryTime) summaryTime.textContent = bookingState.time || '—';

    let price = 0;
    let duration = '—';
    if (bookingState.style && bookingState.length && priceMap[bookingState.style]) {
      price = priceMap[bookingState.style][bookingState.length] || 0;
      duration = priceMap[bookingState.style].duration;
    }
    if (summaryPrice) summaryPrice.textContent = 'K' + price;
    if (summaryDuration) summaryDuration.textContent = duration;
  }

  styleOptions.forEach(btn => {
    btn.addEventListener('click', () => {
      styleOptions.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      bookingState.style = btn.dataset.style;
      updateSummary();
    });
  });

  lengthOptions.forEach(btn => {
    btn.addEventListener('click', () => {
      lengthOptions.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      bookingState.length = btn.dataset.length;
      updateSummary();
    });
  });

  timeChips.forEach(chip => {
    chip.addEventListener('click', () => {
      timeChips.forEach(c => c.classList.remove('selected'));
      chip.classList.add('selected');
      bookingState.time = chip.dataset.time;
      updateSummary();
    });
  });

  if (stylistSelect) stylistSelect.addEventListener('change', updateSummary);
  if (bookingDate) bookingDate.addEventListener('change', updateSummary);
  if (bookingForm) updateSummary();

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!bookingForm.checkValidity()) {
        bookingForm.classList.add('was-validated');
        return;
      }
      const ref = 'PC-' + Math.random().toString(36).substring(2, 6).toUpperCase();
      const name = document.getElementById('bookName')?.value || 'Friend';
      const email = document.getElementById('bookEmail')?.value || '';
      const style = bookingState.style || 'Style';
      const length = bookingState.length || 'Length';
      const stylist = stylistSelect?.value || 'No preference';
      const date = bookingDate?.value || 'TBC';
      const time = bookingState.time || 'TBC';
      const price = summaryPrice?.textContent || 'K0';
      const text = `Hello Pomcity Hair Station! Booking request. Ref: ${ref}. Name: ${name}. Email: ${email}. Style: ${style}. Length: ${length}. Stylist: ${stylist}. Date: ${date}. Time: ${time}. Price: ${price}. (Demo)`;
      if (bookingWhatsapp) bookingWhatsapp.href = `https://wa.me/67512345678?text=${encodeURIComponent(text)}`;
      if (bookingRef) bookingRef.textContent = ref;

      // Store for calendar
      try {
        sessionStorage.setItem('pcBooking', JSON.stringify({
          ref, style, length, stylist, date, time, price, name
        }));
      } catch (err) { /* ignore */ }

      bookingForm.classList.add('d-none');
      if (bookingSuccess) bookingSuccess.classList.remove('d-none');
    });
  }

  // --- Add to calendar (.ics) ---
  if (addToCalendarBtn) {
    addToCalendarBtn.addEventListener('click', () => {
      let data = {};
      try { data = JSON.parse(sessionStorage.getItem('pcBooking') || '{}'); } catch (e) { /* ignore */ }
      if (!data.date || !data.time) return;

      const dateParts = data.date.split('-');
      const timeParts = data.time.split(':');
      const start = new Date(
        parseInt(dateParts[0], 10),
        parseInt(dateParts[1], 10) - 1,
        parseInt(dateParts[2], 10),
        parseInt(timeParts[0], 10),
        parseInt(timeParts[1], 10) || 0
      );
      const end = new Date(start.getTime() + 3 * 60 * 60 * 1000);

      const pad = n => String(n).padStart(2, '0');
      const fmt = d => `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`;

      const ics = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Pomcity Hair Station//Demo//EN',
        'BEGIN:VEVENT',
        `UID:${Date.now()}@pomcity.demo`,
        `DTSTAMP:${fmt(new Date())}`,
        `DTSTART:${fmt(start)}`,
        `DTEND:${fmt(end)}`,
        `SUMMARY:Pomcity Hair Station — ${data.style || 'Appointment'}`,
        `DESCRIPTION:Style: ${data.style || ''} | Length: ${data.length || ''} | Stylist: ${data.stylist || ''} | Ref: ${data.ref || ''}`,
        'LOCATION:Port Moresby',
        'END:VEVENT',
        'END:VCALENDAR'
      ].join('\r\n');

      const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'pomcity-booking.ics';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  }

  // --- Contact form ---
  const contactForm = document.getElementById('contactForm');
  const contactSuccess = document.getElementById('contactSuccess');
  const contactWhatsapp = document.getElementById('contactWhatsapp');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!contactForm.checkValidity()) {
        contactForm.classList.add('was-validated');
        return;
      }
      const name = document.getElementById('contactName')?.value || 'Friend';
      const email = document.getElementById('contactEmail')?.value || '';
      const message = document.getElementById('contactMessage')?.value || '';
      const text = `Hello Pomcity Hair Station! My name is ${name}. Email: ${email}. Message: ${message} (Demo)`;
      if (contactWhatsapp) contactWhatsapp.href = `https://wa.me/67512345678?text=${encodeURIComponent(text)}`;
      contactForm.classList.add('d-none');
      if (contactSuccess) contactSuccess.classList.remove('d-none');
    });
  }

})();