document.addEventListener('DOMContentLoaded', () => {
    // 1. Navigation fluide
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.querySelector('.header');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            navLinks.forEach(nav => nav.classList.remove('active'));
            link.classList.add('active');

            window.scrollTo({
                top: targetSection.offsetTop - header.offsetHeight + 1,
                behavior: 'smooth'
            });
        });
    });

    // 2. Observer le défilement pour activer la classe "active" du lien de nav
    const sections = document.querySelectorAll('section');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.id;
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').substring(1) === currentId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // 3. Animations au défilement (Fade-in et Slide-up)
    const fadeInElements = document.querySelectorAll('.fade-in');
    const slideUpElements = document.querySelectorAll('.slide-up');

    const animateOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    };

    const animationObserver = new IntersectionObserver(animateOnScroll, {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    });

    fadeInElements.forEach(el => animationObserver.observe(el));
    slideUpElements.forEach(el => animationObserver.observe(el));

    document.querySelector('.accueil-contenu-grid').classList.add('appear');
});