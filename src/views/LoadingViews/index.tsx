import { FC } from 'react';
import HomeLoading from './components/HomeLoading';
import './loading.css';
interface loadingTemplate {
  pageType: string;
}

const LoadingTemplate: FC<loadingTemplate> = ({ pageType }) => {
  const getComponent = () => {
    switch (pageType) {
      case 'home':
        return <HomeLoading />;
    }
  };

  return <>{getComponent()}</>;
};

export default LoadingTemplate;
