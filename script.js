```javascript
/* =========================================
   MUHAMMAD KHATEEB EJAZ
   ACTOR PORTFOLIO — JAVASCRIPT
========================================= */


/* =========================================
   DOM READY
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =========================================
       AOS INITIALIZATION
    ========================================= */

    if (typeof AOS !== "undefined") {
        AOS.init({
            duration: 900,
            easing: "ease-out-cubic",
            once: true,
            offset: 80
        });
    }


    /* =========================================
       PRELOADER
    ========================================= */

    function hidePreloader() {

        const preloader = document.getElementById("preloader");

        if (!preloader) return;

        preloader.classList.add("hide");

        // Completely remove after animation
        setTimeout(function () {
            preloader.style.display = "none";
        }, 900);
    }

    // Normal loading
    window.addEventListener("load", function () {
        setTimeout(hidePreloader, 500);
    });

    // Safety fallback — never stay stuck
    setTimeout(hidePreloader, 2500);


    /* =========================================
       MOBILE MENU
    ========================================= */

    const menuBtn = document.getElementById("menuBtn");
    const navMenu = document.getElementById("navMenu");

    if (menuBtn && navMenu) {

        menuBtn.addEventListener("click", function () {

            navMenu.classList.toggle("active");

            const icon = menuBtn.querySelector("i");

            if (icon) {

                if (navMenu.classList.contains("active")) {
                    icon.classList.remove("fa-bars");
                    icon.classList.add("fa-xmark");
                } else {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }

            }

        });


        /* Close mobile menu after clicking link */

        const navLinks = navMenu.querySelectorAll("a");

        navLinks.forEach(function (link) {

            link.addEventListener("click", function () {

                navMenu.classList.remove("active");

                const icon = menuBtn.querySelector("i");

                if (icon) {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }

            });

        });

    }


    /* =========================================
       HEADER SCROLL EFFECT
    ========================================= */

    const header = document.querySelector(".header");

    function handleHeaderScroll() {

        if (!header) return;

        if (window.scrollY > 60) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    }

    window.addEventListener("scroll", handleHeaderScroll);

    handleHeaderScroll();


    /* =========================================
       BACK TO TOP
    ========================================= */

    const backToTop = document.getElementById("backToTop");

    function handleBackToTop() {

        if (!backToTop) return;

        if (window.scrollY > 600) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }

    }

    window.addEventListener("scroll", handleBackToTop);

    handleBackToTop();


    if (backToTop) {

        backToTop.addEventListener("click", function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* =========================================
       ACTIVE NAVIGATION
    ========================================= */

    const sections = document.querySelectorAll("section[id]");
    const navigationLinks = document.querySelectorAll(".nav-menu a");

    function updateActiveNavigation() {

        let currentSection = "";

        sections.forEach(function (section) {

            const sectionTop = section.offsetTop - 180;
            const sectionHeight = section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {
                currentSection = section.getAttribute("id");
            }

        });


        navigationLinks.forEach(function (link) {

            link.classList.remove("active");

            if (
                currentSection &&
                link.getAttribute("href") === "#" + currentSection
            ) {
                link.classList.add("active");
            }

        });

    }

    window.addEventListener("scroll", updateActiveNavigation);

    updateActiveNavigation();


    /* =========================================
       SMOOTH ANCHOR SCROLL
    ========================================= */

    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {

        anchor.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =========================================
       IMAGE FALLBACK
    ========================================= */

    document.querySelectorAll("img").forEach(function (image) {

        function showImageFallback() {

            image.style.display = "none";

            const parent = image.parentElement;

            if (parent) {
                parent.classList.add("image-missing");
            }

        }

        image.addEventListener("error", showImageFallback);

        // Check already broken images
        if (image.complete && image.naturalWidth === 0) {
            showImageFallback();
        }

    });


    /* =========================================
       GALLERY LIGHTBOX
    ========================================= */

    const galleryItems = document.querySelectorAll(".gallery-item");

    galleryItems.forEach(function (item) {

        item.addEventListener("click", function () {

            const image = item.querySelector("img");

            if (!image) return;

            // Don't open missing images
            if (
                image.style.display === "none" ||
                !image.src ||
                image.naturalWidth === 0
            ) {
                return;
            }


            /* Create lightbox */

            const lightbox = document.createElement("div");

            lightbox.className = "lightbox";

            lightbox.innerHTML = `
                <button class="lightbox-close" aria-label="Close">
                    <i class="fa-solid fa-xmark"></i>
                </button>

                <img src="${image.src}" alt="${image.alt || "Gallery Image"}">
            `;


            document.body.appendChild(lightbox);


            /* Animate lightbox */

            requestAnimationFrame(function () {
                lightbox.classList.add("active");
            });


            /* Close button */

            const closeButton =
                lightbox.querySelector(".lightbox-close");

            if (closeButton) {

                closeButton.addEventListener("click", function () {
                    closeLightbox(lightbox);
                });

            }


            /* Click outside image */

            lightbox.addEventListener("click", function (event) {

                if (event.target === lightbox) {
                    closeLightbox(lightbox);
                }

            });


            /* Prevent body scrolling */

            document.body.style.overflow = "hidden";

        });

    });


    /* =========================================
       CLOSE LIGHTBOX
    ========================================= */

    function closeLightbox(lightbox) {

        if (!lightbox) return;

        lightbox.classList.remove("active");

        document.body.style.overflow = "";

        setTimeout(function () {

            if (lightbox.parentElement) {
                lightbox.remove();
            }

        }, 400);

    }


    /* =========================================
       ESCAPE KEY — LIGHTBOX
    ========================================= */

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            const lightbox =
                document.querySelector(".lightbox");

            if (lightbox) {
                closeLightbox(lightbox);
            }

        }

    });


    /* =========================================
       CINEMATIC CURSOR GLOW
    ========================================= */

    if (window.innerWidth > 768) {

        const cursorGlow = document.createElement("div");

        cursorGlow.className = "cursor-glow";

        document.body.appendChild(cursorGlow);


        document.addEventListener("mousemove", function (event) {

            cursorGlow.style.left = event.clientX + "px";
            cursorGlow.style.top = event.clientY + "px";

        });

    }


    /* =========================================
       CONSOLE BRANDING
    ========================================= */

    console.log(
        "%c MUHAMMAD KHATEEB EJAZ ",
        "background:#d6b36a;color:#000;padding:8px;font-size:16px;font-weight:bold;"
    );

    console.log(
        "%c Actor • Model • Content Creator ",
        "color:#d6b36a;font-size:13px;"
    );

});


/* =========================================
   EXTRA PRELOADER SAFETY
   ========================================= */

// If something goes wrong anywhere else,
// make sure the website never stays stuck
// on the loading screen.

window.addEventListener("load", function () {

    const preloader = document.getElementById("preloader");

    if (preloader) {

        setTimeout(function () {

            preloader.classList.add("hide");

            setTimeout(function () {
                preloader.style.display = "none";
            }, 900);

        }, 600);

    }

});
```
