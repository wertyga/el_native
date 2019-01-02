import { StyleSheet } from 'react-native';
import { globalStyle } from "common";
const {
  secondColor,
  secondaryColorLight,
  disableTextColor,
  disableBgColor,
  text,
} = globalStyle;

export const styleToggle = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  thumb: {
    position: 'absolute',
    width: 20,
    height: 20,
    top: -5,
    left: 0,
    borderRadius: 20/2,
    backgroundColor: disableBgColor,
  },
  thumbOpen: {
    backgroundColor: secondColor,
  },
  route: {
    position: 'relative',
    height: 10,
    width: 40,
    borderRadius: 8,
    backgroundColor: disableTextColor,
  },
  routeOpen: {
    backgroundColor: secondaryColorLight,
  },
  main: {
    marginTop: 10,
    marginLeft: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    marginHorizontal: 20,
    ...text,
  },
  text: {
    ...text,
    fontSize: 20,
  },
});