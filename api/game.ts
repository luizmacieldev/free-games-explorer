export default async function handler(req, res) {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const id = url.searchParams.get("id");

    const response = await fetch(
      `https://www.freetogame.com/api/game?id=${id}`
    );

    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch game details" });
  }
}