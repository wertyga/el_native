import { globalStyle } from 'common';
import { StyleSheet } from 'react-native';

const { colorBgDark, fontColor, text } = globalStyle;

export const userMenuStyle = StyleSheet.create({
  buttonStyle: {
    backgroundColor: 'transparent',
    marginRight: 10,
  },
  menuStyles: {
    position: 'absolute',
    flex: 1,
    right: 0,
    top: 10,
    width: 200,
  },
  menuItemStyle: {
    ...text,
    padding: 10,
    paddingLeft: 10,
    flexWrap: 'nowrap',
    flex: 2,
    marginBottom: 3,
    backgroundColor: colorBgDark,
    zIndex: 1,
  },
})