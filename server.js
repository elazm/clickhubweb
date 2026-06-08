const fs = require("fs");
const http = require("http");
const path = require("path");

const root = __dirname;
const preferredPort = Number(process.env.PORT) || 3000;

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".gif": "image/gif",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp"
};

function resolveRequestPath(urlPath) {
  const decodedPath = decodeURIComponent(urlPath.split("?")[0]);
  const normalizedPath = decodedPath === "/" ? "/clickhub_website.html" : decodedPath;
  const filePath = path.resolve(root, `.${normalizedPath}`);
  const relativePath = path.relative(root, filePath);

  if (relativePath.startsWith("..") || path.isAbsolute(relativePath)) {
    return null;
  }

  return filePath;
}

const server = http.createServer((request, response) => {
  const filePath = resolveRequestPath(request.url || "/");

  if (!filePath) {
    response.writeHead(403, { "content-type": "text/plain; charset=utf-8" });
    response.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (error, contents) => {
    if (error) {
      response.writeHead(error.code === "ENOENT" ? 404 : 500, {
        "content-type": "text/plain; charset=utf-8"
      });
      response.end(error.code === "ENOENT" ? "Not found" : "Server error");
      return;
    }

    const contentType = mimeTypes[path.extname(filePath).toLowerCase()] || "application/octet-stream";
    response.writeHead(200, { "content-type": contentType });
    response.end(contents);
  });
});

let currentPort = preferredPort;
let attemptsLeft = 10;

server.on("error", (error) => {
  if (error.code === "EADDRINUSE" && attemptsLeft > 0) {
    const nextPort = currentPort + 1;
    attemptsLeft -= 1;
    console.log(`Port ${currentPort} is already in use. Trying ${nextPort}...`);
    listen(nextPort);
    return;
  }

  throw error;
});

server.on("listening", () => {
  const address = server.address();
  const port = typeof address === "object" && address ? address.port : currentPort;
  console.log(`Clickhub preview running at http://localhost:${port}`);
});

function listen(port) {
  currentPort = port;
  server.listen(port);
}

listen(currentPort);
