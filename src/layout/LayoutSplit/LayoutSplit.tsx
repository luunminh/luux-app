import { COLOR_CODE } from '@core/common';
import { useResponsiveBreakpoint } from '@hooks';
import { Box, Stack } from '@mantine/core';
import cn from 'classnames';
import { StyledLayoutSplit } from './LayoutSplit.styles';
import { LayoutSplitProps } from './LayoutSplit.types';

/**
 * LayoutSplit divides a web page into two sections: one for content and one for a background image.
 *
 * It is commonly utilized for UI designs, particularly for identity-related interfaces.
s */
const LayoutSplit = ({
  bgImage,
  children,
  containerClassName,
  rtl = false,
  contentWidth = '50vw',
  imageWidth = '50vw',
  breakpoint = 'md',
}: LayoutSplitProps) => {
  const { mediaQuery } = useResponsiveBreakpoint(breakpoint);

  return (
    <StyledLayoutSplit
      rtl={rtl}
      bgImage={bgImage}
      colorCode={COLOR_CODE}
      data-name="layout-split"
      imageWidth={imageWidth}
      contentWidth={contentWidth}
      responsiveBreakpoint={mediaQuery}
    >
      <Stack
        className={cn('cmp-layout__split', {
          'is-rtl': rtl,
        })}
      >
        <Stack className="cmp-layout__split__container">
          <Stack className={cn('cmp-layout__split__content', containerClassName)}>
            {children}
            <Box flex={1}>&nbsp;</Box>
          </Stack>
        </Stack>

        <Box className="cmp-layout__split__img" />
      </Stack>
    </StyledLayoutSplit>
  );
};

export default LayoutSplit;
