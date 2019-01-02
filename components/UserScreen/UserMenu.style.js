import { globalStyle } from 'common';
import { StyleSheet } from 'react-native';

const { colorBgDark, border, fontColor } = globalStyle;

export const userMenuStyle = StyleSheet.create({
  buttonStyle: {
    backgroundColor: 'transparent',
    marginRight: 10,
  },
  menuStyles: {
    position: 'absolute',
    flex: 1,
    right: 0,
    top: 60,
    width: 200,
  },
  menuItemStyle: {
    padding: 10,
    paddingLeft: 10,
    color: fontColor,
    flexWrap: 'nowrap',
    flex: 1,
    marginBottom: 3,
    backgroundColor: colorBgDark,
  },
})