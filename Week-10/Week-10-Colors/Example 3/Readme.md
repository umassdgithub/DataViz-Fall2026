# Example 3 — Same Data, Three Binning Scales

This example draws the same 200 values three times as a histogram. Each time the values are split into 4 color classes by a different scale:

| Scale | Domain you pass | Where the breaks go |
|---|---|---|
| `d3.scaleQuantize` | `[min, max]` | equal-width intervals |
| `d3.scaleQuantile` | every data value | equal number of values per class |
| `d3.scaleThreshold` | the break values | wherever you put them |

The data has a long right tail, like most county-level rates. With quantize, 142 of the 200 values get the lightest color. With quantile, each color gets about 50 values.

## The data

```js
const random = d3.randomLogNormal.source(d3.randomLcg(0.42))(2.0, 0.6);
const data = Array.from({length: 200}, () => Math.round(random() * 10) / 10);
```

`d3.randomLcg(0.42)` is a seeded random number generator, so the data (and the breaks) are the same on every reload. Change the seed to get different data.

## The three scales

```js
const colors = ["#bdd7e7", "#6baed6", "#3182bd", "#08519c"];

d3.scaleQuantize().domain(d3.extent(data)).range(colors);
d3.scaleQuantile().domain(data).range(colors);
d3.scaleThreshold().domain([5, 10, 20]).range(colors);
```

## Reading the breaks

Each scale reports its breaks in a different way:

```js
quantize.thresholds();  // [10.575, 19.55, 28.525]
quantile.quantiles();   // [4.975, 7.1, 11.225]
threshold.domain();     // [5, 10, 20]
```

## Coloring the histogram

`d3.bin()` groups the values into bins 1 unit wide. A bin can contain values from two classes (for example, a bin from 7 to 8 when a break is at 7.1), so each bin is drawn as a small stack, one rectangle per color.

## Try
- Change the number of colors (use `d3.schemeBlues[5]`, for example) and watch the breaks move.
- Change the threshold breaks to `[10, 20, 30]`.
- Replace the log-normal data with `d3.randomNormal(20, 5)`: when the data is not skewed, quantize and quantile give similar breaks.
