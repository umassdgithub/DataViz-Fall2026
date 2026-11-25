# Data Visualization — Fall 2026

This repository has the examples, step-by-step tutorials and class activities for the **Data Visualization** course
(CIS 568). The examples for each week are inside a folder with that week's name. Most examples are a single HTML
page you can open, read and change. They are built mainly with **D3.js** (v7), along with **eCharts**, **Deck.gl**,
**Scrollama** and **three.js**. Python notebooks prepare the data for some of them.

---

## Contents

- [Getting started](#getting-started)
- [Course map](#course-map)
- [Week by week](#week-by-week)
- [Python notebooks](#python-notebooks)
- [Libraries used](#libraries-used)

---

## Getting started

### 1. Get the code

```sh
git clone https://github.com/umassdgithub/DataViz-Fall2026.git
cd DataViz-Fall2026
```

Or use **Code → Download ZIP** on GitHub.

### 2. Open the examples through a local web server

Most examples load data files (CSV, TSV, JSON) with `d3.csv`, `d3.json` or `fetch`. Browsers block these requests
for pages opened straight from disk (`file://...`), and the page stays blank. Use a local server instead:

- **VS Code Live Server** (easiest): install the *Live Server* extension, right-click an `index.html` and choose
  **Open with Live Server**.
- **Python**: from the repository folder (or any week's folder) run

  ```sh
  python3 -m http.server 8000
  ```

  then open <http://localhost:8000> and click through to an example.

### 3. Keep an internet connection

Many pages load D3 and other libraries from a CDN (`d3js.org`, `cdn.jsdelivr.net`, …), so they need an internet
connection. Examples that include their own copy of a library in a `lib/`, `libs/` or `js/` folder also work offline.

### How each example is organized

Most example folders look like this:

```text
Example 03/
├── index.html      the visualization (HTML + CSS + JavaScript in one file)
├── readme.md       what the example shows and how the code works
├── data/           the data it loads
└── libs/           local copies of the libraries it uses (if any)
```

When a folder has several pages, they are numbered in teaching order (`index_01_…`, `index_02_…`), and each page
adds one step to the one before it. Read the `readme.md` first, then open the page and the code side by side.

---

## Course map

| Week | Topic | Highlights | Tools |
| --- | --- | --- | --- |
| [4](Week-4/) | D3 basics | SVG, selections, data binding, enter/update/exit, scales, axes, line chart from CSV | D3 |
| [5](Week-5/) | D3 generators | Stacked bars, stacked areas, streamgraphs of Massachusetts precipitation | D3, Python |
| [6](Week-6/) | Geospatial visualization | Projections, GeoJSON/TopoJSON, choropleths, cartograms, 3D maps | D3, QGIS, Deck.gl, Mapbox, Python |
| [7](Week-7/) | Iso-lines and contours | Marching squares, contour lines, NOAA temperature contours, density contours | D3, Python |
| [8](Week-8-ForceSimulator/) | Networks and force layouts | `d3.forceSimulation`, Les Misérables network, zoom, labels, highlighting | D3 |
| [9](Week-9/) | Hierarchies and animation | Adjacency matrix, treemaps, circle packing, eCharts, transitions | D3, eCharts |
| [9 (Scrollama)](Week-9-D3-Scrollama/) | Scrollytelling | Charts that change as the reader scrolls: scatter → bars, map → scatter, map → bars | D3, Scrollama |
| [10](Week-10/) | Color and multiple views | Color scales and perception, sliders, hover, brushing, linked views, histograms | D3 |
| [11](Week-11/) | Data reduction and medical imaging | One-hot encoding → network, BERT embeddings → clusters, CT scans → 3D surface | Python, D3, Gephi |
| [12](Week-12/) | Glyphs, eye tracking, linked tooltips | Wind glyphs on a map, scan paths and heat maps, US election map with linked charts | D3, Python |
| [13](Week-13/) | 3D visualization | three.js scenes, 3D scatterplots, CT slices, voxel filters and iso-surfaces | three.js, D3, Python |

---

## Week by week

Each week's folder (or each part inside it) has its own README with screenshots and explanations. This section is a
summary.

### Week 4 — D3 basics · [folder](Week-4/)

An introduction to D3 in eight examples: creating SVG elements, styling and transitions, binding data to elements, the
enter/update/exit pattern, linear scales and axes, and a line chart loaded from a CSV file.

### Week 5 — D3 generators · [folder](Week-5/)

Using `d3.line`, `d3.area` and `d3.stack` to make a stacked bar chart, a stacked area chart and streamgraphs of
precipitation in Dartmouth and across Massachusetts. A notebook in `dataProcessing/` prepares the precipitation data, and
`tableGenerator/` turns a CSV file into an HTML table.

### Week 6 — Geospatial visualization · [folder](Week-6/)

- **Part 1 — D3:** drawing lines with projections, loading GeoJSON and TopoJSON, area maps, choropleths, and a
  notebook that converts map data with GeoPandas.
- **Part 2 — Cartograms:** a cartogram made in QGIS, a D3 cartogram of US election results by county, an animated
  transition between a choropleth and a cartogram, and pan and zoom.
- **Part 3 — Deck.gl and Mapbox:** 3D choropleths, column layers, grid cells and extruded shapes on a Mapbox basemap.
  These need a free Mapbox token: see [TOKEN_SETUP.md](Week-6/Part-3-DeckGL_MapBox/TOKEN_SETUP.md).

### Week 7 — Iso-lines and contours · [folder](Week-7/)

1. **Marching squares:** an animation on Perlin noise that shows how the algorithm finds a contour.
2. **Contour lines** of a 2D grid (the volcano dataset): basic, color-coded, and with an interactive threshold.
3. **Geospatial contours** of NOAA temperature data, including an animation over time. The notebook in
   `Data Processing/` extracts the data with xarray.
4. **Density contours** (`d3.contourDensity`) of the Palmer penguins.

### Week 8 — Networks and force layouts · [folder](Week-8-ForceSimulator/)

How `d3.forceSimulation` works (ticks, alpha, forces), then seven examples that build up a network view: nodes with
`forceX`/`forceY`/`forceCollide`, a random network with interactive force controls, the Les Misérables character
network, nodes sized by degree, pan and zoom, labels, and group highlighting on hover. The
[step-by-step guide](Week-8-ForceSimulator/Step_by_Step/readme.md) covers each force separately.

### Week 9 — Hierarchies and animation · [folder](Week-9/)

- **Part 1 — Matrix and trees:** an adjacency matrix of US state-to-state migration (with hover and sorting),
  treemaps of US population, and circle packing, using `d3.stratify`, `d3.hierarchy`, `d3.treemap` and `d3.pack`.
- **Part 2 — eCharts:** a bar chart, a treemap, a scatterplot with a zoom slider, a cluster tree of Massachusetts
  towns and a sunburst.
- **Part 3 — Transitions:** duration, delay, a histogram that updates with staggered delays, chained transitions
  and `attrTween`.
- **Part 4 — Mouse move:** shapes that follow the mouse pointer.

### Week 9 — Scrollytelling with Scrollama · [folder](Week-9-D3-Scrollama/)

Three scroll-driven stories where the chart stays pinned while text cards scroll over it:

1. Students shown as dots that move from a scatterplot into a bar chart.
2. A week of USGS earthquakes, from a world map to a magnitude–depth scatterplot and back.
3. Massachusetts counties whose map shapes turn into population bars (2020 Census).

A full walkthrough is in [tutorial.md](Week-9-D3-Scrollama/tutorial.md).

### Week 10 — Color and multiple views · [folder](Week-10/)

- **Colors:** eight examples on sequential, diverging and categorical color scales, binning with
  quantize/quantile/threshold scales, luminance contrast, perceived lightness and a bivariate color map.
- **Manipulable multiview:** a slider, selection by mouse hover, linked multi-select views and brushing.
- **Multiview part 2:** histograms with data aggregation, mouse events, linked views, and a jointplot exercise
  with the Palmer penguins.

### Week 11 — Data reduction and medical imaging · [folder](Week-11/)

- **One-hot encoding:** the IMDB Top 1000 table becomes a network of similar movies (Python → JSON → D3 force layout).
- **BERT embeddings:** about 560 academic papers are embedded, compared with cosine similarity, clustered, mapped
  to 2D with PCA and t-SNE, and exported as networks for Gephi.
- **Medical imaging (DICOM):** 68 CT slices are cleaned, stacked into a 3D array in Hounsfield Units, viewed from
  three directions and turned into 3D surfaces with marching cubes.

### Week 12 — Glyphs, eye tracking and linked tooltips · [folder](Week-12/)

- **Zoom and glyphs:** a wind-arrow glyph whose direction, length and color encode wind data, drawn on a grid, on a
  base map, and animated over time.
- **Eye tracking:** a scan path of fixations over the stimulus image, and a fixation heat map with
  `d3.contourDensity`. A notebook prepares the EyeTribe data.
- **Multiview tooltip:** a zoomable US county map of election results (2008–2020) with a diverging color scale and
  a tooltip that draws a small line chart of each county's results. A second example draws slices of a brain CT scan as contours, with
  sliders for the number of levels and the value range.

### Week 13 — 3D visualization with three.js · [folder](Week-13/)

The week starts with the parts of every three.js scene (scene, camera, light, geometry, material, mesh, renderer,
controls), then builds five examples:

1. A single cube with orbit controls.
2. RGB color cubes.
3. A 3D scatterplot of the Palmer penguins with flat colors.
4. The same scatterplot with lights and shading.
5. **The Week 11 CT scan in 3D:** one slice as a texture, three crossing views, a filter on Hounsfield Units (HU)
   that shows tissues as a point cloud, and six iso-surfaces (lungs and airways, skin, muscle and organs, and three
   bone densities) computed in a notebook with marching cubes.

---

## Python notebooks

Several weeks prepare their data in Jupyter notebooks. The processed data is already in the repository, so you only
need Python if you want to re-run or change a notebook.

| Notebook | What it does | Packages |
| --- | --- | --- |
| [Week 5 · Mass_Precipitation](Week-5/dataProcessing/Mass_Precipitation.ipynb) | Prepares the precipitation data for the streamgraphs | pandas, matplotlib |
| [Week 6 · GeoSpatial Data](Week-6/Part-1-D3JS/DataProcessing/GeoSpatial%20Data.ipynb) | Reads and converts map data (shapefile, GeoJSON, TopoJSON) | geopandas, topojson, descartes, matplotlib |
| [Week 7 · Field Data Processing](Week-7/Example%2003%20Geospatial%20Contours/Data%20Processing/Field%20Data%20Processing%20-%20Xarray.ipynb) | Extracts NOAA temperature fields for the contour maps | xarray, netCDF4, xgcm, numpy, pandas, tqdm, matplotlib |
| [Week 11 · HotBit Encoding](Week-11/ML-Data-Reduction/OneHotEncoding/PythonCode/HotBit_-_Encoding.ipynb) | One-hot encodes the IMDB table and builds the movie network | pandas, scikit-learn |
| [Week 11 · BERT Embeddings](Week-11/ML-Data-Reduction/PCS-Bert-CosineSimilarity/Week_11_BERT_Embeddings.ipynb) | Embeds, clusters and maps the papers | transformers, torch, scikit-learn, networkx, pandas, matplotlib |
| [Week 11 · DICOM processor](Week-11/Medical-Data-DICOM/dicom_processor.ipynb) | CT slices → 3D volume → iso-surfaces → OBJ file | pydicom, scikit-image, scipy, numpy, pandas, matplotlib |
| [Week 12 · Eye-tracking data](Week-12/Week-12-Eyetracking/EyeTribe_dataProcessing/dataProcess.ipynb) | Turns raw EyeTribe output into fixations | pandas, numpy, matplotlib |
| [Week 13 · DICOM to three.js](Week-13/Example%2005/Data%20Processing/dicom_to_threejs.ipynb) | Exports the CT volume and iso-surface meshes for the browser | pydicom, scikit-image, scipy, numpy, matplotlib |

A simple setup with a virtual environment:

```sh
python3 -m venv .venv
source .venv/bin/activate            # Windows: .venv\Scripts\activate
pip install jupyter pandas numpy matplotlib scipy
pip install <the packages of the notebook you want to run>
```

Open the notebook in Jupyter (`jupyter notebook`) or in VS Code, and run the cells from top to bottom.
The BERT notebook downloads a language model and runs much faster on a GPU.

---

## Libraries used

| Library | Used for | Weeks |
| --- | --- | --- |
| [D3.js](https://d3js.org/) (mostly v7; a few examples use v5 or v6) | Almost every chart | 4–13 |
| [TopoJSON client](https://github.com/topojson/topojson-client) | Reading TopoJSON map files | 6, 12 |
| [Deck.gl](https://deck.gl/) + [Mapbox GL](https://www.mapbox.com/) | 3D layers on a basemap | 6 |
| [Apache ECharts](https://echarts.apache.org/) | Ready-made charts configured with one `option` object | 9 |
| [Scrollama](https://github.com/russellsamora/scrollama) | Scroll-driven storytelling | 9 |
| [three.js](https://threejs.org/) (r122, saved locally in `libs/` folders) | 3D scenes | 13 |
| [Gephi](https://gephi.org/) (desktop app) | Exploring the BERT similarity networks | 11 |
| [QGIS](https://qgis.org/) (desktop app) | Making a cartogram | 6 |

The D3 API changed between versions (for example, event handlers receive `(event, d)` since v6, and `d3.nest` was
replaced by `d3.group` in v6). If you copy code between examples, check which version each page loads.
