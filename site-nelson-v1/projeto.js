const params = new URLSearchParams(window.location.search);
const requestedId = Number(params.get("id")) || 1;
const projects = window.NF_PROJECTS;
const project = projects.find((item) => item.id === requestedId) || projects[0];
const nextProject = projects[projects.indexOf(project) + 1] || projects[0];
const projectVisual = window.NF_VISUALS[project.visual];

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

document.title = `${project.title} — Nelson Ferreira`;
document.querySelector("#projectPageContent").innerHTML = `
  <section class="case-hero">
    <div class="case-hero__top reveal is-visible"><span>PROJETO 0${project.id}</span><span>${project.category}</span><span>${project.year}</span></div>
    <div class="case-hero__heading reveal is-visible"><div><p>ESTUDO DE CASO // PORTFÓLIO</p><h1>${project.title}</h1></div><p>${project.description}</p></div>
    <div class="case-hero__visual project-card__visual project-card__visual--${project.visual} reveal is-visible">
      <div class="project-card__metric"><strong>${project.metric}</strong><span>${project.metricLabel}</span></div>
      ${projectVisual}
      <span class="case-watermark">NF / 0${project.id}</span>
    </div>
    <div class="case-meta reveal is-visible"><div><span>ÁREA</span><strong>${project.category}</strong></div><div><span>FERRAMENTAS</span><strong>${project.tools.join(" · ")}</strong></div><div><span>ENTREGA</span><strong>Análise · Modelo · Visualização</strong></div></div>
  </section>

  <section class="case-story">
    <aside class="case-story__nav"><span>CONTEÚDO</span><a href="#desafio">01 Desafio</a><a href="#solucao">02 Solução</a><a href="#resultado">03 Resultado</a><a href="#codigo">04 Implementação</a></aside>
    <div class="case-story__content">
      <article id="desafio" class="reveal"><span>01 / DESAFIO</span><h2>O problema antes da tecnologia.</h2><p>${project.challenge}</p><blockquote>Uma boa análise começa definindo a pergunta certa — antes de escolher qualquer ferramenta.</blockquote></article>
      <article id="solucao" class="reveal"><span>02 / SOLUÇÃO</span><h2>Uma abordagem orientada por evidências.</h2><p>${project.solution}</p><div class="case-steps"><div><b>01</b><span>COMPREENDER</span></div><i>→</i><div><b>02</b><span>EXPLORAR</span></div><i>→</i><div><b>03</b><span>MODELAR</span></div><i>→</i><div><b>04</b><span>VALIDAR</span></div></div></article>
      <article id="resultado" class="reveal"><span>03 / RESULTADO</span><h2>Resultado que pode ser interpretado.</h2><p>${project.result}</p><div class="case-result"><strong>${project.metric}</strong><span>${project.metricLabel}</span><small>RESULTADO PRINCIPAL</small></div></article>
      <article id="codigo" class="reveal"><span>04 / IMPLEMENTAÇÃO</span><h2>Por trás da análise.</h2><p>Trecho demonstrativo da lógica utilizada. Na versão final, esta área poderá apresentar detalhes técnicos, arquivos, repositórios ou materiais do projeto.</p><pre class="case-code"><code>${project.code.map((line,index) => `<span>${String(index + 1).padStart(2,"0")}</span>${line}`).join("\n")}</code></pre></article>
    </div>
  </section>

  <section class="next-case"><span>PRÓXIMO PROJETO</span><a href="projeto.html?id=${nextProject.id}"><strong>${nextProject.title}</strong><i>↗</i></a></section>
`;

const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
  if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
}), { threshold: 0.08 });
document.querySelectorAll(".reveal:not(.is-visible)").forEach((element) => observer.observe(element));

const scrollProgress = document.querySelector("#scrollProgress");
const siteHeader = document.querySelector("#siteHeader");
function updateOnScroll() {
  const available = document.documentElement.scrollHeight - window.innerHeight;
  scrollProgress.style.width = `${available > 0 ? (window.scrollY / available) * 100 : 0}%`;
  siteHeader.classList.toggle("is-scrolled", window.scrollY > 20);
}
window.addEventListener("scroll", updateOnScroll, { passive: true });
updateOnScroll();
