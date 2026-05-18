// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// ====================================
// 1. CUSTOM CURSOR — Mouse tracking
// ====================================
const cursor = document.querySelector(".cursor");

window.addEventListener("mousemove", (e) => {
    gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out"
    });
});

const hoverElements = document.querySelectorAll("a, .card, #string-container, .orbit-item, .orbit-center");
hoverElements.forEach(el => {
    el.addEventListener("mouseenter", () => {
        gsap.to(cursor, { scale: 3, duration: 0.3, ease: "power2.out", backgroundColor: "rgba(255,255,255,0.5)" });
    });
    el.addEventListener("mouseleave", () => {
        gsap.to(cursor, { scale: 1, duration: 0.3, ease: "power2.out", backgroundColor: "#ffffff" });
    });
});

// ====================================
// 2. HERO — Staggered text reveal (translateY)
// ====================================
const heroTL = gsap.timeline();

heroTL.to(".hero-title .char, .hero-title .line:not(:first-child)", {
    y: 0,
    stagger: 0.05,
    duration: 1,
    ease: "power4.out",
    delay: 0.2
})
.to(".hero-sub", {
    opacity: 1,
    y: -20,
    duration: 1,
    ease: "power3.out"
}, "-=0.5")
.from("nav", {
    y: -50,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
}, "-=1");

// ====================================
// 3. INTERACTIVE STRING — SVG attr tween + elastic ease
// ====================================
const stringContainer = document.querySelector("#string-container");
const path = document.querySelector("#path");

function resizeSvg() {
    const svg = document.querySelector("#string-svg");
    svg.setAttribute("width", window.innerWidth);
    const startX = 10;
    const endX = window.innerWidth - 10;
    const initialD = `M ${startX} 100 Q ${window.innerWidth/2} 100 ${endX} 100`;
    path.setAttribute("d", initialD);
}
window.addEventListener("resize", resizeSvg);
resizeSvg();

let stringFinalPath;
function getPaths() {
    const endX = window.innerWidth - 10;
    stringFinalPath = `M 10 100 Q ${window.innerWidth/2} 100 ${endX} 100`;
}
getPaths();
window.addEventListener("resize", getPaths);

stringContainer.addEventListener("mousemove", function (e) {
    const rect = stringContainer.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const endX = window.innerWidth - 10;
    const newPath = `M 10 100 Q ${x} ${y} ${endX} 100`;
    gsap.to(path, {
        attr: { d: newPath },
        duration: 0.3,
        ease: "power3.out"
    });
});

stringContainer.addEventListener("mouseleave", function () {
    gsap.to(path, {
        attr: { d: stringFinalPath },
        duration: 1.5,
        ease: "elastic.out(1,0.2)"
    });
});

// ====================================
// 4. SERVICES — Staggered fade/slide cards
// ====================================
gsap.from(".section-title", {
    scrollTrigger: {
        trigger: ".services",
        start: "top 80%",
    },
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
});

gsap.from(".card", {
    scrollTrigger: {
        trigger: ".cards",
        start: "top 80%",
    },
    y: 100,
    opacity: 0,
    stagger: 0.2,
    duration: 1,
    ease: "power3.out"
});

// ====================================
// 5. TEXT REVEAL — Scroll-scrubbed clip-path wipe
// ====================================
document.querySelectorAll(".reveal-line").forEach((line, i) => {
    gsap.to(line, {
        clipPath: "inset(0 0% 0 0)",
        scrollTrigger: {
            trigger: line,
            start: "top 85%",
            end: "top 40%",
            scrub: 1,
        },
        ease: "none"
    });
});

// ====================================
// 6. STATS — Animated counting numbers with snap
// ====================================
document.querySelectorAll(".stat-number").forEach(el => {
    const target = parseInt(el.getAttribute("data-target"));
    const obj = { val: 0 };

    gsap.to(obj, {
        val: target,
        duration: 2,
        ease: "power1.out",
        snap: { val: 1 },
        scrollTrigger: {
            trigger: el,
            start: "top 85%",
        },
        onUpdate: () => {
            el.textContent = obj.val;
        }
    });
});

// Stat items scale-in animation
gsap.from(".stat", {
    scrollTrigger: {
        trigger: ".stats",
        start: "top 80%",
    },
    scale: 0.5,
    opacity: 0,
    stagger: 0.15,
    duration: 1,
    ease: "back.out(1.7)"
});

