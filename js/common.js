// Load components
async function loadComponent(elementId, componentPath) {
    try {
        const response = await fetch(componentPath);
        const html = await response.text();
        document.getElementById(elementId).innerHTML = html;
    } catch (error) {
        console.error('Error loading component:', error);
    }
}

// Initialize AOS
document.addEventListener('DOMContentLoaded', async function() {
    AOS.init({
        duration: 1000,
        once: true
    });

    // Load header and footer components
    await loadComponent('header', '/components/header.html');
    await loadComponent('footer-container', '/components/footer.html');

    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
});
