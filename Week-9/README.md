# Week 9: Hierarchical Data Visualization & Animations

This week covers three major topics in data visualization: hierarchical data layouts (TreeMaps and Circle Packs), the eCharts visualization library, and D3 transitions and animations.

---

## Part 1: TreeMap - Using Stratify, Hierarchy, and Tree Layouts

TreeMaps and Circle Packs display hierarchical data. This section covers different ways to build and visualize hierarchical datasets with D3.

### Important algorithms used for this purpose
- **Stratify**: Converts flat parent-child data format into hierarchical structures
- **Hierarchy**: Creates a hierarchy object from stratified data
- **Pack Layout**: Arranges data as circles with parent-child relationships
- **TreeMap Layout**: Displays nested data as rectangular tiles

### Examples

#### Example 1 - Adjacency Matrix
An adjacency matrix of state-to-state migration in the U.S. (2019 Census data).

**Files:**
- `index.html` - Basic matrix view
- `index_interactionData.html` - Hover highlighting of the row and column, with a tooltip showing the value
- `index_interactionSorting.html` - Reorders rows and columns together (by name, total in-migration, or total out-migration) with animated transitions
- `SORTING.md` - How the sorting and transitions work, with diagrams

#### Example 2 - Simple Treemap
A basic treemap visualization demonstrating hierarchical data layout using rectangular tiles.

#### Example 3 - US Population Treemap
Treemap of U.S. population by state and county.

**Files:**
- `index_01_Group.html` - Builds the hierarchy with nested `d3.group`
- `index_02_Map.html` - Builds the hierarchy as a nested object and uses `d3.treemapDice` tiling

#### Example 4 - Using Echarts
The same U.S. population treemap, built with eCharts instead of D3.

#### Example 5 - D3 Circle Pack
Circle Pack visualization technique for hierarchical data.

**Key Steps:**
1. **Select SVG element** - Target the container for visualization
2. **Stratify data** - Convert parent-child data format:
   ```javascript
   const stratify_function = d3.stratify()
     .id(d => d["childColumn"])
     .parentId(d => d["parentColumn"])
   ```
3. **Create hierarchy** - Build hierarchical structure from stratified data:
   ```javascript
   const data_hierarchy = d3.hierarchy(data_formatted)
   data_hierarchy.sum(d => d.data.val)  // Add values to hierarchy
   ```
4. **Apply pack layout** - Calculate circle positions and sizes:
   ```javascript
   const packLayout = d3.pack().size([500, 500])
   packLayout(data_hierarchy)
   ```
5. **Render circles** - Create visual elements with bindings to data

**Files:**
- `index.html` - Basic circle pack
- `index_02_apply_color.html` - With color mapping
- `index_03_add_labels.html` - With labels and text

#### Example 6 - D3 Circle Pack - U.S. Population
Circle pack of U.S. population by state and county.

---

## Part 2: eCharts Visualization Library Examples

eCharts is a JavaScript visualization library with built-in chart types. Each chart is configured with a single `option` object passed to `setOption()`.

### Examples

#### Example 1 - Simple Bar Chart
Introduction to eCharts with a basic bar chart visualization.

**Files:**
- `index.html` - Basic bar chart implementation
- Step-by-step implementation guide available in `readme.md`

#### Example 2 - Tree Map
Displaying nested data as rectangular tiles with eCharts.

**Files:**
- `index.html` - TreeMap visualization

#### Example 3 - Scatter Plot with Zoom Slider
A scatter plot with a `dataZoom` slider that filters the visible range of the x axis.

**Files:**
- `index.html` - Scatter plot with zoom slider
- `readme.md` - Implementation details

#### Example 4 - Cluster Tree
A radial tree of Massachusetts counties and towns (`Mass.json`). Nodes expand and collapse on click.

#### Example 5 - Sunburst Tree
A sunburst of the U.S. population data used in the treemap example. Clicking a segment zooms into it.

---

## Part 3: Transitions and Animations in D3

D3 transitions animate attribute changes over time. This section covers duration, delay, chaining, and custom tweens.

### Key Concepts
- **Transitions**: Smooth changes between states over time
- **Timing**: Control animation speed and sequencing
- **Delays**: Stagger animations for visual clarity
- **Attribute Tweening**: Custom interpolation functions

### Examples

#### Example 01 - Basic Transitions
Introduction to D3 transitions with simple animations.

**Variations:**
- `index_position.html` - Position
- `index_color.html` - Fill color
- `index_position_size.html` - Size
- `index_position_stroke.html` - Stroke color and width
- `index_rotation_color.html` - Rotation and color, with a second transition started on `end`

#### Example 02 - Delay
**Variations:**
- `index_01.html` - A single transition with a 2-second `delay`
- `index_02.html` - 1,000 random circles: chained color transitions, then removal staggered by index

#### Example 03 - Update Delay with Histogram
Histogram bars update with a staggered delay and bounce easing when new data is generated.

**Files:**
- `index_Elaborate_Histogram.html` - Regenerates normally distributed data
- `index_Elaborate_Histogram_different_distributions.html` - Switches between normal, uniform, log-normal, and bimodal data

#### Example 04 - Chained Transitions
Looping animations that chain transitions with `d3.active()`.

**Files:**
- `index_01_Chain_Tween.html` - One circle moving back and forth
- `index_02_Chain_Tween.html` - 1,000 circles moving to random positions
- `index_03_Chain_Tween.html` - The same, with a random start delay for each circle

#### Example 05 - Attribute Tweening
Custom interpolation with `attrTween()`.

**Files:**
- `index_01 attrTween.html` - A circle whose radius follows a sine function
- `index_02 attrTween.html` - Solar system: planets orbit with log-scaled distance and speed
- `index_03 unitCircle.html` - A marker moving around a unit circle

---

## Resources

- [D3.js Documentation](https://d3js.org/)
- [eCharts Documentation](https://echarts.apache.org/)
- Individual example directories contain detailed implementation guides in their respective readme files
