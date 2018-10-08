import React from 'react';
import { Text, View, Switch } from 'react-native';
import { connect } from 'react-redux';
import { createTodoItem, updateTodoItem } from '../../actions/ActionCreators';
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

  savePressed = () => {
    const { todoId } = this.props.navigation.state.params;
    const { content, complete } = this.state;

    if (this.isUpdate()) {
      this.props.updateTodoItem({id: this.props.navigation.state.params.id, content, complete});
    }
    else {
      this.props.createTodoItem({ todoId, content });
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
    return (
      <View style={styles.container}>
        <Input title={'Content'} value={this.state.content} onChangeText={(content) => this.setState({ content })}/>

        { this.renderCompleteSwitch() }

        <Button onPress={() => this.savePressed()}>
            Save
        </Button>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {}
};

const mapDispatchToProps = (dispatch) => {
  return {
    createTodoItem: (title) => dispatch(createTodoItem(title)),
    updateTodoItem: (params) => dispatch(updateTodoItem(params))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SaveItemScreen);