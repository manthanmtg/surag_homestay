// Function to load HTML components
async function loadComponent(elementId, componentPath) {
    try {
        const response = await fetch(componentPath);
        const html = await response.text();
        document.getElementById(elementId).innerHTML = html;

        // If this is the header, initialize mobile menu functionality
        if (elementId === 'header') {
            initializeMobileMenu();
        }
    } catch (error) {
        console.error(`Error loading component ${componentPath}:`, error);
    }
}

// Initialize mobile menu functionality
function initializeMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            const isHidden = mobileMenu.classList.contains('hidden');
            mobileMenu.classList.toggle('hidden', !isHidden);
            mobileMenu.classList.toggle('block', isHidden);
        });
    }
}

// Load all components when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    loadComponent('header', '/components/header.html');
    loadComponent('footer', '/components/footer.html');
});
