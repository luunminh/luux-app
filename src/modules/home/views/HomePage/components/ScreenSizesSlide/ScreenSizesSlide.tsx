import { useComponentDidMount } from '@core/common';
import { useGetScreenSizeList, useProfile } from '@core/queries';
import { Carousel } from '@mantine/carousel';
import { Box, Image, Skeleton, Title, Tooltip } from '@mantine/core';
import { useCreateDesign } from '@modules/design/queries';
import { designPaths } from '@modules/design/route';
import { DEFAULT_DESIGN } from '@modules/design/view/DesignForm';

const ScreenSizesSlide = () => {
  const { screenSizeList, setParams, isFetching } = useGetScreenSizeList();

  const { profile } = useProfile();
  const { id } = profile || {};

  useComponentDidMount(() => {
    setParams({ take: 50 });
  });

  const { onCreateDesign } = useCreateDesign({
    onSuccess: ({ data }, payload) => {
      window.open(`/${designPaths.design}/${data}`, '_blank');
    },
  });

  const handleCreateDesign = (screenSizeId: string) => {
    const data = DEFAULT_DESIGN({ screenSizeId, userId: id });

    onCreateDesign({ ...data, metadata: data.metadata });
  };

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
          <Box onClick={() => handleCreateDesign(screenSize.id)} style={{ cursor: 'pointer' }}>
            <Image
              h={150}
              loading="lazy"
              alt={screenSize.name}
              src={screenSize.thumbnailUrl}
              style={{ borderRadius: 12 }}
            />
            <Tooltip label={screenSize.name}>
              <Title order={4}>{screenSize.name}</Title>
            </Tooltip>
          </Box>
        </Carousel.Slide>
      ))}
    </Carousel>
  );
};

export default ScreenSizesSlide;
