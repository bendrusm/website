/* Sortuje certyfikaty od najnowszego (atrybut data-date="RRRR-MM") */
document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('main.terminal');
    const blocks = Array.from(container.querySelectorAll('.code-block'));
    const footer = container.querySelector('.footer-code');

    blocks.sort((a, b) => {
        const dateA = a.getAttribute('data-date') || '';
        const dateB = b.getAttribute('data-date') || '';
        return dateB.localeCompare(dateA);
    });

    blocks.forEach(block => {
        container.insertBefore(block, footer);
    });
});