// ====================================
// 7. PARALLAX — Multi-speed depth layers
// ====================================
gsap.to(".layer-back", {
    y: -150,
    scrollTrigger: {
        trigger: ".parallax-section",
        start: "top bottom",
        end: "bottom top",
        scrub: true
    }
});

gsap.to(".layer-mid", {
    y: -80,
    scrollTrigger: {
        trigger: ".parallax-section",
        start: "top bottom",
        end: "bottom top",
        scrub: true
    }
});

gsap.to(".layer-front", {
    y: -200,
    scrollTrigger: {
        trigger: ".parallax-section",
        start: "top bottom",
        end: "bottom top",
        scrub: true
    }
});

// Rotate shapes continuously
gsap.to(".shape-circle", {
    rotation: 360,
    duration: 20,
    repeat: -1,
    ease: "none",
    transformOrigin: "50% 50%"
});

gsap.to(".shape-ring", {
    rotation: -360,
    duration: 15,
    repeat: -1,
    ease: "none",
    transformOrigin: "50% 50%"
});

// Pulse the dots
gsap.to(".shape-dot", {
    scale: 2,
    opacity: 0.3,
    duration: 1.5,
    stagger: 0.3,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
});

// ====================================
// 8. HORIZONTAL SCROLL — Pinned scrub
// ====================================
const horizontalScroll = document.querySelector(".horizontal-scroll");
const horizontalContainer = document.querySelector(".horizontal-container");

gsap.to(horizontalContainer, {
    x: () => -(horizontalContainer.scrollWidth - window.innerWidth),
    ease: "none",
    scrollTrigger: {
        trigger: horizontalScroll,
        pin: true,
        scrub: 1,
        end: () => "+=" + horizontalContainer.scrollWidth
    }
});

// ====================================
// 9. ORBIT — Rotating ring with positioned items
// ====================================
const orbitItems = document.querySelectorAll(".orbit-item");
const radius = 200;

// Position items in a circle
function positionOrbitItems() {
    orbitItems.forEach((item, i) => {
        const angle = (i * 60) * (Math.PI / 180);
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        gsap.set(item, { x, y });
    });
}
positionOrbitItems();

// Continuously rotate the ring
const orbitTween = gsap.to(".orbit-ring", {
    rotation: 360,
    duration: 20,
    repeat: -1,
    ease: "none",
    transformOrigin: "50% 50%"
});

// Counter-rotate items so their text stays upright
gsap.to(".orbit-item", {
    rotation: -360,
    duration: 20,
    repeat: -1,
    ease: "none",
    transformOrigin: "50% 50%"
});

// Pulse the center glow
gsap.to(".orbit-center", {
    boxShadow: "0 0 100px rgba(111, 0, 255, 0.7)",
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
});

// Orbit section reveal
gsap.from(".orbit-title", {
    scrollTrigger: {
        trigger: ".orbit-section",
        start: "top 80%",
    },
    y: 40,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
});

gsap.from(".orbit-ring", {
    scrollTrigger: {
        trigger: ".orbit-section",
        start: "top 70%",
    },
    scale: 0,
    opacity: 0,
    duration: 1.5,
    ease: "elastic.out(1, 0.5)"
});

// ====================================
// 10. MARQUEE — Scroll-velocity reactive
// ====================================
let marqueeDirection = 1;

const marqueeTween = gsap.to(".marquee-part", {
    xPercent: -100,
    repeat: -1,
    duration: 10,
    ease: "linear"
}).totalProgress(0.5);

gsap.to(marqueeTween, {
    timeScale: marqueeDirection,
    duration: 0.5
});

ScrollTrigger.create({
    trigger: ".marquee",
    start: "top bottom",
    end: "bottom top",
    onUpdate: (self) => {
        marqueeDirection = self.direction;
        let speed = Math.abs(self.getVelocity() / 100);
        speed = gsap.utils.clamp(1, 10, speed);
        
        gsap.to(marqueeTween, {
            timeScale: marqueeDirection * speed,
            duration: 0.2,
            overwrite: true,
            onComplete: () => {
                gsap.to(marqueeTween, {
                    timeScale: marqueeDirection,
                    duration: 0.5
                });
            }
        });
    }
});

// ====================================
// 10. MAGNETIC CARDS — 3D tilt + glow tracking
// ====================================

