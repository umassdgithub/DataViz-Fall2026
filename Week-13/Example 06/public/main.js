// The network part follows Week 8, Example 8.7 (Week-8-ForceSimulator/Example 8.7/network.js).
// The difference: the data changes every 2 seconds, so the nodes and links are joined again in update().

const svg = d3.select("svg");
const width = svg.node().clientWidth;
const height = svg.node().clientHeight;

const main_group = svg.append("g");

const link_group = main_group.append("g")
    .attr("transform", `translate(${width / 2},${height / 2})`);
const node_group = main_group.append("g")
    .attr("transform", `translate(${width / 2},${height / 2})`);

let link_elements = link_group.selectAll("line");
let node_elements = node_group.selectAll("g");

// Circle size grows with the number of posts that used the tag
const radius = d => 4 + Math.sqrt(d.count) * 2;

const ForceSimulation = d3.forceSimulation()
    // Keep at least 10 px of space around every circle, so circles and labels don't overlap
    .force("collide", d3.forceCollide().radius(d => radius(d) + 10).iterations(2))
    .force("x", d3.forceX())
    .force("y", d3.forceY())
    .force("charge", d3.forceManyBody().strength(-40))
    .force("link", d3.forceLink().id(d => d.id).distance(50))
    .on("tick", ticked);

let nodes = [];

function update(graph) {
    d3.select("#status").text(
        `${graph.posts} posts with hashtags · ${graph.nodes.length} tags · ${graph.links.length} links`);

    // Keep the position of tags that are already on screen, so they don't jump
    const old = new Map(nodes.map(d => [d.id, d]));
    nodes = graph.nodes.map(d => Object.assign(old.get(d.id) ?? {}, d));
    const links = graph.links.map(d => ({ ...d }));

    link_elements = link_group.selectAll("line")
        .data(links, d => d.source + "|" + d.target)
        .join("line")
        .style("stroke-width", d => Math.sqrt(d.count));

    node_elements = node_group.selectAll("g")
        .data(nodes, d => d.id)
        .join(enter => {
            const g = enter.append("g")
                .call(drag)
                .on("mouseover", showTooltip)
                .on("mousemove", moveTooltip)
                .on("mouseout", hideTooltip);
            g.append("circle");
            g.append("text").attr("class", "label").attr("dy", "0.35em").text(d => "#" + d.id);
            return g;
        });
    node_elements.select("circle").attr("r", radius);
    // The label grows with its circle, and starts just past the circle's edge
    node_elements.select("text")
        .attr("dx", d => radius(d) + 3)
        .style("font-size", d => Math.max(9, radius(d) * 0.9) + "px");

    ForceSimulation.nodes(nodes);
    ForceSimulation.force("link").links(links);
    ForceSimulation.alpha(0.3).restart();
}

function ticked() {
    // Keep every node inside the screen (the groups are centered, so x goes from -width/2 to width/2)
    for (const d of nodes) {
        d.x = Math.max(-width / 2 + 10, Math.min(width / 2 - 70, d.x));
        d.y = Math.max(-height / 2 + 10, Math.min(height / 2 - 10, d.y));
    }

    node_elements
        .attr("transform", d => `translate(${d.x},${d.y})`);
    link_elements
        .attr("x1", d => d.source.x)
        .attr("x2", d => d.target.x)
        .attr("y1", d => d.source.y)
        .attr("y2", d => d.target.y);
}

// Tooltip: a <div> that shows the tag, its count and its latest posts
const tooltip = d3.select("body").append("div").attr("class", "tooltip");

function showTooltip(event, d) {
    tooltip.html("");   // empty it, then add the new content
    tooltip.append("strong").text(`#${d.id}: ${d.count} posts`);
    for (const text of d.posts ?? []) {
        tooltip.append("p").text(text);   // .text(), not .html(): post text is shown as plain text
    }
    tooltip.style("display", "block");
    moveTooltip(event);
}

function moveTooltip(event) {
    // Show it to the right of the mouse, or to the left when the mouse is in the right half of the page
    const left = event.pageX < window.innerWidth / 2 ? event.pageX + 15 : event.pageX - 15 - tooltip.node().offsetWidth;
    tooltip.style("left", left + "px").style("top", event.pageY + 15 + "px");
}

function hideTooltip() {
    tooltip.style("display", "none");
}

// Zoom and pan: the same code as Example 8.7
svg.call(d3.zoom()
    .extent([[0, 0], [width, height]])
    .scaleExtent([1, 8])
    .on("zoom", zoomed));
function zoomed({transform}) {
    main_group.attr("transform", transform);
}

// Drag: hold a node where the mouse is (fx, fy), and let it go at the end
const drag = d3.drag()
    .on("start", (event, d) => { ForceSimulation.alphaTarget(0.3).restart(); d.fx = d.x; d.fy = d.y; })
    .on("drag", (event, d) => { d.fx = event.x; d.fy = event.y; })
    .on("end", (event, d) => { ForceSimulation.alphaTarget(0); d.fx = null; d.fy = null; });

// Get a new graph from the server every 2 seconds
const stream = new EventSource("/api/stream");
stream.onmessage = (event) => update(JSON.parse(event.data));
stream.onerror = () => d3.select("#status").text("Connection lost, retrying…");
