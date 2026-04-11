# Image Replacement Guide

Drop optimized local files into this folder using the exact filenames below.
The page points to these local files first and only falls back to `https://placehold.co/`
when a file is missing, so once the assets exist the placeholders stop loading.

Recommended filenames and ratios:

- `hero-taxi-1600x1000.webp`
  16:10 ratio, target under 220 KB, use the main hero image.
- `service-area-800x1000.webp`
  4:5 ratio, target under 120 KB, use the supporting image in the middle section.
- `offer-airport-800x600.webp`
  4:3 ratio, target under 90 KB.
- `offer-day-hire-800x600.webp`
  4:3 ratio, target under 90 KB.
- `offer-hotel-transfer-800x600.webp`
  4:3 ratio, target under 90 KB.

Speed recommendations:

- Prefer `webp` or `avif` exports over PNG or oversized JPEG files.
- Resize images before export instead of relying on the browser to scale huge originals.
- Keep filenames stable so the HTML never needs to change.
- Preserve the width and height attributes already in `index.html` to avoid layout shift.
- The hero image is above the fold, so keep it sharp but compact.
