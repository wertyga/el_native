import { StyleSheet } from 'react-native';
import { globalStyle } from 'common';

const { button, text, globalError, buttonText, buttonDanger, buttonSuccess } = globalStyle;

export const userScreenStyles = StyleSheet.create({
  pairsListStyle: {
    marginBottom: 70,
    marginTop: 20,
  },
  buttonDanger,
  buttonSuccess,
  button,
  buttonText,
  addPair: {
    paddingTop: 100,
  },
  addPairHeader: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 5,
    color: globalStyle.fontColor,
  },
  addPairContent: {
    marginBottom: 20,
  },
  addPairText: {
    marginBottom: 15,
    color: globalStyle.fontColor,
  },
  text: {
      ...text,
  },
  error: {
      ...globalError,
    flexDirection: 'row',
  },
  deleteButtonStyle: {
    marginTop: 10,
  },
})