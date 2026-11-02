## Using d3.brush()
### The goal is to use brush to select specific marks from the visualization


### declare brush
d3.brush declares the brush event handler
the three events, on "start", on "brush", and on "end" can be used to
identify the elements under the brush rectangle
- on start we will run "brushStart"
- on brush and on end we will run "brushed" 
```
const brush = d3.brush()
        .on("start",  brushStart) // on start we will run "brushStart" 
        .on("brush end", brushed)    // on brush and end we will run "brushed"
        .extent([
        [margin, margin],
        [1000-margin,1000-margin]
        ]);
```
### Call brush event handler
in this step we will initiate the brush handler on its own group inside the svg

```
// call brush event handler
   axis.append("g").attr("class","brush").call(brush);
   // keep the legend above the brush overlay so it can still be clicked
   legendContainer.raise();

```
### Apply style to the elements brushed when the brushed function runs

using .classed() function, we can enable or disable a class on the selected elements
- First get the coordinate of the brush rectangle
  let selected_coordinates = d3.brushSelection(this); // these are values on the screen
- The coordinates are viewBox coordinates, we will need to return them back 
to the actual values in the data, using scale.invert()         
e.g. let X1 = xScale.invert(selected_coordinates[0][0])
- Now we have the actual X1, X2, Y1 and Y2

 ```   
    // style brushed circles
    function brushed() {
        // use d3.brushSelection to get bounds of the brush
        let selected_coordinates = d3.brushSelection(this); // these are values on the screen

        // a click without a drag clears the brush, so there is no selection
        if (selected_coordinates === null) {
            d3.selectAll("circle").classed("selected",false)
            return
        }

        // where is brushed?
        let X1 = xScale.invert(selected_coordinates[0][0])
        let X2 = xScale.invert(selected_coordinates[1][0])
        let Y1 = yScale.invert(selected_coordinates[0][1])
        let Y2 = yScale.invert(selected_coordinates[1][1])

```
- let us select elements that are between the brush area
```
        // start over, this function runs on every move of the brush
        selected_items.length = 0

        d3.selectAll("circle").classed("selected", (d,i)=>
        {
            // data between the scaled brush coordinates
            if( +d[xCol] >= X1 &&
                +d[xCol] <= X2 &&
                +d[yCol] <= Y1 &&
                +d[yCol] >= Y2)
            {
                // store the id of the selected element for future use
                selected_items.push(`id_${i}`)
                // set the class to true in case the circle is between the values
                return true
            }
            else{
                // otherwise set the class to false
                return false
            }
        })
    }
```

```
    function brushStart() {
        // if no selection already exists, remove the class
        if (d3.brushSelection(this)[0][0] === d3.brushSelection(this)[1][0]) {
            d3.selectAll("circle").classed("selected",false)
        }
    }
```

### Using the selected items
`index_05_brush_Select_Marks.html` passes the `selected_items` array and an `on_select` function to `scatter_plot`.
`on_select` runs after every change of the selection, so the page can show how many marks are selected:
```
on_select=items=>d3.select("#selected_count").text(`Selected marks: ${items.length}`)
```

![](brush.gif)