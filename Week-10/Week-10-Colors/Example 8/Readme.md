# Example 8 — Bivariate Colormap (3 × 3)

A bivariate colormap shows **two** attributes with one color. Each attribute is split into 3 classes, and the pair of classes picks one of 3 × 3 = 9 colors. This is the same idea as the diabetes/obesity map on the slides.

The data is made up: 300 points with two correlated attributes, A and B. The scatterplot shows the same two values by position, so you can check what the colors say.

## Classes with scaleQuantile

```js
const classA = d3.scaleQuantile().domain(data.map(d => d.a)).range([0, 1, 2]);
const classB = d3.scaleQuantile().domain(data.map(d => d.b)).range([0, 1, 2]);
```

With a range of three numbers, `scaleQuantile` returns tertiles: 0 for the lowest third, 2 for the highest. The dashed lines are the breaks (`classA.quantiles()`, `classB.quantiles()`).

## Picking the color

```js
const colors = [
  "#e8e8e8", "#ace4e4", "#5ac8c8",
  "#dfb0d6", "#a5add3", "#5698b9",
  "#be64ac", "#8c62aa", "#3b4994"
];
const color = d => colors[classB(d.b) + classA(d.a) * 3];
```

Each row of the palette is one class of A, each column one class of B. Teal means high B only, pink means high A only, dark blue means high on both.

## The legend with d3.cross

```js
d3.cross([0, 1, 2], [0, 1, 2]);
// [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2], [2, 0], [2, 1], [2, 2]]
```

`d3.cross` returns every pair, which is exactly one legend cell per color.

## Try
- Make the attributes uncorrelated (`const b = rnd();`). How does the mix of colors change?
- Hide the axes and the dashed lines. Can you still tell which points are high on A?
- Use 2 classes per attribute instead of 3 (a 2 × 2 palette of 4 colors).
