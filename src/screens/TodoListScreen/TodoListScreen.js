import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { getTodoList } from '../../actions/ActionCreators';

class TodoListScreen extends React.Component {
  async componentDidMount() {
    this.props.getTodoList();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = (state) => {
  return {
    todoList: state.todoReducer.todoList
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTodoList: () => dispatch(getTodoList())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoListScreen);