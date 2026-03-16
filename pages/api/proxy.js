import { Scramjet } from "@petezah-games/scramjet";

export default async function handler(req, res) {
  const url = req.query.url;
  if (!url) {
    res.status(400).send("Missing 'url' query parameter");
    return;
  }

  try {
    // fetch the target URL via Scramjet
    const response = await Scramjet.fetch(url);
    const contentType = response.headers.get("content-type") || "text/html";
    const text = await response.text();

    res.setHeader("Content-Type", contentType);
    res.status(200).send(text);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error proxying URL: " + err.message);
  }
}
