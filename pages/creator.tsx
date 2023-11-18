import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { useMediaQuery } from 'react-responsive';
import { images } from '@/images';
import Seo from '@/components/Seo';
import styled from '@emotion/styled';
import styles from '@/styles/home.module.sass';
import AnchorLink from '@/components/AnchorLink';

type OpengraphData = {
  ogTitle: string;
  ogDescription: string;
  ogUrl?: string;
  ogImage?: string;
  ogCreator?: string;
  ogSiteName?: string;
  ogType?: string;
  twitterCard?: string;
  twitterSite?: string;
  twitterTitle?: string;
  twitterCreator?: string;
  twitterImage?: string;
  twitterDescription?: string;
  datePublished?: string;
  ownerUrl?: string;
  ownerName?: string;
  ownerAvatar?: string;
  pressAvatar?: string;
  pressPublished?: string;
};

const Caution = styled.i({
  background: `url(${images.caution}) no-repeat 50% 50%/contain`,
});

const Logotypo = styled.i({
  background: `url(${images.logotypo}) no-repeat 50% 50%/contain`,
});

const Notice = styled.i({
  background: `url(${images.notice}) no-repeat 50% 50%/contain`,
});

const Search = styled.i({
  background: `url(${images.search}) no-repeat 50% 50%/contain`,
});

export function useDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);
  const desktop = useMediaQuery({ query: '(min-width: 992px)' });
  useEffect(() => {
    setIsDesktop(desktop);
  }, [desktop]);
  return isDesktop;
}

