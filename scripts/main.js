// Smooth scrolling for anchor links
document.addEventListener("DOMContentLoaded", function () {
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        // Update URL hash without scrolling
        history.pushState(null, null, this.getAttribute("href"));

        // Update active nav link
        updateActiveNavLink();
      }

      // Collapse Bootstrap offcanvas menu if open
      const offcanvasEl = document.getElementById("offcanvasNav");
      if (offcanvasEl && offcanvasEl.classList.contains("show")) {
        // Bootstrap 5: use the Offcanvas API to hide
        if (typeof bootstrap !== "undefined" && bootstrap.Offcanvas) {
          const offcanvasInstance =
            bootstrap.Offcanvas.getOrCreateInstance(offcanvasEl);
          offcanvasInstance.hide();
        } else {
          // fallback: manually remove classes
          offcanvasEl.classList.remove("show");
          offcanvasEl.setAttribute("aria-hidden", "true");
          offcanvasEl.style.visibility = "hidden";
        }
      }
    });
  });

  // Navbar background change on scroll
  window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    // Update active nav link based on scroll position
    updateActiveNavLink();
  });

  // Form submission handling
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Simple form validation
      let isValid = true;
      const inputs = this.querySelectorAll(
        "input[required], textarea[required]"
      );

      inputs.forEach((input) => {
        if (!input.value.trim()) {
          isValid = false;
          input.classList.add("is-invalid");
        } else {
          input.classList.remove("is-invalid");
        }
      });

      if (isValid) {
        // Here you would normally send the form data to a server
        alert("شكراً لتواصلك معنا! سنرد عليك في أقرب وقت ممكن.");
        this.reset();
      }
    });
  }

  // Update active nav link on page load
  updateActiveNavLink();
});

// Update active navigation link based on scroll position
function updateActiveNavLink() {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (window.scrollY >= sectionTop - 100) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
}
