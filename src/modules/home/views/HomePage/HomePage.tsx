import { CommonQueryKey } from '@core/common';
import { LayoutSection } from '@core/components';
import { AppShell } from '@mantine/core';
import { useSearchParams } from 'react-router-dom';
import { HomePageTabEnum } from './HomePage.helpers';
import { MyDesigns } from './components';
import { MyDesignsSidebar } from './components/MyDesigns/MyDesigns';
import TemplatePage from './components/TemplatePage/TemplatePage';

const HomePage = () => {
  const [query] = useSearchParams();

  const tab = query.get(CommonQueryKey.TAB) || HomePageTabEnum.DESIGNS;

  const renderContent = () => {
    switch (tab) {
      case HomePageTabEnum.TEMPLATES:
        return <TemplatePage />;
      case HomePageTabEnum.DESIGNS:
      case HomePageTabEnum.SHARED:
        return <MyDesigns />;
      default:
        return <MyDesigns />;
    }
  };

  return (
    <AppShell
      navbar={{
        width: '264',
        collapsed: { desktop: false, mobile: true },
        breakpoint: 'sm',
      }}
    >
      <AppShell.Navbar>
        <MyDesignsSidebar />
      </AppShell.Navbar>
      <AppShell.Main
        style={{
          paddingTop: 0,
          paddingInlineStart: 0,
        }}
      >
        <LayoutSection p={32} mih="85vh">
          {renderContent()}
        </LayoutSection>
      </AppShell.Main>
    </AppShell>
  );
};

export default HomePage;
