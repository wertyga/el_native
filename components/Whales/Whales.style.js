import { globalStyle } from 'common';

const { text, colorBgDark, backgroundColor, globalError } = globalStyle;
const textStyle = text;

export const whalesStyle = {
  globalError,
  backgroundColor,
  emptyStyle: {
    ...textStyle,
    width: '100%',
    marginTop: 30,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  orderStyle: {
    marginTop: 20,
  },
  buttonStyle: (isActive) => ({
    backgroundColor: isActive ? colorBgDark : backgroundColor,
    width: 150,
  }),
  textPairStyle: {
    ...textStyle,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonWrapperStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  inputStyle: {
    width: '60%',
  },
  inputWrapperStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerStyle: {
    ...globalStyle.container,
    paddingHorizontal: 0,
  },
  scrollStyle: {
    paddingHorizontal: globalStyle.container.paddingHorizontal,
  },
  textStyle,
  textBoldStyle: {
    ...textStyle,
    fontWeight: 'bold',
  },
  contentStyle: {
    paddingVertical: 50,
  },
}