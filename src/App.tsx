import { lazy, Suspense } from 'react';
import { Route, Routes, NavLink } from 'react-router-dom';
import './App.css';
import Switcher from './components/Switcher';
import { useThemeStore, usefullpage, usemenustateStore } from './store/index';
import { MobIcon } from './components/icons';

const Menu = lazy(() => import('./navigation/Menu'));
const Home = lazy(() => import('./views/Home'));
const About = lazy(() => import('./views/About'));
const Services = lazy(() => import('./views/Services'));
const ProjectDetails = lazy(() => import('./views/Projects/[id]/index'));
const Projects = lazy(() => import('./views/Projects'));
// const Team = lazy(() => import('./views/Team'));
const Contact = lazy(() => import('./views/Contact'));
const LoadingTemplate = lazy(() => import('./views/LoadingViews'));

// the export is not default
const Loading = lazy(() =>
  import('./views/Loading').then((module) => {
    return { default: module.Loading };
  })
);

function App() {
  const dark = useThemeStore((state: any) => state.dark);
  const fullpage = usefullpage((state: any) => state.pagesize);
  const menustate = usemenustateStore((state: any) => state.menuState);

  return (
    <main
      className={`relative ${dark ? 'dark-theme' : 'light-theme'}
          ${fullpage ? 'full-page' : 'not-full-page'}
          ${menustate ? 'opened-menu' : 'closed-menu'}
      `}
    >
      <Menu />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/services' element={<Services />} />
          <Route path='/projects' element={<Projects />} />
          <Route path='/projects/:id' element={<ProjectDetails />} />{' '}
          {/* This should come before the catch-all route */}
          {/* <Route path='/team' element={<Team />} /> */}
          <Route path='/contact' element={<Contact />} />
          <Route
            path='/loading'
            element={<LoadingTemplate pageType='home' />}
          />
          <Route path='*' element={<Home />} />{' '}
          {/* Catch-all route should be last */}
        </Routes>
      </Suspense>
      <div className='desktop-switcher'>
        <Switcher />
      </div>
    </main>
  );
}

export default App;
