import { NextApiRequest, NextApiResponse } from "next";
import ogs from "open-graph-scraper";

async function fetchOpenGraphData(url: string) {
  const data = await ogs({ url });
  if (data.error) {
    throw new Error(data.result.error);
  }
  return data.result;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { url } = req.query;

  try {
    const rawData = await fetchOpenGraphData(url as string);

    const filteredData = {
      ogTitle: rawData.ogTitle,
      ogDescription: rawData.ogDescription,
      ogUrl: rawData.ogUrl,
      ogImage: rawData.ogImage ? rawData.ogImage[0].url : null,
      ogCreator: rawData.ogArticleAuthor,
      ogSiteName: rawData.ogSiteName,
    };

    return res.status(200).json(filteredData);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch data" });
  }
}
