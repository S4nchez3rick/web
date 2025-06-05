document.addEventListener("DOMContentLoaded", () => {
  const menuCheckbox = document.getElementById("menu");
  const navbar = document.querySelector(".menu .navbar");
  const btnInfo = document.querySelector(".btn-info");
  const extraInfo = document.getElementById("extra-info");
  const email = document.getElementById("email");
  const copiedMsg = document.getElementById("copied-msg");

  // Mostrar/ocultar el contenido extra al hacer clic
  btnInfo.addEventListener("click", (e) => {
    e.preventDefault();
    extraInfo.classList.toggle("hidden");
  });

  // Ocultar el contenido extra al hacer scroll solo en pantallas grandes
  window.addEventListener("scroll", () => {
    if (window.innerWidth >= 768 && !extraInfo.classList.contains("hidden")) {
      extraInfo.classList.add("hidden");
    }
  });

  // Mostrar/ocultar el menú con animación
  menuCheckbox.addEventListener("change", () => {
    if (menuCheckbox.checked) {
      navbar.classList.add("show");
    } else {
      navbar.classList.remove("show");
    }
  });

  // Cerrar el menú al dar clic en un enlace
  const menuLinks = document.querySelectorAll(".menu .navbar a");

  menuLinks.forEach(link => {
    link.addEventListener("click", () => {
      if (menuCheckbox.checked) {
        menuCheckbox.checked = false;
        navbar.classList.remove("show");
      }
    });
  });

  // Copiar correo al portapapeles al hacer clic
  if (email && copiedMsg) {
    email.addEventListener("click", () => {
      const correo = email.textContent;
      navigator.clipboard.writeText(correo).then(() => {
        copiedMsg.style.display = "inline";
        setTimeout(() => {
          copiedMsg.style.display = "none";
        }, 1500);
      }).catch(err => {
        console.error("Error al copiar el correo:", err);
      });
    });
  }

  // Mostrar solo la sección seleccionada desde el menú

const allSections = document.querySelectorAll("main .services");
const mainContent = document.querySelector("main");

menuLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href").substring(1);
    const targetSection = document.getElementById(targetId).parentElement;

    allSections.forEach(section => {
      if (section !== targetSection) {
        section.classList.add("hidden-section");
      } else {
        section.classList.remove("hidden-section");
      }
    });

    showBackButton();
    // Scroll a la sección seleccionada
    targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// Crear y mostrar botón de "Ver todo"
function showBackButton() {
  if (!document.getElementById("back-button")) {
    const button = document.createElement("button");
    button.id = "back-button";
    button.textContent = "Ver todo";
    button.classList.add("btn-info");
    button.style.marginTop = "30px";
    button.style.display = "block";
    button.style.marginInline = "auto";
    mainContent.appendChild(button);

    button.addEventListener("click", () => {
      allSections.forEach(section => section.classList.remove("hidden-section"));
      button.remove();
    });
  }
}

// Botón para volver arriba en móviles
const scrollToTopBtn = document.getElementById("scrollToTopBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300 && window.innerWidth <= 768) {
    scrollToTopBtn.classList.add("visible");
  } else {
    scrollToTopBtn.classList.remove("visible");
  }
});

scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

  
});