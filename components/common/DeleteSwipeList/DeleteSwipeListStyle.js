import { globalStyle } from 'common';

const { buttonDanger, fontColor } = globalStyle;

export const deleteListStyle = {
  buttonDeleteStyle: {
    ...buttonDanger,
  },
  buttonDeleteWrapperStyle: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    marginVertical: 10,
  },
  renderItemStyle: (activated) => ({
    display: activated ? 'none' : 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: fontColor,
    marginBottom: 10,
  }),
  itemSeparatorStyle: {
    width: 1,
    backgroundColor: fontColor,
  },
}
