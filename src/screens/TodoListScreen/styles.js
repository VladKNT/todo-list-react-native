import { StyleSheet } from 'react-native';
import COLORS from '../../constants/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    padding: 10
  },
  todoContainer: {
    backgroundColor: COLORS.PRIMARY_GRAY,
    borderTopWidth: 1,
    borderWidth: 1,
    borderColor: COLORS.BLACK,
    padding: 10,
    marginVertical: 5
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  todoTitle: {
    color: COLORS.BLACK,
    fontSize: 18,
    fontWeight: 'bold'
  },
  addItemButton: {
    alignSelf: 'center',
    marginVertical: 10
  },
  todoButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '15%'
  },
  todoItemContainer: {
    paddingLeft: 10
  },
  todoItem: {
    flexDirection: 'row'
  },
  todoItemText: {
    color: COLORS.BLACK,
    fontSize: 16
  },
  creationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '30%'
  },
  createText: {
    color: COLORS.BLACK,
    fontSize: 18,
    fontWeight: 'bold'
  }
});