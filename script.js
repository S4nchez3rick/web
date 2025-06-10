document.addEventListener("DOMContentLoaded", () => {
  // === Selectores principales ===
  const menuCheckbox = document.getElementById("menu");
  const navbar       = document.querySelector(".menu .navbar");
  const btnInfo      = document.querySelector(".btn-info");
  const extraInfo    = document.getElementById("extra-info");
  const email        = document.getElementById("email");
  const copiedMsg    = document.getElementById("copied-msg");
  // Botón volver arriba
const scrollToTopBtn = document.getElementById('scrollToTopBtn');
if (scrollToTopBtn) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300 && window.innerWidth <= 768) {
      scrollToTopBtn.classList.add('visible');
    } else {
      scrollToTopBtn.classList.remove('visible');
    }
  });
  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}


  // — Mostrar/Ocultar info extra —
  if (btnInfo && extraInfo) {
    btnInfo.addEventListener("click", e => {
      e.preventDefault();
      extraInfo.classList.toggle("hidden");
    });
    window.addEventListener("scroll", () => {
      if (window.innerWidth >= 768 && !extraInfo.classList.contains("hidden")) {
        extraInfo.classList.add("hidden");
      }
    });
  }

  // — Toggle menú hamburguesa móvil —
  if (menuCheckbox && navbar) {
    menuCheckbox.addEventListener("change", () => {
      navbar.classList.toggle("show", menuCheckbox.checked);
    });
    // Cerrar al clicar cualquier enlace
    navbar.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        menuCheckbox.checked = false;
        navbar.classList.remove("show");
      });
    });
  }

  // — Copiar correo al portapapeles —
  if (email && copiedMsg) {
    email.addEventListener("click", () => {
      navigator.clipboard.writeText(email.textContent)
        .then(() => {
          copiedMsg.style.display = "inline";
          setTimeout(() => copiedMsg.style.display = "none", 1500);
        })
        .catch(err => console.error("Error al copiar el correo:", err));
    });
  }

  // — Botón “volver arriba” SOLO EN MÓVIL —
  if (scrollBtn) {
    const toggleScrollBtn = () => {
      const isMobile = window.innerWidth <= 768;
      if (isMobile && window.pageYOffset > 200) {
        scrollBtn.classList.add("show");
      } else {
        scrollBtn.classList.remove("show");
      }
    };
    window.addEventListener("scroll", toggleScrollBtn);
    window.addEventListener("resize", toggleScrollBtn);
    scrollBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // — Secciones y acordeones (tu lógica original) —
  const allSections = document.querySelectorAll("main .services");
  const mainContent = document.querySelector("main");
  const accordionsAutoOpen = {
    produccion: "prod-detalles",
    formacion:  "form-detalles",
    tesis:      "tesis-detalles"
  };

  function setAccordionState(id, open) {
    const btn   = document.querySelector(`[data-target="${id}"]`);
    const panel = document.getElementById(id);
    if (!btn || !panel) return;
    panel.classList.toggle("active", open);
    panel.classList.toggle("hidden", !open);
    btn.textContent = open ? "Ver menos" : "Ver más";
  }

  const menuLinks = document.querySelectorAll(".menu .navbar a");
  menuLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const targetId = link.getAttribute("href").slice(1);
      const targetSection = document.getElementById(targetId);
      if (!targetSection) return;

      allSections.forEach(sec => {
        sec.classList.toggle("hidden-section", sec !== targetSection);
      });
      Object.entries(accordionsAutoOpen).forEach(([sec, accId]) => {
        setAccordionState(accId, sec === targetId);
      });

      // Mostrar botón “Ver todo”
      if (!document.getElementById("back-button")) {
        const btn = document.createElement("button");
        btn.id = "back-button";
        btn.textContent = "Ver todo";
        btn.classList.add("btn-info");
        btn.style.margin = "30px auto 0";
        mainContent.appendChild(btn);
        btn.addEventListener("click", () => {
          allSections.forEach(sec => sec.classList.remove("hidden-section"));
          Object.values(accordionsAutoOpen).forEach(id => setAccordionState(id, false));
          btn.remove();
        });
      }

      targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}); // fin DOMContentLoaded

// === Funciones de mosaico (si las tienes inline en el HTML) ===
function showMosaic(event) {
  if (event) event.preventDefault();
  const mosaic = document.getElementById("mosaic-view");
  const header = document.getElementById("main-header");
  mosaic && (mosaic.style.display = "block");
  header && (header.style.display = "flex");
  document.querySelectorAll(".mosaic-section").forEach(sec => sec.classList.remove("visible"));
  window.scrollTo({ top: 0, behavior: "smooth" });
}
function openSection(id) {
  const mosaic = document.getElementById("mosaic-view");
  const header = document.getElementById("main-header");
  mosaic && (mosaic.style.display = "none");
  header && (header.style.display = "none");
  document.querySelectorAll(".mosaic-section").forEach(sec => sec.classList.remove("visible"));
  const section = document.getElementById(id);
  section && section.classList.add("visible");
}

