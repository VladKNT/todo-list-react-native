import React, { Component } from "react";
import { createBottomTabNavigator, createStackNavigator, createSwitchNavigator } from "react-navigation";

import TodoListScreen from './screens/TodoListScreen/TodoListScreen';
import SaveListScreen from './screens/SaveListScreen/SaveListScreen';
import SaveItemScreen from './screens/SaveItemScreen/SaveItemScreen';

const TodoScreens = createStackNavigator(
  {
    TodoListScreen: TodoListScreen,
    SaveListScreen: SaveListScreen,
    SaveItemScreen: SaveItemScreen
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
