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

// IDs de secciones con acordeón que deben abrirse automáticamente
const accordionsAutoOpen = {
    "produccion": "prod-detalles",
    "formacion": "form-detalles",
    "tesis": "tesis-detalles"
};

// Función para abrir/cerrar acordeones
function setAccordionState(id, open) {
    const btn = document.querySelector(`[data-target="${id}"]`);
    const panel = document.getElementById(id);
    if (btn && panel) {
        if (open) {
            panel.classList.add("active");
            panel.classList.remove("hidden");
            btn.textContent = "Ver menos";
        } else {
            panel.classList.remove("active");
            panel.classList.add("hidden");
            btn.textContent = "Ver más";
        }
    }
}

menuLinks.forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = link.getAttribute("href").substring(1);
        const targetSection = document.getElementById(targetId);

        // Oculta todas las secciones
        allSections.forEach(section => {
            if (section !== targetSection) {
                section.classList.add("hidden-section");
            } else {
                section.classList.remove("hidden-section");
            }
        });

        // Acordeón: expande solo el correspondiente y cierra los demás
        Object.entries(accordionsAutoOpen).forEach(([sec, accId]) => {
            setAccordionState(accId, sec === targetId);
        });

        showBackButton();
        // Scroll a la sección seleccionada
        targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
    });
});

// Cuando le das "Ver todo", cierra todos los acordeones
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
            // Cierra todos los acordeones
            Object.values(accordionsAutoOpen).forEach(id => setAccordionState(id, false));
            button.remove();
        });
    }
}



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

  // Collapsible sections (acordeón)
document.querySelectorAll('.btn-toggle').forEach(btn => {
    btn.addEventListener('click', function() {
        const target = document.getElementById(this.dataset.target);
        if (target.classList.contains('active')) {
            target.classList.remove('active');
            target.classList.add('hidden');
            this.textContent = 'Ver más';
        } else {
            target.classList.add('active');
            target.classList.remove('hidden');
            this.textContent = 'Ver menos';
        }
    });
});

// Copiar correo extra de la sección Resumen
const mailLink2 = document.getElementById('mail-link2');
if (mailLink2) {
    mailLink2.addEventListener("click", () => {
        navigator.clipboard.writeText(mailLink2.textContent);
        mailLink2.textContent = '¡Copiado!';
        setTimeout(() => {
            mailLink2.textContent = 'jmfloresa@uaemex.mx';
        }, 1500);
    });
}
// funcion para  abrir los iconos del mosaicos y la informacion centrada
function openSection(id) {
    const mosaic = document.getElementById('mosaic-view');
    const header = document.getElementById('main-header');
    const section = document.getElementById(id);

    // Oculta el mosaico y el encabezado
    if (mosaic) mosaic.style.display = 'none';
    if (header) header.style.display = 'none';

    // Oculta todas las secciones
    document.querySelectorAll('.mosaic-section').forEach(sec => {
        sec.classList.remove('visible');
    });

    // Muestra solo la sección correspondiente
    if (section) {
        section.classList.add('visible');
    }
}





});