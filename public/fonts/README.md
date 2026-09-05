# Noblesse UI webfont subsets

These are modified subsets of Pretendard Variable v1.3.9, distributed under the SIL Open Font License 1.1. Copyright and license terms are preserved in `OFL.txt` and the font metadata. The modified family and PostScript names are **Noblesse UI / NoblesseUI**, respecting the upstream reserved font names.

Source: https://github.com/orioncactus/pretendard/tree/v1.3.9

Original font: https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/packages/pretendard/dist/web/variable/woff2/PretendardVariable.woff2

Source SHA-256: `9599f12fd42fc0bce1cd50b47a0c022e108d7aa64dd0d1bb0ed44f3282d900b4`

`home` includes the rendered homepage text, accessible labels and ASCII. `content` includes the remaining rendered site characters. Disjoint CSS unicode ranges let the homepage download only its subset. The original variable weight axis and glyph designs are retained, with CSS exposing weights 100–900. Characters outside the current content fall back to the configured system font.

When adding content, build the site, then regenerate with Python and `fonttools[woff]`/`brotli` installed:

```text
python scripts/subset-fonts.py --source PATH_TO_ORIGINAL_FONT --html-root dist
npm run build
```

Inspect `manifest.json`, preview the homepage and edited content, and verify new characters are included. The original source font is not needed by the deployed site. Generated files are committed; production builds do not require Python or download fonts.
