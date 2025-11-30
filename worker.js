export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    // First, try to serve static asset
    const out = await env.ASSETS.fetch(request);
    if (out.status !== 404) {
      return out;
    }
    // If not asset, return index.html (for SPA routing)
    const res = await env.ASSETS.fetch(new Request(new URL("index.html", request.url).toString(), request));
    return new Response(await res.text(), {
      headers: { "Content-Type": "text/html" }
    });
  }
};
