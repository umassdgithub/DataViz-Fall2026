# Example 6 — Luminance Contrast for Text

Fine detail, including text, is seen through **luminance contrast**, not hue. Two colors can look very different and still have almost the same luminance; text in one on the other is hard to read.

Each card shows:
1. the text on its background,
2. the same card in grayscale, where only luminance is left,
3. the L\* of both colors and the contrast ratio.

The yellow-on-blue card is the classic case: the hues are opposite, but in grayscale the text almost disappears.

## Grayscale with the same lightness

```js
function toGray(c) {
  return d3.lab(d3.lab(c).l, 0, 0).formatHex();
}
```

`d3.lab(c).l` is the color's L\* (perceived lightness, 0 to 100) in the CIELAB color space. Setting `a` and `b` to 0 removes the color and keeps the lightness.

## Contrast ratio

The ratio uses the WCAG definition of relative luminance:

```js
contrastRatio = (L_lighter + 0.05) / (L_darker + 0.05);
```

It runs from 1 : 1 (no contrast) to 21 : 1 (black on white). WCAG asks for at least **4.5 : 1** for normal-size text.

## Try
- Use the color pickers to find a pair of different hues with almost no contrast.
- Compare white on yellow with white on dark blue: same text color, very different result.
- Change `toGray` to use HSL lightness instead: `d3.lab(d3.hsl(c).l * 100, 0, 0)`. Do the grays still match what you see?
