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

// Initialize view mode state
let currentMode = 'scroll';
let swiper = null;

// DOM Elements
const gridView = document.getElementById('grid-view');
const swiperView = document.getElementById('swiper-view');
const scrollModeBtn = document.getElementById('scroll-mode');
const swipeModeBtn = document.getElementById('swipe-mode');

// Initialize gallery on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeGallery();
    initializeViewModeToggle();
});

// Initialize gallery with images
function initializeGallery() {
    // Populate grid view
    const gridContainer = gridView.querySelector('.grid-cols-1');
    gridContainer.innerHTML = galleryImages.map(image => `
        <div class="group relative overflow-hidden rounded-xl shadow-lg transition-transform hover:scale-[1.02]" 
             data-aos="fade-up">
            <img src="${image.url}" 
                 alt="${image.title}" 
                 class="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110">
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div class="absolute bottom-0 p-6 text-white">
                    <h3 class="text-xl font-bold mb-2">${image.title}</h3>
                    <p class="text-sm opacity-90">${image.description}</p>
                </div>
            </div>
        </div>
    `).join('');

    // Populate swiper view
    const swiperWrapper = swiperView.querySelector('.swiper-wrapper');
    swiperWrapper.innerHTML = galleryImages.map(image => `
        <div class="swiper-slide">
            <div class="relative h-[70vh]">
                <img src="${image.url}" 
                     alt="${image.title}" 
                     class="w-full h-full object-cover">
                <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                    <div class="absolute bottom-0 p-6 text-white">
                        <h3 class="text-xl font-bold mb-2">${image.title}</h3>
                        <p class="text-sm opacity-90">${image.description}</p>
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    // Initialize Swiper
    swiper = new Swiper('.gallery-swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        }
    });
}

// Initialize view mode toggle functionality
function initializeViewModeToggle() {
    scrollModeBtn.addEventListener('click', () => setViewMode('scroll'));
    swipeModeBtn.addEventListener('click', () => setViewMode('swipe'));
}

// Set view mode (scroll/swipe)
function setViewMode(mode) {
    currentMode = mode;
    
    // Update button states
    scrollModeBtn.classList.toggle('bg-green-600', mode === 'scroll');
    scrollModeBtn.classList.toggle('text-white', mode === 'scroll');
    scrollModeBtn.classList.toggle('bg-gray-200', mode !== 'scroll');
    scrollModeBtn.classList.toggle('text-gray-700', mode !== 'scroll');
    
    swipeModeBtn.classList.toggle('bg-green-600', mode === 'swipe');
    swipeModeBtn.classList.toggle('text-white', mode === 'swipe');
    swipeModeBtn.classList.toggle('bg-gray-200', mode !== 'swipe');
    swipeModeBtn.classList.toggle('text-gray-700', mode !== 'swipe');
    
    // Show/hide appropriate view
    gridView.classList.toggle('hidden', mode === 'swipe');
    swiperView.classList.toggle('hidden', mode === 'scroll');
    
    // Update swiper if switching to swipe mode
    if (mode === 'swipe' && swiper) {
        swiper.update();
    }
}
