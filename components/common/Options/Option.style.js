import { Dimensions } from 'react-native';
import { globalStyle } from "common";

const { height, width } = Dimensions.get('window');
const { text, border } = globalStyle;

export const optionStyles = {
  item: {
      ...text,
      ...border,
    borderBottomWidth: 1,
    paddingBottom: 7,
    paddingTop: 5,
  },
  list: {
    marginBottom: 10,
  },
}