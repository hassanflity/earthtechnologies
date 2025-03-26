import React, { FC, useEffect, useState } from 'react';
import { etGet } from '../../utils/blfetch';
import { ServicesList } from '../../utils/tsModels';
import { Helmet } from 'react-helmet';
import './css/Services.css';



const Services: FC = () => {
  const [seo, setSeo] = useState({
    title: '',
    meta_title: '',
    meta_description: '',
    meta_keywords: '',
  });
  const [servicesList, setServicesList] = useState<ServicesList>([]);
  const [mainTitle, setMainTitle] = useState<string>('');

  useEffect(() => {
    etGet('api_our_services', (data) => {
      setMainTitle(data.title);
      setServicesList(data.services);
      setSeo(data.seo);
    });
  }, []);

  function handleClick(e: React.MouseEvent<HTMLButtonElement>, i: number) {
    const clickedBtn = e.currentTarget;
    const ddl = document.getElementById(`ddl-${i}`) as HTMLDivElement | null;

    const allBtns = document.querySelectorAll<HTMLButtonElement>('.empty-btn');
    const allDdl = document.querySelectorAll<HTMLDivElement>('.ddl');

    allBtns.forEach((btn) => btn.classList.remove('active'));
    allDdl.forEach((ddl) => {
      setTimeout(() => ddl.classList.remove('active'));
    });

    clickedBtn.classList.add('active');

    if (ddl) {
      setTimeout(() => ddl.classList.add('active'));
    }
  }

  return (
    <>
      <Helmet>
        <title>{seo.title}</title>
        <meta name="title" content={seo.meta_title} />
        <meta name="description" content={seo.meta_description} />
        <meta name="keywords" content={seo.meta_keywords} />
      </Helmet>
      <section className='main-container'>
        <div className='main-title'>{seo.title}</div>

        <section className='services'>
          {servicesList &&
            servicesList.map((serv, i) => (
              <div key={i} className='main-service'>
                <button className='empty-btn' onClick={(e) => handleClick(e, i)}>
                  <span className={`icon-${serv.icon}`}></span>
                  <div className='subtitle'>{serv.title}</div>
                </button>
                <div id={`ddl-${i}`} className='ddl' dangerouslySetInnerHTML={{ __html: serv.description }}>

                </div>
              </div>
            ))}
        </section>
      </section>
    </>
  );

};

export default Services;
