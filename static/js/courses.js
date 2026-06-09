const COURSES_DATA = [
    {
        id: "implantologia-avanzada",
        title: "Implantología Avanzada",
        subtitle: "Técnicas quirúrgicas y protéticas de vanguardia",
        category: "long",
        duration: "6 meses",
        hours: 120,
        modality: "Presencial + Online",
        price: "$3,500",
        rating: 4.9,
        students: 87,
        gradient: 1,
    },
    {
        id: "endodoncia-microscopica",
        title: "Endodoncia Microscópica",
        subtitle: "Precisión y éxito en tratamientos de conductos",
        category: "long",
        duration: "4 meses",
        hours: 80,
        modality: "Presencial",
        price: "$2,800",
        rating: 4.8,
        students: 64,
        gradient: 2,
    },
    {
        id: "ortodoncia-invisible",
        title: "Ortodoncia Invisible",
        subtitle: "Alineadores transparentes: diagnóstico y tratamiento",
        category: "long",
        duration: "5 meses",
        hours: 100,
        modality: "Híbrida",
        price: "$3,200",
        rating: 4.7,
        students: 52,
        gradient: 3,
    },
    {
        id: "periodoncia-avanzada",
        title: "Periodoncia Quirúrgica",
        subtitle: "Técnicas regenerativas y estéticas gingivales",
        category: "long",
        duration: "5 meses",
        hours: 90,
        modality: "Presencial",
        price: "$3,100",
        rating: 4.8,
        students: 43,
        gradient: 1,
    },
    {
        id: "fotografia-dental",
        title: "Fotografía Clínica Dental",
        subtitle: "Documentación visual profesional",
        category: "short",
        duration: "2 días",
        hours: 16,
        modality: "Presencial",
        price: "$450",
        rating: 4.9,
        students: 134,
        gradient: 4,
    },
    {
        id: "blanqueamiento-avanzado",
        title: "Blanqueamiento Avanzado",
        subtitle: "Técnicas modernas para sonrisas radiantes",
        category: "short",
        duration: "1 día",
        hours: 8,
        modality: "Presencial",
        price: "$280",
        rating: 4.8,
        students: 210,
        gradient: 5,
    },
    {
        id: "emergencias-dentales",
        title: "Emergencias Dentales",
        subtitle: "Manejo urgente en la práctica diaria",
        category: "short",
        duration: "1 día",
        hours: 8,
        modality: "Online",
        price: "$200",
        rating: 4.6,
        students: 175,
        gradient: 2,
    },
    {
        id: "carillas-ceramicas",
        title: "Carillas Cerámicas",
        subtitle: "Estética dental con resultados predecibles",
        category: "short",
        duration: "3 días",
        hours: 24,
        modality: "Presencial",
        price: "$650",
        rating: 4.9,
        students: 98,
        gradient: 6,
    },
];

const ICONS = {
    tooth: '<svg width="48" height="48" viewBox="0 0 48 48" fill="none"><path d="M24 6c-8 0-14 6-14 14 0 8 6 12 8 20 1 4 1 10 6 10s5-6 6-10c2-8 8-12 8-20 0-8-6-14-14-14z" fill="currentColor" opacity="0.3"/><path d="M24 10c-5.5 0-10 4-10 10 0 5 4 8 5 14 .5 3 .5 7 5 7s4.5-4 5-7c1-6 5-9 5-14 0-6-4.5-10-10-10z" stroke="currentColor" stroke-width="2"/></svg>',
    circle: '<svg width="48" height="48" viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="8" stroke="currentColor" stroke-width="2"/><circle cx="24" cy="24" r="14" stroke="currentColor" stroke-width="1.5" stroke-dasharray="4 3"/><circle cx="24" cy="24" r="3" fill="currentColor" opacity="0.4"/></svg>',
    aligners: '<svg width="48" height="48" viewBox="0 0 48 48" fill="none"><path d="M10 24h28M14 20h20M14 28h20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M8 24c0-8.8 7.2-16 16-16" stroke="currentColor" stroke-width="2"/><path d="M40 24c0 8.8-7.2 16-16 16" stroke="currentColor" stroke-width="2"/></svg>',
    camera: '<svg width="48" height="48" viewBox="0 0 48 48" fill="none"><rect x="8" y="8" width="32" height="24" rx="2" stroke="currentColor" stroke-width="2"/><circle cx="24" cy="20" r="5" stroke="currentColor" stroke-width="2"/><path d="M16 36h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    clock: '<svg width="48" height="48" viewBox="0 0 48 48" fill="none"><path d="M24 8a12 12 0 0 1 0 32 12 12 0 0 1 0-32z" stroke="currentColor" stroke-width="2"/><path d="M24 14v10l6 4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    veneers: '<svg width="48" height="48" viewBox="0 0 48 48" fill="none"><path d="M12 20h24M12 28h24" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M20 14v20M28 14v20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-dasharray="2 2"/></svg>',
};

const iconKeys = ['tooth', 'circle', 'aligners', 'camera', 'clock', 'veneers'];

const renderCourses = (filter = 'all') => {
    const grid = document.getElementById('courses-grid');
    if (!grid) return;

    const filtered = filter === 'all'
        ? COURSES_DATA
        : COURSES_DATA.filter((c) => c.category === filter);

    grid.innerHTML = filtered
        .map(
            (course) => `
        <article class="course-card course-card--${course.category}" data-category="${course.category}" tabindex="0">
            <div class="course-card__image">
                <div class="course-card__image-placeholder course-card__image-placeholder--${course.gradient}" aria-hidden="true">
                    ${ICONS[iconKeys[course.gradient - 1]] || ICONS.tooth}
                </div>
                <span class="course-card__badge ${course.category === 'short' ? 'course-card__badge--accent' : ''}">${course.duration}</span>
            </div>
            <div class="course-card__body">
                <div class="course-card__meta">
                    <span class="course-card__category ${course.category === 'short' ? 'course-card__category--accent' : ''}">
                        ${course.category === 'long' ? 'Programa Largo' : 'Curso Corto'}
                    </span>
                    <span class="course-card__rating">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><path d="M7 1l1.5 4.5H13l-3.5 2.5 1.5 4.5L7 10l-3.5 2.5L5 8 1.5 5.5H5.5L7 1z"/></svg>
                        ${course.rating}
                    </span>
                </div>
                <h3 class="course-card__title">${course.title}</h3>
                <p class="course-card__desc">${course.subtitle}</p>
                <div class="course-card__details">
                    <span>${course.hours} hrs</span>
                    <span>${course.modality}</span>
                </div>
                <div class="course-card__footer">
                    <span class="course-card__price">${course.price}</span>
                    <a href="/course/${course.id}" class="btn btn--sm btn--primary">Ver Programa</a>
                </div>
            </div>
        </article>
    `
        )
        .join('');

    grid.querySelectorAll('.course-card').forEach((card) => {
        card.classList.add('fade-in');
        requestAnimationFrame(() => {
            card.classList.add('fade-in--visible');
        });
    });
};

const initCoursesTabs = () => {
    const tabButtons = document.querySelectorAll('.courses-tabs__btn');
    if (!tabButtons.length) return;

    tabButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            tabButtons.forEach((b) => {
                b.classList.remove('courses-tabs__btn--active');
                b.setAttribute('aria-selected', 'false');
            });
            btn.classList.add('courses-tabs__btn--active');
            btn.setAttribute('aria-selected', 'true');
            renderCourses(btn.dataset.filter);
        });
    });

    renderCourses('all');
};

document.addEventListener('DOMContentLoaded', initCoursesTabs);
