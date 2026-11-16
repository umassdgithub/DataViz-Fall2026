# GeoPandas Cheatsheet

## Installation & Imports

### GeoPandas
```python
import geopandas as gpd
```
- **Purpose**: Work with geospatial data (maps, coordinates, shapes)
- **Use Case**: Reading shapefiles, polygons, linestrings; geographic operations
- **Core Object**: `GeoDataFrame` — extends pandas DataFrame with a `geometry` column
- **Comparison with Pandas**: 
  - `pandas.DataFrame`: Regular tabular data (rows × columns)
  - `geopandas.GeoDataFrame`: Tabular data + geometric objects (points, lines, polygons)
  - GeoPandas inherits all pandas functionality but adds spatial operations (intersects, buffer, simplify, CRS transforms)

### Matplotlib (Visualization)
```python
import matplotlib.pyplot as plt
```
- **Purpose**: Create static plots and visualizations
- **Use Case**: Plotting maps, charts, and geographic data
- **Why it's used with GeoPandas**: `GeoDataFrame.plot()` uses matplotlib as the backend for rendering maps
- **Integration**: GeoPandas `.plot()` returns a matplotlib `Axes` object, allowing you to customize colors, titles, legends

### TopoJSON (File Format)
```python
from topojson import Topology
```
- **Purpose**: Convert geographic data to TopoJSON format
- **Use Case**: Creating smaller, web-friendly geographic files for D3.js or other web mapping libraries
- **Advantages Over GeoJSON**:
  - **File Size**: 200x+ smaller than GeoJSON
  - **Efficiency**: Encodes only shared boundaries once (not duplicated between adjacent polygons)
  - **Use Cases**: Web maps, interactive visualizations, D3.js workflows
- **How it works**: `Topology(gdf).to_json()` converts your GeoDataFrame to TopoJSON

### JSON (Data Serialization)
```python
import json
```
- **Purpose**: Read/write JSON-formatted data
- **Use Case**: Saving and loading JSON files, working with TopoJSON or GeoJSON
- **Example Usage**:
  ```python
  with open('output.json', 'w') as f:
      json.dump(data, f)  # Save to file
  ```
- **Why it's needed**: TopoJSON output is JSON format; you need `json` module to write it to files

## Comparison: Pandas vs GeoPandas

| Feature | Pandas | GeoPandas |
|---------|--------|-----------|
| **Data Structure** | DataFrame (rows × columns) | GeoDataFrame (rows × columns + geometry) |
| **Geometry Support** | No | Yes (Point, LineString, Polygon) |
| **File Formats** | CSV, Excel, SQL, JSON | Shapefiles, GeoJSON, GeoParquet, WKT |
| **Spatial Operations** | No | Yes (buffer, intersects, simplify, union) |
| **CRS Transforms** | No | Yes (`.to_crs()`) |
| **Visualization** | Basic plots | Geographic maps with plotly, matplotlib |
| **Use Case** | General tabular data | Geographic/mapping data with spatial analysis |
| **Inheritance** | — | GeoPandas extends Pandas; all pandas methods work |

### Quick Comparison Example
```python
# Pandas: Regular data
import pandas as pd
df = pd.read_csv("data.csv")
df.plot(x='lon', y='lat', kind='scatter')  # Just scatter plot of coordinates

# GeoPandas: Geographic data
import geopandas as gpd
gdf = gpd.read_file("data.shp")
gdf.plot()  # Proper map with coordinates as geometries
```

## Reading Geospatial Data

### Read Shapefile
```python
gdf = gpd.read_file("shape/MA_Roads.zip")
```
- Loads a shapefile (or compressed .zip) into a **GeoDataFrame**
- GeoDataFrame has a special `geometry` column containing geometric shapes

### Inspect Data
```python
gdf.head(3)              # View first rows
gdf.columns              # View all columns
gdf['column_name'].value_counts()  # Get value distribution
```

## Geometry Types

### Linear Data (1D)
- Roads, streets, rivers
- Stored as `LINESTRING` geometries
- Example: `LINESTRING (-70.19992 42.03922, -70.19986 42.03921, ...)`

### Area Data (2D)
- Counties, states, boundaries
- Stored as `POLYGON` geometries
- Example: `POLYGON ((-96.55516 41.91587, -96.55515 41.914, ...))`

## Coordinate Reference System (CRS)

### What is a CRS?
A **Coordinate Reference System (CRS)** defines how coordinates map to locations on Earth.

**Why it matters**: Different projections distort Earth differently. Using the wrong CRS can cause:
- Shapes to appear stretched or squeezed
- Distances to be inaccurate
- Poor alignment with other geographic data

### Common CRS Codes

| Code | Name | Type | Use Case |
|------|------|------|----------|
| **4326** | WGS84 (GPS) | Geographic | Web mapping, GPS coordinates (lat/lon) |
| **3857** | Web Mercator | Projected | Google Maps, Leaflet, OpenStreetMap |
| **2163** | US National Atlas Equal Area | Projected | US maps, equal area visualization |
| **3395** | World Mercator | Projected | Global web mapping |
| **2154** | France Lambert 93 | Projected | French maps |
| **27700** | British National Grid | Projected | UK maps |

### Check and Transform CRS
```python
# Check current CRS
print(gdf.crs)  # Output: EPSG:4326

# Transform to different CRS
gdf_transformed = gdf.to_crs(2163)  # Convert to US National Atlas

# Common transformation
gdf_web = gdf.to_crs(3857)  # For web mapping
```

