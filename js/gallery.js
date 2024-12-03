// Gallery images from assets/images
const galleryImages = [
    {
        url: 'assets/images/1.jpg',
        title: 'Main Entrance',
        description: 'Welcome to Paramathma Stays'
    },
    {
        url: 'assets/images/2.jpg',
        title: 'Property View',
        description: 'Scenic view of our homestay'
    },
    {
        url: 'assets/images/3.jpg',
        title: 'Exterior',
        description: 'Beautiful architecture and surroundings'
    },
    {
        url: 'assets/images/4.jpg',
        title: 'Living Area',
        description: 'Spacious and comfortable living space'
    },
    {
        url: 'assets/images/5.jpg',
        title: 'Common Area',
        description: 'Well-furnished common space'
    },
    {
        url: 'assets/images/6.jpg',
        title: 'Seating Area',
        description: 'Cozy seating arrangement'
    },
    {
        url: 'assets/images/7.jpg',
        title: 'Living Room',
        description: 'Modern living room setup'
    },
    {
        url: 'assets/images/8.jpg',
        title: 'Bedroom Suite',
        description: 'Luxurious bedroom with mountain views'
    },
    {
        url: 'assets/images/9.jpg',
        title: 'Master Bedroom',
        description: 'Comfortable master bedroom'
    },
    {
        url: 'assets/images/10.jpg',
        title: 'Guest Room',
        description: 'Welcoming guest bedroom'
    },
    {
        url: 'assets/images/11.jpg',
        title: 'Twin Bedroom',
        description: 'Room with twin bed setup'
    },
    {
        url: 'assets/images/12.jpg',
        title: 'Bedroom View',
        description: 'Bedroom with natural lighting'
    },
    {
        url: 'assets/images/13.jpg',
        title: 'Bathroom',
        description: 'Modern bathroom facilities'
    },
    {
        url: 'assets/images/14.jpg',
        title: 'Washroom',
        description: 'Clean and well-maintained washroom'
    },
    {
        url: 'assets/images/15.jpg',
        title: 'Dining Area',
        description: 'Spacious dining space'
    },
    {
        url: 'assets/images/16.jpg',
        title: 'Dining Setup',
        description: 'Family dining arrangement'
    },
    {
        url: 'assets/images/17.jpg',
        title: 'Reading Corner',
        description: 'Perfect spot for relaxation'
    },
    {
        url: 'assets/images/18.jpg',
        title: 'Lounge Area',
        description: 'Comfortable lounge setting'
    },
    {
        url: 'assets/images/19.jpg',
        title: 'Kitchen',
        description: 'Fully equipped modern kitchen'
    },
    {
        url: 'assets/images/20.jpg',
        title: 'Kitchen View',
        description: 'Well-organized kitchen space'
    },
    {
        url: 'assets/images/21.jpg',
        title: 'Kitchenette',
        description: 'Compact kitchen arrangement'
    },
    {
        url: 'assets/images/22.jpg',
        title: 'Outdoor View',
        description: 'Breathtaking mountain landscapes'
    },
    {
        url: 'assets/images/23.jpg',
        title: 'Garden View',
        description: 'Beautiful garden setting'
    },
    {
        url: 'assets/images/24.jpg',
        title: 'Outdoor Space',
        description: 'Relaxing outdoor area'
    },
    {
        url: 'assets/images/25.jpg',
        title: 'Patio',
        description: 'Peaceful patio setting'
    },
    {
        url: 'assets/images/26.jpg',
        title: 'Garden Space',
        description: 'Lush green surroundings'
    },
    {
        url: 'assets/images/27.jpg',
        title: 'Garden Area',
        description: 'Well-maintained garden'
    },
    {
        url: 'assets/images/28.jpg',
        title: 'Exterior View',
        description: 'Property exterior view'
    },
    {
        url: 'assets/images/29.jpg',
        title: 'Building View',
        description: 'Architectural beauty'
    },
    {
        url: 'assets/images/30.jpg',
        title: 'Property Overview',
        description: 'Complete property view'
    },
    {
        url: 'assets/images/31.jpg',
        title: 'Night View',
        description: 'Serene evening ambiance'
    },
    {
        url: 'assets/images/32.jpg',
        title: 'Exterior Night',
        description: 'Beautiful night lighting'
    }
];

// DOM Elements
let gridView, swiperView, scrollModeBtn, swipeModeBtn, swiper;
let currentMode = 'scroll';

function initializeDOMElements() {
    console.log('Initializing DOM elements...');
    gridView = document.getElementById('grid-view');
    swiperView = document.getElementById('swiper-view');
    scrollModeBtn = document.getElementById('scroll-mode');
    swipeModeBtn = document.getElementById('swipe-mode');

    console.log('DOM elements found:', {
        gridView: !!gridView,
        swiperView: !!swiperView,
        scrollModeBtn: !!scrollModeBtn,
        swipeModeBtn: !!swipeModeBtn
    });

    return gridView && swiperView && scrollModeBtn && swipeModeBtn;
}

