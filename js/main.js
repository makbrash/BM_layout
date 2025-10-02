/* ===============================
   BOLOGNA MARATHON - MAIN JS
   =============================== */

// ==================
// UTILITY FUNCTIONS
// ==================

/**
 * Esegue una funzione in modo sicuro con gestione errori
 * @param {Function} fn - Funzione da eseguire
 * @param {*} fallback - Valore di fallback in caso di errore
 * @returns {*} Risultato della funzione o fallback
 */
function safeExecute(fn, fallback = null) {
    try {
        return fn();
    } catch (error) {
        console.error('Errore durante l\'esecuzione:', error);
        return fallback;
    }
}

/**
 * Debounce function per ottimizzare performance
 * @param {Function} func - Funzione da debounce
 * @param {number} wait - Tempo di attesa in ms
 * @returns {Function} Funzione debounced
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ==================
// INITIALIZATION
// ==================

/**
 * Inizializza tutti i componenti quando il DOM è caricato
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Bologna Marathon - Inizializzazione...');
    
    // Inizializza componenti principali
    initializeSplashScreen();
    initializeNavigation();
    initializeCountdown();
    initializeHeroFadeEffect();
    initializeAnimations();
    initializeSponsorSwiper();
    
    console.log('✅ Bologna Marathon - Inizializzazione completata');
});

// ==================
// SPLASH SCREEN
// ==================

/**
 * Gestisce l'animazione dello splash screen
 */
function initializeSplashScreen() {
    window.addEventListener('load', function() {
        setTimeout(() => {
            const splash = document.getElementById('splashScreen');
            const logo = document.getElementById('splashLogo');
            
            if (logo && splash) {
                logo.classList.add('fade-out');
                setTimeout(() => {
                    splash.classList.add('fade-out');
                    setTimeout(() => {
                        splash.style.display = 'none';
                    }, 600);
                }, 400);
            }
        }, 800);
    });
}

// ==================
// NAVIGATION
// ==================

/**
 * Inizializza la navigazione e il menu mobile
 */
function initializeNavigation() {
    const menuBurger = document.getElementById('menuBurger');
    const menuOverlay = document.getElementById('menuOverlay');
    
    if (menuBurger && menuOverlay) {
        // Toggle menu
        menuBurger.addEventListener('click', function() {
            toggleMobileMenu();
        });
        
        // Chiudi menu quando si clicca sui link
        document.querySelectorAll('.menu-link').forEach(link => {
            link.addEventListener('click', function() {
                closeMobileMenu();
            });
        });
        
        // Chiudi menu con ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeMobileMenu();
            }
        });
        
        // Chiudi menu cliccando fuori
        menuOverlay.addEventListener('click', function(e) {
            if (e.target === menuOverlay) {
                closeMobileMenu();
            }
        });
    }
}

/**
 * Apre/chiude il menu mobile
 */
function toggleMobileMenu() {
    const menuBurger = document.getElementById('menuBurger');
    const menuOverlay = document.getElementById('menuOverlay');
    
    if (menuBurger && menuOverlay) {
        menuBurger.classList.toggle('active');
        
        if (menuOverlay.style.transform === 'translateX(0%)') {
            menuOverlay.style.transform = 'translateX(100%)';
        } else {
            menuOverlay.style.transform = 'translateX(0%)';
        }
    }
}

/**
 * Chiude il menu mobile
 */
function closeMobileMenu() {
    const menuBurger = document.getElementById('menuBurger');
    const menuOverlay = document.getElementById('menuOverlay');
    
    if (menuBurger && menuOverlay) {
        menuBurger.classList.remove('active');
        menuOverlay.style.transform = 'translateX(100%)';
    }
}

// ==================
// COUNTDOWN TIMER
// ==================

/**
 * Inizializza e gestisce il countdown
 */
function initializeCountdown() {
    const targetDate = new Date('March 2, 2026 09:00:00').getTime();
    
    function updateCountdown() {
        safeExecute(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance > 0) {
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                // Aggiorna countdown desktop
                updateCountdownElement('countdown-days-desktop', days, 3);
                updateCountdownElement('countdown-hours-desktop', hours, 2);
                updateCountdownElement('countdown-minutes-desktop', minutes, 2);
                updateCountdownElement('countdown-seconds-desktop', seconds, 2);

                // Aggiorna countdown mobile
                updateCountdownElement('countdown-days-mobile', days, 3);
                updateCountdownElement('countdown-hours-mobile', hours, 2);
                updateCountdownElement('countdown-minutes-mobile', minutes, 2);
                updateCountdownElement('countdown-seconds-mobile', seconds, 2);
            }
        });
    }
    
    // Aggiorna ogni secondo
    setInterval(updateCountdown, 1000);
    updateCountdown();
}

