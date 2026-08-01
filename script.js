const hostingOptions = {
  client: {
    name: "Cliente administra — sem mensalidade para Ananda",
    description: "Domínio, hospedagem e renovações contratados e pagos diretamente por Nelson. Ananda realiza a configuração inicial."
  },
  managed: {
    name: "Gestão completa — R$ 70/mês",
    description: "Hospedagem, domínio e administração técnica realizadas por Ananda. Contratação mínima de 12 meses."
  }
};

function selectHosting(optionKey) {
  const option = hostingOptions[optionKey];
  if (!option) return;

  document.querySelectorAll("[data-hosting-card]").forEach((card) => {
    card.classList.toggle("is-active", card.dataset.hostingCard === optionKey);
  });

  document.querySelectorAll("[data-select-hosting]").forEach((button) => {
    const selected = button.dataset.selectHosting === optionKey;
    button.classList.toggle("is-selected", selected);
    button.innerHTML = selected ? "Opção selecionada <span>✓</span>" : "Selecionar esta opção <span>→</span>";
  });

  document.querySelector("#hosting-name").textContent = option.name;
  document.querySelector("#hosting-description").textContent = option.description;
}

document.querySelectorAll("[data-select-hosting]").forEach((button) => {
  button.addEventListener("click", () => {
    selectHosting(button.dataset.selectHosting);
    document.querySelector(".hosting-selection").scrollIntoView({ behavior: "smooth", block: "center" });
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08 }
);

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

const progress = document.querySelector("#scroll-progress");
function updateScrollProgress() {
  const available = document.documentElement.scrollHeight - window.innerHeight;
  const percentage = available > 0 ? (window.scrollY / available) * 100 : 0;
  progress.style.width = `${percentage}%`;
}

window.addEventListener("scroll", updateScrollProgress, { passive: true });
updateScrollProgress();
selectHosting("managed");
