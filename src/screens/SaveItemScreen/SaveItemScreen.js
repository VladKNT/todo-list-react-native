import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Switch } from 'react-native';
import { connect } from 'react-redux';
import { createTodoItem, updateTodoItem } from '../../actions/ActionCreators';

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
        <View>
          <Text>
            Complete:
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
        <Text>
          Content:
        </Text>
        <TextInput value={this.state.content} onChangeText={(content) => this.setState({ content })}/>

        { this.renderCompleteSwitch() }

        <TouchableOpacity onPress={() => this.savePressed()}>
          <Text>
            Save
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

const mapStateToProps = (state) => {
  return {

  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    createTodoItem: (title) => dispatch(createTodoItem(title)),
    updateTodoItem: (params) => dispatch(updateTodoItem(params))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SaveItemScreen);