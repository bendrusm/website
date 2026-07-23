document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('cli-input');
    const output = document.getElementById('cli-output');
    
    const secProjekty = document.getElementById('sec-projekty');
    const secSkills = document.getElementById('sec-skills');
    const secBlog = document.getElementById('sec-blog');

    // --- Ustawienie aktualnej daty w sekcji umiejętności ---
    const skillsDateElement = document.getElementById('skills-date');
    if (skillsDateElement) {
        const today = new Date();
        skillsDateElement.textContent = today.toLocaleDateString('pl-PL');
    }

    // Polskie podpowiedzi
    const suggestions = ['pomoc', 'projekty', 'umiejetnosci', 'blog', 'wszystko', 'wyczysc'];
    let wordIdx = 0, charIdx = 0, isDeleting = false;
    let animationTimeout = null;
    let isUserTyping = false;

    function hideAllSections() {
        secProjekty.classList.add('hidden');
        secSkills.classList.add('hidden');
        secBlog.classList.add('hidden');
    }

    function printLog(text, isError = false) {
        output.innerHTML = '';
        const logLine = document.createElement('div');
        logLine.className = `console-log ${isError ? 'error' : ''}`;
        logLine.textContent = text;
        output.appendChild(logLine);
    }

    function typeEffect() {
        if (isUserTyping) return;

        const currentWord = suggestions[wordIdx];
        
        if (isDeleting) {
            input.placeholder = "Wpisz " + currentWord.substring(0, charIdx--);
        } else {
            input.placeholder = "Wpisz " + currentWord.substring(0, charIdx++);
        }

        if (!isDeleting && charIdx > currentWord.length) {
            isDeleting = true;
            animationTimeout = setTimeout(typeEffect, 1200);
            return;
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            wordIdx = (wordIdx + 1) % suggestions.length;
        }

        animationTimeout = setTimeout(typeEffect, isDeleting ? 40 : 80);
    }

    typeEffect();

    input.addEventListener('input', () => {
        if (input.value.length > 0) {
            isUserTyping = true;
            clearTimeout(animationTimeout);
            input.placeholder = "Wpisz komendę";
        }
    });

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const command = input.value.trim().toLowerCase();
            
            isUserTyping = true;
            clearTimeout(animationTimeout);

            hideAllSections();

            if (command === 'projekty' || command === '1') {
                secProjekty.classList.remove('hidden');
                printLog('Załadowano sekcję: Projekty');
            } else if (command === 'umiejetnosci' || command === 'skills' || command === '2') {
                secSkills.classList.remove('hidden');
                printLog('Załadowano sekcję: Umiejętności');
            } else if (command === 'blog' || command === 'logi' || command === '3') {
                secBlog.classList.remove('hidden');
                printLog('Załadowano sekcję: Blog i Logi');
            } else if (command === 'wszystko' || command === 'all') {
                secProjekty.classList.remove('hidden');
                secSkills.classList.remove('hidden');
                secBlog.classList.remove('hidden');
                printLog('Załadowano wszystkie sekcje');
            } else if (command === 'wyczysc' || command === 'clear') {
                output.innerHTML = '';
                isUserTyping = false;
                charIdx = 0;
                isDeleting = false;
                typeEffect();
            } else if (command === 'pomoc' || command === 'help') {
                printLog('Dostępne komendy: projekty, umiejetnosci, blog, wszystko, wyczysc');
            } else if (command !== '') {
                printLog(`bash: nie znaleziono polecenia: ${command}`, true);
            }

            input.value = '';
        }
    });
});