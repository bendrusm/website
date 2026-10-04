document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('cli-input');
    const output = document.getElementById('cli-output');

    const secProjekty = document.getElementById('sec-projekty');
    const secSkills = document.getElementById('sec-skills');
    const secBlog = document.getElementById('sec-blog');

    // Tłumaczenia z i18n.js (PL / EN)
    const t = (key, vars) => (window.i18n ? window.i18n.t(key, vars) : key);

    function hideAllSections() {
        if (secProjekty) secProjekty.classList.add('hidden');
        if (secSkills) secSkills.classList.add('hidden');
        if (secBlog) secBlog.classList.add('hidden');
    }

    // Ostatni log zapamiętujemy jako klucz, żeby po zmianie języka wyświetlić go od nowa
    let lastLog = null;

    function renderLog() {
        output.innerHTML = '';
        if (!lastLog) return;
        const logLine = document.createElement('div');
        logLine.className = `console-log ${lastLog.isError ? 'error' : ''}`;
        logLine.textContent = t(lastLog.key, lastLog.vars);
        output.appendChild(logLine);
    }

    function printLog(key, vars, isError = false) {
        lastLog = { key, vars, isError };
        renderLog();
    }

    if (window.i18n) window.i18n.onChange(renderLog);

    // Komendy działają po polsku i po angielsku (bez polskich znaków też)
    function normalize(text) {
        return text
            .trim()
            .toLowerCase()
            .replace(/ł/g, 'l')
            .normalize('NFD')
            .replace(/[̀-ͯ]/g, '');
    }

    function run(raw) {
        const cmd = normalize(raw);

        hideAllSections();

        if (['projekty', 'projects', '1'].includes(cmd)) {
            if (secProjekty) secProjekty.classList.remove('hidden');
            printLog('js.loaded.projects');
        } else if (['umiejetnosci', 'skills', '2'].includes(cmd)) {
            if (secSkills) secSkills.classList.remove('hidden');
            printLog('js.loaded.skills');
        } else if (['blog', 'logi', 'logs', '3'].includes(cmd)) {
            if (secBlog) secBlog.classList.remove('hidden');
            printLog('js.loaded.blog');
        } else if (['wszystko', 'all'].includes(cmd)) {
            [secProjekty, secSkills, secBlog].forEach((s) => s && s.classList.remove('hidden'));
            printLog('js.loaded.all');
        } else if (['wyczysc', 'clear'].includes(cmd)) {
            lastLog = null;
            renderLog();
        } else if (['pomoc', 'help'].includes(cmd)) {
            printLog('js.help');
        } else if (cmd !== '') {
            printLog('js.notfound', { cmd: raw }, true);
        }
    }

    if (input) {
        input.addEventListener('keydown', (e) => {
            if (e.key !== 'Enter') return;
            e.preventDefault();
            run(input.value.trim());
            input.value = '';
        });
    }

    // Menu: przyciski robią to samo, co wpisanie komendy
    document.querySelectorAll('.menu-btn').forEach((btn) => {
        btn.addEventListener('click', () => run(btn.dataset.cmd));
    });
});
