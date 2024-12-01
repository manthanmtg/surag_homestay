const faqs = [
    [
        "What are the check-in and check-out times?",
        "Check-in time is 2:00 PM and check-out time is 11:00 AM. Early check-in or late check-out may be available upon request, subject to availability."
    ],
    [
        "Is breakfast included in the stay?",
        "Yes, we provide complimentary homemade breakfast for all our guests. We serve both South Indian and Continental breakfast options."
    ],
    [
        "Do you provide parking facilities?",
        "Yes, we offer free private parking on our premises for all guests."
    ],
    [
        "What amenities are available in the rooms?",
        "Our rooms come equipped with air conditioning, TV, private bathroom, hot water, free Wi-Fi, clean linens, and basic toiletries."
    ],
    [
        "Is the property suitable for families with children?",
        "Yes, we welcome families and provide a safe, comfortable environment. We have spacious rooms and outdoor areas perfect for families."
    ],
    [
        "Are pets allowed?",
        "We currently do not allow pets in our property to ensure comfort for all guests."
    ],
    [
        "What payment methods do you accept?",
        "We accept all major credit/debit cards, UPI payments, and cash. A 50% advance payment is required for booking confirmation."
    ],
    [
        "Is there a minimum stay requirement?",
        "During peak seasons, we have a minimum stay requirement of 2 nights. During off-season, single night stays are available."
    ],
    [
        "What's your cancellation policy?",
        "Full refund for cancellations made 7 days before check-in. 50% refund for cancellations made 3-7 days before check-in. No refund for cancellations made less than 3 days before check-in."
    ],
    [
        "Do you arrange local sightseeing or transportation?",
        "Yes, we can help arrange local sightseeing tours and transportation services. Please inform us in advance for better arrangements."
    ],
    [
        "Is room service available?",
        "Yes, we offer room service during operational hours (7 AM to 10 PM)."
    ],
    [
        "What's the distance from major attractions?",
        "We are conveniently located near several tourist spots. Most major attractions are within 5-15 km radius."
    ]
];

document.addEventListener('DOMContentLoaded', function() {
    const faqContainer = document.getElementById('faq-container');
    
    faqs.forEach(([question, answer], index) => {
        const faqItem = document.createElement('div');
        faqItem.className = 'mb-6 bg-white rounded-lg shadow-sm overflow-hidden';
        faqItem.setAttribute('data-aos', 'fade-up');
        faqItem.setAttribute('data-aos-delay', (index * 100).toString());
        
        faqItem.innerHTML = `
            <button class="w-full px-6 py-4 text-left focus:outline-none flex justify-between items-center">
                <span class="font-medium text-gray-900">${question}</span>
                <i class="fas fa-chevron-down text-gray-500 transition-transform duration-300"></i>
            </button>
            <div class="faq-answer px-6 py-4 bg-gray-50 hidden">
                <p class="text-gray-700">${answer}</p>
            </div>
        `;
        
        faqContainer.appendChild(faqItem);
        
        const button = faqItem.querySelector('button');
        const answer_div = faqItem.querySelector('.faq-answer');
        const icon = faqItem.querySelector('i');
        
        button.addEventListener('click', () => {
            const isOpen = !answer_div.classList.contains('hidden');
            
            // Close all other answers
            document.querySelectorAll('.faq-answer').forEach(el => el.classList.add('hidden'));
            document.querySelectorAll('.fa-chevron-down').forEach(el => 
                el.classList.remove('rotate-180'));
            
            if (!isOpen) {
                answer_div.classList.remove('hidden');
                icon.classList.add('rotate-180');
            }
        });
    });
});
