import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import iconv from 'iconv-lite';
import cheerio from 'cheerio';

async function fetchOpenGraphData(url: string) {
  const response = await axios.get(url, { responseType: 'arraybuffer' });
  const html = iconv.decode(response.data, 'UTF-8');
  const $$ = cheerio.load(html);
  const contentType = $$('meta[http-equiv="Content-Type"]').attr('content');
  const charset = contentType?.includes('charset=') ? contentType.split('charset=')[1] : 'UTF-8';

  let data = iconv.decode(response.data, charset);

  let $ = cheerio.load(data);
  const ogUrl = $('meta[property="og:url"]').attr('content') || $('meta[name="url"]').attr('content');
  const ogTitle = $('meta[property="og:title"]').attr('content') || $('title').html();
  const ogDescription =
    $('meta[property="og:description"]').attr('content') || $('meta[name="description"]').attr('content');
  const ogType = $('meta[property="og:type"]').attr('content');
  const ogImage =
    $('meta[property="og:image:secure_url"]').attr('content') || $('meta[property="og:image"]').attr('content');
  const ogArticleAuthor =
    $('meta[property="og:article:author"]').attr('content') || $('meta[name="author"]').attr('content');
  const ogSiteName = $('meta[property="og:site_name"]').attr('content');
  const twitterCard = $('meta[name="twitter:card"]').attr('content');
  const twitterSite = $('meta[name="twitter:site"]').attr('content');
  const twitterTitle = $('meta[name="twitter:title"]').attr('content');
  const twitterCreator = $('meta[name="twitter:creator"]').attr('content');
  const twitterImage = $('meta[name="twitter:image"]').attr('content');
  const twitterDescription = $('meta[name="twitter:description"]').attr('content');
  return {
    ogUrl,
    ogTitle,
    ogDescription,
    ogType,
    ogImage,
    ogArticleAuthor,
    ogSiteName,
    twitterCard,
    twitterSite,
    twitterTitle,
    twitterCreator,
    twitterImage,
    twitterDescription,
  };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url } = req.query;

  try {
    const rawData = await fetchOpenGraphData(url as string);

    const filteredData = {
      ogTitle: rawData.ogTitle,
      ogDescription: rawData.ogDescription,
      ogUrl: rawData.ogUrl,
      ogImage: rawData.ogImage,
      ogCreator: rawData.ogArticleAuthor,
      ogSiteName: rawData.ogSiteName,
      ogType: rawData.ogType,
      twitterCard: rawData.twitterCard,
      twitterSite: rawData.twitterSite,
      twitterTitle: rawData.twitterTitle,
      twitterCreator: rawData.twitterCreator,
      twitterImage: rawData.twitterImage,
      twitterDescription: rawData.twitterDescription,
    };

    return res.status(200).json(filteredData);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch data' });
  }
}
