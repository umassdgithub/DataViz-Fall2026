# Example 4 — Categorical Colors with scaleOrdinal

Categorical attributes (city, product, party) have no order, so they are shown with **hue**. This example colors 12 categories with three of D3's categorical schemes.

```js
const color = d3.scaleOrdinal()
    .domain(categories)
    .range(d3.schemeTableau10);

color("Boston");  // the first color of the scheme
```

## What happens with too many categories

`scaleOrdinal` maps the first domain value to the first color, the second to the second, and so on. When it runs out of colors it **starts over at the first color**, so two different categories end up with the same color. The example marks these swatches with "repeat":

- `d3.schemeCategory10` and `d3.schemeTableau10` have 10 colors, so categories 11 and 12 repeat.
- `d3.schemeSet2` has 8 colors, so the last four repeat.

This is why categorical color works for roughly six to twelve categories at most. With more, group the small categories into "Other" or use another channel (position, shape, small multiples).

## Order of the domain

If you do not set `.domain()`, `scaleOrdinal` assigns colors in the order it first sees the values. Setting the domain explicitly keeps each category's color the same across charts.

## Try
- Remove `.domain(categories)` and call `color()` on the categories in a different order.
- Use `.unknown("#ccc")` and call `color("New York")` (a value not in the domain).
- Try `d3.schemePaired` (12 colors). What do the pairs suggest that is not in the data?
