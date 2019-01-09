import { globalStyle } from 'common';

const { text, container, scrollContainer } = globalStyle;

export const aboutStyle = {
  wrapperStyle: {
    ...container,
    paddingHorizontal: 0,
  },
  scrollStyle: scrollContainer,
  rowWrapperStyle: {
    flexDirection: 'row',
  },
  textStyle: text,
  elementStyle: {
    marginBottom: 20,
  },
  textTitleStyle: {
    ...text,
    fontWeight: 'bold',
  },
  linkStyle: {
    marginLeft: 20,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    textDecorationLine: 'underline',
  },
  lightTextStyle: {
    ...text,
    fontSize: 15,
  },
}