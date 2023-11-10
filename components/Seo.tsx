import Head from 'next/head';
import { useRouter } from 'next/router';

interface Props {
  pageTitle?: string;
  pageDescription?: string;
  pageImg?: string;
  pageImgWidth?: number;
  pageImgHeight?: number;
  pageOgType?: string;
}

const Seo = ({ pageTitle, pageDescription, pageImg, pageImgWidth, pageImgHeight, pageOgType }: Props) => {
  const router = useRouter();
  const pagePath = router.asPath;
  const domain = 'https://openmeta.dev1stud.io';

  const defaultTitle = '오픈메타 openmeta';
  const defaultDescription = 'META && OPENGRAPH';
  const title = pageTitle ? `${pageTitle} - ${defaultTitle}` : null;
  const finTitle = title || defaultTitle;
  const ogTitle = pageTitle || defaultTitle;
  const description = pageDescription || defaultDescription;
  const url = `${domain}${pagePath}`;
  const defaultImg = `${domain}/images/og-image.png`;
  const imgUrl = pageImg || defaultImg;
  const imgWidth = pageImgWidth || 1280;
  const imgHeight = pageImgHeight || 630;
  const ogType = pageOgType || 'website';

  return (
    <Head>
      <title>{finTitle}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="description" content={description} />
      <meta property="og:locale" content="ko_KR" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:site_name" content={defaultTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={imgUrl} />
      <meta property="og:image:width" content={String(imgWidth)} />
      <meta property="og:image:height" content={String(imgHeight)} />
      <link rel="canonical" href={url} />
      <link rel="alternate" href={url} hrefLang="ko-KR" />
    </Head>
  );
};

export default Seo;
