import { Dimensions } from 'react-native';

const {height, width} = Dimensions.get('window');

export const style = {
  color: '#000',
  position: 'absolute',
  left: 0,
  top: 0,
  flex: 1,
  width,
  height,
  overflow: 'hidden',
  paddingTop: '50%',
  // justifyContent: 'center',
  alignItems: 'center',
  zIndex: 2,
  backgroundColor: 'rgba(255, 255, 255, .3)',
};