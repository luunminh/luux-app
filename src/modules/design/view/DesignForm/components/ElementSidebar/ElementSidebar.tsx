import { isEmpty } from '@core/common';
import { IBaseElementCategory, useGetElementCategories } from '@core/queries';
import { ActionIcon, Flex, Stack, Tabs, Title } from '@mantine/core';
import { useState } from 'react';
import { ElementSidebarTabEnum, sidebarTabOptions } from './ElementSidebar.helpers';
import Section from './components';

const ElementSidebar = () => {
  const [tab, setTab] = useState<ElementSidebarTabEnum>(ElementSidebarTabEnum.TEMPLATE);

  const { elementCategories, isFetching } = useGetElementCategories();

  const renderTabContent = () => {
    if (isFetching || isEmpty(elementCategories)) return null;

    let categoryId;

    switch (tab) {
      case ElementSidebarTabEnum.TEMPLATE:
        return <Section.Template />;

      case ElementSidebarTabEnum.ELEMENTS:
        categoryId = elementCategories.find(
          (c) => c.displayName === IBaseElementCategory.GRAPHIC,
        ).id;
        return <Section.Element categoryId={categoryId} />;
      case ElementSidebarTabEnum.SHAPES:
        categoryId = elementCategories.find((c) => c.displayName === IBaseElementCategory.SHAPE).id;
        return <Section.Element categoryId={categoryId} />;
      case ElementSidebarTabEnum.FRAME:
        categoryId = elementCategories.find((c) => c.displayName === IBaseElementCategory.FRAME).id;
        return <Section.Element categoryId={categoryId} />;
      case ElementSidebarTabEnum.TEXT:
        categoryId = elementCategories.find((c) => c.displayName === IBaseElementCategory.TEXT).id;
        return <Section.Element categoryId={categoryId} />;

      case ElementSidebarTabEnum.UPLOAD:
        return <Section.Upload />;
      case ElementSidebarTabEnum.DRAW:
        return <Section.Draw />;
    }
  };

  return (
    <Flex>
      <Tabs defaultValue={tab} orientation="vertical">
        <Tabs.List
          style={{
            height: '100vh',
          }}
        >
          {sidebarTabOptions.map((option) => (
            <Tabs.Tab
              key={option.value}
              value={option.value}
              disabled={option.disabled}
              onClick={() => setTab(option.value)}
              style={{
                padding: 8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Stack justify="center" align="center" gap={8} p={8}>
                <ActionIcon size="lg" variant="gradient">
                  {option.icon}
                </ActionIcon>
                <Title c={tab === option.value ? 'blue' : 'gray'} order={6}>
                  {option.label}
                </Title>
              </Stack>
            </Tabs.Tab>
          ))}
        </Tabs.List>
      </Tabs>
      {renderTabContent()}
    </Flex>
  );
};

export default ElementSidebar;
