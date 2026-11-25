// Keeps the hashtags of the posts from the last 5 minutes and turns them into a graph.

import { savePost, loadPostsSince } from "./storage.js";

const WINDOW_MS = 5 * 60 * 1000;   // 5 minutes
const MAX_NODES = 60;              // send only the 60 most used tags
const POSTS_PER_TAG = 10;          // the latest posts sent with each tag, shown when you hover it

// Tags that are never shown in the network.
const BLOCKLIST = new Set([]);   // for example: new Set(["tag1", "tag2"])

// Start with the posts of the last 5 minutes that are already in the file, so a restart doesn't empty the graph
let posts = loadPostsSince(Date.now() - WINDOW_MS);   // [{ time, tags, text }]
console.log(`Loaded ${posts.length} posts from data/posts.jsonl`);

export function addPost(tags, text) {
    tags = tags.filter(tag => !BLOCKLIST.has(tag));
    if (tags.length === 0) return;

    const post = { time: Date.now(), tags, text };
    posts.push(post);   // in memory: used for the graph
    savePost(post);     // in the file: kept after the server stops
}

export function getGraph() {
    // Forget posts older than 5 minutes
    const cutoff = Date.now() - WINDOW_MS;
    posts = posts.filter(post => post.time >= cutoff);

    // Node size: how many posts used each tag
    const counts = new Map();
    for (const post of posts) {
        for (const tag of post.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }

    const nodes = [...counts]
        .sort((a, b) => b[1] - a[1])
        .slice(0, MAX_NODES)
        .map(([id, count]) => ({ id, count }));
    const shown = new Set(nodes.map(node => node.id));

    // The latest posts of each tag: go through the posts from newest to oldest
    for (const node of nodes) node.posts = [];
    const byId = new Map(nodes.map(node => [node.id, node]));
    for (let i = posts.length - 1; i >= 0; i--) {
        for (const tag of posts[i].tags) {
            const node = byId.get(tag);
            if (node && node.posts.length < POSTS_PER_TAG && posts[i].text) node.posts.push(posts[i].text);
        }
    }

    // Link width: how many posts used both tags
    const pairs = new Map();
    for (const post of posts) {
        const tags = post.tags.filter(tag => shown.has(tag)).sort();
        for (let i = 0; i < tags.length; i++) {
            for (let j = i + 1; j < tags.length; j++) {
                const key = tags[i] + "|" + tags[j];
                pairs.set(key, (pairs.get(key) ?? 0) + 1);
            }
        }
    }
    const links = [...pairs].map(([key, count]) => {
        const [source, target] = key.split("|");
        return { source, target, count };
    });

    return { posts: posts.length, nodes, links };
}
