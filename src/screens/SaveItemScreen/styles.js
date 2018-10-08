import { StyleSheet } from 'react-native';
import COLORS from '../../constants/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    padding: 10
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  switchTitle: {
    fontSize: 16,
    color: COLORS.BLACK
  },
});