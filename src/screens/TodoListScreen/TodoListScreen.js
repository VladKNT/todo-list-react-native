import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import _ from 'lodash';
import { connect } from 'react-redux';
import { getTodoList, deleteTodoList } from '../../actions/ActionCreators';

class TodoListScreen extends React.Component {
  async componentDidMount() {
    this.props.getTodoList();
  }

  saveTodoListPressed(params) {
    const { navigate } = this.props.navigation;
    navigate("SaveListScreen", params);
  }

  saveItemPressed(params) {
    const { navigate } = this.props.navigation;
    navigate("SaveItemScreen", params);
  }

  renderTodoItems = ({ item }) => {
    return(
      <TouchableOpacity style={styles.todoItemContainer} onPress={() => this.saveItemPressed(item)}>
        <Text>
          { item.content }
        </Text>

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
              <Icon name={'md-trash'} size={30} color={'#000000'} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.saveTodoListPressed(item)}>
              <Icon name={'md-create'} size={30} color={'#000000'} />
            </TouchableOpacity>
          </View>
        </View>

        <FlatList
          data={ todoItems }
          renderItem={this.renderTodoItems}
          keyExtractor={(todoItems) => todoItems.id.toString()}
        />

        <TouchableOpacity style={styles.addItemButton} onPress={() => this.saveItemPressed({todoId: item.id})}>
          <Icon name={'md-add-circle'} size={30} color={'#000000'} />
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const { todoList } = this.props;

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.saveTodoListPressed()}>
          <Text>
            Create new Todo list
          </Text>
        </TouchableOpacity>

        <FlatList
          data={todoList}
          renderItem={this.renderTodoList}
          keyExtractor={(todoList) => todoList.id.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  todoContainer: {
    backgroundColor: '#d5d5d5',
    borderTopWidth: 1,
    borderWidth: 1,
    borderColor: '#000000',
    margin: 10
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20
  },
  todoTitle: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold'
  },
  addItemButton: {
    alignSelf: 'center',
    marginVertical: 10
  },
  todoButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  todoItemContainer: {
    paddingHorizontal: 10,
  },
  todoItem: {

  }
});

const mapStateToProps = (state) => {
  return {
    todoList: state.todoReducer.todoList
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTodoList: () => dispatch(getTodoList()),
    deleteTodoList: (id) => dispatch(deleteTodoList(id))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoListScreen);