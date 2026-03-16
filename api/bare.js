import { createBareServer } from "@tomphttp/bare-server-node";

const bare = createBareServer("/bare/");

export default async function handler(req, res) {
  try {
    if (bare.shouldRoute(req)) {
      return bare.routeRequest(req, res);
    }

    res.statusCode = 404;
    res.setHeader("content-type", "application/json");
    res.end(JSON.stringify({ error: "Not found" }));
  } catch (err) {
    res.statusCode = 500;
    res.setHeader("content-type", "application/json");
    res.end(
      JSON.stringify({
        error: "Bare server error",
        message: err?.message || "Unknown error"
      })
    );
  }
}
