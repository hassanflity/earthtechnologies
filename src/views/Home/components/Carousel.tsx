import { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './css/homeCarousel.css';
interface Slide {
  imgSrc: string;
}

interface CarouselProps {
  carouselList: Slide[];
}

const Carousel: React.FC<CarouselProps> = ({ carouselList }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [videoUrl, setVideoUrl] = useState<string>('');

  const settings = {
    dots: false,
    infinite: true,
    speed: 1200,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
  };

  const expandVideo = (video: string) => {
    setVideoUrl(video);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setVideoUrl('');
  };


  return (
    <div className='home-carousel'>
      <Slider {...settings}>
        {carouselList.map((el, index) => (
          <div key={index} className='item-carousel'>
            <img src={el.imgSrc} alt={`project ${index + 1}`} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
