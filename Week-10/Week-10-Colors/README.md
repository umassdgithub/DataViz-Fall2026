# Week 10 — Color Examples

Each example is a single `Index.html` that loads `../libs/d3.js` (D3 v7). Open it in a browser; no server or data files are needed.

| Example | Topic | Main D3 API |
|---|---|---|
| Example 1 | Sequential colormaps and color interpolation | `d3.scaleSequential`, `d3.interpolateRgb`, `d3.interpolateHclLong` |
| Example 2 | Automatic thresholds as legend bars | `d3.scaleQuantize`, `d3.scaleQuantile`, `invertExtent` |
| Example 3 | Same data, three binning scales, shown on a histogram | `d3.scaleQuantize`, `d3.scaleQuantile`, `d3.scaleThreshold`, `d3.bin` |
| Example 4 | Categorical colors and what happens with too many categories | `d3.scaleOrdinal`, `d3.schemeTableau10` |
| Example 5 | Diverging colors around a meaningful midpoint | `d3.scaleDiverging`, `d3.interpolateRdBu` |
| Example 6 | Luminance contrast for text, with grayscale preview | `d3.lab`, `d3.rgb` |
| Example 7 | HSL lightness vs perceived lightness L\* | `d3.hsl`, `d3.hcl`, `d3.lab` |
| Example 8 | Bivariate 3 × 3 colormap with a legend | `d3.scaleQuantile`, `d3.cross` |

Examples 3, 5 and 8 use seeded random data (`d3.randomLcg`), so the numbers are the same on every reload. Example 3 uses the same data as the histograms on the slides.
