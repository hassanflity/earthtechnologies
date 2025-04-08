import { lazy, Suspense, useState, useEffect, FC } from 'react';
import './css/projects.css';
import { etGet } from '../../../utils/blfetch';
const LoadingTemplate = lazy(() => import('../../LoadingViews'));
import { NavLink, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';

interface Data {
  title: string;
  list: Project[];
  seo: _seo;
}

interface Project {
  id: string;
  imgSrc: string;
  title: string;
  title_url: string;
  image: string;
  intro: Sections;
  sizeOfProject: Sections;
  summary: Sections;
  duration: Sections;
  gallery: Gallery[];
}

interface Gallery {
  id: string;
  imgSrc: string;
  desc: string;
}

interface Sections {
  title: string;
  description: string;
}
interface _seo {
  title: '';
  meta_title: '';
  meta_description: '';
  meta_keywords: '';
}
const Project: FC = () => {
  const [data, setData] = useState<Data | null>(null);
  const { categ } = useParams<{ categ: string }>(); // Get URL parameter

  useEffect(() => {
    etGet(`api_our_projects/${categ}`, (data) => {
      setData(data);
    });
  }, []);

  return (
    <>
      <Helmet>
        <title>{data?.seo.title}</title>
        <meta name='title' content={data?.seo.meta_title} />
        <meta name='description' content={data?.seo.meta_description} />
        <meta name='keywords' content={data?.seo.meta_keywords} />
      </Helmet>
      <section className='main-container'>
        <Suspense fallback={<LoadingTemplate pageType='about page' />}>
          {data ? (
            <>
              <div className='main-title'>{data?.seo.title}</div>
              <div className='inner-section projects-section'>
                {data.list.map((project) => (
                  <div key={project.id}>
                    <NavLink to={`/projects/${categ}/${project.title_url}`}>
                      <img src={project.imgSrc} alt={project.imgSrc} />
                      <div className='title'>{project.title}</div>
                    </NavLink>
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

export default Project;
