import { Lightbox } from '@components';
import { COLOR_CODE, Callback } from '@core/common';
import {
  ActionIcon,
  Box,
  Button,
  Drawer,
  Flex,
  Menu,
  Paper,
  Slider,
  Text,
  Title,
  Tooltip,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { FaRegCirclePlay } from 'react-icons/fa6';
import { IoIosArrowUp, IoIosMore } from 'react-icons/io';
import { IoAddOutline } from 'react-icons/io5';
import { useControls } from 'react-zoom-pan-pinch';
import { useDesignData, usePage } from '../../hooks';
import { PageImage, useDesignContext, useDesignStore } from '../../store';
import { getArrayOfPages } from './PageSelection.helpers';

type PageItemProps = {
  pageIdx: number;
};
const PageItem = ({ pageIdx }: PageItemProps) => {
  const { selectedPage, onSetSelectedPage } = useDesignStore();

  const isSelected = selectedPage === pageIdx;

  const handleSelectPage: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    if (!isSelected) onSetSelectedPage(pageIdx);
  };

  return (
    <Tooltip label={`Page ${pageIdx}`} withArrow>
      <Paper
        w={120}
        h={64}
        shadow="xs"
        p="md"
        component="button"
        style={{
          flex: '0 0 120px',
          position: 'relative',
          cursor: 'pointer',
          border: isSelected ? `2px solid ${COLOR_CODE.PRIMARY}` : COLOR_CODE.BORDER_DEFAULT,
        }}
        onClick={handleSelectPage}
      >
        <Text>Page {pageIdx}</Text>
        <MenuOptions />
      </Paper>
    </Tooltip>
  );
};

const Selection = () => {
  const { data } = useDesignStore();
  const { addNewPage } = usePage();
  const pages = data?.metadata.length;

  return (
    <Flex gap={16} style={{ overflowX: 'scroll' }}>
      {Array.from({ length: pages }).map((_, idx) => (
        <PageItem key={idx} pageIdx={idx + 1} />
      ))}
      <Tooltip label="Add page" withArrow>
        <Paper
          h={64}
          w={120}
          shadow="xs"
          p="md"
          component="button"
          className="cmp-page-item"
          style={{
            display: 'flex',
            cursor: 'pointer',
            justifyContent: 'center',
            border: COLOR_CODE.BORDER_DEFAULT,
          }}
          onClick={() => addNewPage()}
        >
          <IoAddOutline size={30} />
        </Paper>
      </Tooltip>
    </Flex>
  );
};

const Trigger = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Drawer
        size="100px"
        opened={opened}
        onClose={close}
        withCloseButton={false}
        position="bottom"
        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
      >
        <Selection />
      </Drawer>

      <Tooltip label="Select page">
        <ActionIcon
          style={{
            position: 'fixed',
            bottom: 16,
            left: '50%',
          }}
          variant="light"
          size="lg"
          onClick={open}
        >
          <IoIosArrowUp size={24} />
        </ActionIcon>
      </Tooltip>
    </>
  );
};

const MenuOptions = () => {
  const { removePage, selectedPage } = usePage();
  const { hasEditingPermission } = useDesignData();

  return (
    <Menu width={100} position="bottom" shadow="md">
      <Menu.Target>
        <ActionIcon
          variant="transparent"
          color="gray"
          size="xs"
          style={{ position: 'absolute', top: '5px', right: '5px' }}
        >
          <IoIosMore size={12} />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          disabled={!hasEditingPermission}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            removePage(selectedPage);
          }}
        >
          Delete
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

const DesignFooter = () => {
  const { zoomIn, zoomOut } = useControls();
  const [zoom, setZoom] = useState(1);
  const [openPreview, setOpenPreview] = useState(false);
  const [slides, setSlides] = useState<any>([]);

  const { numberOfPages } = usePage();
  const { onSetIsExporting, onSetSelectedPage, selectedPage } = useDesignStore();
  const { pageImagesStateChange, updatePageImages } = useDesignContext();

  const handleExportDesign = (callBack: Callback) => {
    const pages = getArrayOfPages(numberOfPages);
    onSetIsExporting(true);
    const currentPage = selectedPage;

    const subscription = pageImagesStateChange.subscribe((pageImages) => {
      if (pageImages.length === pages.length) {
        updatePageImages([]);
        onSetIsExporting(false);
        onSetSelectedPage(currentPage);

        callBack(pageImages);

        subscription.unsubscribe();
      } else {
        const nextSelectedPage = pages.find(
          (page) => !pageImages.some((pageImage) => pageImage.pageNumber === page),
        );

        // Delay to prevent flickering
        // TODO: fix bugs delay
        setTimeout(() => {
          onSetSelectedPage(nextSelectedPage);
        }, 200);
      }
    });
  };

  const handlePreview = () => {
    handleExportDesign(async (pageImages: PageImage[]) => {
      Promise.all(
        pageImages.map(
          (pageImage) =>
            new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.onload = () =>
                resolve({
                  src: reader.result as string,
                  title: `Page ${pageImage.pageNumber}`,
                  type: 'image',
                });
              reader.onerror = reject;
              reader.readAsDataURL(pageImage.image);
            }),
        ),
      ).then((images) => {
        setSlides(images);
        setOpenPreview(true);
      });
    });
  };

  const handleZoom = (value: number) => {
    if (value < zoom) {
      zoomOut();
    }
    if (value > zoom) {
      zoomIn();
    }
    setZoom(value);
  };

  return (
    <Flex p={16} align="center" justify="space-between">
      <Title order={4} style={{ fontWeight: 500 }}>
        Page {selectedPage}
      </Title>
      <Flex align="center" gap={16}>
        <Box w={200}>
          <Slider min={1} value={zoom} onChange={handleZoom} />
        </Box>
        <Title order={4}>{zoom}%</Title>
        <Button leftSection={<FaRegCirclePlay />} onClick={handlePreview} variant="outline">
          Preview
        </Button>
        <Lightbox open={openPreview} slides={slides} close={() => setOpenPreview(false)} />
      </Flex>
      <Trigger />
    </Flex>
  );
};

export default {
  Selection,
  Trigger,
  Footer: DesignFooter,
};
