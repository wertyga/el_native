import { globalStyle } from 'common';

const {
  scrollContainer,
  container,
  globalError,
  text,
  backgroundColor,
  positiveColor,
  negativeColor,
  fontColor,
} = globalStyle;

const textBoldStyle = {
  ...text,
  marginRight: 10,
  fontWeight: 'bold',
};

export const powerStyle = {
  wrapperStyle: {
    alignItems: 'flex-start',
    width: '100%',
  },
  emptyTextStyle: {
    ...textBoldStyle,
    textAlign: 'center',
    width: '100%',
    marginTop: 50,
  },
  deleteButtonStyle: {
    backgroundColor,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: fontColor,
    marginBottom: 20,
  },
  backgroundColor,
  globalError,
  containerStyle: {
    paddingVertical: container.paddingVertical,
  },
  containerScrollStyle: scrollContainer,
  textBoldStyle,
  textPositive: {
    ...textBoldStyle,
    color: positiveColor,
  },
  textNegative: {
    ...textBoldStyle,
    color: negativeColor,
  },
  textStyle: {
    ...text,
    fontWeight: 'normal',
    marginRight: 10,
  },
  textTitleStyle: {
    ...textBoldStyle,
  },
  itemStyle:(row) => ({
    flexDirection: row ? 'row' : 'column',
    paddingBottom: 10,
  }),
  containerViewStyle: {
    backgroundColor: backgroundColor,
    marginLeft: 0,
    marginRight: 0,
    alignItems: 'flex-start',
    width: '50%',
  },
}