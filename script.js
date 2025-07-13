document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobileMenu');
    const mainNav = document.getElementById('mainNav');

    if (mobileMenu && mainNav) {
        mobileMenu.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            mobileMenu.querySelector('i').classList.toggle('fa-bars');
            mobileMenu.querySelector('i').classList.toggle('fa-times');
        });

        // Close menu when a link is clicked (for single-page sites or smooth UX)
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    mobileMenu.querySelector('i').classList.remove('fa-times');
                    mobileMenu.querySelector('i').classList.add('fa-bars');
                }
            });
        });
    }

    // Dropdown functionality for mobile
    const dropbtn = document.querySelector('.dropdown .dropbtn');
    if (dropbtn) {
        dropbtn.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default link behavior
            const dropdownContent = this.nextElementSibling;
            if (dropdownContent.style.display === "block") {
                dropdownContent.style.display = "none";
                this.parentElement.classList.remove('active');
            } else {
                // Close other open dropdowns first (if any)
                document.querySelectorAll('.dropdown-content').forEach(content => {
                    content.style.display = "none";
                    content.parentElement.classList.remove('active');
                });
                dropdownContent.style.display = "block";
                this.parentElement.classList.add('active');
            }
        });
    }

    // --- Testimonials Carousel Logic ---
    // تم التعديل هنا: استخدام getElementById بدلاً من querySelector للعنصر الرئيسي للكاروسيل
    const testimonialCarousel = document.getElementById('testimonial-carousel'); 
    const testimonials = document.querySelectorAll('.testimonial-card');
    const totalTestimonials = testimonials.length;
    let currentIndex = 0;
    let autoPlayInterval;
    const autoPlayTime = 5000; // Change testimonial every 5 seconds

    // Get references to existing buttons and pagination dots
    const prevButton = document.getElementById('carousel-prev-btn');
    const nextButton = document.getElementById('carousel-next-btn');
    const paginationDotsContainer = document.querySelector('.carousel-pagination-dots');

    // Function to initialize the carousel
    function initializeCarousel() {
        // Hide controls if not enough testimonials or elements not found
        // تم تحديث الشرط للتحقق من testimonialCarousel بدلاً من testimonialCardsWrapper
        if (!testimonialCarousel || totalTestimonials <= 1) { 
            if (prevButton) prevButton.style.display = 'none';
            if (nextButton) nextButton.style.display = 'none';
            if (paginationDotsContainer) paginationDotsContainer.style.display = 'none';
            return;
        }

        // Show controls if they were hidden but now needed
        if (prevButton) prevButton.style.display = 'block';
        if (nextButton) nextButton.style.display = 'block';
        if (paginationDotsContainer) paginationDotsContainer.style.display = 'flex'; // Use flex for dots

        createPaginationDots();
        showTestimonial(currentIndex); // Show the first testimonial
        startAutoPlay(); // Start auto-play

        // Event listeners for navigation buttons
        if (nextButton) {
            nextButton.addEventListener('click', () => {
                clearInterval(autoPlayInterval); // Stop auto-play on manual navigation
                showNextTestimonial();
                startAutoPlay(); // Restart auto-play
            });
        }
        if (prevButton) {
            prevButton.addEventListener('click', () => {
                clearInterval(autoPlayInterval); // Stop auto-play on manual navigation
                showPrevTestimonial();
                startAutoPlay(); // Restart auto-play
            });
        }
    }

    // Function to show a specific testimonial
    function showTestimonial(index) {
        testimonials.forEach(testimonial => {
            testimonial.style.display = 'none'; // Hide all
        });

        if (testimonials[index]) {
            testimonials[index].style.display = 'block'; // Show the current one
        }
        updatePaginationDots(index);
    }

    // Function to show the next testimonial
    function showNextTestimonial() {
        currentIndex = (currentIndex + 1) % totalTestimonials;
        showTestimonial(currentIndex);
    }

    // Function to show the previous testimonial
    function showPrevTestimonial() {
        currentIndex = (currentIndex - 1 + totalTestimonials) % totalTestimonials;
        showTestimonial(currentIndex);
    }

    // Function to create pagination dots
    function createPaginationDots() {
        if (!paginationDotsContainer) return;
        paginationDotsContainer.innerHTML = ''; // Clear existing dots
        for (let i = 0; i < totalTestimonials; i++) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            dot.dataset.index = i;
            dot.addEventListener('click', () => {
                clearInterval(autoPlayInterval);
                currentIndex = i;
                showTestimonial(currentIndex);
                startAutoPlay();
            });
            paginationDotsContainer.appendChild(dot);
        }
    }

    // Function to update active dot
    function updatePaginationDots(activeIndex) {
        document.querySelectorAll('.carousel-pagination-dots .dot').forEach((dot, i) => {
            if (i === activeIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    // Start auto-play
    function startAutoPlay() {
        if (totalTestimonials <= 1) return;
        clearInterval(autoPlayInterval);
        autoPlayInterval = setInterval(showNextTestimonial, autoPlayTime);
    }

    // --- Initialize Carousel on DOMContentLoaded ---
    initializeCarousel();
});