// Initialize Lucide Icons safely
if (window.lucide && typeof lucide.createIcons === 'function') {
    try { lucide.createIcons(); } catch (e) { console.warn('Lucide init failed', e); }
} else {
    console.warn('Lucide not available yet');
}

// Mobile Menu Toggle
const menuBtn = document.getElementById('mobile-menu-btn');
const menu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');
const iconMenu = menuBtn ? menuBtn.querySelector('.icon-menu') : null;
const iconClose = menuBtn ? menuBtn.querySelector('.icon-close') : null;

console.log('Script loaded at', new Date().toISOString());
console.log('Newsletter button:', document.getElementById('newsletter-btn'));
console.log('Newsletter modal:', document.getElementById('newsletter-modal'));

if (menuBtn && menu) {
    menuBtn.addEventListener('click', () => {
        const isOpen = !menu.classList.contains('hidden');
        menu.classList.toggle('hidden');
        menuBtn.setAttribute('aria-expanded', String(!isOpen));
        if (iconMenu && iconClose) {
            iconMenu.classList.toggle('hidden');
            iconClose.classList.toggle('hidden');
        }
    });
}

// Close menu when a link is clicked
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        menu.classList.add('hidden');
        if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
        if (iconMenu && iconClose) {
            iconMenu.classList.remove('hidden');
            iconClose.classList.add('hidden');
        }
    });
});

// Newsletter Modal
const newsletterBtn = document.getElementById('newsletter-btn');
const newsletterBtnMobile = document.getElementById('newsletter-btn-mobile');
const newsletterModal = document.getElementById('newsletter-modal');
const closeModalBtn = document.getElementById('close-modal');

function openNewsletterModal() {
    if (!newsletterModal) return;
    newsletterModal.classList.remove('hidden');
    newsletterModal.style.display = 'flex';
    if (window.lucide && typeof lucide.createIcons === 'function') {
        try { lucide.createIcons(); } catch (e) { /* ignore */ }
    }
}

function closeNewsletterModal() {
    if (!newsletterModal) return;
    newsletterModal.classList.add('hidden');
    newsletterModal.style.display = '';
}

// Open modal when button is clicked
if (newsletterBtn && newsletterModal) {
    console.log('Adding click listener to newsletter button');
    newsletterBtn.addEventListener('click', () => {
        console.log('Newsletter button clicked!');
        openNewsletterModal();
    });
} else {
    console.error('Newsletter button or modal not found!', {newsletterBtn, newsletterModal});
}

if (newsletterBtnMobile && newsletterModal) {
    newsletterBtnMobile.addEventListener('click', () => {
        console.log('Mobile newsletter button clicked!');
        openNewsletterModal();
        if (menu) menu.classList.add('hidden'); // Close mobile menu
    });
}

// Close modal when close button is clicked
if (closeModalBtn && newsletterModal) {
    closeModalBtn.addEventListener('click', () => {
        console.log('Close button clicked!');
        closeNewsletterModal();
    });
}

// Close modal when clicking outside the modal content
if (newsletterModal) {
    newsletterModal.addEventListener('click', (e) => {
        if (e.target === newsletterModal) {
            console.log('Backdrop clicked');
            closeNewsletterModal();
        }
    });
}

// Expose for manual testing from console
window.openNewsletterModal = openNewsletterModal;
window.closeNewsletterModal = closeNewsletterModal;

// Split CTA: Shop Our Inventory (transforms from single to dual button)
(function () {
    const container = document.querySelector('.split-cta-container[data-split-cta="inventory"]');
    if (!container) return;
    
    const singleBtn = container.querySelector('.split-cta-single');
    const dualBtn = container.querySelector('.split-cta-dual');
    if (!singleBtn || !dualBtn) return;

    let isSplit = false;

    function setSplit(split) {
        if (split === isSplit) return;
        isSplit = split;
        
        if (split) {
            singleBtn.classList.add('hidden');
            dualBtn.classList.remove('hidden');
        } else {
            singleBtn.classList.remove('hidden');
            dualBtn.classList.add('hidden');
        }
    }

    // Detect pointer capabilities
    const hasFinePointer = window.matchMedia && window.matchMedia('(pointer: fine)').matches;
    const hasCoarsePointer = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;

    // Desktop: hover to split
    if (hasFinePointer) {
        container.addEventListener('mouseenter', () => setSplit(true));
        container.addEventListener('mouseleave', () => setSplit(false));
    }

    // Mobile/Touch: click to toggle split
    if (hasCoarsePointer) {
        singleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            setSplit(true);
        });
        
        // Close on outside click
        document.addEventListener('pointerdown', (e) => {
            if (!container.contains(e.target)) {
                setSplit(false);
            }
        });
    }
})();

