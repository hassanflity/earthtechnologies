import { lazy, Suspense, FC } from 'react';
const LoadingTemplate = lazy(() => import('../LoadingViews'));
import { NavLink } from 'react-router-dom';
import './css/mainProjects.css';

const Project: FC = () => {
  return (
    <>
      <section className='main-container'>
        <Suspense fallback={<LoadingTemplate pageType='about page' />}>
          <>
            <div className='project-gallery inner-section'>
              <NavLink to='/projects/0'>
                <h1>Lebanon</h1>
                <img src='https://earthtechnologies.com/panel/uploads/our_projects/gallery/3a6acaa3e651108216b5d37bbb50da75.JPG' />
              </NavLink>
              <NavLink to='/projects/1'>
                <h1>International</h1>
                <img
                  src='https://earthtechnologies.com/panel/uploads/our_projects/gallery/81323f7cae8261b84367fdbcd27ed918.JPG'
                  alt=''
                />
              </NavLink>
            </div>
          </>
        </Suspense>
      </section>
    </>
  );
};

export default Project;
