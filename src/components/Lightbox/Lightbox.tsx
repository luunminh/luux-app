import {
  Callback,
  LightboxExternalProps,
  Lightbox as YetLightbox,
} from 'yet-another-react-lightbox';
import Download from 'yet-another-react-lightbox/plugins/download';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';

export type LightboxMediaProps = LightboxExternalProps & {
  onDownload?: Callback;
};

/**
The `LightboxMedia` component is designed to display various media types, including images and videos, within a Lightbox interface.
 */
const LightboxMedia = ({ onDownload, ...props }: LightboxMediaProps) => {
  return (
    <YetLightbox
      data-name="light-box__media"
      {...props}
      plugins={[Fullscreen, Thumbnails, Zoom, Download]}
    />
  );
};

export default LightboxMedia;
