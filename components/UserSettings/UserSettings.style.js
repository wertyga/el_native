import { globalStyle } from 'common';

const { text, positiveColor, negativeColor } = globalStyle;

export const userSettingsStyle = {
  mainStyle: {
    paddingTop: 50,
  },
  textStyle: {
    ...text,
    width: 300,
  },
  changableTextStyle: {
    ...text,
    fontSize: 17,
  },
  inputWrapperStyle: {
    marginBottom: 15,
  },
  rowWrapperStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  colorizeTextStyle: (state) => ({
    ...text,
    fontWeight: 'bold',
    color: state ? positiveColor : negativeColor,
  }),
}