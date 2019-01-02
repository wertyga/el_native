import { globalStyle } from 'common';
import { StyleSheet } from 'react-native';

const { fontColor, positiveColor, negativeColor, border, colorSuccess, disableBgColor } = globalStyle;

export const pairStyles = StyleSheet.create({
  loadingStyle: {
    position: 'absolute',
    backgroundColor: disableBgColor,
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
  },
  itemViewTitle: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
  },
  signStyle: {
    width: 7,
    backgroundColor: positiveColor,
    height: 20,
  },
  isUpPriceStyle: (diffPrice, loading) => ({
    color: (diffPrice >= 0 && !loading) ? positiveColor : (!loading ? negativeColor : fontColor),
    fontWeight: 'bold',
  }),
  reachedPriceStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  wrapper: (sign, loading) => {
    const isSign = sign && !loading;
    return {
      borderColor: isSign ? 'transparent' : border.borderColor,
      backgroundColor: isSign ? colorSuccess : (loading ? disableBgColor : 'transparent'),
      paddingHorizontal: 5,
      paddingBottom: 7,
      marginTop: 20,
      borderBottomWidth: 1,
      position: 'relative',
    }
  },
  textBold: {
    fontWeight: 'bold',
    color: fontColor,
    fontSize: 20,
  },
  priceTextStyle: {
    color: fontColor,
    fontWeight: 'bold',
  },
  priceStyle: {
    color: fontColor,
  },
  diffPriceWrappeStyle: {
    justifyContent: 'flex-start',
  },
  textLight: {
    color: fontColor,
  },
  upperStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    alignItems: 'center',
  },
  downStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});