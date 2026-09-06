/* =========================================================
   CONSOLE CORNER
   Main JavaScript
   ========================================================= */


/* =========================================================
   PAGE LOADER
   ========================================================= */

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    if (loader) {
        setTimeout(() => {
            loader.classList.add("hidden");
        }, 1800);
    }

});


/* =========================================================
   ANIMATED BACKGROUND PARTICLES
   ========================================================= */

const particlesContainer =
    document.getElementById("particles");

const particleCount = 45;

if (particlesContainer) {

    for (let i = 0; i < particleCount; i++) {

        const particle =
            document.createElement("div");

        particle.classList.add("particle");

        particle.style.left =
            Math.random() * 100 + "%";

        particle.style.animationDuration =
            (6 + Math.random() * 10) + "s";

        particle.style.animationDelay =
            Math.random() * 10 + "s";

        particle.style.opacity =
            Math.random();

        const size =
            1 + Math.random() * 3;

        particle.style.width =
            size + "px";

        particle.style.height =
            size + "px";

        particlesContainer.appendChild(
            particle
        );
    }

}


/* =========================================================
   CURSOR GLOW
   ========================================================= */

const cursorGlow =
    document.getElementById("cursorGlow");

if (cursorGlow) {

    document.addEventListener(
        "mousemove",
        (event) => {

            cursorGlow.style.left =
                event.clientX + "px";

            cursorGlow.style.top =
                event.clientY + "px";

        }
    );

}


/* =========================================================
   NAVBAR SCROLL EFFECT
   ========================================================= */

const navbar =
    document.getElementById("navbar");

window.addEventListener(
    "scroll",
    () => {

        if (!navbar) {
            return;
        }

        if (window.scrollY > 50) {

            navbar.classList.add(
                "scrolled"
            );

        } else {

            navbar.classList.remove(
                "scrolled"
            );

        }

    }
);


/* =========================================================
   MOBILE MENU
   ========================================================= */

const menuToggle =
    document.getElementById("menuToggle");

const navLinks =
    document.getElementById("navLinks");


if (menuToggle && navLinks) {

    menuToggle.addEventListener(
        "click",
        () => {

            navLinks.classList.toggle(
                "active"
            );

        }
    );

}


/* Close mobile menu after clicking */

document
    .querySelectorAll(".nav-links a")
    .forEach(link => {

        link.addEventListener(
            "click",
            () => {

                if (navLinks) {

                    navLinks.classList.remove(
                        "active"
                    );

                }

            }
        );

    });


/* =========================================================
   SCROLL REVEAL ANIMATIONS
   ========================================================= */

const revealElements =
    document.querySelectorAll(
        ".reveal"
    );


if ("IntersectionObserver" in window) {

    const revealObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });

} else {

    /* Fallback for older browsers */

    revealElements.forEach(element => {

        element.classList.add(
            "visible"
        );

    });

}


/* =========================================================
   EXPERIENCE CARDS
   EXPERIENCE → CONTACT
   ========================================================= */

const experienceCards =
    document.querySelectorAll(
        ".experience-card"
    );


const experienceInput =
    document.getElementById(
        "selected-experience"
    );


experienceCards.forEach(card => {

    card.addEventListener(
        "click",
        () => {

            const experience =
                card.dataset.experience;


            /* -----------------------------------------
               Put selected experience into contact form
               ----------------------------------------- */

            if (experienceInput) {

                experienceInput.value =
                    experience;

            }


            /* -----------------------------------------
               Highlight selected card
               ----------------------------------------- */

            experienceCards.forEach(c => {

                c.classList.remove(
                    "selected"
                );

            });

            card.classList.add(
                "selected"
            );


            /* -----------------------------------------
               Focus contact field after scrolling
               ----------------------------------------- */

            setTimeout(() => {

                if (experienceInput) {

                    experienceInput.focus();

                }

            }, 700);

        }
    );

});


/* =========================================================
   3D EXPERIENCE CARD TILT
   ========================================================= */

if (window.innerWidth > 750) {

    experienceCards.forEach(card => {

        card.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const centerX =
                    rect.width / 2;


                const centerY =
                    rect.height / 2;


                const rotateX =
                    ((y - centerY) /
                        centerY) *
                    -4;


                const rotateY =
                    ((x - centerX) /
                        centerX) *
                    4;


                card.style.transform = `
                    perspective(1000px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateY(-8px)
                `;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "";

            }
        );

    });

}


