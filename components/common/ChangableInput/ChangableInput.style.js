import { globalStyle } from 'common';

const { negativeColor, positiveColor, disableBgColor, colorBgDark } = globalStyle;

export const changableInputStyles = {
  wrapperIconsStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  times: (disabled) => ({
    backgroundColor: disabled ? disableBgColor : negativeColor,
    size: 30,
  }),
  check: (disabled) => ({
    backgroundColor: disabled ? disableBgColor : positiveColor,
    size: 30,
  }),
  buttonStyle: {
    width: 130,
  },
  underlayColor: colorBgDark,
}