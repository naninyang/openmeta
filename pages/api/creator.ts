import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import cheerio from 'cheerio';
import ogs from 'open-graph-scraper';

async function fetchOwnerAvatar(ownerUrl: string) {
  const options = { url: ownerUrl };
  try {
    const { result } = await ogs(options);
    const ownerAvatar = result.ogImage?.[0]?.url;
    return ownerAvatar;
  } catch (error) {
    console.error('Error fetching owner avatar with ogs:', error);
    return null;
  }
}
async function fetchPressAvatar(pressUrl: string) {
  const options = { url: pressUrl };
  try {
    const { result } = await ogs(options);
    const pressAvatar = result.ogImage?.[0]?.url;
    return pressAvatar;
  } catch (error) {
    console.error('Error fetching press avatar with ogs:', error);
    return null;
  }
}
async function fetchOpenGraphData(url: string) {
  const response = await axios.get(url);
  const $ = cheerio.load(response.data);
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
  const datePublished = $('meta[itemprop="datePublished"]').attr('content');
  const dateTime = $('span.media_end_head_info_datestamp_time').attr('data-date-time');
  const ownerUrl = $('link[itemprop="url"][href^="http://www.youtube.com/@"]').attr('href');
  const ownerName = $('link[itemprop="name"]').attr('content');
  const pressUrl = $('a[class="media_end_linked_more_link"]').attr('href');

  let ownerAvatar = null;
  let pressAvatar = null;

  if (ownerUrl) {
    ownerAvatar = await fetchOwnerAvatar(ownerUrl);
  }
  if (pressUrl) {
    pressAvatar = await fetchPressAvatar(pressUrl);
  }

  const dateObject = dateTime && new Date(dateTime + 'Z');
  let isoDateTime = dateObject && dateObject.toISOString();
  const koreaOffset = 9;
  let koreaTime = dateObject && new Date(dateObject.getTime() + koreaOffset * 60 * 60 * 1000);
  isoDateTime = koreaTime && koreaTime.toISOString().replace('.000', '');
  const pressPublished = isoDateTime;

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
    datePublished,
    ownerUrl,
    ownerName,
    ownerAvatar,
    pressAvatar,
    pressPublished,
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
      datePublished: rawData.datePublished,
      ownerUrl: rawData.ownerUrl,
      ownerName: rawData.ownerName,
      ownerAvatar: rawData.ownerAvatar,
      pressAvatar: rawData.pressAvatar,
      pressPublished: rawData.pressPublished,
    };
    return res.status(200).json(filteredData);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch data' });
  }
}
