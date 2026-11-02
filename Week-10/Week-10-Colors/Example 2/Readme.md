# Example 2 — Automatic Thresholds (Quantize and Quantile)

This example draws two segmented color bars. Each one splits values into 4 bins, but the two scales choose the bin boundaries differently.

## Quantize: equal-width bins

```js
const quantizeRange = ["#d8e9ff","#98c9ff","#4c88ff","#1e3f73"];
const quantizeScale = d3.scaleQuantize([0, 100], quantizeRange);
```

`scaleQuantize` divides the numeric range into equal parts, so the thresholds here are 25, 50 and 75.

## Quantile: data-driven bins

```js
const data = Array.from({length: 200}, () => Math.round(d3.randomNormal(65, 15)()));
const quantileRange = ["#f7d7d7","#e9aaaa","#d44a4a","#7f2222"];
const quantileScale = d3.scaleQuantile().domain(data).range(quantileRange);
```

`scaleQuantile` places the thresholds so that each bin holds about the same number of data points. Bins are narrow where the data is dense and wide where it is sparse. The data is random, so the thresholds change on every reload.

## Drawing a bar from a scale

`drawBarFromScale` works with any scale that has `invertExtent`. It gets the `[x0, x1]` extent of each color, then draws one rectangle per extent:

```js
const ranges = scale.range();
const extents = ranges.map(r => scale.invertExtent(r));
```

## Reading the thresholds

```js
console.log(quantileScale.quantiles());  // the computed quantile thresholds
```

## Customize
- `width`, `height` — size of the bar.
- `tickFormat` — how the tick labels are written.
- `title` — the text above the bar.
- Try a different number of colors in the range to change the number of bins.
