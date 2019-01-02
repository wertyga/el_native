import { globalStyle } from "common";

const errorColor =  'red';

export const style = {
    errorColor,
    placeholderTextColor: '#a5b0b4',

    main: {
        marginBottom: 20,
        width: '100%',
    },
    input: {
        borderBottomColor: globalStyle.fontColor,
        borderBottomWidth: 1,
        color: globalStyle.fontColor,
        width: '100%',
    },
    errorInput: {
        color: errorColor,
    },
    inputWrapper: {
        position: 'relative',
        width: '100%',
    },
    focusInput: {
        height: 2,
        position: 'absolute',
        backgroundColor: globalStyle.secondColor,
        bottom: -1,
        flex: 1,
        alignSelf: 'stretch',
    },
    floatText: {
        color: globalStyle.fontColor,
        position: 'absolute',
        top: -10,
    },
};