import express from "express";
import { connect } from "./lib/jetstream.js";
import { addPost, getGraph } from "./lib/graph.js";

const PORT = process.env.PORT ?? 3000;
const app = express();

// The page and its script
app.use(express.static(import.meta.dirname + "/public"));

// One snapshot of the graph
app.get("/api/graph", (req, res) => res.json(getGraph()));

// Live updates: the browser keeps this request open and gets a new graph every 2 seconds
// (Server-Sent Events)
const clients = new Set();
app.get("/api/stream", (req, res) => {
    res.set({ "Content-Type": "text/event-stream", "Cache-Control": "no-cache", Connection: "keep-alive" });
    res.flushHeaders();
    clients.add(res);
    req.on("close", () => clients.delete(res));
});

setInterval(() => {
    const data = `data: ${JSON.stringify(getGraph())}\n\n`;
    for (const res of clients) res.write(data);
}, 2000);

// One connection to Bluesky, shared by every browser
connect(addPost);

app.listen(PORT, () => console.log(`Open http://localhost:${PORT}`));
