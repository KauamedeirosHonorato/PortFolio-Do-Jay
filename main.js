document.addEventListener("DOMContentLoaded", () => {
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

        const hoverables = document.querySelectorAll("a, button, .btn, .skill-item, .mini-card");
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
});
