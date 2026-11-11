# Realistic artwork — 10.13

The user supplied IMG_7592.jpeg showing the 5.2 visual reference. 10.13 uses generated realistic raster artwork for the four vehicle types and their catalog thumbnails, plus a concrete floor texture. The illustration is visual only: the SVG footprint, dimension lines, editable sizes, collision checks, and pointer handling remain driven by entered measurements. No dimensions or validation results are baked into the images.

Assets: assets/vehicles-realistic-v1.webp (1448×1086, transparent sprite sheet) and assets/concrete-floor-v1.webp (1254×1254). Generated with the built-in image tool from prompts for a realistic automotive atlas and a clean orthographic concrete texture; the screenshot was a style reference. Original generated PNGs were optimized to WebP with alpha preserved. No runtime image-generation API, third-party photo service or added subscription.

Yellow side bands illustrate the chosen gap target; they do not certify a clear walking route. The full entered footprint includes the illustrative mirror-width envelope. Images are not manufacturer-specific vehicle data. If the vehicle image fails, the previous vector renderer is shown; if the floor image fails, the floor grid remains.

109 prior minimal-DOM logic checks pass. SVG/print appearance still requires a device review. Asset preview URLs use the version branch on raw GitHub; published pages load their own relative assets.
