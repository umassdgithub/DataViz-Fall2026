// Saves every post's time, hashtags and text to a file, one JSON object per line (the "JSON Lines" format):
//
//   {"time":1764012345678,"tags":["nba","basketball"],"text":"Great game tonight #nba #basketball"}
//   {"time":1764012345912,"tags":["photography"],"text":"Morning light #photography"}
//
// Only the time, the hashtags and the post text are saved: no user names, no account IDs.

import fs from "node:fs";

const FOLDER = import.meta.dirname + "/../data";
const FILE = FOLDER + "/posts.jsonl";

fs.mkdirSync(FOLDER, { recursive: true });

// Open the file once, in "append" mode, so new lines are added at the end
const file = fs.createWriteStream(FILE, { flags: "a" });

export function savePost(post) {
    file.write(JSON.stringify(post) + "\n");
}

// Read back the posts saved after a given time (used when the server starts)
export function loadPostsSince(time) {
    if (!fs.existsSync(FILE)) return [];
    return fs.readFileSync(FILE, "utf8")
        .split("\n")
        .filter(line => line !== "")
        .map(line => JSON.parse(line))
        .filter(post => post.time >= time);
}
