import { Dimensions } from 'react-native';

const isWithLarge = Dimensions.get('window').width > 600;

const negativeColor = '#aa1700';
const positiveColor = '#009b22';
const backgroundColor = '#435a62';
const fontColor = '#edecee';

const containerStyle = {
  backgroundColor,
  paddingHorizontal: isWithLarge ? '20%' : 50,
  flex: 1,
  paddingVertical: 50,
}

export const globalStyle = {
  positiveColor,
  negativeColor,
  backgroundColor,
  colorBgDark: '#30444c',
  fontColor,
  secondColor: '#ff9800',
  disableBgColor: '#b5b3b3',
  colorSuccess: '#004e19',
  border: {
    borderColor: '#b5b3b3',
  },
  disableTextColor: '#63808a',
  disableTextColorLighter: '#7ca0ad',
  secondaryColorDisabled: '#886f28',
  secondaryColorLight: '#ffc504',
  container: containerStyle,
  scrollContainer: {
    ...containerStyle,
    paddingVertical: 0,
  },
  text: {
    color: fontColor,
    fontSize: 17,
  },
  errorColor: 'red',
  globalError: {
    color: 'red',
    width: '100%',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    fontSize: 15,
  },
  button: {
    paddingVertical: 10,
    marginBottom: 10,
    backgroundColor: '#ff9800',
    alignItems: 'center',
  },
  buttonSuccess: {
    paddingVertical: 10,
    marginBottom: 10,
    backgroundColor: positiveColor,
    alignItems: 'center',
  },
  buttonDanger: {
    paddingVertical: 10,
    marginBottom: 10,
    backgroundColor: negativeColor,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
};