// Initialize gallery with images
function initializeGallery() {
    if (!initializeDOMElements()) {
        console.error('Failed to initialize gallery - DOM elements missing');
        return;
    }

    // Populate grid view
    const gridContainer = gridView.querySelector('.gallery-grid');
    gridContainer.innerHTML = galleryImages.map((image, index) => `
        <div class="gallery-item" data-aos="fade-up" data-aos-delay="${index * 50}">
            <img src="${image.url}" 
                 alt="${image.title}"
                 loading="lazy">
            <div class="gallery-item-overlay">
                <h3 class="text-lg font-semibold mb-1">${image.title}</h3>
                <p class="text-sm opacity-90">${image.description}</p>
            </div>
        </div>
    `).join('');

    // Initialize Swiper
    initializeSwiper();

    // Add close button functionality
    const closeButton = document.querySelector('.slideshow-close');
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            setViewMode('scroll');
        });
    }
}

function initializeSwiper() {
    console.log('Initializing Swiper...');
    
    // Destroy existing swiper instance if it exists
    if (swiper) {
        swiper.destroy(true, true);
    }

    // Clear and populate swiper slides
    const swiperWrapper = swiperView.querySelector('.swiper-wrapper');
    swiperWrapper.innerHTML = galleryImages.map(image => `
        <div class="swiper-slide">
            <div class="swiper-zoom-container">
                <img src="${image.url}" 
                     alt="${image.title}"
                     class="swiper-image">
            </div>
            <div class="slide-info">
                <h3 class="text-xl font-bold">${image.title}</h3>
                <p>${image.description}</p>
            </div>
        </div>
    `).join('');

    // Initialize new Swiper instance
    swiper = new Swiper('.gallery-swiper', {
        init: true,
        slidesPerView: 1,
        spaceBetween: 30,
        centeredSlides: true,
        loop: true,
        grabCursor: true,
        zoom: {
            maxRatio: 3,
            minRatio: 1
        },
        keyboard: {
            enabled: true,
            onlyInViewport: false
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        }
    });

    console.log('Swiper initialized:', swiper);
}

function openSlideshow(index) {
    console.log('Opening slideshow at index:', index);
    setViewMode('swipe');
    
    // Wait for the transition to complete
    setTimeout(() => {
        if (swiper) {
            swiper.update();
            // Add 1 to account for the loop mode
            swiper.slideTo(index + 1, 0);
        }
    }, 100);
}

// Initialize view mode toggle functionality
function initializeViewModeToggle() {
    console.log('Initializing view mode toggle...');
    
    if (!scrollModeBtn || !swipeModeBtn) {
        console.error('Toggle buttons not found');
        return;
    }

    function handleScrollMode() {
        console.log('Grid view clicked');
        setViewMode('scroll');
    }

    function handleSwipeMode() {
        console.log('Slideshow view clicked');
        setViewMode('swipe');
    }

    // Remove existing listeners if any
    scrollModeBtn.removeEventListener('click', handleScrollMode);
    swipeModeBtn.removeEventListener('click', handleSwipeMode);

    // Add click listeners
    scrollModeBtn.addEventListener('click', handleScrollMode);
    swipeModeBtn.addEventListener('click', handleSwipeMode);
    
    console.log('View mode toggle initialized');
    
    // Set initial mode
    setViewMode('scroll');
}

// Set view mode (scroll/swipe)
function setViewMode(mode) {
    console.log('Setting view mode:', mode);
    currentMode = mode;
    
    if (mode === 'swipe') {
        // Make sure Swiper is initialized
        if (!swiper) {
            initializeSwiper();
        } else {
            swiper.update();
        }
        
        // Show slideshow
        gridView.classList.add('hidden');
        swiperView.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        
        // Hide header in mobile view
        const header = document.getElementById('header');
        if (header && window.innerWidth <= 640) {
            header.style.display = 'none';
        }
    } else {
        // Show grid view
        gridView.classList.remove('hidden');
        swiperView.classList.add('hidden');
        document.body.style.overflow = '';
        
        // Show header
        const header = document.getElementById('header');
        if (header) {
            header.style.display = '';
        }
    }

    // Update button states
    scrollModeBtn.classList.toggle('active', mode === 'scroll');
    swipeModeBtn.classList.toggle('active', mode === 'swipe');
}

// Initialize gallery on page load
window.addEventListener('load', function() {
    console.log('Page loaded, initializing gallery...');
    if (initializeDOMElements()) {
        initializeGallery();
        initializeViewModeToggle();
    } else {
        console.error('Failed to initialize gallery - required elements not found');
    }
});

// Re-initialize on dynamic content changes
document.addEventListener('DOMContentLoaded', function() {
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length) {
                console.log('DOM changed, re-initializing...');
                if (initializeDOMElements()) {
                    initializeViewModeToggle();
                }
            }
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});
