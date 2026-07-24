document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('cli-input');
    const output = document.getElementById('cli-output');

    const secProjekty = document.getElementById('sec-projekty');
    const secSkills = document.getElementById('sec-skills');
    const secBlog = document.getElementById('sec-blog');

    function hideAllSections() {
        if (secProjekty) secProjekty.classList.add('hidden');
        if (secSkills) secSkills.classList.add('hidden');
        if (secBlog) secBlog.classList.add('hidden');
    }

    function printLog(text, isError = false) {
        output.innerHTML = '';
        const logLine = document.createElement('div');
        logLine.className = `console-log ${isError ? 'error' : ''}`;
        logLine.textContent = text;
        output.appendChild(logLine);
    }

    // Obsługa komend CLI
    if (input) {
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const cmd = input.value.trim().toLowerCase();

                hideAllSections();

                if (cmd === 'projekty' || cmd === 'projects' || cmd === '1') {
                    if (secProjekty) secProjekty.classList.remove('hidden');
                    printLog('Załadowano sekcję: Projekty');
                } else if (cmd === 'umiejetnosci' || cmd === 'skills' || cmd === '2') {
                    if (secSkills) secSkills.classList.remove('hidden');
                    printLog('Załadowano sekcję: Umiejętności');
                } else if (cmd === 'blog' || cmd === 'logi' || cmd === '3') {
                    if (secBlog) secBlog.classList.remove('hidden');
                    printLog('Załadowano sekcję: Blog i Logi');
                } else if (cmd === 'wszystko' || cmd === 'all') {
                    if (secProjekty) secProjekty.classList.remove('hidden');
                    if (secSkills) secSkills.classList.remove('hidden');
                    if (secBlog) secBlog.classList.remove('hidden');
                    printLog('Załadowano wszystkie sekcje');
                } else if (cmd === 'wyczysc' || cmd === 'clear') {
                    output.innerHTML = '';
                } else if (cmd === 'pomoc' || cmd === 'help') {
                    printLog('Dostępne komendy: projekty, umiejetnosci, blog, wszystko, wyczysc / clear');
                } else if (cmd !== '') {
                    printLog(`bash: nie znaleziono polecenia: ${cmd}`, true);
                }

                input.value = '';
            }
        });
    }
});