/* =========================================================
   ANIMATED COUNTERS
   ========================================================= */

const counters =
    document.querySelectorAll(
        ".counter"
    );


let countersStarted =
    false;


function startCounters() {

    if (countersStarted) {
        return;
    }


    countersStarted =
        true;


    counters.forEach(counter => {

        const target =
            Number(
                counter.dataset.target
            );


        let current = 0;


        const increment =
            Math.max(
                1,
                Math.ceil(
                    target / 50
                )
            );


        function updateCounter() {

            current += increment;


            if (
                current >= target
            ) {

                counter.textContent =
                    target;

                return;

            }


            counter.textContent =
                current;


            requestAnimationFrame(
                updateCounter
            );

        }


        updateCounter();

    });

}


/* Counter observer */

const statsSection =
    document.querySelector(
        ".intro"
    );


if (
    statsSection &&
    "IntersectionObserver" in window
) {

    const counterObserver =
        new IntersectionObserver(
            entries => {

                if (
                    entries[0]
                        .isIntersecting
                ) {

                    startCounters();

                    counterObserver.disconnect();

                }

            },
            {
                threshold: 0.3
            }
        );


    counterObserver.observe(
        statsSection
    );

} else {

    startCounters();

}


/* =========================================================
   GALLERY LIGHTBOX
   ========================================================= */

const galleryItems =
    document.querySelectorAll(
        ".gallery-item"
    );


const lightbox =
    document.getElementById(
        "lightbox"
    );


const lightboxImage =
    document.getElementById(
        "lightboxImage"
    );


const lightboxClose =
    document.getElementById(
        "lightboxClose"
    );


galleryItems.forEach(item => {

    item.addEventListener(
        "click",
        () => {

            const image =
                item.dataset.image;


            if (
                lightboxImage &&
                lightbox
            ) {

                lightboxImage.src =
                    image;


                lightbox.classList.add(
                    "active"
                );


                document.body.style.overflow =
                    "hidden";

            }

        }
    );

});


function closeLightbox() {

    if (!lightbox) {
        return;
    }


    lightbox.classList.remove(
        "active"
    );


    document.body.style.overflow =
        "";

}


if (lightboxClose) {

    lightboxClose.addEventListener(
        "click",
        closeLightbox
    );

}


if (lightbox) {

    lightbox.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                lightbox
            ) {

                closeLightbox();

            }

        }
    );

}


/* ESCAPE KEY CLOSES LIGHTBOX */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key ===
            "Escape"
        ) {

            closeLightbox();

        }

    }
);


/* =========================================================
   ACTIVE NAVIGATION
   ========================================================= */

const sections =
    document.querySelectorAll(
        "main section[id]"
    );


const navItems =
    document.querySelectorAll(
        ".nav-links a"
    );


window.addEventListener(
    "scroll",
    () => {

        let currentSection =
            "";


        sections.forEach(section => {

            const sectionTop =
                section.offsetTop -
                200;


            if (
                window.scrollY >=
                sectionTop
            ) {

                currentSection =
                    section.getAttribute(
                        "id"
                    );

            }

        });


        navItems.forEach(link => {

            link.classList.remove(
                "active"
            );


            const href =
                link.getAttribute(
                    "href"
                );


            if (
                href ===
                "#" + currentSection
            ) {

                link.classList.add(
                    "active"
                );

            }

        });

    }
);


/* =========================================================
   CONTACT FORM
   WHATSAPP BOOKING
   ========================================================= */

