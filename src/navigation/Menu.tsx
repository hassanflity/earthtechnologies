import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { etGet } from '../utils/blfetch';
import './menu.css';

import { usemenustateStore, useThemeStore } from '../store/index';
import {
  Logo,
  LogoIcon,
  FbIcon,
  InstaIcon,
  InIcon,
  YouTubeIcon,
} from '../components/icons';

import Switcher from '../components/Switcher';

interface _settings {
  facebook: string;
  instagram: string;
  linkedin: string;
  youtube: string;
}
interface Data {
  settings: _settings;
}

const Menu = () => {
  const [page, setPage] = useState<string>('');

  const [iconSize, setIconSize] = useState<number>(30); // State to store icon size
  const [logoSize, setLogoSize] = useState<number>(80); // State to store Logo size
  const [iconColor, setIconColor] = useState<string>('#ddb548'); // State to store Logo size
  const [data, setData] = useState<Data | null>(null);
  const location = useLocation();

  // Function to update icon size based on window width
  const updateIconSize = () => {
    if (window.innerWidth <= 960) {
      setIconSize(25); // Smaller size for screen widths <= 960px
      setLogoSize(70);
    } else {
      setIconSize(30); // Default size for larger screens
      setLogoSize(80);
    }
  };


  useEffect(() => {
    etGet('api_settings', (data) => {
      setData(data);
    });

    // Update icon size on component mount
    updateIconSize();

    // Add a listener for window resize events
    window.addEventListener('resize', updateIconSize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', updateIconSize);
    };
  }, []);

  useEffect(() => {
    const currentPath = location.pathname.toLowerCase();
    let currentPage = '';

    switch (currentPath) {
      case '/':
      case '/home':
        currentPage = 'home';
        break;
      case '/about':
        currentPage = 'about';
        break;
      case '/services':
        currentPage = 'services';
        break;
      case '/projects':
        currentPage = 'projects';
        break;
      case '/team':
        currentPage = 'team';
        break;
      case '/contact':
        currentPage = 'contact';
        break;
      default:
        currentPage = 'unknown';
    }

    const contactBtnMsg =
      document.querySelector<HTMLButtonElement>('.contact-btn');
    if (currentPage === 'home') {
      contactBtnMsg?.classList.add('white');
    } else {
      contactBtnMsg?.classList.remove('white');
    }

    if (currentPage === 'contact' && contactBtnMsg) {
      contactBtnMsg.style.display = 'none';
    } else {
      if (contactBtnMsg) contactBtnMsg.style.display = 'block';
    }

    setPage(currentPage);
  }, [location.pathname]);

  const menustate = usemenustateStore((state: any) => state.menuState);
  const togglemenuState = usemenustateStore((state) => state.toggleMenuState);
  const dark = useThemeStore((state: any) => state.dark);

  const toggleMenuOpen = () => {
    togglemenuState(!menustate);
  };

  const removeActive = () => {
    togglemenuState(false);
  };

  const renderTrigger = () => {
    return (
      <button
        onClick={toggleMenuOpen}
        className={
          menustate ? 'trigger opened outer-trigger' : 'trigger outer-trigger'
        }
        id='trigger'
      >
        <div>
          <span />
          <span />
          <span />
        </div>
      </button>
    );
  };

  return (
    <>
      <menu className={page === 'home' ? 'home' : ''}>
        <NavLink className='logo' to='/' onClick={removeActive}>
          {page === 'home' ? (
            <Logo w={logoSize * 2} h={logoSize} color='#fff' />
          ) : (
            <Logo
              w={logoSize * 2}
              h={logoSize}
              color={`${dark ? '#fff' : '#99a4ae'}`}
              scondaryColor={`${dark ? '#fff' : '#405364'}`}
            />
          )}
        </NavLink>

        {renderTrigger()}

        <nav>
          {renderTrigger()}
          <ul>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? 'nav-bar-link active' : 'nav-bar-link'
                }
                to='/'
                onClick={removeActive}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? 'nav-bar-link active' : 'nav-bar-link'
                }
                to='/about'
                onClick={removeActive}
              >
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? 'nav-bar-link active' : 'nav-bar-link'
                }
                to='/services'
                onClick={removeActive}
              >
                Our Services
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? 'nav-bar-link active' : 'nav-bar-link'
                }
                to='/projects'
                onClick={removeActive}
              >
                Our Projects
              </NavLink>
            </li>
            {/* <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? 'nav-bar-link active' : 'nav-bar-link'
                }
                to='/team'
                onClick={removeActive}
              >
                Our Team
              </NavLink>
            </li> */}
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? 'nav-bar-link active' : 'nav-bar-link'
                }
                to='/contact'
                onClick={removeActive}
              >
                Contact Us
              </NavLink>
            </li>

            <li className='mobileSocials'>
              <div className='icons'>
                <a href={data?.settings.facebook} target='_blank'>
                  <FbIcon w={iconSize} h={iconSize} color='#fff' />
                </a>
                <a href={data?.settings.instagram} target='_blank'>
                  <InstaIcon w={iconSize} h={iconSize} color='#fff' />
                </a>
                <a href={data?.settings.linkedin} target='_blank'>
                  <InIcon w={iconSize} h={iconSize} color='#fff' />
                </a>
                {/*
                <a href={data?.settings.youtube} target='_blank'>
                  <YouTubeIcon w={iconSize} h={iconSize} color='#fff' />
                </a>
                */}
              </div>
            </li>

            <li className='mobileSwitcher'>
              <Switcher />
            </li>
          </ul>
        </nav>

        <div className='icons'>
          <a href={data?.settings.facebook} target='_blank'>
            <FbIcon
              w={iconSize}
              h={iconSize}
              color={page === 'home' ? '#fff' : '#ddb548'}
            />
          </a>
          <a href={data?.settings.instagram} target='_blank'>
            <InstaIcon
              w={iconSize}
              h={iconSize}
              color={page === 'home' ? '#fff' : '#ddb548'}
            />
          </a>
          <a href={data?.settings.linkedin} target='_blank'>
            <InIcon
              w={iconSize}
              h={iconSize}
              color={page === 'home' ? '#fff' : '#ddb548'}
            />
          </a>
          {/*
          <a href={data?.settings.youtube} target='_blank'>
            <YouTubeIcon
              w={iconSize}
              h={iconSize}
              color={page === 'home' ? '#fff' : '#ddb548'}
            />
            
          </a>*/}
        </div>
      </menu>
    </>
  );
};

export default Menu;
