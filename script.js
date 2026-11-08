(() => {
  const $ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ===== RÉGLAGES — à modifier =====
     Pour recevoir les demandes de devis directement par e-mail :
     1) crée un formulaire gratuit sur https://formspree.io (avec oearchitecture04@gmail.com)
     2) colle ici l'adresse fournie, ex. "https://formspree.io/f/xxxxxxx"
     Tant que c'est vide, le bouton ouvre un e-mail pré-rempli. */
  const FORM_ENDPOINT = '';
  const EMAIL = 'oearchitecture04@gmail.com';
  const WHATSAPP = '79398480428';

  /* ===== FOND : un bâtiment qui se construit ===== */
  (() => {
    const cv = $('#bg')[0], ctx = cv.getContext('2d'); let W, H, k, ox, oy;
    const CY = '34,184,204', IN = '130,145,255', WH = '230,236,255';
    const segs = [];
    const L = (x1, y1, x2, y2, s, e, col, w = 1.5, a = 1) => segs.push({ t: 'l', x1, y1, x2, y2, s, e, col, w, a });
    const C = (cx, cy, r, s, e, col, w = 1.5) => segs.push({ t: 'c', cx, cy, r, s, e, col, w, a: 1 });
    const G = 830;
    L(30, G, 970, G, 0, .05, CY, 2.4);
    for (let x = 60; x < 960; x += 30) L(x, G, x - 14, G + 12, .02, .07, CY, 1, .5);
    // grue
    L(110, G, 110, 70, .02, .13, WH, 1.6, .7); L(128, G, 128, 70, .02, .13, WH, 1.6, .7);
    for (let y = G, i = 0; y > 90; y -= 38, i++) { const s = .02 + i * .0052; L(110, y, 128, y - 38, s, s + .01, WH, 1, .5); L(128, y, 110, y - 38, s, s + .01, WH, 1, .5); }
    L(30, 70, 470, 70, .12, .2, WH, 2, .8); L(30, 82, 470, 82, .13, .21, WH, 1.2, .6); L(60, 40, 119, 70, .16, .2, WH, 1.2, .6); L(60, 40, 340, 70, .16, .2, WH, 1, .5); L(60, 40, 119, 40, .15, .18, WH, 1.2, .6);
    L(34, 70, 34, 112, .18, .21, WH, 1.2, .6); L(64, 70, 64, 112, .18, .21, WH, 1.2, .6); L(34, 112, 64, 112, .19, .22, WH, 1.2, .6);
    // étages
    const lx = [220, 250, 215, 262, 235], rx = [770, 735, 785, 725, 750];
    for (let f = 0; f < 5; f++) {
      const bot = G - f * 122, top = bot - 112, s0 = .1 + f * .14, l = lx[f], r = rx[f];
      for (let i = 0; i < 6; i++) { const x = l + (r - l) * i / 5; L(x, bot, x, top, s0, s0 + .06, IN, 2.2, .9); }
      L(l - 14, top, r + 14, top, s0 + .05, s0 + .1, CY, 3.4);
      L(l - 14, top + 9, r + 14, top + 9, s0 + .06, s0 + .11, CY, 1.4, .7);
      for (let x = l + 12; x < r; x += 26) L(x, top + 18, x, bot - 4, s0 + .09, s0 + .14, WH, 1, .45);
      L(l, bot - 40, r, bot - 40, s0 + .1, s0 + .14, WH, 1, .4);
    }
    // toit-jardin
    const topY = G - 5 * 122 + 10;
    L(lx[4] + 20, topY, rx[4] - 20, topY, .82, .86, CY, 2.4);
    [300, 380, 470, 560, 650].forEach((x, i) => { L(x, topY, x, topY - 22, .84 + i * .01, .86 + i * .01, IN, 1.6); C(x, topY - 34, 12 + (i % 2) * 5, .85 + i * .01, .89 + i * .01, CY, 1.4); });
    // cotes
    L(185, G, 185, G - 5 * 122 + 10, .88, .95, CY, 1, .6); for (let f = 0; f <= 5; f++) L(177, G - f * 122 + (f ? 10 : 0), 193, G - f * 122 + (f ? 10 : 0), .9, .95, CY, 1, .6);
    L(220, G + 36, 770, G + 36, .9, .95, CY, 1, .6); L(220, G + 28, 220, G + 44, .93, .95, CY, 1, .6); L(770, G + 28, 770, G + 44, .93, .95, CY, 1, .6);

    const size = () => {
      const d = Math.min(devicePixelRatio || 1, 2); W = innerWidth; H = innerHeight; cv.width = W * d; cv.height = H * d; ctx.setTransform(d, 0, 0, d, 0, 0);
      const wide = W > 900; k = Math.min(H * .88 / 900, (wide ? W * .6 : W * 1.05) / 1000);
      ox = wide ? W - 1000 * k - W * .02 : (W - 1000 * k) / 2; oy = H * .92 - G * k;
    };
    size(); addEventListener('resize', size);
    const T = 30000;
    const draw = (now) => {
      const t = reduce ? .93 : (now % T) / T;
      const fade = t > .94 ? Math.max(0, (1 - t) / .06) : 1;
      ctx.clearRect(0, 0, W, H); ctx.lineCap = 'round';
      segs.forEach(g => {
        const p = Math.max(0, Math.min(1, (t - g.s) / (g.e - g.s))); if (p <= 0) return;
        ctx.strokeStyle = `rgba(${g.col},${g.a * fade})`; ctx.lineWidth = g.w; ctx.beginPath();
        let tx, ty;
        if (g.t === 'l') { tx = g.x1 + (g.x2 - g.x1) * p; ty = g.y1 + (g.y2 - g.y1) * p; ctx.moveTo(ox + g.x1 * k, oy + g.y1 * k); ctx.lineTo(ox + tx * k, oy + ty * k); }
        else { ctx.arc(ox + g.cx * k, oy + g.cy * k, g.r * k, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * p); tx = g.cx + g.r * Math.cos(-Math.PI / 2 + Math.PI * 2 * p); ty = g.cy + g.r * Math.sin(-Math.PI / 2 + Math.PI * 2 * p); }
        ctx.stroke();
        if (p < 1 && g.w > 1.3) { ctx.fillStyle = `rgba(${CY},${.9 * fade})`; ctx.beginPath(); ctx.arc(ox + tx * k, oy + ty * k, 3.2, 0, 7); ctx.fill(); }
      });
      if (t > .2 && t < .94) { // charge suspendue à la grue
        const hy = 120 + 70 * (.5 + .5 * Math.sin(now / 900)), hx = 380 + 4 * Math.sin(now / 700);
        ctx.strokeStyle = `rgba(${WH},${.6 * fade})`; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(ox + 380 * k, oy + 70 * k); ctx.lineTo(ox + hx * k, oy + hy * k); ctx.stroke();
        ctx.strokeRect(ox + (hx - 14) * k, oy + hy * k, 28 * k, 16 * k);
      }
      if (!reduce) requestAnimationFrame(draw);
    };
    requestAnimationFrame(draw);
  })();

  /* ===== Titres : lettres (accueil) et mots (sections) ===== */
  $('.chars').forEach(el => {
    const txt = el.textContent; el.textContent = '';
    [...txt].forEach((c, i) => { const s = document.createElement('span'); s.className = 'c'; s.setAttribute('aria-hidden', 'true'); s.innerHTML = `<i style="--d:${.15 + i * .045}s">${c}</i>`; el.appendChild(s); });
  });
  $('.split').forEach(el => {
    const txt = el.textContent.trim(); el.setAttribute('aria-label', txt); el.textContent = '';
    txt.split(' ').forEach((w, i) => { const s = document.createElement('span'); s.className = 'w'; s.setAttribute('aria-hidden', 'true'); s.innerHTML = `<i style="--d:${i * .08}s">${w}</i>`; el.append(s, ' '); });
  });
  $('.services,.stats,.steps,.why,.coords').forEach(g => $('.reveal,li', g).forEach((el, i) => el.style.setProperty('--d', (i % 3) * .1 + 's')));

  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12 });
  const observe = () => $('.reveal,.split,.chars').forEach(el => io.observe(el));

  const co = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return; co.unobserve(e.target);
    const end = +e.target.dataset.count; let n = 0; const t = setInterval(() => { e.target.textContent = ++n; if (n >= end) clearInterval(t); }, 600 / end);
  }), { threshold: .6 });
  $('[data-count]').forEach(el => co.observe(el));

  /* ===== Réalisations ===== */
  const STATUT = { 'realise': 'Réalisé', 'en-cours': 'En cours', 'etude': 'Étude / conception 3D' };
  const grid = $('#projects')[0], projects = window.PROJECTS || [];
  grid.innerHTML = projects.map((p, i) => `
    <article class="pcard" data-s="${p.statut}" data-i="${i}" tabindex="0" role="button" aria-label="Découvrir le projet ${p.nom}">
      <div class="pcard__img"><img src="${p.images[0]}" alt="${p.nom}" loading="lazy"><span class="badge badge--${p.statut}">${STATUT[p.statut] || p.statut}</span>${p.images.length > 1 ? `<span class="count">${p.images.length} photos</span>` : ''}</div>
      <div class="pcard__body"><span class="pcard__meta">${p.type} · ${p.lieu}</span><h3>${p.nom}</h3><p>${p.description}</p><span class="more">Découvrir le projet →</span></div>
    </article>`).join('');
  const cards = $('.pcard', grid);
  const cardIO = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); cardIO.unobserve(e.target); } }), { threshold: .1 });
  cards.forEach((c, i) => { c.style.transitionDelay = (i % 3) * .08 + 's'; cardIO.observe(c); });
  $('.filters button').forEach(b => b.addEventListener('click', () => {
    $('.filters button').forEach(x => x.classList.toggle('on', x === b));
    cards.forEach(c => { const show = b.dataset.f === 'all' || c.dataset.s === b.dataset.f; c.classList.toggle('hide', !show); if (show) { c.classList.remove('in'); requestAnimationFrame(() => requestAnimationFrame(() => c.classList.add('in'))); } });
  }));
  const modal = $('#modal')[0], mMain = $('#mMain')[0], mThumbs = $('#mThumbs')[0], mInfo = $('#mInfo')[0];
  const openProject = i => {
    const p = projects[i]; mMain.src = p.images[0]; mMain.alt = p.nom;
    mThumbs.innerHTML = p.images.length > 1 ? p.images.map((s, j) => `<img src="${s}" alt="" class="${j ? '' : 'on'}">`).join('') : '';
    $('img', mThumbs).forEach(t => t.addEventListener('click', () => { mMain.src = t.src; $('img', mThumbs).forEach(x => x.classList.toggle('on', x === t)); }));
    mInfo.innerHTML = `<span class="badge badge--${p.statut}" style="position:static;align-self:flex-start">${STATUT[p.statut]}</span><h3>${p.nom}</h3><p>${p.description}</p>
      <dl><dt>Lieu</dt><dd>${p.lieu}</dd><dt>Type</dt><dd>${p.type}</dd><dt>Statut</dt><dd>${STATUT[p.statut]}</dd><dt>Notre rôle</dt><dd>${p.role}</dd></dl>
      <a href="#contact" class="btn magnetic" data-close>Un projet similaire ? Demandez un devis →</a>`;
    modal.classList.add('open'); document.body.style.overflow = 'hidden';
  };
  const closeModal = () => { modal.classList.remove('open'); document.body.style.overflow = ''; };
  cards.forEach(c => { c.addEventListener('click', () => openProject(+c.dataset.i)); c.addEventListener('keydown', e => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), openProject(+c.dataset.i))); });
  modal.addEventListener('click', e => { if (e.target === modal || e.target.closest('.modal__close') || e.target.closest('[data-close]')) closeModal(); });

  /* Brochure : agrandissement */
  const lb = $('#lightbox')[0], lbImg = $('img', lb)[0];
  $('.open-img').forEach(b => b.addEventListener('click', () => { lbImg.src = b.dataset.full; lb.classList.add('open'); }));
  lb.addEventListener('click', () => lb.classList.remove('open'));
  addEventListener('keydown', e => { if (e.key === 'Escape') { lb.classList.remove('open'); closeModal(); } });

  /* Onglets */
  $('.tabs__nav button').forEach(b => b.addEventListener('click', () => {
    $('.tabs__nav button').forEach(x => x.classList.toggle('on', x === b)); $('.tab').forEach(t => t.classList.toggle('on', t.id === b.dataset.t));
  }));

  /* ===== Défilement ===== */
  const prog = $('.progress')[0], header = $('.header')[0], nav = $('#nav')[0]; let lastY = 0;
  const onScroll = () => {
    const y = scrollY, h = document.documentElement.scrollHeight - innerHeight;
    prog.style.width = (y / h * 100) + '%';
    header.classList.toggle('scrolled', y > 40);
    header.classList.toggle('hide', y > lastY && y > 300 && !nav.classList.contains('open'));
    lastY = y;
    if (!reduce) $('[data-parallax]').forEach(el => el.style.transform = `translateY(${Math.min(y, innerHeight) * el.dataset.parallax}px) scale(1.08)`);
  };
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* Boutons magnétiques + inclinaison */
  if (!reduce && matchMedia('(hover:hover)').matches) {
    $('.magnetic').forEach(b => { b.addEventListener('mousemove', e => { const r = b.getBoundingClientRect(); b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .2}px,${(e.clientY - r.top - r.height / 2) * .3}px)`; }); b.addEventListener('mouseleave', () => b.style.transform = ''); });
    $('[data-tilt]').forEach(c => { c.addEventListener('mousemove', e => { const r = c.getBoundingClientRect(), px = (e.clientX - r.left) / r.width - .5, py = (e.clientY - r.top) / r.height - .5; c.style.transform = `perspective(900px) rotateY(${px * 6}deg) rotateX(${-py * 6}deg)`; }); c.addEventListener('mouseleave', () => c.style.transform = ''); });
  }

  /* Menu mobile */
  const btn = $('.menu-btn')[0];
  const toggle = o => { nav.classList.toggle('open', o); btn.setAttribute('aria-expanded', o); btn.textContent = o ? 'Fermer' : 'Menu'; };
  btn.addEventListener('click', () => toggle(!nav.classList.contains('open')));
  $('a', nav).forEach(a => a.addEventListener('click', () => toggle(false)));

  /* ===== Formulaire de devis ===== */
  const form = $('#quoteForm')[0], msg = $('.form__msg', form)[0];
  const lines = d => [['Nom complet', d.nom], ['Téléphone / WhatsApp', d.telephone], ['E-mail', d.email], ['Service recherché', d.service], ['Description du projet', d.description]].map(([k, v]) => `${k} : ${v || '-'}`).join('\n');
  const valid = () => { let ok = true; $('[required]', form).forEach(f => { const bad = !f.value.trim(); f.classList.toggle('invalid', bad); if (bad) ok = false; }); if (!ok) { msg.className = 'form__msg err'; msg.textContent = 'Merci de remplir les champs obligatoires.'; } return ok; };
  form.addEventListener('submit', async e => {
    e.preventDefault(); msg.className = 'form__msg'; msg.textContent = ''; if (!valid()) return;
    const d = Object.fromEntries(new FormData(form)); if (d.website) return; delete d.website;
    if (FORM_ENDPOINT) {
      try { const r = await fetch(FORM_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(d) }); if (!r.ok) throw 0; form.reset(); msg.className = 'form__msg ok'; msg.textContent = 'Merci ! Votre demande a bien été envoyée. Nous vous répondons rapidement.'; }
      catch { msg.className = 'form__msg err'; msg.textContent = `Envoi impossible pour le moment. Écrivez-nous à ${EMAIL}.`; }
    } else {
      location.href = `mailto:${EMAIL}?subject=${encodeURIComponent('Demande de devis — ' + d.nom)}&body=${encodeURIComponent(lines(d))}`;
      msg.className = 'form__msg ok'; msg.textContent = "Votre application d'e-mail s'ouvre : envoyez le message pour finaliser votre demande.";
    }
  });
  $('#waBtn')[0].addEventListener('click', () => {
    if (!valid()) return; const d = Object.fromEntries(new FormData(form));
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent('Bonjour OE-Architecture, voici ma demande de devis :\n' + lines(d))}`, '_blank', 'noopener');
  });

  observe();
})();
