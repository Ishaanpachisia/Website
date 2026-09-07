
/* =========================================================
   CONSOLE CORNER
   Main JavaScript — mobile friendly / voice-free
   ========================================================= */

window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    if (loader) setTimeout(() => loader.classList.add("hidden"), 1800);
});

/* Animated background particles */
const particlesContainer = document.getElementById("particles");
if (particlesContainer) {
    for (let i = 0; i < 45; i++) {
        const particle = document.createElement("div");
        particle.classList.add("particle");
        particle.style.left = Math.random() * 100 + "%";
        particle.style.animationDuration = 6 + Math.random() * 10 + "s";
        particle.style.animationDelay = Math.random() * 10 + "s";
        particle.style.opacity = Math.random();
        const size = 1 + Math.random() * 3;
        particle.style.width = size + "px";
        particle.style.height = size + "px";
        particlesContainer.appendChild(particle);
    }
}

/* Cursor glow */
const cursorGlow = document.getElementById("cursorGlow");
if (cursorGlow) {
    document.addEventListener("mousemove", event => {
        cursorGlow.style.left = event.clientX + "px";
        cursorGlow.style.top = event.clientY + "px";
    });
}

/* Navbar */
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
    if (!navbar) return;
    navbar.classList.toggle("scrolled", window.scrollY > 50);
});

/* Mobile menu */
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => navLinks.classList.toggle("active"));
}
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => navLinks?.classList.remove("active"));
});

/* Scroll reveal */
const revealElements = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });
    revealElements.forEach(element => revealObserver.observe(element));
} else {
    revealElements.forEach(element => element.classList.add("visible"));
}

/* Experience selection */
const experienceCards = document.querySelectorAll(".experience-card");
const experienceInput = document.getElementById("selected-experience");
experienceCards.forEach(card => {
    card.addEventListener("click", () => {
        const experience = card.dataset.experience || "";
        if (experienceInput) experienceInput.value = experience;
        experienceCards.forEach(c => c.classList.remove("selected"));
        card.classList.add("selected");
        setTimeout(() => experienceInput?.focus(), 700);
    });
});

/* 3D tilt — desktop only */
if (window.innerWidth > 750) {
    experienceCards.forEach(card => {
        card.addEventListener("mousemove", event => {
            const rect = card.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -4;
            const rotateY = ((x - centerX) / centerX) * 4;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });
        card.addEventListener("mouseleave", () => card.style.transform = "");
    });
}

/* Counters */
const counters = document.querySelectorAll(".counter");
let countersStarted = false;
function startCounters() {
    if (countersStarted) return;
    countersStarted = true;
    counters.forEach(counter => {
        const target = Number(counter.dataset.target || 0);
        let current = 0;
        const increment = Math.max(1, Math.ceil(target / 50));
        function updateCounter() {
            current += increment;
            if (current >= target) {
                counter.textContent = target;
                return;
            }
            counter.textContent = current;
            requestAnimationFrame(updateCounter);
        }
        updateCounter();
    });
}
const statsSection = document.querySelector(".intro");
if (statsSection && "IntersectionObserver" in window) {
    const counterObserver = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            startCounters();
            counterObserver.disconnect();
        }
    }, { threshold: 0.3 });
    counterObserver.observe(statsSection);
} else {
    startCounters();
}

/* Gallery lightbox */
const galleryItems = document.querySelectorAll(".gallery-item");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");

galleryItems.forEach(item => {
    item.addEventListener("click", () => {
        const image = item.dataset.image || item.querySelector("img")?.src;
        if (lightboxImage && lightbox && image) {
            lightboxImage.src = image;
            lightbox.classList.add("active");
            document.body.style.overflow = "hidden";
        }
    });
});
function closeLightbox() {
    lightbox?.classList.remove("active");
    document.body.style.overflow = "";
}
lightboxClose?.addEventListener("click", closeLightbox);
lightbox?.addEventListener("click", event => {
    if (event.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeLightbox();
});

/* Active navigation */
const sections = document.querySelectorAll("main section[id]");
const navItems = document.querySelectorAll(".nav-links a");
window.addEventListener("scroll", () => {
    let currentSection = "";
    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 200) currentSection = section.id;
    });
    navItems.forEach(link => {
        link.classList.toggle("active", link.getAttribute("href") === "#" + currentSection);
    });
});

/* WhatsApp booking */
const contactForm = document.getElementById("contactForm");
if (contactForm) {
    contactForm.addEventListener("submit", event => {
        event.preventDefault();
        const name = document.getElementById("name")?.value.trim() || "";
        const phone = document.getElementById("phone")?.value.trim() || "";
        const experience = document.getElementById("selected-experience")?.value.trim() || "";
        if (!experience) return alert("Please choose a gaming experience first.");
        if (!name) return alert("Please enter your name.");
        if (!phone) return alert("Please enter your phone number.");

        const ownerNumber = "919686306653";
        const message = `🎮 *NEW CONSOLE CORNER BOOKING REQUEST*

👤 *Name:* ${name}

📱 *Phone:* ${phone}

🎮 *Experience:* ${experience}

Someone wants to connect with Console Corner.`;
        const whatsappURL = "https://wa.me/" + ownerNumber + "?text=" + encodeURIComponent(message);
        window.open(whatsappURL, "_blank");
        contactForm.reset();
        experienceCards.forEach(card => card.classList.remove("selected"));
    });
}

/* Hero parallax */
const hero = document.querySelector(".hero");
const heroOrb = document.querySelector(".hero-orb");
window.addEventListener("scroll", () => {
    if (!hero || !heroOrb || window.scrollY >= window.innerHeight) return;
    heroOrb.style.transform = `translateY(${window.scrollY * 0.15}px) rotate(${window.scrollY * 0.03}deg)`;
});

/* Button ripple */
const rippleStyle = document.createElement("style");
rippleStyle.textContent = `@keyframes ripple{from{width:10px;height:10px;opacity:1}to{width:350px;height:350px;opacity:0}}`;
document.head.appendChild(rippleStyle);
document.querySelectorAll(".btn").forEach(button => {
    button.addEventListener("click", function(event) {
        const ripple = document.createElement("span");
        ripple.style.cssText = "position:absolute;width:10px;height:10px;border-radius:50%;background:rgba(255,255,255,.4);pointer-events:none;transform:translate(-50%,-50%);animation:ripple .6s ease-out";
        const rect = button.getBoundingClientRect();
        ripple.style.left = event.clientX - rect.left + "px";
        ripple.style.top = event.clientY - rect.top + "px";
        button.style.position = "relative";
        button.style.overflow = "hidden";
        button.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});

console.log("%c CONSOLE CORNER ", "color:#00eaff;font-size:20px;font-weight:bold;");
console.log("%c Welcome to the arena. 🎮 ", "color:#8b5cf6;font-size:14px;");

