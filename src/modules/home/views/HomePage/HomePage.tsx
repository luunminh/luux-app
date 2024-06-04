import { LayoutSection } from '@core/components';
import { Stack, Title } from '@mantine/core';
import { PropsWithChildren } from 'react';
import { HomePageCarousel, ScreenSizesSlide } from './components';

const SectionWrapper = ({ children }: PropsWithChildren) => {
  return (
    <LayoutSection
      p={32}
      style={{
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        border: 'none',
        width: '100%',
        minHeight: '40vh',
      }}
    >
      {children}
    </LayoutSection>
  );
};

const HomePage = () => {
  return (
    <Stack
      gap={32}
      style={{
        minHeight: '100vh',
        backgroundColor: '#8EC5FC',
        backgroundImage: 'linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)',
      }}
    >
      <SectionWrapper>
        <Stack gap={16}>
          <Title
            style={{
              fontFamily: 'monospace',
            }}
            order={3}
          >
            <span
              style={{
                color: 'transparent',
                WebkitBackgroundClip: 'text',
                backgroundImage: 'linear-gradient(90deg, #00c4cc, #7d2ae8)',
              }}
            >
              Common screen sizes
            </span>{' '}
          </Title>
          <HomePage.ScreenSizesSlide />
        </Stack>
      </SectionWrapper>
    </Stack>
  );
};

HomePage.Carousel = HomePageCarousel;
HomePage.ScreenSizesSlide = ScreenSizesSlide;

export default HomePage;
