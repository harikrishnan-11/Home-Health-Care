document.addEventListener('DOMContentLoaded', () => {

    /* ---------- Mobile hamburger nav ---------- */
    const hamburger = document.getElementById('hamburger');
    const navLinks   = document.getElementById('nav-links');
    const scrim      = document.getElementById('nav-scrim');

    function closeMenu(){
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        scrim.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }
    function openMenu(){
        hamburger.classList.add('active');
        navLinks.classList.add('active');
        scrim.classList.add('active');
        hamburger.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    }
    hamburger.addEventListener('click', () => {
        hamburger.classList.contains('active') ? closeMenu() : openMenu();
    });
    scrim.addEventListener('click', closeMenu);
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
    window.addEventListener('resize', () => { if (window.innerWidth > 1024) closeMenu(); });

    /* ---------- Sticky nav shadow on scroll ---------- */
    const nav = document.getElementById('site-nav');
    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 40);
    });

    /* ---------- Scroll reveal ---------- */
    const revealEls = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting){
                entry.target.classList.add('in-view');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(el => revealObserver.observe(el));

    /* ---------- Animated stat counters ---------- */
    const counters = document.querySelectorAll('.stat-number');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const target = parseInt(el.dataset.count, 10);
            const duration = 1400;
            const start = performance.now();

            function tick(now){
                const progress = Math.min((now - start) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                el.textContent = Math.round(eased * target);
                if (progress < 1) requestAnimationFrame(tick);
            }
            requestAnimationFrame(tick);
            counterObserver.unobserve(el);
        });
    }, { threshold: 0.5 });
    counters.forEach(el => counterObserver.observe(el));

    /* ---------- Animated progress bars ---------- */
    const bars = document.querySelectorAll('.progress-fill');
    const barObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            requestAnimationFrame(() => { el.style.width = el.dataset.progress + '%'; });
            barObserver.unobserve(el);
        });
    }, { threshold: 0.4 });
    bars.forEach(el => barObserver.observe(el));

    /* ---------- Floating label for <select> ---------- */
    document.querySelectorAll('.select-field select').forEach(select => {
        const sync = () => select.parentElement.classList.toggle('has-value', !!select.value);
        select.addEventListener('change', sync);
        sync();
    });

    /* ---------- Hero dot indicator auto-rotate ---------- */
    const dots = document.querySelectorAll('.hero-dots span');
    if (dots.length){
        let dotIndex = 0;
        setInterval(() => {
            dots[dotIndex].classList.remove('active');
            dotIndex = (dotIndex + 1) % dots.length;
            dots[dotIndex].classList.add('active');
        }, 3200);
    }

    /* ---------- Horizontal carousel helper ---------- */
    function wireCarousel(trackId, prevId, nextId){
        const track = document.getElementById(trackId);
        const prev = document.getElementById(prevId);
        const next = document.getElementById(nextId);
        if (!track || !prev || !next) return;
        const scrollAmount = () => track.firstElementChild.getBoundingClientRect().width + 22;
        prev.addEventListener('click', () => track.scrollBy({ left: -scrollAmount(), behavior: 'smooth' }));
        next.addEventListener('click', () => track.scrollBy({ left: scrollAmount(), behavior: 'smooth' }));
    }
    wireCarousel('service-track', 'svc-prev', 'svc-next');
    wireCarousel('story-track', 'story-prev', 'story-next');

    /* ---------- Locations map interaction ---------- */
    const locationItems = document.querySelectorAll('#location-items li');
    const mapCity = document.getElementById('map-city');
    const mapAddress = document.getElementById('map-address');
    const mapPhone = document.getElementById('map-phone');
    const mapPin = document.getElementById('map-pin');
    const pinPositions = ['48% 52%', '62% 40%', '30% 58%', '20% 35%', '55% 65%'];

    locationItems.forEach((li, i) => {
        li.addEventListener('click', () => {
            locationItems.forEach(el => el.classList.remove('active'));
            li.classList.add('active');
            mapCity.textContent = li.dataset.city;
            mapAddress.textContent = li.dataset.address;
            mapPhone.textContent = li.dataset.phone;
            const [top, left] = pinPositions[i % pinPositions.length].split(' ');
            mapPin.style.top = top;
            mapPin.style.left = left;
        });
    });

    /* ---------- Back to top ---------- */
    const backToTop = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        backToTop.classList.toggle('visible', window.scrollY > 480);
    });
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

});