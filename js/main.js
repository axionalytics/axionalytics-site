/**
 * ══════════════════════════════════════════════════════════════════════════════
 * AXIONALYTICS - UNIFIED JAVASCRIPT
 * Version: 2.0.0 | Last Updated: January 2026
 * ══════════════════════════════════════════════════════════════════════════════
 * 
 * This module handles all interactive functionality across the site:
 * - Bilingual system (EN/ES) with localStorage persistence
 * - Header scroll effects
 * - Mobile menu with ARIA states
 * - FAQ accordion with keyboard support
 * - Testimonial slider
 * - Scroll animations
 * - Active navigation highlighting
 * - Smooth scrolling
 * 
 * USAGE: Include this script at the end of <body> on all pages
 * 
 * ══════════════════════════════════════════════════════════════════════════════
 */

(function() {
    'use strict';
    
    // =========================================================================
    // 1. BILINGUAL SYSTEM
    // =========================================================================
    // 
    // HOW IT WORKS:
    // - Stores language preference in localStorage('axio-lang')
    // - Applies .lang-es class to <html> for Spanish mode
    // - Updates html lang attribute for screen readers
    // - CSS handles visibility swapping
    // 
    // PUBLIC API:
    // - window.switchLanguage('en' | 'es') - Switch to specific language
    // - window.toggleLanguage() - Toggle between EN/ES
    // - window.getCurrentLanguage() - Get current language code
    // 
    // =========================================================================
    
    const STORAGE_KEY = 'axio-lang';
    let currentLang = 'en';
    
    /**
     * Initialize language from localStorage
     */
    function initLanguage() {
        const savedLang = localStorage.getItem(STORAGE_KEY);
        if (savedLang === 'es') {
            setLanguage('es');
        } else {
            setLanguage('en');
        }
    }
    
    /**
     * Set the current language
     * @param {string} lang - 'en' or 'es'
     */
    function setLanguage(lang) {
        currentLang = lang;
        const html = document.documentElement;
        
        if (lang === 'es') {
            html.classList.add('lang-es');
            html.setAttribute('lang', 'es');
        } else {
            html.classList.remove('lang-es');
            html.setAttribute('lang', 'en');
        }
        
        // Update toggle buttons
        updateLanguageToggles(lang);
        
        // Save preference
        localStorage.setItem(STORAGE_KEY, lang);
    }
    
    /**
     * Toggle between EN and ES
     */
    function toggleLanguage() {
        setLanguage(currentLang === 'en' ? 'es' : 'en');
    }
    
    /**
     * Get current language
     * @returns {string} 'en' or 'es'
     */
    function getCurrentLanguage() {
        return currentLang;
    }
    
    /**
     * Update all language toggle buttons
     * @param {string} lang - Current language
     */
    function updateLanguageToggles(lang) {
        document.querySelectorAll('[data-lang-flag]').forEach(el => {
            el.textContent = lang === 'es' ? '🇪🇸' : '🇺🇸';
        });
        document.querySelectorAll('[data-lang-text]').forEach(el => {
            el.textContent = lang === 'es' ? 'ES' : 'EN';
        });
    }
    
    /**
     * Initialize language toggle buttons
     */
    function initLanguageToggles() {
        document.querySelectorAll('[data-lang-toggle]').forEach(btn => {
            btn.addEventListener('click', toggleLanguage);
            btn.setAttribute('aria-label', 'Toggle language between English and Spanish');
        });
    }
    
    // Expose to global scope
    window.switchLanguage = setLanguage;
    window.toggleLanguage = toggleLanguage;
    window.getCurrentLanguage = getCurrentLanguage;
    
    
    // =========================================================================
    // 2. HEADER SCROLL EFFECT
    // =========================================================================
    
    function initHeaderScroll() {
        const header = document.getElementById('header');
        if (!header) return;
        
        const scrollThreshold = 50;
        
        function updateHeaderState() {
            if (window.scrollY > scrollThreshold) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }
        }
        
        // Initial check
        updateHeaderState();
        
        // Throttled scroll listener
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    updateHeaderState();
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }
    
    
    // =========================================================================
    // 3. MOBILE MENU
    // =========================================================================
    
    function initMobileMenu() {
        const menuBtn = document.getElementById('mobile-menu-btn');
        const closeBtn = document.getElementById('mobile-menu-close');
        const menu = document.getElementById('mobile-menu');
        const overlay = document.getElementById('mobile-menu-overlay');
        
        if (!menuBtn || !menu) return;
        
        function openMenu() {
            menu.classList.add('is-open');
            overlay?.classList.add('is-visible');
            document.body.style.overflow = 'hidden';
            
            // Update ARIA
            menuBtn.setAttribute('aria-expanded', 'true');
            menu.setAttribute('aria-hidden', 'false');
            
            // Focus first link
            const firstLink = menu.querySelector('a, button');
            if (firstLink) firstLink.focus();
        }
        
        function closeMenu() {
            menu.classList.remove('is-open');
            overlay?.classList.remove('is-visible');
            document.body.style.overflow = '';
            
            // Update ARIA
            menuBtn.setAttribute('aria-expanded', 'false');
            menu.setAttribute('aria-hidden', 'true');
            
            // Return focus to menu button
            menuBtn.focus();
        }
        
        // Set initial ARIA states
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.setAttribute('aria-controls', 'mobile-menu');
        menuBtn.setAttribute('aria-label', 'Open navigation menu');
        menu.setAttribute('aria-hidden', 'true');
        
        // Event listeners
        menuBtn.addEventListener('click', openMenu);
        closeBtn?.addEventListener('click', closeMenu);
        overlay?.addEventListener('click', closeMenu);
        
        // Close on escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && menu.classList.contains('is-open')) {
                closeMenu();
            }
        });
        
        // Close when clicking a link
        menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });
        
        // Expose close function globally
        window.closeMobileMenu = closeMenu;
    }
    
    
    // =========================================================================
    // 4. ACTIVE NAVIGATION
    // =========================================================================
    
    function initActiveNav() {
        // Get current page filename
        const currentPath = window.location.pathname;
        const currentPage = currentPath.split('/').pop() || 'index.html';
        
        // Desktop nav links
        document.querySelectorAll('[data-nav-link]').forEach(link => {
            const href = link.getAttribute('href');
            const linkPage = href.replace('./', '').replace('.html', '') || 'index';
            const current = currentPage.replace('.html', '') || 'index';
            
            if (linkPage === current || (linkPage === 'index' && current === '')) {
                link.classList.add('nav-active');
            }
        });
        
        // Mobile nav links
        document.querySelectorAll('.mobile-nav-link').forEach(link => {
            const href = link.getAttribute('href');
            const linkPage = href.replace('./', '').replace('.html', '') || 'index';
            const current = currentPage.replace('.html', '') || 'index';
            
            if (linkPage === current || (linkPage === 'index' && current === '')) {
                link.classList.add('nav-active');
            }
        });
    }
    
    
    // =========================================================================
    // 5. FAQ ACCORDION
    // =========================================================================
    
    function initFaqAccordion() {
        const faqItems = document.querySelectorAll('.faq-item');
        if (faqItems.length === 0) return;
        
        faqItems.forEach((item, index) => {
            const trigger = item.querySelector('.faq-trigger');
            const content = item.querySelector('.faq-content');
            
            if (!trigger || !content) return;
            
            // Set up IDs for ARIA
            const triggerId = `faq-trigger-${index}`;
            const contentId = `faq-content-${index}`;
            
            trigger.setAttribute('id', triggerId);
            trigger.setAttribute('aria-controls', contentId);
            trigger.setAttribute('aria-expanded', 'false');
            
            content.setAttribute('id', contentId);
            content.setAttribute('aria-labelledby', triggerId);
            content.setAttribute('role', 'region');
            
            // Click handler
            trigger.addEventListener('click', () => {
                const isOpen = item.classList.contains('is-open');
                
                // Close all other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('is-open')) {
                        otherItem.classList.remove('is-open');
                        otherItem.querySelector('.faq-trigger')?.setAttribute('aria-expanded', 'false');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('is-open');
                trigger.setAttribute('aria-expanded', !isOpen ? 'true' : 'false');
            });
            
            // Keyboard support
            trigger.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    trigger.click();
                }
            });
        });
    }
    
    
    // =========================================================================
    // 6. TESTIMONIAL SLIDER
    // =========================================================================
    
    function initTestimonialSlider() {
        const track = document.getElementById('testimonial-track');
        const dots = document.querySelectorAll('.testimonial-dot');
        const prevBtn = document.getElementById('testimonial-prev');
        const nextBtn = document.getElementById('testimonial-next');
        
        if (!track || dots.length === 0) return;
        
        let currentSlide = 0;
        const totalSlides = dots.length;
        let autoplayInterval;
        
        function goToSlide(index) {
            // Clamp index
            currentSlide = Math.max(0, Math.min(index, totalSlides - 1));
            
            // Move track
            track.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            // Update dots
            dots.forEach((dot, i) => {
                const isActive = i === currentSlide;
                dot.classList.toggle('active', isActive);
                dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
            });
        }
        
        function nextSlide() {
            goToSlide((currentSlide + 1) % totalSlides);
        }
        
        function prevSlide() {
            goToSlide((currentSlide - 1 + totalSlides) % totalSlides);
        }
        
        function startAutoplay() {
            stopAutoplay();
            autoplayInterval = setInterval(nextSlide, 6000);
        }
        
        function stopAutoplay() {
            if (autoplayInterval) {
                clearInterval(autoplayInterval);
            }
        }
        
        // Dot clicks
        dots.forEach((dot, index) => {
            dot.setAttribute('role', 'tab');
            dot.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
            dot.setAttribute('aria-label', `Go to testimonial ${index + 1}`);
            
            dot.addEventListener('click', () => {
                goToSlide(index);
                startAutoplay(); // Reset autoplay
            });
        });
        
        // Arrow buttons
        prevBtn?.addEventListener('click', () => {
            prevSlide();
            startAutoplay();
        });
        
        nextBtn?.addEventListener('click', () => {
            nextSlide();
            startAutoplay();
        });
        
        // Pause on hover
        const slider = track.closest('.testimonial-slider');
        if (slider) {
            slider.addEventListener('mouseenter', stopAutoplay);
            slider.addEventListener('mouseleave', startAutoplay);
        }
        
        // Start autoplay
        startAutoplay();
        
        // Initial state
        goToSlide(0);
    }
    
    
    // =========================================================================
    // 7. SCROLL ANIMATIONS
    // =========================================================================
    
    function initScrollAnimations() {
        const elements = document.querySelectorAll('.animate-on-scroll, .stagger-children');
        
        if (elements.length === 0) return;
        
        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (prefersReducedMotion) {
            // Show all elements immediately
            elements.forEach(el => el.classList.add('is-visible'));
            return;
        }
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            rootMargin: '0px 0px -100px 0px',
            threshold: 0.1
        });
        
        elements.forEach(el => observer.observe(el));
    }
    
    
    // =========================================================================
    // 8. SMOOTH SCROLL FOR ANCHOR LINKS
    // =========================================================================
    
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Skip placeholder links
                if (href === '#' || 
                    href === '#BOOKING_LINK' || 
                    href.startsWith('#LINKEDIN') || 
                    href.startsWith('#WHATSAPP') || 
                    href.startsWith('#INSTAGRAM') ||
                    href.startsWith('#ENROLL_') ||
                    href.startsWith('#BUNDLE_') ||
                    href.startsWith('#CORPORATE_')) {
                    return;
                }
                
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    
                    // Get header height for offset
                    const header = document.getElementById('header');
                    const headerHeight = header ? header.offsetHeight : 0;
                    
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    if (typeof window.closeMobileMenu === 'function') {
                        window.closeMobileMenu();
                    }
                }
            });
        });
    }
    
    
    // =========================================================================
    // 9. CONTACT FORM (if present)
    // =========================================================================
    
    function initContactForm() {
        const form = document.getElementById('contact-form');
        if (!form) return;
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Gather form data
            const formData = new FormData(form);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });
            
            // Show success message (replace with actual form submission)
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<span>✓</span> Message Sent!';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                form.reset();
            }, 3000);
            
            // TODO: Replace with actual form submission endpoint
            console.log('Form submitted:', data);
        });
    }
    
    
    // =========================================================================
    // INITIALIZATION
    // =========================================================================
    
    function init() {
        // Initialize language first (before DOM is fully visible)
        initLanguage();
        initLanguageToggles();
        
        // Initialize interactive components
        initHeaderScroll();
        initMobileMenu();
        initActiveNav();
        initFaqAccordion();
        initTestimonialSlider();
        initScrollAnimations();
        initSmoothScroll();
        initContactForm();
        
        console.log('[Axionalytics] All modules initialized');
    }
    
    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
})();
