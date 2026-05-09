const mailtoForms = document.querySelectorAll("form[data-mailto]");
const yearNode = document.querySelector("#year");
const galleries = [...document.querySelectorAll("[data-gallery]")];
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

if (galleries.length) {
  let activeGalleryIndex = 0;
  let activeGallerySlides = [];

  const getSlideStep = (track, slides) => {
    if (!track || !slides.length) {
      return 0;
    }

    const slideWidth = slides[0].getBoundingClientRect().width;
    const gapValue = window.getComputedStyle(track).gap;
    const gap = Number.parseFloat(gapValue) || 0;
    return slideWidth + gap;
  };

  const scrollGallery = (track, slides, direction) => {
    track.scrollBy({
      left: getSlideStep(track, slides) * direction,
      behavior: "smooth",
    });
  };

  const renderLightbox = () => {
    const activeSlide = activeGallerySlides[activeGalleryIndex];
    const imageNode = activeSlide.querySelector("img");

    if (!imageNode || !galleryLightboxImage || !galleryLightboxCaption) {
      return;
    }

    galleryLightboxImage.src = activeSlide.dataset.full || imageNode.src;
    galleryLightboxImage.alt = imageNode.alt;
    galleryLightboxCaption.textContent = activeSlide.dataset.caption || imageNode.alt;
  };

  const openLightbox = (slides, index) => {
    activeGallerySlides = slides;
    activeGalleryIndex = index;
    renderLightbox();

    if (galleryLightbox?.showModal) {
      galleryLightbox.showModal();
      return;
    }

    window.open(slides[index].dataset.full || slides[index].querySelector("img")?.src, "_blank");
  };

  galleries.forEach((gallery) => {
    const track = gallery.querySelector("[data-gallery-track]");
    const prev = gallery.querySelector("[data-gallery-prev]");
    const next = gallery.querySelector("[data-gallery-next]");
    const slides = [...gallery.querySelectorAll("[data-gallery-slide]")];

    if (!track || !slides.length) {
      return;
    }

    prev?.addEventListener("click", () => scrollGallery(track, slides, -1));
    next?.addEventListener("click", () => scrollGallery(track, slides, 1));

    slides.forEach((slide, index) => {
      slide.addEventListener("click", () => openLightbox(slides, index));
    });
  });

  galleryLightboxPrev?.addEventListener("click", () => {
    activeGalleryIndex = (activeGalleryIndex - 1 + activeGallerySlides.length) % activeGallerySlides.length;
    renderLightbox();
  });

  galleryLightboxNext?.addEventListener("click", () => {
    activeGalleryIndex = (activeGalleryIndex + 1) % activeGallerySlides.length;
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
      activeGalleryIndex = (activeGalleryIndex - 1 + activeGallerySlides.length) % activeGallerySlides.length;
      renderLightbox();
    }

    if (event.key === "ArrowRight") {
      activeGalleryIndex = (activeGalleryIndex + 1) % activeGallerySlides.length;
      renderLightbox();
    }
  });
}
