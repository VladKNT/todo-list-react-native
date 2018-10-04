import React, { Component } from "react";
import { createBottomTabNavigator, createStackNavigator, createSwitchNavigator } from "react-navigation";

import TodoListScreen from './screens/TodoListScreen/TodoListScreen';

const TodoScreens = createStackNavigator(
  {
    TodoListScreen: TodoListScreen
  },
  {
    headerMode: 'none',
    initialRouteName: 'TodoListScreen',
    navigationOptions: {
      gesturesEnabled: false
    }
  }
);

export default class App extends Component {
  render() {
    const RootNavigator = createSwitchNavigator(
      {
        TodoScreens: TodoScreens
      },
      {
        initialRouteName: 'TodoScreens'
      }
    );

    return (
      <RootNavigator />
    )
  }
}