### Geographic vs Projected CRS
| Type | Description | Units | Example |
|------|-------------|-------|---------|
| **Geographic** | Uses latitude/longitude | Degrees | EPSG:4326 (WGS84) |
| **Projected** | Flattened representation of Earth | Meters | EPSG:2163 (US National Atlas) |

**Key Difference**: 
- Use **geographic (4326)** for web services like Leaflet, Mapbox
- Use **projected (2163, 3857)** when you need accurate distances or equal-area visualization

## Visualization

### Basic Plot
```python
fig, ax = plt.subplots(figsize=(12, 12))
gdf.plot(ax=ax, color='black', linewidth=0.2)
ax.set_title("My Map")
```

### Change Coordinate Reference System (CRS)
```python
gdf.to_crs(2163).plot(ax=ax, color='lightblue', linewidth=0.2, edgecolor='darkblue')
```
- `to_crs()` transforms to a different projection before plotting
- Common projections: `2163` (US National Atlas Equal Area)

### Plotting with Attributes
```python
gdf['column_name'].value_counts().plot(kind="bar")
gdf['column_name'].value_counts().plot(kind="bar", logy=True)  # Log scale
```

## Simplifying Geometries

### Why Simplify?
Geospatial data often has thousands of coordinate points. Simplification:
- **Reduces file size** (can be 100-200x smaller)
- **Improves rendering speed** (fewer points = faster drawing)
- **Maintains visual accuracy** (removes unnecessary detail)

**Example**: US county boundaries with ~210 MB → simplified to ~1.1 MB (190x reduction)

### Basic Simplify
```python
gdf_simplified = gdf.simplify(tolerance=0.05, preserve_topology=True)
```

**Parameters**:
- **`tolerance`** (float): Distance threshold in CRS units
  - Smaller value = less simplification (more detail)
  - Larger value = more simplification (less detail)
  - Units depend on your CRS (degrees for geographic, meters for projected)
  - **Rule of thumb**: Start with `0.05` or `0.1` and adjust visually

- **`preserve_topology`** (bool, default `True`)
  - `True`: Keeps polygons valid and non-self-intersecting (slower but safer)
  - `False`: Faster but may create invalid geometries (not recommended)

**How it works**: Removes points that are within `tolerance` distance of the original line, keeping the overall shape intact.

```python
# Example: Simplify US counties with different tolerances
gdf_light = gdf.simplify(tolerance=0.05)    # Light simplification
gdf_medium = gdf.simplify(tolerance=0.1)    # Medium simplification  
gdf_heavy = gdf.simplify(tolerance=0.5)     # Heavy simplification
```

### Simplify While Preserving Properties
```python
# Problem: .simplify() removes all properties except geometry
gdf_simplified = gdf.simplify(tolerance=0.1)
# Result: Only geometry column remains, all other data lost!

# Solution: Copy then replace geometry
gdf_simplified_with_props = gdf.copy()
gdf_simplified_with_props.geometry = gdf.simplify(tolerance=0.1, preserve_topology=True)
# Result: Original properties retained, geometry simplified
```

### Choosing Tolerance Value

| Tolerance | Result | When to Use |
|-----------|--------|------------|
| 0.01 | Minimal simplification | Detail-heavy maps, zoomed-in views |
| 0.05 | Light simplification | Web maps with reasonable detail |
| 0.1 | Medium simplification | General-purpose web maps |
| 0.5+ | Heavy simplification | Small-scale overview maps |

**Tip**: Test different values and check file size to find the right balance

## Exporting Data

### Export to GeoJSON
```python
gdf.to_file("output.geojson", driver="GeoJSON")
```
- Standard format for web mapping
- Can be large (~210 MB for US counties unoptimized)
- Use simplified geometries for smaller files

### Export to TopoJSON
```python
topo = Topology(gdf).to_json()
with open('output.topojson', 'w') as f:
    json.dump(topo, f)
```
- More compact than GeoJSON
- Good for web mapping with D3.js or similar

### Export Simplified Data with Properties
```python
gdf_simplified = gdf.copy()
gdf_simplified.geometry = gdf.simplify(tolerance=0.1, preserve_topology=True)
gdf_simplified.to_file("output_simplified.geojson", driver="GeoJSON")
```

## Common Shapefile Attributes

### Roads Data (Linear)
- **LINEARID**: Unique identifier for road segments
- **MTFCC**: Feature type
  - `S1100`: Primary Road
  - `S1200`: Secondary Road
  - `S1400`: Local, Neighborhood, or Rural Road
- **RTTYP**: Route type
  - `I`: Interstate highway
  - `U`: U.S. highway
  - `S`: State highway
  - `M`: Main/major road
  - `C`: County or parish road
  - `O`: Other

### County Data (Area)
- **GEOID**: Unique geographic identifier
- **NAME**: County/feature name
- **STATEFP**: State FIPS code
- **ALAND**: Land area
- **AWATER**: Water area
- **INTPTLAT/INTPTLON**: Interior point coordinates

## Key Concepts

- **GeoDataFrame**: DataFrame with geometry column
- **CRS (Coordinate Reference System)**: Projection system for map coordinates
- **Geometry Simplification**: Reduces polygon/line complexity for faster rendering and smaller files
- **Tolerance**: Controls simplification level (units match the CRS)

## Performance Tips

- Simplify geometries before exporting for web use
- Use `to_crs()` when needed for specific projections
- Start with larger tolerance values and decrease if needed
- Use TopoJSON for significantly smaller file sizes
