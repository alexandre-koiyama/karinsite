const initNav = () => {
    const toggle = document.getElementById('nav-toggle');
    const menu = document.getElementById('nav-menu');
    const header = document.getElementById('header');

    if (!toggle || !menu) return;

    let overlay = document.querySelector('.overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'overlay';
        document.body.appendChild(overlay);
    }

    const closeMenu = () => {
        toggle.setAttribute('aria-expanded', 'false');
        menu.classList.remove('nav__menu--open');
        overlay.classList.remove('overlay--active');
        document.body.style.overflow = '';
    };

    toggle.addEventListener('click', () => {
        const isOpen = toggle.getAttribute('aria-expanded') === 'true';
        if (isOpen) {
            closeMenu();
        } else {
            toggle.setAttribute('aria-expanded', 'true');
            menu.classList.add('nav__menu--open');
            overlay.classList.add('overlay--active');
            document.body.style.overflow = 'hidden';
        }
    });

    overlay.addEventListener('click', closeMenu);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
            closeMenu();
            toggle.focus();
        }
    });

    if (header) {
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            if (scrollY > 50) {
                header.classList.add('header--scrolled');
            } else {
                header.classList.remove('header--scrolled');
            }
            lastScroll = scrollY;
        }, { passive: true });
    }
};

const initCourseTabs = () => {
    const tabButtons = document.querySelectorAll('.courses-tabs__btn');
    const cards = document.querySelectorAll('.course-card');

    if (!tabButtons.length || !cards.length) return;

    tabButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            tabButtons.forEach((b) => {
                b.classList.remove('courses-tabs__btn--active');
                b.setAttribute('aria-selected', 'false');
            });
            btn.classList.add('courses-tabs__btn--active');
            btn.setAttribute('aria-selected', 'true');

            const filter = btn.dataset.filter;

            cards.forEach((card) => {
                const category = card.dataset.category;
                if (filter === 'all' || category === filter) {
                    card.classList.remove('course-card--hidden');
                    card.style.display = '';
                } else {
                    card.classList.add('course-card--hidden');
                    card.style.display = 'none';
                }
            });
        });
    });
};

const initCounters = () => {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.dataset.count, 10);
                    const duration = 2000;
                    const start = performance.now();

                    const animate = (now) => {
                        const elapsed = now - start;
                        const progress = Math.min(elapsed / duration, 1);
                        const eased = 1 - Math.pow(1 - progress, 3);
                        el.textContent = Math.round(target * eased);
                        if (progress < 1) {
                            requestAnimationFrame(animate);
                        } else {
                            el.textContent = target;
                        }
                    };

                    requestAnimationFrame(animate);
                    observer.unobserve(el);
                }
            });
        },
        { threshold: 0.3 }
    );

    counters.forEach((c) => observer.observe(c));
};

const initFadeIn = () => {
    const elements = document.querySelectorAll(
        '.course-card, .about__feature, .instructor-card, .testimonial-card, .about__card, .section-header'
    );

    if (!elements.length) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        elements.forEach((el) => el.classList.add('fade-in--visible'));
        return;
    }

    elements.forEach((el) => el.classList.add('fade-in'));

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in--visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    elements.forEach((el) => observer.observe(el));
};

const initContactForm = () => {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<span>Enviado con éxito</span>';
        btn.style.background = 'var(--color-success)';
        btn.style.borderColor = 'var(--color-success)';
        btn.disabled = true;

        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
            btn.style.borderColor = '';
            btn.disabled = false;
            form.reset();
        }, 3000);
    });
};

const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
};

document.addEventListener('DOMContentLoaded', () => {
    initNav();
    initCourseTabs();
    initCounters();
    initFadeIn();
    initContactForm();
    initSmoothScroll();
});
