import { lazy, Suspense, useState, useEffect, FC } from 'react';
import './css/team.css';

import { etGet } from '../../utils/blfetch';

const LoadingTemplate = lazy(() => import('../LoadingViews'));

interface Data {
  title: string;
  management: Pers[];
  list: Pers[];
}

interface Pers {
  id: string;
  name: string;
  position: string;
  image: string;
}

const About: FC = () => {
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    etGet('api/team.json', (data) => {
      setData(data);
    });
  }, []);

  return (
    <section className='main-container'>
      <Suspense fallback={<LoadingTemplate pageType='about page' />}>
        {data ? (
          <>
            <div className='main-title'>{data.title}</div>
            <div className='team-section'>
              {data.management.map((pers) => (
                <div key={pers.id}>
                  <div className='image-wrapper'>
                    <img src={pers.image} alt={pers.name} />
                  </div>

                  <div className='name'>{pers.name}</div>
                  <div className='position'>{pers.position}</div>
                </div>
              ))}
            </div>
            <hr />
            <div className='team-section'>
              {data.list.map((pers) => (
                <div key={pers.id}>
                  <div className='image-wrapper'>
                    <img src={pers.image} alt={pers.name} />
                  </div>
                  <div className='name'>{pers.name}</div>
                  <div className='position'>{pers.position}</div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <></>
        )}
      </Suspense>
    </section>
  );
};

export default About;
