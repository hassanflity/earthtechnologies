import './css/Switcher.css';
import { useThemeStore } from '../store/index';

const Switcher = () => {
  const toggleDarkMode = useThemeStore((state) => state.toggleDarkMode);

  const changeTheme = (e: any) => {
    if (e.target.id === 'dark' && e.target.checked) {
      toggleDarkMode(true);
    } else {
      toggleDarkMode(false);
    }
  };

  return (
    <div className='mode-switch'>
      <div>
        <div>
          <input
            type='radio'
            id='dark'
            name='toggleMode'
            value='dark'
            onChange={changeTheme}
          />
          <label htmlFor='dark' />
        </div>
        <div>
          <input
            type='radio'
            id='light'
            name='toggleMode'
            value='light'
            onChange={changeTheme}
          />
          <label htmlFor='light' />
        </div>
      </div>
    </div>
  );
};

export default Switcher;
