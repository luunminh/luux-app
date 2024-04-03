import { ColorCode } from '@core/common';
import styled, { StyledComponent } from '@emotion/styled';
import { PropsWithChildren } from 'react';

type LayoutSplitProps = PropsWithChildren & {
  colorCode: Partial<ColorCode>;
  responsiveBreakpoint: string;
  rtl: boolean;
  bgImage: string;
  imageWidth: string;
  contentWidth: string;
};

export const StyledLayoutSplit: StyledComponent<LayoutSplitProps> = styled.div<LayoutSplitProps>`
  .cmp-layout__split {
    display: flex;
    min-height: 100vh;
    background-color: ${({ colorCode }) => colorCode.WHITE};

    &.is-rtl {
      flex-flow: row-reverse;
    }

    &__container {
      height: 100vh;
      display: flex;
      justify-content: center;
      width: ${({ contentWidth }) => contentWidth};

      ${({ responsiveBreakpoint }) => responsiveBreakpoint} {
        width: 100vw;
      }
    }

    &__content {
      justify-content: center;
      transition: 0.4;
      align-items: center;
      width: 100%;

      ${({ responsiveBreakpoint }) => responsiveBreakpoint} {
        padding: 32px 8px 40px;
      }
    }

    &__img {
      background-image: url(${({ bgImage }) => bgImage});
      background-size: cover;
      background-repeat: no-repeat;

      position: fixed;
      height: 100vh;
      top: 0;
      width: ${({ imageWidth }) => imageWidth};
      left: ${({ rtl, contentWidth }) => (rtl ? 0 : contentWidth)};

      ${({ responsiveBreakpoint }) => responsiveBreakpoint} {
        display: none;
      }
    }
  }
`;
