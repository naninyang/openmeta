import Image from 'next/image';
import { images } from '@/images';
import Seo from '@/components/Seo';
import styled from '@emotion/styled';
import styles from '@/styles/home.module.sass';

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

export default function Home() {
  const timestamp = Date.now();
  return (
    <>
      <Seo
        pageDescription="UX 디자인 & 웹퍼블리싱 O612 고아리의 포트폴리오"
        pageImg={`https://dev1stud.io/images/og-image.png?ts=${timestamp}`}
      />
      <main className={styles.openmeta}>
        <h1>
          <span>오픈메타 : 메타앤오픈그래프</span>
          <Logotypo />
        </h1>
        <form>
          <fieldset>
            <legend>주소 입력</legend>
            <label htmlFor="url">URL</label>
            <input id="url" type="url" placeholder="http 또는 https를 포함한 주소를 입력해 주세요" />
            <button type="submit">
              <span>검색하기</span>
              <Search />
            </button>
          </fieldset>
        </form>
        <dl>
          <div className={styles.caution}>
            <dt>
              <Caution />
              <span>주의사항 Caution</span>
            </dt>
            <dd>
              CSR(Client-side Rendering) 즉, JavaScript로 화면을 그리는 웹사이트는 Meta 태그를 가져올 수 없습니다.
            </dd>
          </div>
          <div className={styles.notice}>
            <dt>
              <Notice />
              <span>안내사항 Notice</span>
            </dt>
            <dd>
              iconv를 사용하여 EUC-** 인코딩(e.g. EUC-KR)으로 구성된 웹페이지의 Meta 태그는 UTF-8 인코딩으로 변환하여
              가져옵니다.
            </dd>
            <dd>Meta 태그의 SEO 관련 값들 및 Opengraph, Twitter Card 값들 모두 가져옵니다.</dd>
            <dd>
              단, og:title이 존재하지 않을 때는 Title 태그를 og:title 값으로 변환하여 가져오며,{' '}
              <span>
                og:description이 존재하지 않을 때는 Meta 태그의 description 값을 og:description으로 변환하여 가져옵니다.
              </span>{' '}
              또한 og:url이 존재하지 않을 때는 url 값을 og:url로 변환하여 가져옵니다.
            </dd>
            <dd>
              og:image:secure_url이 있을 때는 og:image가 아닌 og:image:secure_url을 가져옵니다. 속도가 다소 느립니다.
            </dd>
          </div>
        </dl>
      </main>
    </>
  );
}