/**
 * Aggiorna un elemento del countdown
 * @param {string} elementId - ID dell'elemento
 * @param {number} value - Valore da mostrare
 * @param {number} padding - Numero di cifre per il padding
 */
function updateCountdownElement(elementId, value, padding) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = value.toString().padStart(padding, '0');
    }
}

// ==================
// HERO FADE EFFECT
// ==================

/**
 * Inizializza l'effetto fade dell'hero
 */
function initializeHeroFadeEffect() {
    const heroContentInner = document.querySelector('.hero-content-inner');
    const heroSection = document.querySelector('.hero-container');
    
    if (!heroContentInner || !heroSection) return;
    
    const updateHeroOpacity = debounce(() => {
        const heroRect = heroSection.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        const heroBottom = heroRect.bottom;
        const fadeStartPoint = viewportHeight;
        
        let fadeProgress = 0;
        
        if (heroBottom <= fadeStartPoint) {
            const fadeDistance = fadeStartPoint - heroBottom;
            const maxFadeDistance = viewportHeight * 0.8;
            fadeProgress = Math.min(1, fadeDistance / maxFadeDistance);
        }
        
        const opacity = Math.max(0, 1 - Math.pow(fadeProgress, 0.7));
        
        heroContentInner.style.opacity = opacity;
        heroContentInner.style.transition = 'opacity 0.2s ease-out, transform 0.2s ease-out';
        
        const translateY = fadeProgress * 480;
        heroContentInner.style.transform = `translateY(-${translateY}px)`;
    }, 16);
    
    window.addEventListener('scroll', updateHeroOpacity);
    updateHeroOpacity();
}

// ==================
// ANIMATIONS
// ==================

/**
 * Inizializza le animazioni AOS e GSAP
 */
function initializeAnimations() {
    // Inizializza AOS
    safeExecute(() => {
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 1000,
                once: true,
                offset: 100
            });
        }
    });
    
    // Inizializza GSAP ScrollTrigger
    safeExecute(() => {
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
            
            // Effetto parallax per elementi
            gsap.utils.toArray('.parallax-element').forEach(element => {
                gsap.to(element, {
                    y: -50,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: element,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true
                    }
                });
            });
        }
    });
}

// ==================
// RACE SELECTION
// ==================

/**
 * Gestisce la selezione di una gara
 * @param {string} raceType - Tipo di gara selezionata
 */
