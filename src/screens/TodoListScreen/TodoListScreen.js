import React from 'react';
import { Text, View, ScrollView, FlatList, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import _ from 'lodash';
import { Query, Mutation, compose, graphql } from 'react-apollo';
import { getTodoList, deleteTodoList } from '../../api/TodoApi';
import { deleteTodoItem } from '../../api/TodoItemApi';
import COLORS from '../../constants/colors';
import styles from './styles';

class TodoListScreen extends React.Component {
  saveTodoListPressed = (params) => {
    const { navigate } = this.props.navigation;
    navigate("SaveListScreen", params);
  };

  saveItemPressed = (params) => {
    const { navigate } = this.props.navigation;
    navigate("SaveItemScreen", params);
  };

  deleteTodoList = async (id) => {
    try {
      const response = await this.props.deleteTodoList({ variables: { id }});
    } catch (error) {
      console.info(error);
    }
  };

  deleteTodoItem = async (id) => {
    try {
      const response = await this.props.deleteTodoItem({ variables: { id }});
    } catch (error) {
      console.info(error);
    }
  };

  renderItemAlert = (item) => {
    Alert.alert(
      'Todo item actions',
      'Would you like to update or delete this item?',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Update', onPress: () => this.saveItemPressed(item)},
        {text: 'Delete', onPress: () => this.deleteTodoItem(item.id)}
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
            <TouchableOpacity onPress={() => this.deleteTodoList(item.id)}>
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
    return (
      <Query query={ getTodoList }>
        {({ loading, error, data: { getAllTodos } }) => {
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
                data={getAllTodos}
                renderItem={this.renderTodoList}
                keyExtractor={(todoList) => todoList.id.toString()}
              />
            </ScrollView>
          )
        }}
      </Query>
    );
  }
}

export default compose(
  graphql(deleteTodoList, {name: 'deleteTodoList', options: {
    update: (cache, { data: { deleteTodo } }) => {
      const { getAllTodos }  = cache.readQuery({ query: getTodoList });
      const newTodos = _.reject(getAllTodos, { id: deleteTodo });

      cache.writeQuery({
        query: getTodoList,
        data: { getAllTodos: newTodos}
      });
    }
  }}),

  graphql(deleteTodoItem, {name: 'deleteTodoItem', options: {
    update: (cache, { data:  { deleteTodoItem } }) => {
      const { getAllTodos }  = cache.readQuery({ query: getTodoList });

      _.each(getAllTodos, (todoList) => {
        if(todoList.id === deleteTodoItem.todoId) {
          _.remove(todoList.todoItems, { id: deleteTodoItem.id});
        }
      });

      cache.writeQuery({
        query: getTodoList,
        data: { getAllTodos }
      });
    }
  }})
)(TodoListScreen);
