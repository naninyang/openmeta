import { NextApiRequest, NextApiResponse } from "next";
import puppeteer from "puppeteer";

async function fetchOpenGraphData(url: string) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "domcontentloaded" });

  const data = await page.evaluate(() => {
    const ogTags = document.querySelectorAll('meta[property^="og:"]');
    const result: { [key: string]: string } = {};

    ogTags.forEach((tag) => {
      const property = tag.getAttribute("property");
      const content = tag.getAttribute("content");
      if (property && content) {
        result[property] = content;
      }
    });

    return result;
  });

  await browser.close();
  return data;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { url } = req.body;
    try {
      const ogData = await fetchOpenGraphData(url);
      res.status(200).json(ogData);
    } catch (error) {
      res.status(500).json({
        error: "Failed to fetch OpenGraph data",
        details: error.message,
      });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
