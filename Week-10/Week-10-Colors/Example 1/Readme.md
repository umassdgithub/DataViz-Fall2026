# Example 1 — D3 Sequential Scale and Color Interpolations

This example draws four color bars. Each bar is made of 500 rectangles, 1px wide and 20px tall, colored with a sequential scale:

```js
function makeSequenceExamples(interp=d3.interpolateViridis,n=500, size=20) {
    const color = d3.scaleSequential(interp).domain([0, n-1]);

    const svg = d3.select("#canvas")
        .append("svg")
        .attr("width", n)
        .attr("height", size);

    svg.selectAll("rect")
        .data(d3.range(n))
        .enter().append("rect")
        .attr("x", (d, i) => i)
        .attr("y", 0)
        .attr("width", 1)
        .attr("height", size)
        .attr("fill", d => color(d));
}
```

## The four bars

```js
makeSequenceExamples();                                      // Viridis (the default)
makeSequenceExamples(d3.interpolateRgb("purple", "orange"));
makeSequenceExamples(d3.interpolateHclLong("purple", "orange"));
makeSequenceExamples(d3.interpolateHslLong("purple", "orange"));
```

The last three bars use the same two colors. The color space and the path through it change what appears between them.

## ScaleSequential
- **Scale:** `scaleSequential(interpolator)` expects a numeric domain; it outputs colors by sampling the interpolator between 0 and 1.
- **Domain:** `[0, n-1]` maps the index of each rectangle to the scale, so `0` gets the first color and `n-1` gets the last.
- **Drawing:** We bind `d3.range(n)` to `<rect>` elements and set `fill` using `color(d)`.

## Customize
- `interp` — the color interpolator. Try `d3.interpolateCividis`, `d3.interpolatePlasma`, `d3.interpolateMagma`.
- `n` — number of rectangles, which is also the width of the bar in pixels.
- `size` — height of the bar in pixels.

A list of the color interpolators is available at https://d3js.org/d3-interpolate/color
