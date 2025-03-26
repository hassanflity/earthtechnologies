import { lazy, Suspense, useState, useEffect } from 'react';
import { etGet } from '../../utils/blfetch';
import DOMPurify from 'dompurify';
import { Helmet } from 'react-helmet';

import './css/index.css';

const LoadingTemplate = lazy(() => import('../LoadingViews'));

import Carousel from './components/Carousel';

interface Slide {
  imgSrc: string;
}
interface _static {
  title: string;
  sub_title: string;
}
interface _seo {
  title: '',
  meta_title: '',
  meta_description: '',
  meta_keywords: '',
}
interface Data {
  slides: Slide[];
  static: _static;
  seo: _seo;
}

const Home = () => {
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    etGet('api_home', (data) => {
      setData(data);
    });
  }, []);

  const createMarkup = (html: string) => ({
    __html: DOMPurify.sanitize(html),
  });

  return (
    <>
      <Helmet>
        <title>{data?.seo.title}</title>
        <meta name="title" content={data?.seo.meta_title} />
        <meta name="description" content={data?.seo.meta_description} />
        <meta name="keywords" content={data?.seo.meta_keywords} />
      </Helmet>

      <section className='home-page'>
        <Suspense fallback={<LoadingTemplate pageType='home page' />}>
          {data ? (
            <>
              <Carousel carouselList={data.slides} />
              <div className='home-content'>
                <div className='bottom-hp'>
                  <div
                    className='home-msg'
                    dangerouslySetInnerHTML={createMarkup(data.static.title)}
                  />
                  <div>{data.static.sub_title}</div>
                </div>
              </div>
            </>
          ) : (
            ''
          )}
        </Suspense>
      </section>
    </>
  );
};

export default Home;
