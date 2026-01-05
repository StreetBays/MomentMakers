document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Menu Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li');

    if (menuToggle) {
        // Robust toggle handler
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent immediate bubbling
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('toggle');

            // Toggle body scroll for better UX
            if (navLinks.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('active') && !navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('toggle');
                document.body.style.overflow = '';
            }
        });

        // Close menu when a link is clicked
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('toggle');
                document.body.style.overflow = '';
                links.forEach(l => l.style.animation = '');
            });
        });
    }

    // Fix for mobile menu display on resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navLinks.style.display = 'flex';
        } else {
            navLinks.style.display = 'none';
        }
    });


    // --- Smooth Scroll & Active Link Highlighting ---
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(a => {
            a.classList.remove('active');
            if (a.classList.contains(current)) { // This assumes class matches ID (not robust) - fixing logic below
                //
            }
            // Robust check: matches href="#id"
            if (a.getAttribute('href').includes(current) && current !== '') {
                // Optional: specific active style if needed, currently using hover style
                // a.style.color = 'var(--secondary)'; 
            }
        });

        // Navbar Background Change on Scroll
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
            navbar.style.background = 'rgba(254, 249, 245, 0.98)';
        } else {
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.05)';
            navbar.style.background = 'rgba(254, 249, 245, 0.95)';
        }
    });

    // --- Service Card Expansion Logic ---
    window.toggleService = function (card) {
        // Check if currently expanded
        const isExpanded = card.classList.contains('expanded');

        // Collapse all other cards (Accordion style)
        const allCards = document.querySelectorAll('.service-card');
        allCards.forEach(c => {
            c.classList.remove('expanded');
        });

        // Toggle current card
        if (!isExpanded) {
            card.classList.add('expanded');
        }
    };

    // --- Intersection Observer for Scroll Animations ---
    const faders = document.querySelectorAll('.service-card, .about-text, .about-image, .section-title, .gallery-item');

    const appearOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function (
        entries,
        appearOnScroll
    ) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                appearOnScroll.unobserve(entry.target);
            }
        });
    },
        appearOptions);

    faders.forEach(fader => {
        fader.style.opacity = '0'; // Set initial state for JS-enabled browsers
        fader.style.transform = 'translateY(20px)';
        fader.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        appearOnScroll.observe(fader);
    });

    // Add 'appear' class style dynamically or ensure it resets the inline styles
    // Here we trust the CSS transition to handle the change when we clear inline styles or add a class
    // Let's add the class logic more explicitly
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        .appear {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(styleSheet);
});