const contactForm =
    document.getElementById(
        "contactForm"
    );


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const nameInput =
                document.getElementById(
                    "name"
                );


            const phoneInput =
                document.getElementById(
                    "phone"
                );


            const experienceField =
                document.getElementById(
                    "selected-experience"
                );


            const name =
                nameInput
                    ? nameInput.value.trim()
                    : "";


            const phone =
                phoneInput
                    ? phoneInput.value.trim()
                    : "";


            const experience =
                experienceField
                    ? experienceField.value.trim()
                    : "";


            /* -----------------------------------------
               Validation
               ----------------------------------------- */

            if (!experience) {

                alert(
                    "Please choose a gaming experience first."
                );

                return;

            }


            if (!name) {

                alert(
                    "Please enter your name."
                );

                return;

            }


            if (!phone) {

                alert(
                    "Please enter your phone number."
                );

                return;

            }


            /* -----------------------------------------
               OWNER WHATSAPP NUMBER
               ----------------------------------------- */

            const ownerNumber =
                "919686415111";


            /* -----------------------------------------
               WHATSAPP MESSAGE
               ----------------------------------------- */

            const message = `
🎮 *NEW CONSOLE CORNER BOOKING REQUEST*

👤 *Name:* ${name}

📱 *Phone:* ${phone}

🎮 *Experience:* ${experience}

Someone wants to connect with Console Corner.
            `.trim();


            /* -----------------------------------------
               CREATE WHATSAPP URL
               ----------------------------------------- */

            const whatsappURL =
                "https://wa.me/" +
                ownerNumber +
                "?text=" +
                encodeURIComponent(
                    message
                );


            /* -----------------------------------------
               OPEN WHATSAPP
               ----------------------------------------- */

            window.open(
                whatsappURL,
                "_blank"
            );


            /* -----------------------------------------
               RESET FORM
               ----------------------------------------- */

            contactForm.reset();


            experienceCards.forEach(card => {

                card.classList.remove(
                    "selected"
                );

            });

        }
    );

}


/* =========================================================
   EXPERIENCE SELECTION LOG
   ========================================================= */

experienceCards.forEach(card => {

    card.addEventListener(
        "click",
        () => {

            const experience =
                card.dataset.experience;


            console.log(
                "Selected experience:",
                experience
            );

        }
    );

});


/* =========================================================
   PARALLAX HERO EFFECT
   ========================================================= */

const hero =
    document.querySelector(
        ".hero"
    );


const heroOrb =
    document.querySelector(
        ".hero-orb"
    );


window.addEventListener(
    "scroll",
    () => {

        if (
            !hero ||
            !heroOrb
        ) {

            return;

        }


        const scrollY =
            window.scrollY;


        /*
         * Only apply the effect
         * while near the hero.
         */

        if (
            scrollY <
            window.innerHeight
        ) {

            heroOrb.style.transform =
                `translateY(${scrollY * 0.15}px)
                 rotate(${scrollY * 0.03}deg)`;

        }

    }
);


/* =========================================================
   BUTTON RIPPLE EFFECT
   ========================================================= */

const buttons =
    document.querySelectorAll(
        ".btn"
    );


buttons.forEach(button => {

    button.addEventListener(
        "click",
        function(event) {

            const ripple =
                document.createElement(
                    "span"
                );


            ripple.style.position =
                "absolute";


            ripple.style.width =
                "10px";


            ripple.style.height =
                "10px";


            ripple.style.borderRadius =
                "50%";


            ripple.style.background =
                "rgba(255,255,255,0.4)";


            ripple.style.pointerEvents =
                "none";


            const rect =
                button.getBoundingClientRect();


            ripple.style.left =
                (event.clientX -
                    rect.left) +
                "px";


            ripple.style.top =
                (event.clientY -
                    rect.top) +
                "px";


            ripple.style.transform =
                "translate(-50%, -50%)";


            ripple.style.animation =
                "ripple 0.6s ease-out";


            button.style.position =
                "relative";


            button.style.overflow =
                "hidden";


            button.appendChild(
                ripple
            );


            setTimeout(() => {

                ripple.remove();

            }, 600);

        }
    );

});


/* =========================================================
   ADD RIPPLE ANIMATION
   ========================================================= */

const rippleStyle =
    document.createElement(
        "style"
    );


rippleStyle.textContent = `

@keyframes ripple {

    from {

        width: 10px;
        height: 10px;
        opacity: 1;

    }

    to {

        width: 350px;
        height: 350px;
        opacity: 0;

    }

}

`;


document.head.appendChild(
    rippleStyle
);


/* =========================================================
   CONSOLE CORNER INITIALIZATION
   ========================================================= */

console.log(
    "%c CONSOLE CORNER ",
    "color:#00eaff;font-size:20px;font-weight:bold;"
);


console.log(
    "%c Welcome to the arena. 🎮 ",
    "color:#8b5cf6;font-size:14px;"
);
