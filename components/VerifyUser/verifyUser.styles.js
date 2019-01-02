import { globalStyle } from "common";

export const verifyUserStyles = {
  globalError: globalStyle.globalError,
  form: {
    paddingTop: 40,
    paddingHorizontal: 20,
    marginBottom: 20,
    width: '100%',
  },
  text: {
    ...globalStyle.button.text,
  },
  button: {
    ...globalStyle.button,
  },
};