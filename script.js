const mailtoForms = document.querySelectorAll("form[data-mailto]");
const yearNode = document.querySelector("#year");
const storySection = document.querySelector(".story.section-card");
const offersSection = document.querySelector(".offers.section-card");
const desktopHeightMatch = window.matchMedia("(min-width: 881px)");

if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

const syncSectionHeights = () => {
  if (!storySection || !offersSection) {
    return;
  }

  if (!desktopHeightMatch.matches) {
    storySection.style.minHeight = "";
    return;
  }

  storySection.style.minHeight = `${offersSection.offsetHeight}px`;
};

mailtoForms.forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const recipient = form.dataset.mailto || "omaranwar575@gmail.com";
    const formData = new FormData(form);
    const subject = form.dataset.subject || "Website Lead";
    const lines = ["New inquiry from the landing page", ""];

    for (const [key, value] of formData.entries()) {
      const formattedKey = key
        .replace(/_/g, " ")
        .replace(/\b\w/g, (character) => character.toUpperCase());
      lines.push(`${formattedKey}: ${value || ""}`);
    }

    window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
  });
});

syncSectionHeights();
window.addEventListener("load", syncSectionHeights);
window.addEventListener("resize", syncSectionHeights);
desktopHeightMatch.addEventListener("change", syncSectionHeights);

if (window.ResizeObserver && offersSection) {
  const sectionObserver = new ResizeObserver(syncSectionHeights);
  sectionObserver.observe(offersSection);
}
