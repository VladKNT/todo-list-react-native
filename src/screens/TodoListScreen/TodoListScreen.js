import React from 'react';
import { Text, View, ScrollView, FlatList, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import _ from 'lodash';
import { connect } from 'react-redux';
import { getTodoList, deleteTodoList, deleteTodoItem } from '../../actions/ActionCreators';
import COLORS from '../../constants/colors';
import styles from './styles';

class TodoListScreen extends React.Component {
  async componentDidMount() {
    this.props.getTodoList();
  }

  saveTodoListPressed = (params) => {
    const { navigate } = this.props.navigation;
    navigate("SaveListScreen", params);
  };

  saveItemPressed = (params) => {
    const { navigate } = this.props.navigation;
    navigate("SaveItemScreen", params);
  };

  renderItemAlert = (item) => {
    Alert.alert(
      'Todo item actions',
      'Would you like to update or delete this item?',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Update', onPress: () => this.saveItemPressed(item)},
        {text: 'Delete', onPress: () => this.props.deleteTodoItem(item.id)}
      ],
      { cancelable: false }
    )
  };

  renderTodoItems = ({ item }) => {
    return(
      <TouchableOpacity style={styles.todoItemContainer} onPress={() => this.renderItemAlert(item)}>
        <View style={styles.todoItem}>
          <Text style={[ styles.todoItemText, item.complete ? {textDecorationLine: 'line-through'} : null ]}>
            { item.content }
          </Text>
        </View>

      </TouchableOpacity>
    )
  };

  renderTodoList = ({ item }) => {
    const { todoItems, title } = item;

    return (
      <View style={styles.todoContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.todoTitle}>
            { title } {!_.some(todoItems) ? ' (Empty)': null}
          </Text>

          <View style={styles.todoButtonsContainer}>
            <TouchableOpacity onPress={() => this.props.deleteTodoList(item.id)}>
              <Icon name={'md-trash'} size={25} color={COLORS.TRASH_ICON} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.saveTodoListPressed(item)}>
              <Icon name={'md-create'} size={25} color={COLORS.PENCIL_ICON} />
            </TouchableOpacity>
          </View>
        </View>

        <FlatList
          data={ todoItems }
          renderItem={this.renderTodoItems}
          keyExtractor={(todoItems) => todoItems.id.toString()}
        />

        <TouchableOpacity style={styles.addItemButton} onPress={() => this.saveItemPressed({todoId: item.id})}>
          <Icon name={'md-add-circle'} size={25} color={COLORS.BLACK} />
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const { todoList } = this.props;

    return (
      <ScrollView style={styles.container}>
          <View style={styles.creationContainer}>
            <Text style={styles.createText}>
              Todo list
            </Text>
            <TouchableOpacity onPress={() => this.saveTodoListPressed()}>
              <Icon name={'md-add-circle'} size={25} color={COLORS.BLACK} />
            </TouchableOpacity>
          </View>

        <FlatList
          data={todoList}
          renderItem={this.renderTodoList}
          keyExtractor={(todoList) => todoList.id.toString()}
        />
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    todoList: state.todoReducer.todoList
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTodoList: () => dispatch(getTodoList()),
    deleteTodoList: (id) => dispatch(deleteTodoList(id)),
    deleteTodoItem: (id) => dispatch(deleteTodoItem(id))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoListScreen);
