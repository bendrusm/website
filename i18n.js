/* Przełącznik języka PL / EN.
 * Domyślny język: PL (tekst PL jest w samym HTML, więc strona działa też bez JS).
 * Elementy z atrybutem data-i18n="klucz" dostają po wybraniu EN tłumaczenie ze słownika poniżej.
 * Atrybuty: data-i18n-attr="atrybut:klucz;atrybut2:klucz2". Wybór zapisuje się w localStorage, można go też wymusić przez ?lang=en.
 * Dodajesz nowy tekst: wstaw data-i18n="moj.klucz" w HTML i dopisz "moj.klucz" w słowniku EN.
 */
(function () {
  'use strict';
  document.documentElement.classList.add('js'); // CSS: sekcje chowamy tylko gdy JS działa
  var STORAGE_KEY = 'lang';
  var DEFAULT_LANG = 'pl';
  var SUPPORTED = ['pl', 'en'];

  var DICT = {
    pl: {
    "js.loaded.projects": "Załadowano sekcję: Projekty",
    "js.loaded.skills": "Załadowano sekcję: Umiejętności",
    "js.loaded.blog": "Załadowano sekcję: Blog i Logi",
    "js.loaded.all": "Załadowano wszystkie sekcje",
    "js.help": "Dostępne komendy: projekty, umiejetnosci, blog, wszystko, wyczysc / clear",
    "js.notfound": "bash: nie znaleziono polecenia: {cmd}"
},
    en: {
    "js.loaded.projects": "Section loaded: Projects",
    "js.loaded.skills": "Section loaded: Skills",
    "js.loaded.blog": "Section loaded: Blog and Logs",
    "js.loaded.all": "All sections loaded",
    "js.help": "Available commands: projects, skills, blog, all, clear",
    "js.notfound": "bash: command not found: {cmd}",
    "back.home": "&lt;-- Back to main menu",
    "idx.s1": "# 01. PROJECTS",
    "idx.nas": "NAS Server",
    "idx.nasmeta": "Documentation / Photos",
    "idx.homelabmeta": "In progress",
    "idx.s2": "# 02. COURSES AND SKILLS",
    "idx.certs": "Certificates",
    "idx.skills": "Skills",
    "idx.s3": "# 03. Logs",
    "idx.aboutfn": "about_me",
    "idx.aboutlink": "'profile'",
    "idx.placeholder": "Type a command",
    "idx.aria": "Type a command, e.g. help",
    "menu.projects": "projects",
    "menu.skills": "skills",
    "menu.blog": "blog",
    "menu.all": "all",
    "skip": "Skip to content",
    "about.title": "About me — Michał Sienkiewicz",
    "about.h1": "About me",
    "about.s1": "# 01. WHO I AM",
    "about.p1": "Michał Sienkiewicz, Junior Security Analyst at EBRAND AG. I analyse the detections raised by the system, then assess and classify them according to the protection strategy assigned to the brand I protect. Alongside work I'm studying for an engineering degree — I'm just starting my second year.",
    "about.s2": "# 02. WHAT I DO",
    "about.li1": "Analysing incoming detections: assessment and classification according to each brand's strategy",
    "about.li2": "Engineering studies (2nd year)",
    "about.li3": "Homelab being rebuilt — details will come in time. Earlier project: <a href=\"nas.html\" class=\"selectable-link c-green\">NAS server</a>",
    "blog.col": "From a free course to a job",
    "blog.h4": "The Beginning",
    "blog.p1": "I've always been drawn to IT, but my entry into cybersecurity wasn't a carefully planned move years in the making. The spark was a free course from INCO — that's where I first felt this was the right environment for me. Shortly after, I went deeper into the Google Cybersecurity Professional certificate. I was surprised by how strong the material was — it turned out to be a dozen or so smaller courses combined into one solid package that gave me firm theoretical foundations in networking, operating systems, the Linux command line and security procedures.",
    "blog.p2": "After several months of intensive study I got what I was after: I started working as a Junior Security Analyst. Can anyone just walk into cyber? I won't throw around cheap slogans from the internet. It worked out for me even though I didn't have years in corporate IT departments behind me, only internships. What won was determination, not being afraid of challenges, and landing among great people on the team, from whom I soak up knowledge every day. Today, for the first time in my life, I'm doing something that gives me a real sense of purpose and satisfaction — protecting brands, analysing detections and classifying them is work combined with passion.",
    "blog.p3": "In parallel I'm developing my private toolkit. I sold my trusty ThinkPad T490 and moved to a much more powerful ThinkPad T14 Gen 2 with 48 GB of RAM. It's my main personal machine, where I learn programming, polish scripts and analyse environments. My homelab is going through a transformation right now (the details will come in time), but this machine gives me complete freedom — whether I'm spinning up VMs or writing code.",
    "blog.p4": "This blog is written without sugar-coating. It will be my logbook, where I'll describe my cyber journey: day-to-day experiences as a security analyst, problems I run into, achievements, my engineering studies, hardware experiments and preparation for the CompTIA Security+ exam.",
    "blog.fn": "back",
    "blog.home": "'home page'",
    "cert.title": "Certificates — Michał Sienkiewicz",
    "cert.h1": "Certificates &amp; Qualifications",
    "c6.meta": "<strong>Issuer:</strong> Cisco Networking Academy<br>\n<strong>Date:</strong> August 2026<br>\n<strong>Status:</strong> <span class=\"c-green\">Verified</span>",
    "c6.desc": "An introductory course in cybersecurity completed through the Cisco Networking Academy programme. It explores the field of cybersecurity and shows why it is a future-proof career.",
    "c1.meta": "<strong>Issuer:</strong> Practima Poland<br>\n<strong>Date:</strong> May 2026<br>\n<strong>Status:</strong> <span class=\"c-green\">Verified</span>",
    "c1.desc": "An intensive course in IT infrastructure security and the basics of penetration testing. The training covered practical topics in network and host protection (segmentation, IAM, cryptography), vulnerability and log analysis, and incident response procedures. The course culminated in a practical project analysing threats and implementing defensive mechanisms in a real-world environment.",
    "c2.meta": "<strong>Issuer:</strong> Coursera / Google<br>\n<strong>Date:</strong> December 2025<br>\n<strong>Status:</strong> <span class=\"c-green\">Verified</span>",
    "c2.d1": "A programme in <em>Defensive Security</em> that prepares for work as a SOC analyst. It covers the fundamentals of network architecture, risk and identity management (IAM), vulnerability analysis and incident response procedures (Detection &amp; Response) in line with security standards.",
    "c2.d2": "The hands-on part focuses on practice with <strong>SIEM</strong> and <strong>IDS</strong> systems, working in the Linux command line and SQL queries for analysing log databases. The whole is completed by using Python scripts to automate tasks and mitigate threats faster.",
    "c3.h2": "# CYRUS Training Package",
    "c3.meta": "<strong>Issuer:</strong> CYRUS<br>\n<strong>Date:</strong> December 2025<br>\n<strong>Status:</strong> <span class=\"c-green\">Verified</span>",
    "c3.li1": "<strong>Information Security Policy:</strong> A set of rules and procedures defining the classification, processing and protection of data. It defines IAM-based access rules, specifies user responsibilities and enforces continuous infrastructure auditing.",
    "c3.li2": "<strong>Data Encryption:</strong> A mechanism guaranteeing the confidentiality and integrity of information. It covers protecting data at rest (<em>data at rest</em>) and in transit (<em>data in transit</em>), making it unreadable if traffic is intercepted or a storage device is stolen.",
    "c3.li3": "<strong>Ransomware Protection:</strong> A multi-layered strategy preventing malware from encrypting resources. It relies on network segmentation, anomaly detection (IDS/SIEM), permission control and resilient backups.",
    "c4.h2": "# Systems Administration (Linux &amp; Windows Server)",
    "c4.meta": "<strong>Issuer:</strong> StrefaKursow.pl<br>\n<strong>Date:</strong> September 2025<br>\n<strong>Status:</strong> <span class=\"c-green\">Verified</span>",
    "c4.desc": "The course covered the practical fundamentals of managing the two main server environments used in IT infrastructure. For Linux, the emphasis was on efficient work in the system shell (CLI), user administration, access rights management and basic service configuration. The Windows Server module introduced domain environment management, configuration of basic server roles and access control mechanisms in corporate networks.",
    "c5.h2": "# IT Technician Diploma",
    "c5.meta": "<strong>Issuer:</strong> District Examination Board (OKE)<br>\n<strong>Date:</strong> June 2015<br>\n<strong>Status:</strong> <span class=\"c-green\">Verified</span>",
    "c5.desc": "A state diploma that is the absolute foundation of my path in IT. The exams in the classic system rigorously verified knowledge in three main pillars: hardware assembly and operation and operating systems (E.12), design and administration of computer networks (E.13), and creating applications, websites and databases (E.14). This stage gave me a full, low-level understanding of how hardware and network infrastructure work, forming the basis for my later specialisation in server administration and cybersecurity.",
    "cert.footer": "<span class=\"symbol\">&gt;</span> All certificates are available on <a href=\"https://www.linkedin.com/in/michal-sienkiewicz-cybersecurity\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"selectable-link link-blue\">LinkedIn</a>",
    "nas.title": "NAS Server — Michał Sienkiewicz",
    "nas.h1": "Project Documentation: Home NAS Server",
    "nas.file": "Project description",
    "nas.s1": "# 01. ORIGIN AND HARDWARE",
    "nas.p1": "The main goal of the project was to escape the limits of free public clouds (and their 15 GB cap) in favour of my own local 1 TB data store. The server is meant to serve as a fast, wireless file exchange node on the home network and as the target for automatic backups from Linux and Android devices.",
    "nas.p2": "<strong>Hardware architecture:</strong>",
    "nas.li1": "<strong>Core of the setup:</strong> Raspberry Pi 4 Model B (2 GB RAM) with the operating system on a 32 GB microSD card.",
    "nas.li2": "<strong>Data storage:</strong> Two 1 TB 3.5\" HDDs mounted in an external docking station connected over USB 3.0. The whole thing runs silently in everyday use.",
    "nas.s2": "# 02. PROTOCOLS AND DATA RETENTION ARCHITECTURE",
    "nas.p3": "Using a docking station connected over USB made it impossible to combine the drives into a traditional RAID 1 array. The answer to this limitation is the planned deployment of a dedicated automatic synchronisation tool.",
    "nas.p4": "The target data flow assumes a two-tier automation: on one side, ongoing backup of files from the laptop and smartphone to the first drive; on the other, a periodic mirroring of the contents of Drive 1 to Drive 2 in the background. If the main drive fails physically, the second drive keeps a full backup copy.",
    "nas.p5": "Direct access to resources on the LAN is handled by the <strong>Samba (SMB)</strong> protocol, ensuring low latency for data exchange between Linux and Android environments.",
    "nas.s3": "# 03. OS EVOLUTION: HARDENING VS ERGONOMICS",
    "nas.p6": "Choosing the operating environment is a story of iterative tests on a living organism:",
    "nas.li3": "<strong>Ubuntu Server:</strong> Rejected at the start. Problems with properly managing power states (spindown) in the USB docking station caused the HDD platters to wake up cyclically every 5 minutes, generating unnecessary noise and wear on the hardware.",
    "nas.li4": "<strong>OpenMediaVault (OMV):</strong> The most mature choice in the comparison. Rigorous system hardening resulted in a stable and secure server with proper disk spindown handling.",
    "nas.li5": "<strong>CasaOS:</strong> The experimental testing ground. A convenient interface for a layperson collided with noticeable gaps in the default security configuration. A test phase is currently under way — if manual hardening doesn't bring the expected results, the project will return to OMV.",
    "nas.s4": "# 04. PHOTO / ARCHITECTURE",
    "nas.cap": "Raspberry Pi 4 Model B — the core of the NAS server",
    "nas.alt": "Photo of the NAS server on a Raspberry Pi 4",
    "nas.status": "'NAS Active / CasaOS Audit'"
}
  };

  function safeGet() { try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; } }
  function safeSet(v) { try { localStorage.setItem(STORAGE_KEY, v); } catch (e) {} }

  function detect() {
    var q = null;
    try { q = new URLSearchParams(location.search).get('lang'); } catch (e) {}
    if (SUPPORTED.indexOf(q) > -1) { safeSet(q); return q; }
    var s = safeGet();
    return SUPPORTED.indexOf(s) > -1 ? s : DEFAULT_LANG;
  }

  var current = detect();
  var listeners = [];
  var origHtml = new Map();
  var origAttr = new Map();

  // Unikamy mignięcia po polsku, gdy zapisany jest EN
  if (current === 'en') {
    document.documentElement.classList.add('i18n-pending');
    setTimeout(function () { document.documentElement.classList.remove('i18n-pending'); }, 2000);
  }

  function t(key, vars) {
    var str = (DICT[current] && DICT[current][key]);
    if (str === undefined) str = DICT.pl[key];
    if (str === undefined) str = key;
    if (vars) Object.keys(vars).forEach(function (k) { str = str.split('{' + k + '}').join(vars[k]); });
    return str;
  }

  function applyDom(lang) {
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      if (!origHtml.has(el)) origHtml.set(el, el.innerHTML);
      var en = DICT.en[el.getAttribute('data-i18n')];
      el.innerHTML = (lang === 'en' && en !== undefined) ? en : origHtml.get(el);
    });
    document.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
      var saved = origAttr.get(el) || {};
      el.getAttribute('data-i18n-attr').split(';').forEach(function (pair) {
        var i = pair.indexOf(':');
        if (i < 1) return;
        var attr = pair.slice(0, i).trim(), key = pair.slice(i + 1).trim();
        if (!(attr in saved)) saved[attr] = el.getAttribute(attr) || '';
        var en = DICT.en[key];
        el.setAttribute(attr, (lang === 'en' && en !== undefined) ? en : saved[attr]);
      });
      origAttr.set(el, saved);
    });
    document.documentElement.lang = lang;
    document.querySelectorAll('.lang-switch button').forEach(function (b) {
      b.setAttribute('aria-pressed', b.getAttribute('data-lang') === lang ? 'true' : 'false');
    });
  }

  function setLang(lang) {
    if (SUPPORTED.indexOf(lang) < 0) return;
    current = lang;
    safeSet(lang);
    applyDom(lang);
    listeners.forEach(function (fn) { try { fn(lang); } catch (e) {} });
  }

  function buildSwitch() {
    var box = document.createElement('div');
    box.className = 'lang-switch';
    box.setAttribute('role', 'group');
    box.setAttribute('aria-label', 'Język / Language');
    [['pl', 'PL', 'Polski'], ['en', 'EN', 'English']].forEach(function (l) {
      var b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('data-lang', l[0]);
      b.setAttribute('lang', l[0]);
      b.setAttribute('aria-label', l[2]);
      b.textContent = l[1];
      b.addEventListener('click', function () { setLang(l[0]); });
      box.appendChild(b);
    });
    var skip = document.querySelector('.skip-link');
    document.body.insertBefore(box, skip ? skip.nextSibling : document.body.firstChild);
  }

  function init() {
    try {
      buildSwitch();
      applyDom(current);
      listeners.forEach(function (fn) { try { fn(current); } catch (e) {} });
    } finally {
      document.documentElement.classList.remove('i18n-pending');
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  window.i18n = {
    t: t,
    lang: function () { return current; },
    set: setLang,
    onChange: function (fn) { listeners.push(fn); }
  };
})();
