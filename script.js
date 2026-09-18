/* =========================================
   MUHAMMAD KHATEEB EJAZ
   ACTOR PORTFOLIO
   CLEAN JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       AOS
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

    const preloader = document.getElementById("preloader");

    const hidePreloader = () => {

        if (!preloader) return;

        preloader.classList.add("hide");

        setTimeout(() => {

            if (preloader) {
                preloader.style.display = "none";
            }

        }, 700);

    };


    window.addEventListener("load", () => {

        setTimeout(hidePreloader, 400);

    });


    // Safety fallback
    setTimeout(hidePreloader, 2200);


    /* =========================================
       MOBILE MENU
    ========================================= */

    const menuBtn = document.getElementById("menuBtn");
    const navMenu = document.getElementById("navMenu");


    if (menuBtn && navMenu) {

        menuBtn.addEventListener("click", () => {

            navMenu.classList.toggle("active");

            const icon = menuBtn.querySelector("i");

            if (!icon) return;


            if (navMenu.classList.contains("active")) {

                icon.classList.remove("fa-bars");

                icon.classList.add("fa-xmark");

                menuBtn.setAttribute(
                    "aria-label",
                    "Close Menu"
                );

            } else {

                icon.classList.remove("fa-xmark");

                icon.classList.add("fa-bars");

                menuBtn.setAttribute(
                    "aria-label",
                    "Open Menu"
                );

            }

        });


        navMenu.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

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
       HEADER SCROLL
    ========================================= */

    const header = document.querySelector(".header");


    const handleHeader = () => {

        if (!header) return;

        if (window.scrollY > 60) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    };


    window.addEventListener("scroll", handleHeader);

    handleHeader();


    /* =========================================
       BACK TO TOP
    ========================================= */

    const backToTop =
        document.getElementById("backToTop");


    const handleBackToTop = () => {

        if (!backToTop) return;

        if (window.scrollY > 600) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    };


    window.addEventListener(
        "scroll",
        handleBackToTop
    );

    handleBackToTop();


    if (backToTop) {

        backToTop.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* =========================================
       SMOOTH NAVIGATION
    ========================================= */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(anchor => {

        anchor.addEventListener("click", event => {

            const targetId =
                anchor.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }


            const target =
                document.querySelector(targetId);


            if (!target) {
                return;
            }


            event.preventDefault();


            const headerHeight =
                header
                    ? header.offsetHeight
                    : 0;


            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;


            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* =========================================
       ACTIVE NAV
    ========================================= */

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );

    const navigationLinks =
        document.querySelectorAll(
            ".nav-menu a"
        );


    const updateActiveNavigation = () => {

        let currentSection = "";


        sections.forEach(section => {

            const top =
                section.offsetTop - 200;

            const bottom =
                top + section.offsetHeight;


            if (
                window.scrollY >= top &&
                window.scrollY < bottom
            ) {

                currentSection =
                    section.id;

            }

        });


        navigationLinks.forEach(link => {

            link.classList.remove("active");


            if (
                currentSection &&
                link.getAttribute("href") ===
                `#${currentSection}`
            ) {

                link.classList.add("active");

            }

        });

    };


    window.addEventListener(
        "scroll",
        updateActiveNavigation
    );

    updateActiveNavigation();


    /* =========================================
       IMAGE ERROR HANDLING
    ========================================= */

    document.querySelectorAll("img").forEach(image => {

        image.addEventListener("error", () => {

            image.classList.add("image-error");

            const parent =
                image.parentElement;


            if (parent) {

                parent.classList.add(
                    "image-missing"
                );

            }

        });

    });


    /* =========================================
       GALLERY LIGHTBOX
    ========================================= */

    const galleryItems =
        document.querySelectorAll(
            ".gallery-item"
        );


    galleryItems.forEach(item => {

        item.addEventListener("click", () => {

            const image =
                item.querySelector("img");


            if (!image) return;


            if (
                image.classList.contains(
                    "image-error"
                )
            ) {
                return;
            }


            if (!image.complete) {
                return;
            }


            if (image.naturalWidth === 0) {
                return;
            }


            const lightbox =
                document.createElement("div");


            lightbox.className =
                "lightbox";


            const closeButton =
                document.createElement("button");


            closeButton.className =
                "lightbox-close";


            closeButton.type = "button";


            closeButton.innerHTML =
                '<i class="fa-solid fa-xmark"></i>';


            closeButton.setAttribute(
                "aria-label",
                "Close"
            );


            const lightboxImage =
                document.createElement("img");


            lightboxImage.src =
                image.currentSrc ||
                image.src;


            lightboxImage.alt =
                image.alt ||
                "Gallery Image";


            lightbox.appendChild(
                closeButton
            );

            lightbox.appendChild(
                lightboxImage
            );


            document.body.appendChild(
                lightbox
            );


            requestAnimationFrame(() => {

                lightbox.classList.add(
                    "active"
                );

            });


            document.body.style.overflow =
                "hidden";


            const closeLightbox = () => {

                lightbox.classList.remove(
                    "active"
                );

                document.body.style.overflow =
                    "";

                setTimeout(() => {

                    if (lightbox.parentElement) {
                        lightbox.remove();
                    }

                }, 400);

            };


            closeButton.addEventListener(
                "click",
                closeLightbox
            );


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

        });

    });


    /* =========================================
       ESCAPE LIGHTBOX
    ========================================= */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key !== "Escape") {
                return;
            }


            const lightbox =
                document.querySelector(
                    ".lightbox"
                );


            if (lightbox) {

                lightbox.classList.remove(
                    "active"
                );

                document.body.style.overflow =
                    "";

                setTimeout(() => {

                    lightbox.remove();

                }, 400);

            }

        }
    );


    /* =========================================
       CURSOR GLOW
    ========================================= */

    if (
        window.innerWidth > 768 &&
        window.matchMedia(
            "(pointer: fine)"
        ).matches
    ) {

        const cursorGlow =
            document.createElement("div");


        cursorGlow.className =
            "cursor-glow";


        document.body.appendChild(
            cursorGlow
        );


        let mouseX = 0;
        let mouseY = 0;


        document.addEventListener(
            "mousemove",
            event => {

                mouseX = event.clientX;
                mouseY = event.clientY;


                cursorGlow.style.left =
                    `${mouseX}px`;


                cursorGlow.style.top =
                    `${mouseY}px`;

            }
        );

    }


    /* =========================================
       CONSOLE
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