// Scroll-triggered stagger entry
gsap.from(".magnetic-title", {
    scrollTrigger: {
        trigger: ".magnetic-section",
        start: "top 80%",
    },
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
});

gsap.from(".magnetic-subtitle", {
    scrollTrigger: {
        trigger: ".magnetic-section",
        start: "top 80%",
    },
    y: 30,
    opacity: 0,
    duration: 1,
    delay: 0.15,
    ease: "power3.out"
});

gsap.from(".magnetic-card", {
    scrollTrigger: {
        trigger: ".magnetic-grid",
        start: "top 85%",
    },
    y: 80,
    opacity: 0,
    stagger: 0.15,
    duration: 1.2,
    ease: "power4.out"
});

// 3D Tilt + radial glow tracking per card
document.querySelectorAll(".magnetic-card").forEach(card => {
    const glow = card.querySelector(".magnetic-card-glow");

    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const maxTilt = 18;

        const rotateX = (-dy / (rect.height / 2)) * maxTilt;
        const rotateY = (dx / (rect.width / 2)) * maxTilt;

        gsap.to(card, {
            rotateX,
            rotateY,
            scale: 1.04,
            duration: 0.4,
            ease: "power2.out",
            transformOrigin: "center center",
            transformPerspective: 800
        });

        // Move glow to follow cursor inside card
        const glowX = e.clientX - rect.left;
        const glowY = e.clientY - rect.top;
        gsap.to(glow, {
            left: glowX,
            top: glowY,
            duration: 0.3,
            ease: "power2.out"
        });
    });

    card.addEventListener("mouseleave", () => {
        gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            duration: 1,
            ease: "elastic.out(1, 0.5)"
        });
    });
});

// ====================================
// 11. GLITCH TEXT SCRAMBLE — Hover scramble + scroll reveal
// ====================================
const GLITCH_CHARS = "!@#$%^&*<>?/\\|[]{}~ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function scrambleText(el, originalText, duration = 800) {
    el.classList.add("is-scrambling");
    const totalFrames = Math.ceil(duration / 40);
    let frame = 0;
    const interval = setInterval(() => {
        const progress = frame / totalFrames;
        const revealUpTo = Math.floor(progress * originalText.length);
        let result = "";
        for (let i = 0; i < originalText.length; i++) {
            if (i < revealUpTo) {
                result += originalText[i];
            } else {
                result += GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
            }
        }
        el.textContent = result;
        frame++;
        if (frame > totalFrames) {
            clearInterval(interval);
            el.textContent = originalText;
            el.classList.remove("is-scrambling");
        }
    }, 40);
}

// Scroll-triggered stagger reveal
gsap.from(".scramble-label", {
    scrollTrigger: { trigger: ".scramble-section", start: "top 80%" },
    y: 20,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
});

gsap.from(".scramble-word", {
    scrollTrigger: { trigger: ".scramble-words", start: "top 85%" },
    y: 100,
    opacity: 0,
    stagger: 0.12,
    duration: 1.2,
    ease: "power4.out",
    onComplete() {
        // Auto-scramble each word once on entry
        document.querySelectorAll(".scramble-word").forEach((word, i) => {
            setTimeout(() => scrambleText(word, word.dataset.text, 700), i * 120);
        });
    }
});

// Scroll-scrubbed progress bar
gsap.to(".scramble-bar-fill", {
    width: "100%",
    ease: "none",
    scrollTrigger: {
        trigger: ".scramble-section",
        start: "top center",
        end: "bottom center",
        scrub: 1
    }
});

// Hover: scramble on mouseenter, restore instantly on mouseleave
document.querySelectorAll(".scramble-word").forEach(word => {
    let scrambleTimer = null;
    word.addEventListener("mouseenter", () => {
        clearTimeout(scrambleTimer);
        scrambleText(word, word.dataset.text, 600);
    });
    word.addEventListener("mouseleave", () => {
        scrambleTimer = setTimeout(() => {
            word.textContent = word.dataset.text;
            word.classList.remove("is-scrambling");
        }, 150);
    });
});

// ====================================
// 12. FOOTER — Elastic scale reveal
// ====================================
gsap.from(".footer-title", {
    scrollTrigger: {
        trigger: ".footer",
        start: "top 80%",
    },
    scale: 0.8,
    opacity: 0,
    duration: 1.5,
    ease: "elastic.out(1, 0.5)"
});