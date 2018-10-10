import React from 'react';
import { View } from 'react-native';
import { Button, Input } from '../../components/common';
import { Mutation } from 'react-apollo';
import { getTodoList, createTodoList, updateTodoList } from '../../api/TodoApi';
import styles from './styles';

class SaveListScreen extends React.Component {
  state = {
    title: this.props.navigation.state.params ? this.props.navigation.state.params.title : ''
  };

  isUpdate = () => {
    return this.props.navigation.state.params;
  };

  onSavePressed = (saveTodoList) => {
    const { title } = this.state;
    const { params } = this.props.navigation.state;

    if (this.isUpdate()) {
      saveTodoList({ variables: { id: params.id, title } });
      this.props.navigation.goBack();
    } else {
      saveTodoList({ variables: { title } });
    }
  };

  render() {
    const mutation = this.isUpdate() ? updateTodoList : createTodoList;

    return (
      <View style={styles.container}>
        <Input title={'Title'} value={this.state.title} onChangeText={(title) => this.setState({ title })}/>

        <Mutation
          mutation={mutation}
          update={!this.isUpdate() ? (cache, { data: { createTodo } }) => {
            const { getAllTodos }  = cache.readQuery({ query: getTodoList });
            cache.writeQuery({
              query: getTodoList,
              data: { getAllTodos: getAllTodos.concat(createTodo)}
            });

            this.props.navigation.goBack();
          } : null}>
          {(saveTodoList) => (
            <Button onPress={() => this.onSavePressed(saveTodoList)}>
              Save
            </Button>
          )}
        </Mutation>
      </View>
    );
  }
}

export default SaveListScreen;