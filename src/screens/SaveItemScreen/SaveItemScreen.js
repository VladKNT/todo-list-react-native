import React from 'react';
import { Text, View, Switch } from 'react-native';
import { Mutation } from 'react-apollo';
import _ from 'lodash';
import {getTodoList} from '../../api/TodoApi';
import { createTodoItem, updateTodoItem } from '../../api/TodoItemApi';
import { Button, Input } from '../../components/common';
import styles from './styles';

class SaveItemScreen extends React.Component {
  state = {
    content: this.props.navigation.state.params ? this.props.navigation.state.params.content : '',
    complete: this.props.navigation.state.params ? this.props.navigation.state.params.complete : false
  };

  isUpdate = () => {
    return this.props.navigation.state.params.content;
  };

  onSavePressed = (saveItem) => {
    const { params } = this.props.navigation.state;
    const { content, complete } = this.state;

    if (this.isUpdate()) {
      saveItem({ variables: { id: params.id, content, complete } });
      this.props.navigation.goBack();
    } else {
      saveItem({ variables: { todoId: params.todoId, content } });
    }
  };

  renderCompleteSwitch = () => {
    if (this.isUpdate()) {
      return (
        <View style={styles.switchContainer}>
          <Text style={styles.switchTitle}>
            Complete
          </Text>
          <Switch value={this.state.complete} onValueChange={(value) => this.setState({complete: value})}/>
        </View>
      )
    }

    return null;
  };

  render() {
    const mutation = this.isUpdate() ? updateTodoItem : createTodoItem;

    return (
      <View style={styles.container}>
        <Input title={'Content'} value={this.state.content} onChangeText={(content) => this.setState({ content })}/>

        { this.renderCompleteSwitch() }

        <Mutation mutation={mutation}
          update={!this.isUpdate() ? (cache, { data: { createTodoItem } }) => {
            const { getAllTodos }  = cache.readQuery({ query: getTodoList });

            _.each(getAllTodos, (todoList) => {
              if(todoList.id === createTodoItem.todoId) {
                if (_.isNull(todoList.todoItems)) {
                  todoList.todoItems = [];
                }
                todoList.todoItems.push(createTodoItem);
              }
            });

            cache.writeQuery({
              query: getTodoList,
              data: { getAllTodos }
            });

            this.props.navigation.goBack();
          } : null}>
          {(saveItem) => (
            <Button onPress={() => this.onSavePressed(saveItem)}>
              Save
            </Button>
          )}
        </Mutation>
      </View>
    );
  }
}

export default (SaveItemScreen);