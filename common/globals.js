const negativeColor = '#aa1700';
const positiveColor = '#009b22';

export const globalStyle = {
  positiveColor,
  negativeColor,
  colorBgDark: '#30444c',
  fontColor: '#edecee',
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
  container: {
    backgroundColor: '#4e676f',
    paddingHorizontal: 40,
    flex: 1,
    width: '100%',
  },
  text: {
    color: '#edecee',
  },
  errorColor: 'red',
  globalError: {
    color: 'red',
    width: '100%',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
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

global.host = (request) => `http://46.101.209.10:3005${request}`;