const mailtoForms = document.querySelectorAll("form[data-mailto]");
const yearNode = document.querySelector("#year");
const galleryTrack = document.querySelector("[data-gallery-track]");
const gallerySlides = [...document.querySelectorAll("[data-gallery-slide]")];
const galleryPrev = document.querySelector("[data-gallery-prev]");
const galleryNext = document.querySelector("[data-gallery-next]");
const galleryLightbox = document.querySelector("#gallery-lightbox");
const galleryLightboxImage = document.querySelector("#gallery-lightbox-image");
const galleryLightboxCaption = document.querySelector("#gallery-lightbox-caption");
const galleryLightboxPrev = document.querySelector("[data-gallery-lightbox-prev]");
const galleryLightboxNext = document.querySelector("[data-gallery-lightbox-next]");
const galleryLightboxClose = document.querySelector("[data-gallery-close]");

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

if (galleryTrack && gallerySlides.length) {
  let activeGalleryIndex = 0;

  const getSlideStep = () => {
    const slideWidth = gallerySlides[0].getBoundingClientRect().width;
    const gapValue = window.getComputedStyle(galleryTrack).gap;
    const gap = Number.parseFloat(gapValue) || 0;
    return slideWidth + gap;
  };

  const scrollGallery = (direction) => {
    galleryTrack.scrollBy({
      left: getSlideStep() * direction,
      behavior: "smooth",
    });
  };

  const renderLightbox = () => {
    const activeSlide = gallerySlides[activeGalleryIndex];
    const imageNode = activeSlide.querySelector("img");

    if (!imageNode || !galleryLightboxImage || !galleryLightboxCaption) {
      return;
    }

    galleryLightboxImage.src = activeSlide.dataset.full || imageNode.src;
    galleryLightboxImage.alt = imageNode.alt;
    galleryLightboxCaption.textContent = activeSlide.dataset.caption || imageNode.alt;
  };

  const openLightbox = (index) => {
    activeGalleryIndex = index;
    renderLightbox();

    if (galleryLightbox?.showModal) {
      galleryLightbox.showModal();
      return;
    }

    window.open(gallerySlides[index].dataset.full || gallerySlides[index].querySelector("img")?.src, "_blank");
  };

  galleryPrev?.addEventListener("click", () => scrollGallery(-1));
  galleryNext?.addEventListener("click", () => scrollGallery(1));

  gallerySlides.forEach((slide, index) => {
    slide.addEventListener("click", () => openLightbox(index));
  });

  galleryLightboxPrev?.addEventListener("click", () => {
    activeGalleryIndex = (activeGalleryIndex - 1 + gallerySlides.length) % gallerySlides.length;
    renderLightbox();
  });

  galleryLightboxNext?.addEventListener("click", () => {
    activeGalleryIndex = (activeGalleryIndex + 1) % gallerySlides.length;
    renderLightbox();
  });

  galleryLightboxClose?.addEventListener("click", () => {
    galleryLightbox?.close();
  });

  galleryLightbox?.addEventListener("click", (event) => {
    const bounds = galleryLightbox.getBoundingClientRect();
    const clickedOutside =
      event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom;

    if (clickedOutside) {
      galleryLightbox.close();
    }
  });

  galleryLightbox?.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      activeGalleryIndex = (activeGalleryIndex - 1 + gallerySlides.length) % gallerySlides.length;
      renderLightbox();
    }

    if (event.key === "ArrowRight") {
      activeGalleryIndex = (activeGalleryIndex + 1) % gallerySlides.length;
      renderLightbox();
    }
  });
}
