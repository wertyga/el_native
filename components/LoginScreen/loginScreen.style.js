import { globalStyle } from "common";

export const style = {
  globalError: globalStyle.globalError,
  form: {
    paddingTop: 40,
    marginBottom: 20,
    width: '100%',
  },
  buttonWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  submitButton: {
    paddingVertical: 10,
    marginBottom: 10,
    backgroundColor: globalStyle.secondColor,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  remind: {
    color: globalStyle.secondColor,
    paddingVertical: 10,
    width: '100%',
    textAlign: 'right',
  },
};