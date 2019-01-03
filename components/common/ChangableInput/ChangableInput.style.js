import { globalStyle } from 'common';

const { negativeColor, positiveColor, fontColor, disableBgColor } = globalStyle;

export const changableInputStyles = {
    times: (loading) => ({
        backgroundColor: loading ? disableBgColor : negativeColor,
        color: fontColor,
    }),
    check: (loading) => ({
        backgroundColor: loading ? disableBgColor : positiveColor,
        color: fontColor,
    }),
}