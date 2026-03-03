document.addEventListener("DOMContentLoaded", () => {
    /* ==================== PREMIUM LOADER ==================== */
    const loader = document.getElementById("loader-wrapper");

    // Hide loader after page is fully loaded
    window.addEventListener("load", () => {
        if (loader) {
            setTimeout(() => {
                loader.classList.add("hidden");
            }, 500); // Small delay for smooth effect
        }
    });

    /* ==================== PAGE TRANSITIONS ==================== */
    const links = document.querySelectorAll("a");
    links.forEach((link) => {
        // Only intercept internal links
        const href = link.getAttribute("href");
        if (href && !href.startsWith("http") && !href.startsWith("#") && !href.startsWith("mailto") && !href.startsWith("tel")) {
            link.addEventListener("click", (e) => {
                e.preventDefault();

                // Show loader before transition
                if (loader) {
                    loader.classList.remove("hidden");
                }

                document.body.classList.add("fade-out");
                setTimeout(() => {
                    window.location.href = href;
                }, 600);
            });
        }
    });

    /* ==================== MOBILE MENU ==================== */
    const menuIcon = document.querySelector(".menu-icon");
    const navLinks = document.querySelector(".nav-links");

    if (menuIcon && navLinks) {
        menuIcon.addEventListener("click", () => {
            navLinks.classList.toggle("active");
        });
    }

    /* ==================== CUSTOM CURSOR ==================== */
    const cursorDot = document.querySelector(".cursor-dot");
    const cursorOutline = document.querySelector(".cursor-outline");

    if (cursorDot && cursorOutline) {
        window.addEventListener("mousemove", (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            cursorOutline.animate(
                {
                    left: `${posX}px`,
                    top: `${posY}px`,
                },
                { duration: 500, fill: "forwards" }
            );
        });

        const hoverables = document.querySelectorAll("a, button, .btn, .skill-item, .mini-card, .social-icon");
        hoverables.forEach((item) => {
            item.addEventListener("mouseenter", () => {
                cursorOutline.style.transform = "translate(-50%, -50%) scale(1.5)";
                cursorOutline.style.backgroundColor = "rgba(0, 255, 213, 0.1)";
                cursorOutline.style.borderWidth = "1px";
            });
            item.addEventListener("mouseleave", () => {
                cursorOutline.style.transform = "translate(-50%, -50%) scale(1)";
                cursorOutline.style.backgroundColor = "transparent";
                cursorOutline.style.borderWidth = "2px";
            });
        });
    }

    /* ==================== READING PROGRESS BAR ==================== */
    const progressBar = document.getElementById("progress-bar");
    if (progressBar) {
        window.addEventListener("scroll", () => {
            const windowScroll = document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (windowScroll / height) * 100;
            progressBar.style.width = scrolled + "%";
        });
    }

    /* ==================== SCROLL REVEAL ==================== */
    const revealElements = document.querySelectorAll(".reveal");
    const revealOnScroll = () => {
        revealElements.forEach((el) => {
            const elementTop = el.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (elementTop < windowHeight - 100) {
                el.classList.add("active");
            }
        });
    };

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll();

    /* ==================== 3D TILT EFFECT ==================== */
    const cards = document.querySelectorAll(".mini-card");
    cards.forEach((card) => {
        card.addEventListener("mousemove", (e) => {
            const cardRect = card.getBoundingClientRect();
            const cardWidth = cardRect.width;
            const cardHeight = cardRect.height;
            const centerX = cardRect.left + cardWidth / 2;
            const centerY = cardRect.top + cardHeight / 2;
            const mouseX = e.clientX - centerX;
            const mouseY = e.clientY - centerY;

            const rotateX = (-20 * mouseY) / (cardHeight / 2);
            const rotateY = (20 * mouseX) / (cardWidth / 2);

            card.style.transform = `perspective(1000px) translateY(-12px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = `perspective(1000px) translateY(0) rotateX(0) rotateY(0) scale(1)`;
        });
    });

    /* ==================== BACKGROUND PARTICLES ==================== */
    const createParticles = () => {
        const canvas = document.createElement("canvas");
        canvas.id = "particle-canvas";
        canvas.style.position = "fixed";
        canvas.style.top = "0";
        canvas.style.left = "0";
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.style.zIndex = "-1";
        canvas.style.pointerEvents = "none";
        document.body.appendChild(canvas);

        const ctx = canvas.getContext("2d");
        let particles = [];

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener("resize", resize);
        resize();

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 1.5 + 0.5;
                this.speedX = Math.random() * 0.5 - 0.25;
                this.speedY = Math.random() * 0.5 - 0.25;
                this.opacity = Math.random() * 0.5 + 0.1;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
                if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
            }

            draw() {
                ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        for (let i = 0; i < 50; i++) {
            particles.push(new Particle());
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((p) => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(animate);
        };

        animate();
    };

    createParticles();
});
