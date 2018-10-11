import React from 'react';
import { Text, View, ScrollView, FlatList, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import _ from 'lodash';
import { Query, compose, graphql } from 'react-apollo';
import { getTodoList, deleteTodoList, todoListSaved, todoListDeleted } from '../../api/TodoApi';
import { deleteTodoItem, todoItemSaved, todoItemDeleted } from '../../api/TodoItemApi';
import COLORS from '../../constants/colors';
import styles from './styles';

class TodoListScreen extends React.Component {
  subscribe = () => {
    this.subscribeToMore({
      document: todoListSaved,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;

        const { todoSaved } = subscriptionData.data;
        const { getAllTodos } = prev;
        const newTodosList = _.reject(getAllTodos, {id: todoSaved.id});

        return {
          getAllTodos: [
            ...newTodosList,
            todoSaved,
          ],
        };
      }
    });

    this.subscribeToMore({
      document: todoListDeleted,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;

        const { todoDeleted } = subscriptionData.data;
        const { getAllTodos } = prev;
        const newTodosList = _.reject(getAllTodos, { id: todoDeleted });

        return {
          getAllTodos: newTodosList
        }
      }
    });

    this.subscribeToMore({
      document: todoItemSaved,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;

        const { todoItemSaved } = subscriptionData.data;
        const { getAllTodos } = prev;

        _.each(getAllTodos, (todoList) => {
          if(todoList.id === todoItemSaved.todoId) {
            if (_.isNull(todoList.todoItems)) {
              todoList.todoItems = [];
            }
             _.remove(todoList.todoItems, { id: todoItemSaved.id });

            todoList.todoItems.push(todoItemSaved);
          }
        });

        return { getAllTodos };
      }
    });

    this.subscribeToMore({
      document: todoItemDeleted,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        
        const { todoItemDeleted } = subscriptionData.data;
        const { getAllTodos } = prev;

        const newTodosList = _.each(getAllTodos, (todoList) => {
          if(todoList.id === todoItemDeleted.todoId) {
            let newList = todoList;
            const newTodosList = _.reject(getAllTodos, {id: todoList.id});
            newList.todoItems = _.reject(todoList.todoItems, { id: todoItemDeleted.id});

            return {
              getAllTodos: [
                ...newTodosList,
                newList
              ]
            }
          }
        });

        this.forceUpdate();

        return {
          getAllTodos: newTodosList
        }
      }
    });
  };

  componentDidMount() {
    this.subscribe();
  }

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
        {({ loading, error, data, subscribeToMore }) => {
          this.subscribeToMore = subscribeToMore;

          if(loading) {
            return (
              <View style={styles.container}>
                <Text>
                  Loading...
                </Text>
              </View>
            )
          }

          if (error) {
            return (
              <View style={styles.container}>
                <Text>
                  Problem with connection
                </Text>
              </View>
            )
          }

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
                data={data.getAllTodos}
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
  graphql(deleteTodoList, { name: 'deleteTodoList' }),
  graphql(deleteTodoItem, { name: 'deleteTodoItem' })
)(TodoListScreen);
