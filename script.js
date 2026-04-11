const leadForm = document.querySelector("#lead-form");
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

if (leadForm) {
  leadForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const recipient = leadForm.dataset.mailto || "bookings@malindimombasataxi.example";
    const formData = new FormData(leadForm);
    const rideType = formData.get("rideType") || "New Taxi Inquiry";
    const subject = `Website Lead: ${rideType}`;
    const message = [
      "New inquiry from the landing page",
      "",
      `Name: ${formData.get("name") || ""}`,
      `Email: ${formData.get("email") || ""}`,
      `Phone: ${formData.get("phone") || ""}`,
      `Pickup Area: ${formData.get("pickup") || ""}`,
      `Ride Type: ${rideType}`,
    ].join("\n");

    window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
  });
}

syncSectionHeights();
window.addEventListener("load", syncSectionHeights);
window.addEventListener("resize", syncSectionHeights);
desktopHeightMatch.addEventListener("change", syncSectionHeights);

if (window.ResizeObserver && offersSection) {
  const sectionObserver = new ResizeObserver(syncSectionHeights);
  sectionObserver.observe(offersSection);
}
