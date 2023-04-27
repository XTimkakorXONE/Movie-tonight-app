import { request } from "../../utils/common";

export default async function handler(req, res) {
  try {
    const { props } = req.query;

    const { data } = await request({
      url: `title/v2/find`,
      params: {
        props,
      },
    });

    if (data) res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json(`Error during searching`);
  }
}
