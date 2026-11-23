# ThreeJS

## Initiating a Scene and adding Geometry and Controller

### How to run the examples

Open each example through a local web server instead of double-clicking the HTML file.
Examples 03 and 04 load their data with `d3.tsv(...)`, and Example 05 with `fetch(...)`. Browsers block these requests
for pages opened straight from disk (`file://`), so the page stays blank.

Use either of these:

- **VS Code Live Server:** install the *Live Server* extension, right-click `index.html`,
  and choose **Open with Live Server**.
- **Python:** in a terminal, go to this week's folder and run

  ```bash
  python3 -m http.server 8000
  ```

  then open `http://localhost:8000/` in the browser and click an example folder.

### Three.js version

These examples use **Three.js r122**, which is saved in each example's `libs` folder.
Newer versions of Three.js have changed some of the code shown here:
`THREE.OrbitControls` is no longer a global and must be imported as an ES module, and the
older `...BufferGeometry` names (such as `SphereBufferGeometry`) were removed.
The code in this week's examples uses names that also exist in newer versions
(such as `SphereGeometry`), but if you copy it into a project that uses the newest
Three.js, load `OrbitControls` the way the current Three.js documentation shows.

### The main parts of a ThreeJS visualization

The basic ThreeJS visualization contains the following main parts:

1. **Initiate the Scene Object**  
   Create a new instance of the Scene Object.

   ```js
   const scene = new THREE.Scene();
   ```

2. **New Instance of the Camera**  
   Create a new instance of the PerspectiveCamera.

   ```js
   const camera = new THREE.PerspectiveCamera(60, 1, 1, 1000);
   ```

3. **Set the Position of the Camera**  
   Define the camera's position in the space.

   ```js
   camera.position.z = 25;
   ```

4. **Set the Light**  
   Configure and position the PointLight.

   ```js
   const light = new THREE.PointLight(0xffffff, 1);
   light.position.set(50, 50, 50);
   scene.add(light);
   ```

5. **Create the Geometry**  
   Create a new SphereGeometry instance: a sphere with radius 1, built from
   32 horizontal and 32 vertical segments (more segments make a smoother sphere).

   ```js
   const geometry = new THREE.SphereGeometry(1, 32, 32);
   ```

6. **Initiate the Material for the Geometry**  
   Define the material properties.

   ```js
   const meshColor = "#ff9999";
   const material = new THREE.MeshPhongMaterial({ color: meshColor, shininess: 100 });
   ```

7. **Generate the Mesh for the Geometry**  
   Create the mesh using the defined geometry and material.

   ```js
   let mesh = new THREE.Mesh(geometry, material);
   ```

8. **Locate the Geometry's Mesh in the Space**  
   Set the position and rotation of the mesh.

   ```js
   const x = 0, y = 0, z = 0;
   mesh.position.set(x, y, z);
   mesh.rotation.set(0, 0, 0);
   ```

9. **Add the Mesh to the Scene**  
   Include the mesh in the scene.

   ```js
   scene.add(mesh);
   ```

10. **Initiate a Renderer**  
    Configure the WebGLRenderer.

    ```js
    let renderer = new THREE.WebGLRenderer({ antialias: true });
    ```

11. **Set Space Color**  
    Define the background color of the space.

    ```js
    const spaceColor = "#f5f5f5";
    renderer.setClearColor(spaceColor);
    renderer.setSize(512, 512);
    ```

12. **Add Controller to the Renderer**  
    Integrate OrbitControls for interaction.

    ```js
    let controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableZoom = true;
    ```

13. **Append the Renderer to the Body**  
    Attach the rendering canvas to the document body.

    ```js
    document.body.appendChild(renderer.domElement);
    ```

14. **Render Scene and Camera**  
    Create the animate function for rendering.

    ```js
    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }
    animate();
    ```
## AI Usage Disclaimer

All the examples in this repository are hand made (without use of AI). However, AI is used for the styling, editing readme files and fixing of the typos and errors.