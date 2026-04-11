const leadForm = document.querySelector("#lead-form");
const yearNode = document.querySelector("#year");

if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

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
