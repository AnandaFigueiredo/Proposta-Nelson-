const projects = window.NF_PROJECTS;
const visualTemplates = window.NF_VISUALS;
const projectsGrid = document.querySelector("#projectsGrid");

const bootScreen = document.querySelector("#bootScreen");
const bootLog = document.querySelector("#bootLog");
if (bootScreen && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  setTimeout(() => { bootLog.textContent = "validando modelos..."; }, 280);
  setTimeout(() => { bootLog.textContent = "insights prontos."; }, 620);
  setTimeout(() => { bootScreen.classList.add("is-hidden"); }, 920);
} else if (bootScreen) {
  bootScreen.classList.add("is-hidden");
}

const customCursor = document.querySelector("#customCursor");
if (customCursor && window.matchMedia("(pointer: fine)").matches) {
  window.addEventListener("pointermove", (event) => {
    customCursor.style.left = `${event.clientX}px`;
    customCursor.style.top = `${event.clientY}px`;
    customCursor.classList.add("is-visible");
  }, { passive: true });
  document.addEventListener("pointerover", (event) => customCursor.classList.toggle("is-link", Boolean(event.target.closest("a, button"))));
  document.addEventListener("pointerleave", () => customCursor.classList.remove("is-visible"));
}

function renderProjects(filter = "Todos") {
  const visibleProjects = filter === "Todos" ? projects : projects.filter((project) => project.category === filter);

  projectsGrid.innerHTML = visibleProjects.map((project, index) => `
    <article class="project-card reveal is-visible" style="--delay:${index * 45}ms">
      <a href="projeto.html?id=${project.id}" aria-label="Abrir página do projeto ${project.title}">
        <div class="project-card__visual project-card__visual--${project.visual}">
          <div class="project-card__metric"><strong>${project.metric}</strong><span>${project.metricLabel}</span></div>
          ${visualTemplates[project.visual]}
          <span class="project-card__number">0${project.id}</span>
        </div>
        <div class="project-card__body">
          <div class="project-card__meta"><span>${project.category}</span><span>${project.year}</span></div>
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          <div class="project-card__footer"><span>${project.tools.join(" · ")}</span><i>Ver estudo de caso ↗</i></div>
        </div>
      </a>
    </article>
  `).join("");
}

document.querySelectorAll("[data-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-filter]").forEach((item) => item.classList.toggle("is-active", item === button));
    renderProjects(button.dataset.filter);
  });
});

const navToggle = document.querySelector("#navToggle");
const mainNav = document.querySelector("#mainNav");
const navBackdrop = document.querySelector("#navBackdrop");

function setNavState(isOpen) {
  document.body.classList.toggle("nav-open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
  mainNav.setAttribute("aria-hidden", String(!isOpen && window.innerWidth <= 860));
}

navToggle.addEventListener("click", () => {
  setNavState(!document.body.classList.contains("nav-open"));
});

navBackdrop.addEventListener("click", () => setNavState(false));

mainNav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  setNavState(false);
}));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && document.body.classList.contains("nav-open")) {
    setNavState(false);
    navToggle.focus();
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 860) {
    document.body.classList.remove("nav-open");
    navToggle.setAttribute("aria-expanded", "false");
    mainNav.removeAttribute("aria-hidden");
  } else {
    mainNav.setAttribute("aria-hidden", String(!document.body.classList.contains("nav-open")));
  }
});

if (window.innerWidth <= 860) {
  mainNav.setAttribute("aria-hidden", "true");
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

const scrollProgress = document.querySelector("#scrollProgress");
const siteHeader = document.querySelector("#siteHeader");
function updateOnScroll() {
  const available = document.documentElement.scrollHeight - window.innerHeight;
  scrollProgress.style.width = `${available > 0 ? (window.scrollY / available) * 100 : 0}%`;
  siteHeader.classList.toggle("is-scrolled", window.scrollY > 20);
}
window.addEventListener("scroll", updateOnScroll, { passive: true });

function updateTime() {
  const time = new Intl.DateTimeFormat("pt-BR", { timeZone: "America/Sao_Paulo", hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date());
  document.querySelector("#localTime").textContent = `UTC−03 · ${time}`;
}
updateTime();
setInterval(updateTime, 60000);
document.querySelector("#currentYear").textContent = new Date().getFullYear();

document.querySelector("#contactForm").addEventListener("submit", (event) => {
  event.preventDefault();
  document.querySelector("#formStatus").textContent = "Formulário demonstrativo. O envio será conectado na versão publicada.";
});

renderProjects();
updateOnScroll();
