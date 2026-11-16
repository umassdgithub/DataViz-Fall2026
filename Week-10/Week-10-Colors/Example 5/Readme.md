# Example 5 — Diverging Colors with scaleDiverging

A diverging colormap uses two hues that run outward from a neutral middle value. Use it when the midpoint **means something**: zero, an average, 50%.

The data here is made up: 36 monthly temperature differences from a long-term average, in °C. Positive is warmer than usual, negative is colder.

## The diverging scale

```js
const maxAbs = d3.max(data, d => Math.abs(d.value));

const diverging = d3.scaleDiverging()
    .domain([-maxAbs, 0, maxAbs])               // [min, midpoint, max]
    .interpolator(t => d3.interpolateRdBu(1 - t));
```

- The domain has **three** values. The middle one gets the neutral color.
- Using `[-maxAbs, 0, maxAbs]` keeps the scale symmetric, so +1° and −1° are equally strong colors.
- `d3.interpolateRdBu` goes from red (t = 0) to blue (t = 1). For temperature we want warm = red, so the interpolator is flipped with `1 - t`.

## Why not a sequential scale?

The second chart colors the same bars with `d3.scaleSequential` and `d3.interpolateBlues`. The colors still go from low to high, but nothing marks 0: a month slightly below average and a month slightly above look almost the same.

## Try
- Move the midpoint: `.domain([-maxAbs, 0.5, maxAbs])`. Which months change meaning?
- Try `d3.interpolatePuOr` or `d3.interpolateBrBG`.
- Remove the bars' position (draw all bars the same height) and see how much the color alone tells you.
