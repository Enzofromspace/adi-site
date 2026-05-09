const mailtoForms = document.querySelectorAll("form[data-mailto]");
const yearNode = document.querySelector("#year");

if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

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
