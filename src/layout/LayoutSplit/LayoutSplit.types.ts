export type LayoutSplitProps = {
  /**
   *  An optional additional CSS class to be applied to the content container class of the layout.
   */
  containerClassName?: string;

  /**
   *  The content to be placed within the layout.
   */
  children: React.ReactNode;

  /**
   *  The URL or path of the background image to be used for the layout.
   */
  bgImage: string;

  /**
   *  If set to `true`, the layout will be rendered in a right-to-left direction (image to content).
   * @default false
   */
  rtl?: boolean;

  /**
   *  The width of the content container.
   * @default '50vw'
   */
  contentWidth?: string;

  /**
   *  The width of the image container.
   * @default '50vw'
   */
  imageWidth?: string;
};