function selectRace(raceType) {
    console.log('Gara selezionata:', raceType);
    
    // Scroll alla sezione dettagli gare
    const detailsSection = document.getElementById('race-details');
    if (detailsSection) {
        detailsSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
    
    // Evidenzia la card corrispondente
    highlightRaceCard(raceType);
}

/**
 * Evidenzia una specifica race card
 * @param {string} raceType - Tipo di gara da evidenziare
 */
function highlightRaceCard(raceType) {
    // Rimuovi evidenziazione precedente
    document.querySelectorAll('.race-details-card').forEach(card => {
        card.classList.remove('highlighted');
    });
    
    // Aggiungi evidenziazione alla card selezionata
    const targetCard = document.querySelector(`.race-details-card.${raceType}`);
    if (targetCard) {
        targetCard.classList.add('highlighted');
        
        // Rimuovi evidenziazione dopo 3 secondi
        setTimeout(() => {
            targetCard.classList.remove('highlighted');
        }, 3000);
    }
}

/**
 * Gestisce la registrazione per una gara
 * @param {string} raceType - Tipo di gara per la registrazione
 */
function registerRace(raceType) {
    console.log('Registrazione per gara:', raceType);
    
    // Qui puoi implementare la logica di registrazione
    // Per ora mostra un alert
    const raceNames = {
        'marathon': 'Maratona 42.195K',
        'portici': '30K dei Portici',
        'runtune': 'Run Tune Up 21K'
    };
    
    const raceName = raceNames[raceType] || 'Gara sconosciuta';
    alert(`Registrazione per ${raceName} - Funzione in via di sviluppo!`);
}

// ==================
// SCROLL UTILITIES
// ==================

/**
 * Scroll smooth verso una sezione
 * @param {string} sectionId - ID della sezione
 */
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// ==================
// FORM HANDLERS
// ==================

/**
 * Gestisce l'invio del form di contatto (placeholder)
 * @param {Event} event - Evento del form
 */
function handleContactForm(event) {
    event.preventDefault();
    console.log('Form di contatto inviato');
    
    // Qui implementare la logica di invio
    alert('Messaggio inviato con successo!');
}

/**
 * Gestisce l'iscrizione alla newsletter (placeholder)
 * @param {Event} event - Evento del form
 */
function handleNewsletterSignup(event) {
    event.preventDefault();
    console.log('Iscrizione newsletter');
    
    // Qui implementare la logica di iscrizione
    alert('Iscrizione alla newsletter completata!');
}

// ==================
// PERFORMANCE
// ==================

/**
 * Lazy loading per immagini
 */
function initializeLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// ==================
// ERROR HANDLING
// ==================

/**
 * Gestione globale degli errori
 */
window.addEventListener('error', function(e) {
    console.error('Errore JavaScript:', e.error);
    // Qui puoi implementare il logging degli errori
});

/**
 * Gestione errori per le Promise
 */
window.addEventListener('unhandledrejection', function(e) {
    console.error('Promise non gestita:', e.reason);
    // Qui puoi implementare il logging degli errori
});

// ==================
// SPONSOR SWIPER
// ==================

/**
 * Inizializza tutti gli swiper per la sezione sponsor
 */
function initializeSponsorSwiper() {
    // Config base - semplice e funzionale
    function buildConfig(isRowA) {
        return {
            slidesPerView: 'auto',
            spaceBetween: 10,
            loop: false,
            centeredSlides: false,
            autoplay: {
                delay: 2500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
            },
            speed: 800,
            allowTouchMove: true,
            breakpoints: isRowA ? {
                0:   { slidesPerView: 2, spaceBetween: 8 },
                769: { slidesPerView: 4, spaceBetween: 10 },
                961: { slidesPerView: 5, spaceBetween: 10 },
                1201:{ slidesPerView: 6, spaceBetween: 12 },
                1601:{ slidesPerView: 7, spaceBetween: 15 }
            } : {
                0:   { slidesPerView: 3, spaceBetween: 8 },
                769: { slidesPerView: 5, spaceBetween: 10 },
                961: { slidesPerView: 6, spaceBetween: 10 },
                1201:{ slidesPerView: 8, spaceBetween: 12 },
                1601:{ slidesPerView: 10, spaceBetween: 15 }
            }
        };
    }

    // Funzione per controllare se tutte le slide entrano nel viewport
    function checkAndUpdateCentering(swiper) {
        const container = swiper.el;
        const wrapper = swiper.wrapperEl;
        const containerWidth = container.offsetWidth;
        const wrapperWidth = wrapper.scrollWidth;
        
        // Se il contenuto è minore o uguale al container, centra e ferma
        if (wrapperWidth <= containerWidth) {
            container.classList.add('sponsor-swiper--centered');
            if (swiper.autoplay && swiper.autoplay.running) {
                swiper.autoplay.stop();
            }
            swiper.allowTouchMove = false;
            // Reset posizione
            swiper.setTranslate(0);
        } else {
            container.classList.remove('sponsor-swiper--centered');
            if (swiper.autoplay && !swiper.autoplay.running) {
                swiper.autoplay.start();
            }
            swiper.allowTouchMove = true;
        }
    }

    // Inizializza istanze
    const swiper1 = new Swiper('.sponsor-swiper-1', {
        ...buildConfig(true),
        on: {
            init(swiper) {
                setTimeout(() => checkAndUpdateCentering(swiper), 100);
            },
            resize(swiper) {
                checkAndUpdateCentering(swiper);
            }
        }
    });

    const swiper2 = new Swiper('.sponsor-swiper-2', {
        ...buildConfig(false),
        on: {
            init(swiper) {
                setTimeout(() => checkAndUpdateCentering(swiper), 100);
            },
            resize(swiper) {
                checkAndUpdateCentering(swiper);
            }
        }
    });

    const swiper3 = new Swiper('.sponsor-swiper-3', {
        ...buildConfig(false),
        on: {
            init(swiper) {
                setTimeout(() => checkAndUpdateCentering(swiper), 100);
            },
            resize(swiper) {
                checkAndUpdateCentering(swiper);
            }
        }
    });

    // Controllo su resize della finestra
    const onResize = debounce(() => {
        [swiper1, swiper2, swiper3].forEach(sw => {
            sw.update();
            checkAndUpdateCentering(sw);
        });
    }, 200);

    window.addEventListener('resize', onResize);
    window.addEventListener('orientationchange', onResize);

    console.log('✅ Sponsor Swiper inizializzati con centratura automatica');
}

// ==================
// EXPORTS (per moduli)
// ==================

// Se usi moduli ES6, puoi esportare le funzioni
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        selectRace,
        registerRace,
        scrollToSection,
        handleContactForm,
        handleNewsletterSignup,
        initializeSponsorSwiper
    };
}