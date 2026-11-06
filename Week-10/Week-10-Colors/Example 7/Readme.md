# Example 7 — HSL Lightness Is Not Perceived Lightness

This example shows why "L lightness ≠ L\* luminance" (slide 7).

## Top row: HSL

```js
d3.hsl(h, 1, 0.5)   // 12 hues, all with S = 100% and L = 50%
```

Every color has the same HSL lightness, but the gray row underneath (gray with the same perceived lightness L\*) is anything but even: yellow is much lighter than blue. The numbers under the columns are the L\* values.

## Bottom row: HCL

```js
d3.hcl(h, 50, 65)   // hue, chroma, luminance
```

HCL is a perceptual color space: fixing `l` fixes the perceived lightness. The gray row is flat (every L\* is 65), so the hues differ only in hue.

## Getting the gray

```js
d3.lab(d3.lab(color).l, 0, 0)
```

`d3.lab(color).l` is the L\* of a color. Setting `a` and `b` to 0 removes the color but keeps that lightness.

## Why it matters
- A categorical palette built in HSL has some colors that pop and some that fade.
- A colormap interpolated in HSL can have bumps in lightness that read as false edges.
- `d3.interpolateHcl` and `d3.interpolateLab` interpolate in perceptual spaces (compare with Example 1).

## Try
- Raise the HCL chroma from 50 to 80. Some hues cannot reach it at L\* = 65 and get clipped; watch the gray row.
- Change the HSL row to `d3.hsl(h, 1, 0.7)`.
