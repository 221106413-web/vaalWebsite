// pages/basicPlan/basicPlan.js

function renderBasicTemplates() {
  const templates = [
    {
      name: "Modern Portfolio",
      url: "https://example1.com",
      image: "assets/screenshots/modern-portfolio.jpg"
    },
    {
      name: "Local Bakery",
      url: "https://example2.com",
      image: "assets/screenshots/local-bakery.jpg"
    },
    {
      name: "Fitness Trainer",
      url: "https://example3.com",
      image: "assets/screenshots/fitness-trainer.jpg"
    }
  ];

  const grid = document.getElementById("template-grid");
  if (!grid) return;
  grid.innerHTML = "";

  templates.forEach((tpl, i) => {
    const section = document.createElement("div");
    section.className = "template-section";
    section.style.backgroundImage = `url('${tpl.image}')`;
    section.style.animationDelay = `${i * 0.15}s`;

    section.innerHTML = `
      <div class="template-overlay">
        <h2>${tpl.name}</h2>
        <div class="overlay-ctas">
          <a href="${tpl.url}" target="_blank" class="cta-demo">View template</a>
          <button
            type="button"
            class="cta-order"
            data-template="${tpl.name}"
          >
            Order This Design
          </button>
        </div>
      </div>
    `;
    grid.appendChild(section);
  });

  // After injection, wire up the order buttons
  document.querySelectorAll(".cta-order").forEach(btn => {
    btn.addEventListener("click", e => {
      const templateName = btn.dataset.template;
      // 1. Set hidden input
      document.getElementById("chosen-template").value = templateName;
      // 2. Scroll to form
      document
        .getElementById("purchase-form")
        .scrollIntoView({ behavior: "smooth" });
      // 3. Focus name field
      document.getElementById("name").focus();
    });
  });
}

// Initialize on DOM ready
if (document.readyState !== "loading") {
  renderBasicTemplates();
} else {
  document.addEventListener("DOMContentLoaded", renderBasicTemplates);
}
