
```javascript
/* =========================================
   MUHAMMAD KHATEEB EJAZ
   ACTOR PORTFOLIO — JAVASCRIPT
========================================= */


/* =========================================
   AOS INITIALIZATION
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    AOS.init({
        duration: 900,
        easing: "ease-out-cubic",
        once: true,
        offset: 80
    });

});


/* =========================================
   PRELOADER
========================================= */

window.addEventListener("load", function () {

    const preloader = document.getElementById("preloader");

    setTimeout(() => {
        preloader.classList.add("hide");
    }, 700);

});


/* =========================================
   MOBILE MENU
========================================= */

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

if (menuBtn && navMenu) {

    menuBtn.addEventListener("click", function () {

        navMenu.classList.toggle("active");

        const icon = menuBtn.querySelector("i");

        if (navMenu.classList.contains("active")) {
            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");
        } else {
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
        }

    });


    /* Close menu after clicking a link */

    const navLinks = navMenu.querySelectorAll("a");

    navLinks.forEach(link => {

        link.addEventListener("click", function () {

            navMenu.classList.remove("active");

            const icon = menuBtn.querySelector("i");

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        });

    });

}


/* =========================================
   HEADER SCROLL EFFECT
========================================= */

const header = document.querySelector(".header");

window.addEventListener("scroll", function () {

    if (window.scrollY > 60) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

});


/* =========================================
   BACK TO TOP
========================================= */

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", function () {

    if (window.scrollY > 600) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }

});


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

window.addEventListener("scroll", function () {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 180;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            currentSection = section.getAttribute("id");
        }

    });


    navigationLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + currentSection) {
            link.classList.add("active");
        }

    });

});


/* =========================================
   SMOOTH ANCHOR SCROLL
========================================= */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (event) {

        const targetId = this.getAttribute("href");

        if (targetId === "#") return;

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

document.querySelectorAll("img").forEach(image => {

    image.addEventListener("error", function () {

        this.style.display = "none";

        const parent = this.parentElement;

        if (parent) {
            parent.classList.add("image-missing");
        }

    });

});


/* =========================================
   GALLERY CLICK EFFECT
========================================= */

const galleryItems = document.querySelectorAll(".gallery-item");

galleryItems.forEach(item => {

    item.addEventListener("click", function () {

        const image = item.querySelector("img");

        if (!image || image.style.display === "none") {
            return;
        }

        const lightbox = document.createElement("div");

        lightbox.className = "lightbox";

        lightbox.innerHTML = `
            <button class="lightbox-close" aria-label="Close">
                <i class="fa-solid fa-xmark"></i>
            </button>

            <img src="${image.src}" alt="${image.alt}">
        `;

        document.body.appendChild(lightbox);

        requestAnimationFrame(() => {
            lightbox.classList.add("active");
        });


        const closeButton =
            lightbox.querySelector(".lightbox-close");

        closeButton.addEventListener("click", function () {
            closeLightbox(lightbox);
        });


        lightbox.addEventListener("click", function (event) {

            if (event.target === lightbox) {
                closeLightbox(lightbox);
            }

        });

    });

});


function closeLightbox(lightbox) {

    lightbox.classList.remove("active");

    setTimeout(() => {
        lightbox.remove();
    }, 300);

}


/* =========================================
   KEYBOARD ESCAPE FOR LIGHTBOX
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
   CURSOR GLOW — DESKTOP
========================================= */

const cursorGlow = document.createElement("div");

cursorGlow.className = "cursor-glow";

document.body.appendChild(cursorGlow);


document.addEventListener("mousemove", function (event) {

    cursorGlow.style.left = event.clientX + "px";
    cursorGlow.style.top = event.clientY + "px";

});


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
```
