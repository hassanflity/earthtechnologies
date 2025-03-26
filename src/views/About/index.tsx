import { lazy, Suspense, useState, useEffect, FC } from 'react';
import './css/about.css';
import { Helmet } from 'react-helmet';
import { etGet } from '../../utils/blfetch';
import DOMPurify from 'dompurify';

const LoadingTemplate = lazy(() => import('../LoadingViews'));

interface Data {
  desc: string;
  sections: Sections[];
  seo: _seo;
}

interface Sections {
  id: string;
  imgSrc: string;
  title: string;
  description: string;
}
interface _seo {
  title: '',
  meta_title: '',
  meta_description: '',
  meta_keywords: '',
}
const About: FC = () => {
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    etGet('api_about', (data) => {
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
      <section className='main-container'>
        <Suspense fallback={<LoadingTemplate pageType='about page' />}>
          <h1 className='main-title'>{data?.seo.title}</h1>
          {data ? (
            <>
              <div className='about-sections'>
                {data.sections.map((el) => (
                  <div key={el.id} className='inner-section about-section'>
                    <img src={el.imgSrc} alt={el.title} />
                    <div>
                      <div className='subtitle'>{el.title}</div>
                      <div
                        className='about-desc'
                        dangerouslySetInnerHTML={createMarkup(el.description)}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <></>
          )}
        </Suspense>
      </section>
    </>
  );
};

export default About;
