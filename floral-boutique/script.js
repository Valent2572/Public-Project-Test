document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    // Sticky Navigation Background and Mobile Menu Toggle
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('sticky');
        } else {
            navbar.classList.remove('sticky');
        }
    });

    // Toggle Mobile Menu
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close mobile menu when a link is clicked
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // Catalog Filtering Logic
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            productCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (filterValue === 'all' || filterValue === cardCategory) {
                    card.style.display = 'block';
                    // Trigger a small animation
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.transition = 'all 0.5s ease';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Smooth Scroll Offset for Sticky Header
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll Reveal Animation (Simple Implementation)
    const revealElements = document.querySelectorAll('.about-card, .term-box, .info-item');
    
    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight / 5 * 4;

        revealElements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;

            if (elTop < triggerBottom) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    };

    // Initialize reveal styles
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease-out';
    });

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger once on load

    // Falling Flowers Animation Logic
    const flowerContainer = document.getElementById('falling-flowers-container');
    const flowerTypes = ['🌸', '💮', '🌺', '🏵️', '🌼', '✨', '🍃']; // Bervariasi: bunga dan sedikit daun/kilauan

    function createFlower() {
        if (!flowerContainer) return;
        
        const flower = document.createElement('div');
        flower.classList.add('flower');
        
        // Randomize character
        flower.innerText = flowerTypes[Math.floor(Math.random() * flowerTypes.length)];
        
        // Random position across width
        flower.style.left = Math.random() * 100 + 'vw';
        
        // Random size (Kecil-kecil aja: 0.5rem - 1.2rem)
        const size = Math.random() * 0.7 + 0.5;
        flower.style.fontSize = size + 'rem';
        
        // Random opacity (sedikit transparan: 0.15 - 0.5)
        flower.style.opacity = Math.random() * 0.35 + 0.15;
        
        // Random duration (biar jatuhnya bervariasi)
        const fallDuration = Math.random() * 7 + 5; // 5 to 12 seconds
        const swayDuration = Math.random() * 3 + 2; // 2 to 5 seconds
        
        flower.style.animationDuration = `${fallDuration}s, ${swayDuration}s`;
        
        flowerContainer.appendChild(flower);
        
        // Clean up memory after animation finishes
        setTimeout(() => {
            flower.remove();
        }, fallDuration * 1000);
    }

    // Spawn a flower every 400ms (tidak terlalu ramai biar tidak mengganggu)
    if (flowerContainer) {
        setInterval(createFlower, 400);
    }
});
