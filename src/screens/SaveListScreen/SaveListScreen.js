import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { createTodoList, updateTodoList } from '../../actions/ActionCreators';
import { Button, Input } from '../../components/common';
import styles from './styles';

class SaveListScreen extends React.Component {
  state = {
    title: this.props.navigation.state.params ? this.props.navigation.state.params.title : ''
  };

  isUpdate = () => {
    return this.props.navigation.state.params;
  };

  savePressed = () => {
    const { title } = this.state;

    if (this.isUpdate()) {
      this.props.updateTodoList({id: this.props.navigation.state.params.id, title});
    }
    else {
      this.props.createTodoList(this.state.title);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Input title={'Title'} value={this.state.title} onChangeText={(title) => this.setState({ title })}/>

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
    createTodoList: (title) => dispatch(createTodoList(title)),
    updateTodoList: (params) => dispatch(updateTodoList(params))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SaveListScreen);