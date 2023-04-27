import { request } from "../../utils/common";

export default async function handler(req, res) {
  try {
    const { genre } = req.query;
    const { data } = await request({
      url: `title/v2/get-popular-movies-by-genre`,
      params: {
        genre,
      },
    });

    if (data) return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    return res.status(500).end().json(`Error during fetching movies`);
  }
}
