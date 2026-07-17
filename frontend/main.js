document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinksContainer = document.querySelector(".nav-links");

  if (menuToggle && navLinksContainer) {
    menuToggle.addEventListener("click", () => {
      const isActive = navLinksContainer.classList.toggle("active");

      menuToggle.setAttribute("aria-expanded", isActive);
    });
  }

  const navLinks = document.querySelectorAll("nav a");

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();

      const targetId = link.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (!targetSection) return;

      const headerHeight = document.querySelector("header").offsetHeight;
      const targetPosition =
        targetSection.getBoundingClientRect().top +
        window.pageYOffset -
        headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });

      if (navLinksContainer && navLinksContainer.classList.contains("active")) {
        navLinksContainer.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  });

  const sections = document.querySelectorAll("main section");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.15,
    },
  );

  sections.forEach((section) => observer.observe(section));

  const serviceCards = document.querySelectorAll(".service-card");

  serviceCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-10px)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)";
    });
  });

  const currentYear = new Date().getFullYear();
  const footerCopyright = document.querySelector("footer p");

  if (footerCopyright) {
    footerCopyright.innerHTML = `&copy; ${currentYear} Sobrino and Son's LLC. Todos los derechos reservados.`;
  }
});
