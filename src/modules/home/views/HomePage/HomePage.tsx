import { LoadingContainer } from '@components';
import { LayoutSection } from '@core/components';
import { AppShell } from '@mantine/core';
import { useGetDesignsLazy } from '@modules/design/queries';
import { PropsWithChildren } from 'react';
import { useSearchParams } from 'react-router-dom';
import { HomePageCarousel, MyDesigns, ScreenSizesSlide } from './components';

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
  const [searchParams, setSearchParams] = useSearchParams();

  const designsHooks = useGetDesignsLazy();

  const { isFetching } = designsHooks;

  if (isFetching) {
    return <LoadingContainer />;
  }

  return (
    <AppShell
      navbar={{
        width: '264',
        collapsed: { desktop: false, mobile: true },
        breakpoint: 'sm',
      }}
    >
      <AppShell.Navbar>
        <MyDesigns.Sidebar designsHook={designsHooks} />
      </AppShell.Navbar>
      <AppShell.Main
        style={{
          paddingTop: 0,
          paddingInlineStart: 0,
        }}
      >
        <LayoutSection p={32} mih="85vh">
          <MyDesigns.Wrapper designsHook={designsHooks} />
        </LayoutSection>
      </AppShell.Main>
    </AppShell>
  );
};

HomePage.Carousel = HomePageCarousel;
HomePage.ScreenSizesSlide = ScreenSizesSlide;

export default HomePage;

{
  /* <Stack
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
</Stack> */
}
