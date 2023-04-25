import { request } from "../../utils/commonUrl";

export default async function handler(req, res) {
  try {
    const data = await request({ url: `title/get-most-popular-movies` });

    res.status(200).json({ data });
  } catch (err) {
    res.status(500).json(`Error during fetching movies`);
    throw new Error();
  }
}