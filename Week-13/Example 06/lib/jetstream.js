// Connects to Bluesky's Jetstream and calls onPost(tags, text) for every new post that has hashtags.
// Only the hashtags and the post text are passed on: no handles or account IDs.

const URL = "wss://jetstream2.us-east.bsky.network/subscribe?wantedCollections=app.bsky.feed.post";

export function connect(onPost) {
    const ws = new WebSocket(URL);   // built into Node 22+

    ws.onopen = () => console.log("Connected to Jetstream");

    ws.onmessage = (message) => {
        const event = JSON.parse(message.data);

        // Keep only newly created posts
        if (event.kind !== "commit" || event.commit.operation !== "create") return;

        const tags = getHashtags(event.commit.record);
        if (tags.length > 0) onPost(tags, event.commit.record.text);
    };

    // If the connection drops, wait 3 seconds and connect again
    ws.onclose = () => {
        console.log("Jetstream connection closed, reconnecting in 3 s");
        setTimeout(() => connect(onPost), 3000);
    };
    ws.onerror = () => ws.close();
}

// A post stores its hashtags as "facets": ranges of the text with a feature of type ...#tag
function getHashtags(record) {
    const tags = new Set();
    for (const facet of record.facets ?? []) {
        for (const feature of facet.features ?? []) {
            if (feature.$type === "app.bsky.richtext.facet#tag") {
                tags.add(feature.tag.toLowerCase());
            }
        }
    }
    return [...tags];
}
