import { CAROUSEL_IMAGES } from '@config/images';
import { Carousel } from '@mantine/carousel';
import { Image } from '@mantine/core';
import Autoplay from 'embla-carousel-autoplay';
import { useRef } from 'react';

const HomePageCarousel = () => {
  const autoplay = useRef(Autoplay({ delay: 2000 }));

  return (
    <Carousel
      withIndicators
      height={600}
      style={{ borderRadius: 40, overflow: 'hidden' }}
      plugins={[autoplay.current]}
      onMouseEnter={autoplay.current.stop}
      onMouseLeave={autoplay.current.reset}
    >
      {Object.values(CAROUSEL_IMAGES).map((img, idx) => (
        <Carousel.Slide key={idx}>
          <Image src={img} style={{ borderRadius: 40 }} />
        </Carousel.Slide>
      ))}
    </Carousel>
  );
};

export default HomePageCarousel;
