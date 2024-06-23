import { IScreenSize } from '@core/queries';
import { ASIDE_WIDTH, SIDEBAR_WIDTH } from '@modules/design/view/DesignForm/DesignForm';
import { useDesignStore } from '@modules/design/view/DesignForm/store';
import { useEffect, useState } from 'react';

type Props = {
  screenSize: IScreenSize;
  hasAside: boolean;
};

const NAVBAR_HEIGHT = 56;
const MENU_HEIGHT = 100;
const FOOTER_MENU_HEIGHT = 60;

const useResize = ({ screenSize, hasAside }: Props) => {
  const [scale, setScale] = useState(1);
  const { onSetScale } = useDesignStore();

  useEffect(() => {
    const hasSidebar = document.querySelector('.cmp-design-form__sidebar');
    const h = window.innerHeight - NAVBAR_HEIGHT - MENU_HEIGHT - FOOTER_MENU_HEIGHT;
    const w = window.innerWidth - (hasAside ? ASIDE_WIDTH : 0) - (!!hasSidebar ? SIDEBAR_WIDTH : 0);

    const wScale = w / screenSize.width;
    const hScale = h / screenSize.height;
    if (wScale < hScale) {
      setScale(wScale);
    } else {
      setScale(hScale);
    }
  }, [screenSize.width, screenSize.height, hasAside]);

  useEffect(() => {
    onSetScale(scale);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scale]);

  return { scale };
};

export default useResize;