export default function Creator() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [opengraphData, setOpengraphData] = useState<OpengraphData | null>(null);
  const [isActive, setIsActive] = useState(true);
  const isDesktop = useDesktop();

  const toggleActive = () => {
    setIsActive(!isActive);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`/api/creator?url=${encodeURIComponent(url)}`);
      setOpengraphData(response.data);
    } catch (error) {
      //  console.error('Error fetching Opengraph data:', error);
      setError(
        `<p>데이터를 불러오는데 실패했습니다.</p><p>URL에 오타가 있거나 검색하고자 하는 서버 혹은 페이지에 오류가 있을 수 있습니다.</p>`,
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Seo />
      <main className={styles.openmeta}>
        <h1>
          <span>오픈메타 : 메타앤오픈그래프 (링크미리보기)</span>
          <Logotypo />
        </h1>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>주소 입력</legend>
            <label htmlFor="url">URL</label>
            <input
              id="url"
              type="url"
              value={url}
              autoComplete="url"
              onChange={(e) => setUrl(e.target.value)}
              placeholder={`${isDesktop ? 'http 또는 https를 포함한 주소를 입력해 주세요' : '주소 입력'}`}
              required
            />
            <button type="submit">
              <span>검색하기</span>
              <Search />
            </button>
          </fieldset>
        </form>
        {loading && (
          <p className={styles.loading}>
            <span>로딩 중</span>
            <i />
          </p>
        )}
        {error && <p className={styles.error} dangerouslySetInnerHTML={{ __html: error }} />}
        {!loading && !error && opengraphData && (
          <div className={styles.og}>
            <nav>
              <ul>
                <li>
                  <button
                    type="button"
                    className={`${isActive ? styles.active : ''}`}
                    onClick={toggleActive}
                    disabled={isActive}
                  >
                    미리보기
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className={`${!isActive ? styles.active : ''}`}
                    onClick={toggleActive}
                    disabled={!isActive}
                  >
                    Raw Data
                  </button>
                </li>
              </ul>
            </nav>
            {isActive ? (
              <div className={styles['og-preview']}>
                {opengraphData.ogImage && (
                  <div className={styles.thumbnail}>
                    <Image src={opengraphData.ogImage} width="166" height="82" alt="" unoptimized priority />
                  </div>
                )}
                <div className={styles.ogInfo}>
                  {opengraphData.ogCreator && <cite>{opengraphData.ogCreator}</cite>}
                  <h2>{opengraphData.ogTitle}</h2>
                  <p>{opengraphData.ogDescription}</p>
                </div>
              </div>
            ) : (
              <div className={styles['og-raw']}>
                <div>
                  <span className={styles.operator}>{'{'}</span>
                </div>
                <div>
                  <span className={styles.props}>ogTitle</span>
                  <span className={styles.operator}>:</span>{' '}
                  <span className={styles.value}>{opengraphData.ogTitle}</span>
                </div>
                <div>
                  <span className={styles.props}>ogDescription</span>
                  <span className={styles.operator}>:</span>{' '}
                  <span className={styles.value}>{opengraphData.ogDescription}</span>
                </div>
                {opengraphData.ogUrl && (
                  <div>
                    <span className={styles.props}>ogUrl</span>
                    <span className={styles.operator}>:</span>{' '}
                    <span className={styles.value}>{opengraphData.ogUrl}</span>
                  </div>
                )}
                {opengraphData.ogImage && (
                  <div>
                    <span className={styles.props}>ogImage</span>
                    <span className={styles.operator}>:</span>{' '}
                    <span className={styles.value}>{opengraphData.ogImage}</span>
                  </div>
                )}
                {opengraphData.ogCreator && (
                  <div>
                    <span className={styles.props}>ogCreator</span>
                    <span className={styles.operator}>:</span>{' '}
                    <span className={styles.value}>{opengraphData.ogCreator}</span>
                  </div>
                )}
                {opengraphData.ogSiteName && (
                  <div>
                    <span className={styles.props}>ogSiteName</span>
                    <span className={styles.operator}>:</span>{' '}
                    <span className={styles.value}>{opengraphData.ogSiteName}</span>
                  </div>
                )}
                {opengraphData.ogType && (
                  <div>
                    <span className={styles.props}>ogType</span>
                    <span className={styles.operator}>:</span>{' '}
                    <span className={styles.value}>{opengraphData.ogType}</span>
                  </div>
                )}
                {opengraphData.twitterCard && (
                  <div>
                    <span className={styles.props}>twitterCard</span>
                    <span className={styles.operator}>:</span>{' '}
                    <span className={styles.value}>{opengraphData.twitterCard}</span>
                  </div>
                )}
                {opengraphData.twitterSite && (
                  <div>
                    <span className={styles.props}>twitterSite</span>
                    <span className={styles.operator}>:</span>{' '}
                    <span className={styles.value}>{opengraphData.twitterSite}</span>
                  </div>
                )}
                {opengraphData.twitterTitle && (
                  <div>
                    <span className={styles.props}>twitterTitle</span>
                    <span className={styles.operator}>:</span>{' '}
                    <span className={styles.value}>{opengraphData.twitterTitle}</span>
                  </div>
                )}
                {opengraphData.twitterCreator && (
                  <div>
                    <span className={styles.props}>twitterCreator</span>
                    <span className={styles.operator}>:</span>{' '}
                    <span className={styles.value}>{opengraphData.twitterCreator}</span>
                  </div>
                )}
                {opengraphData.twitterImage && (
                  <div>
                    <span className={styles.props}>twitterImage</span>
                    <span className={styles.operator}>:</span>{' '}
                    <span className={styles.value}>{opengraphData.twitterImage}</span>
                  </div>
                )}
                {opengraphData.twitterDescription && (
                  <div>
                    <span className={styles.props}>twitterDescription</span>
                    <span className={styles.operator}>:</span>{' '}
                    <span className={styles.value}>{opengraphData.twitterDescription}</span>
                  </div>
                )}
                {opengraphData.datePublished && (
                  <div>
                    <span className={styles.props}>datePublished</span>
                    <span className={styles.operator}>:</span>{' '}
                    <span className={styles.value}>{opengraphData.datePublished}</span>
                  </div>
                )}
                {opengraphData.pressPublished && (
                  <div>
                    <span className={styles.props}>pressPublished</span>
                    <span className={styles.operator}>:</span>{' '}
                    <span className={styles.value}>{opengraphData.pressPublished}</span>
                  </div>
                )}
                {opengraphData.ownerUrl && (
                  <div>
                    <span className={styles.props}>ownerUrl</span>
                    <span className={styles.operator}>:</span>{' '}
                    <span className={styles.value}>{opengraphData.ownerUrl}</span>
                  </div>
                )}
                {opengraphData.ownerName && (
                  <div>
                    <span className={styles.props}>ownerName</span>
                    <span className={styles.operator}>:</span>{' '}
                    <span className={styles.value}>{opengraphData.ownerName}</span>
                  </div>
                )}
                {opengraphData.ownerAvatar && (
                  <div>
                    <span className={styles.props}>ownerAvatar</span>
                    <span className={styles.operator}>:</span>{' '}
                    <span className={styles.value}>{opengraphData.ownerAvatar}</span>
                  </div>
                )}
                {opengraphData.pressAvatar && (
                  <div>
                    <span className={styles.props}>pressAvatar</span>
                    <span className={styles.operator}>:</span>{' '}
                    <span className={styles.value}>{opengraphData.pressAvatar}</span>
                  </div>
                )}
                <div>
                  <span className={styles.operator}>{'}'}</span>
                </div>
              </div>
            )}
          </div>
        )}
        <div className={styles.para}>
          <div className={styles.parapara}>
            <div className={styles.caution}>
              <h2>
                <Caution />
                <span>주의사항 Caution</span>
              </h2>
              <ul>
                <li>
                  CSR(Client-side Rendering) 즉, JavaScript로 화면을 그리는 웹사이트는 Meta 태그를 가져올 수 없습니다.
                </li>
              </ul>
            </div>
            <div className={styles.notice}>
              <h2>
                <Notice />
                <span>안내사항 Notice</span>
              </h2>
              <ul>
                <li>
                  iconv를 사용하여 EUC-** 인코딩(e.g. EUC-KR)으로 구성된 웹페이지의 Meta 태그는 UTF-8 인코딩으로
                  변환하여 가져옵니다.
                </li>
                <li>Meta 태그의 SEO 관련 값들 및 Opengraph, Twitter Card 값들 모두 가져옵니다.</li>
                <li>
                  단, og:title이 존재하지 않을 때는 Title 태그를 og:title 값으로 변환하여 가져오며,{' '}
                  <span>
                    og:description이 존재하지 않을 때는 Meta 태그의 description 값을 og:description으로 변환하여
                    가져옵니다.
                  </span>{' '}
                  또한 og:url이 존재하지 않을 때는 url 값을 og:url로 변환하여 가져옵니다.
                </li>
                <li>og:image:secure_url이 있을 때는 og:image가 아닌 og:image:secure_url을 가져옵니다.</li>
                <li>속도가 다소 느립니다.</li>
                <li>
                  개발코드는 <AnchorLink href="https://github.com/naninyang/openmeta">여기</AnchorLink>를 참조하세요.{' '}
                  <span>(next.js 환경에서 개발되었습니다.)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <p className={styles.copyright}>
          &copy;Copyrights <AnchorLink href="https://dev1stud.io">DEV1L.studio</AnchorLink>{' '}
          <AnchorLink href="https://github.com/naninyang">@O612</AnchorLink>
        </p>
      </main>
    </>
  );
}
