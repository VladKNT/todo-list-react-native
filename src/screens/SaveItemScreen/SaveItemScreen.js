import React from 'react';
import { Text, View, Switch } from 'react-native';
import { Mutation } from 'react-apollo';
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
    } else {
      saveItem({ variables: { todoId: params.todoId, content } });
    }
    this.props.navigation.goBack();
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

        <Mutation mutation={mutation}>
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