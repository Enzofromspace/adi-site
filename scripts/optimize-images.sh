#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SOURCE_DIR="$ROOT_DIR/assets/images"
OUTPUT_DIR="$SOURCE_DIR/optimized"

mkdir -p "$OUTPUT_DIR"

source_width() {
  sips -g pixelWidth "$1" | awk '/pixelWidth/ { print $2 }'
}

generate_jpeg() {
  local source_file="$1"
  local output_file="$2"
  local width="$3"
  local quality="$4"
  local actual_width

  actual_width="$(source_width "$source_file")"
  if (( actual_width > width )); then
    actual_width="$width"
  fi

  sips \
    --resampleWidth "$actual_width" \
    -s format jpeg \
    -s formatOptions "$quality" \
    "$source_file" \
    --out "$output_file" \
    >/dev/null
}

generate_avif_if_supported() {
  local source_file="$1"
  local output_file="$2"
  local width="$3"
  local temp_file
  local actual_width

  temp_file="$(mktemp "${TMPDIR:-/tmp}/adi-avif-XXXXXX.avif")"
  actual_width="$(source_width "$source_file")"
  if (( actual_width > width )); then
    actual_width="$width"
  fi

  if sips --resampleWidth "$actual_width" "$source_file" --out "$temp_file" >/dev/null 2>&1 && [[ -s "$temp_file" ]]; then
    mv "$temp_file" "$output_file"
  else
    rm -f "$temp_file" "$output_file"
    printf 'Skipping AVIF generation for %s; local sips write support is unavailable.\n' "$(basename "$output_file")"
  fi
}

printf 'Generating optimized derivatives in %s\n' "$OUTPUT_DIR"

generate_avif_if_supported "$SOURCE_DIR/driver-adi-main.jpg" "$OUTPUT_DIR/hero-800.avif" 800
generate_avif_if_supported "$SOURCE_DIR/driver-adi-main.jpg" "$OUTPUT_DIR/hero-1200.avif" 1200
generate_jpeg "$SOURCE_DIR/driver-adi-main.jpg" "$OUTPUT_DIR/hero-800.jpg" 800 40
generate_jpeg "$SOURCE_DIR/driver-adi-main.jpg" "$OUTPUT_DIR/hero-1200.jpg" 1200 39

generate_avif_if_supported "$SOURCE_DIR/promo-image-main.jpg" "$OUTPUT_DIR/story-640.avif" 640
generate_avif_if_supported "$SOURCE_DIR/promo-image-main.jpg" "$OUTPUT_DIR/story-900.avif" 900
generate_jpeg "$SOURCE_DIR/promo-image-main.jpg" "$OUTPUT_DIR/story-640.jpg" 640 45
generate_jpeg "$SOURCE_DIR/promo-image-main.jpg" "$OUTPUT_DIR/story-900.jpg" 900 38

generate_avif_if_supported "$SOURCE_DIR/This-weeeks-offers-malindi.png" "$OUTPUT_DIR/offers-720.avif" 720
generate_avif_if_supported "$SOURCE_DIR/This-weeeks-offers-malindi.png" "$OUTPUT_DIR/offers-1000.avif" 1000
generate_jpeg "$SOURCE_DIR/This-weeeks-offers-malindi.png" "$OUTPUT_DIR/offers-720.jpg" 720 58
generate_jpeg "$SOURCE_DIR/This-weeeks-offers-malindi.png" "$OUTPUT_DIR/offers-1000.jpg" 1000 58

generate_avif_if_supported "$SOURCE_DIR/background.jpg" "$OUTPUT_DIR/bg-768.avif" 768
generate_avif_if_supported "$SOURCE_DIR/background.jpg" "$OUTPUT_DIR/bg-1280.avif" 1280
generate_jpeg "$SOURCE_DIR/background.jpg" "$OUTPUT_DIR/bg-768.jpg" 768 38
generate_jpeg "$SOURCE_DIR/background.jpg" "$OUTPUT_DIR/bg-1280.jpg" 1280 38

printf '\nOptimized assets:\n'
ls -lh "$OUTPUT_DIR"
