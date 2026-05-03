# Image Optimization Workflow

Source assets stay in this folder untouched. The live site should use only files from
`assets/images/optimized/`.

Source to output mapping:

- `driver-adi-main.jpg`
  Outputs: `optimized/hero-800.jpg`, `optimized/hero-1200.jpg`
- `promo-image-main.jpg`
  Outputs: `optimized/story-640.jpg`, `optimized/story-900.jpg`
- `This-weeeks-offers-malindi.png`
  Outputs: `optimized/offers-720.jpg`, `optimized/offers-1000.jpg`
- `background.jpg`
  Outputs: `optimized/bg-768.jpg`, `optimized/bg-1280.jpg`

Output rule:

- The script never upscales smaller originals.
- If a source image is smaller than a requested target width, the output keeps the source width and only recompresses it.
- Example: `story-900.jpg` currently remains `853px` wide because the original story source is only `853px` wide.

Optional AVIF attempts:

- The optimization script also attempts to create matching `.avif` files.
- On these current source images, the generated AVIF files are larger than the tuned JPEG derivatives, so the live page currently uses optimized JPEG derivatives only.

Rerun command:

```bash
./scripts/optimize-images.sh
```

Target budgets:

- Hero: `80-140 KB` AVIF when available, `140-220 KB` JPEG
- Story: `60-120 KB` AVIF when available, `90-170 KB` JPEG
- Offers: `120-220 KB` AVIF when available, `180-320 KB` JPEG
- Background: `40-90 KB` AVIF when available, `70-140 KB` JPEG

Unused originals currently kept for future reuse:

- `Vehicle-main.jpg`
- `scenic-view1.jpg`
- `scenic-view2.jpg`
