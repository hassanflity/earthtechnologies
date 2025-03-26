import { lazy, Suspense, useState, useEffect, FC } from 'react';
import './css/contact.css';
import { Helmet } from 'react-helmet';

import {
  FbIcon,
  InstaIcon,
  InIcon,
  YouTubeIcon,
  MobIcon,
  MailIcon,
} from '../../components/icons';

import { etGet } from '../../utils/blfetch';
import DOMPurify from 'dompurify';

const LoadingTemplate = lazy(() => import('../LoadingViews'));

interface Data {
  settings: _settings;
  countries: Country[];
  seo: _seo;
}

interface Country {
  id: string;
  title: string;
}
interface _settings {
  phone: string;
  email: string;
}
interface _seo {
  title: '',
  meta_title: '',
  meta_description: '',
  meta_keywords: '',
}
const About: FC = () => {
  const [data, setData] = useState<Data | null>(null);
  const [telNumber, setTelNumber] = useState<string>('');

  useEffect(() => {
    etGet('api_contact_us', (data) => {
      setData(data);
      function removeSpaces(input: string) {
        return input.replace(/\s+/g, '');
      }

      setTelNumber(removeSpaces(data.settings.phone));
    });
  }, []);

  const createMarkup = (html: string) => ({
    __html: DOMPurify.sanitize(html),
  });

  const renderIcon = (url: string) => {
    if (url.toLowerCase().includes('facebook'))
      return <FbIcon w={30} h={30} color='#ddb548' />;

    if (url.toLowerCase().includes('instagram'))
      return <InstaIcon w={30} h={30} color='#ddb548' />;

    if (url.toLowerCase().includes('linkedin'))
      return <InIcon w={30} h={30} color='#ddb548' />;

    if (url.toLowerCase().includes('youtube'))
      return <YouTubeIcon w={30} h={30} color='#ddb548' />;
  };

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
          <div className='main-title'>{data?.seo.title}</div>
          {data ? (
            <>
              <div className='contact-section'>
                <div className='map'>
                  <img src='/Earth-Red-2.svg' />
                  <div className='countries'>
                    {data.countries ? (
                      data.countries.map((country) => (
                        <div key={country.id}>{country.title}</div>
                      ))
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                <div className='desc'>
                  <a href={`tel:${telNumber}`} className='data-icons'>
                    <strong>
                      <MobIcon w={30} h={30} color='#99a4ae' />
                      <span>{data.settings.phone}</span>
                    </strong>
                  </a>

                  <a href={`mailto:${data.settings.email}`} className='data-icons'>
                    <strong>
                      <MailIcon w={30} h={30} color='#99a4ae' />
                      <span>{data.settings.email}</span>
                    </strong>
                  </a>
                </div>
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
