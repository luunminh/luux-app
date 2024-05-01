import { ConfigurationLine } from './Line';
import { ConfigurationMultipleNodes } from './MultipleNodes';
import { ConfigurationShape } from './Shape';
import { ConfigurationText } from './Text';

const Configuration = {
  Shape: ConfigurationShape,
  Text: ConfigurationText,
  Line: ConfigurationLine,
  Nodes: ConfigurationMultipleNodes,
};

export default Configuration;
