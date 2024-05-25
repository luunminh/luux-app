import { CommonQueryKey, useComponentDidMount } from '@core/common';
import { useGetScreenSizeList } from '@core/queries';
import { Carousel } from '@mantine/carousel';
import { Anchor, Box, Image, Skeleton, Tooltip } from '@mantine/core';
import { designPaths } from '@modules/design/route';

const ScreenSizesSlide = () => {
  const { screenSizeList, setParams, isFetching } = useGetScreenSizeList();

  useComponentDidMount(() => {
    setParams({ take: 50 });
  });

  if (isFetching) {
    return (
      <Carousel
        height={170}
        w={'100%'}
        loop
        slideSize={{ base: '20%' }}
        initialSlide={1}
        slideGap={16}
      >
        {Array.from({ length: 5 }).map((_, idx) => (
          <Carousel.Slide key={idx}>
            <Skeleton radius="md" width="100%" height={150} />
          </Carousel.Slide>
        ))}
      </Carousel>
    );
  }

  return (
    <Carousel height={170} loop slideSize={{ base: '20%' }} initialSlide={1} slideGap={16}>
      {screenSizeList.map((screenSize, idx) => (
        <Carousel.Slide key={idx}>
          <Box>
            <Image
              h={150}
              loading="lazy"
              alt={screenSize.name}
              src={screenSize.thumbnailUrl}
              style={{ borderRadius: 12 }}
            />
            <Tooltip label={screenSize.name}>
              <Anchor
                c="black"
                target="_blank"
                href={`/${designPaths.addDesign}?${CommonQueryKey.SCREEN_SIZE_ID}=${screenSize.id}`}
                style={{ fontWeight: 600, fontFamily: 'monospace', mt: 1 }}
              >
                {screenSize.name}
              </Anchor>
            </Tooltip>
          </Box>
        </Carousel.Slide>
      ))}
    </Carousel>
  );
};

export default ScreenSizesSlide;
