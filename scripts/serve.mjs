import { createReadStream, existsSync } from "node:fs";
import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const port = Number(process.env.PORT || 4173);
const mime = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".svg": "image/svg+xml", ".png": "image/png", ".ico": "image/x-icon", ".xml": "application/xml; charset=utf-8", ".txt": "text/plain; charset=utf-8", ".webmanifest": "application/manifest+json; charset=utf-8" };

createServer((req, res) => {
  const requested = decodeURIComponent((req.url || "/").split("?")[0]);
  const normalized = path.posix.normalize(requested).replace(/^\/+/, "");
  const target = path.resolve(dist, normalized || "index.html");
  if (!target.startsWith(`${dist}${path.sep}`) || !existsSync(target)) {
    res.writeHead(404, { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" });
    createReadStream(path.join(dist, "404.html")).pipe(res);
    return;
  }
  res.writeHead(200, { "Content-Type": mime[path.extname(target)] || "application/octet-stream", "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" });
  createReadStream(target).pipe(res);
}).listen(port, "127.0.0.1", () => console.log(`Static preview listening at http://127.0.0.1:${port}`));
