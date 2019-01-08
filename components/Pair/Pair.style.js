import { globalStyle } from 'common';
import { StyleSheet, Dimensions } from 'react-native';

const { width: windowWidth } = Dimensions.get('window');

const { fontColor, positiveColor, negativeColor, border, colorSuccess, disableBgColor } = globalStyle;

export const pairStyles = {
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
  itemViewStyle: {
    flexDirection: 'row',
  },
  wrapperContent: {
    justifyContent: 'center',
    flex: 1,
  },
  signStyle: {
    width: 5,
    marginRight: 10,
    backgroundColor: positiveColor,
  },
  isUpPriceStyle: (diffPrice, loading) => ({
    color: (diffPrice >= 0 && !loading) ? positiveColor : (!loading ? negativeColor : fontColor),
    fontWeight: 'bold',
  }),
  reachedPriceStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  wrapperStyle: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  textBold: {
    fontWeight: 'bold',
    color: fontColor,
    fontSize: 20,
  },
  priceTextStyle: {
    color: fontColor,
    fontWeight: 'bold',
    marginRight: 10,
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
  downStyle: {},
};