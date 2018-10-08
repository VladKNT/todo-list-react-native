import React, { Component } from "react";
import { createStackNavigator, createSwitchNavigator } from "react-navigation";
import NavigationService from './services/NavigationService';


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
    const RootNavigator = createSwitchNavigator({
        TodoScreens: TodoScreens
      }, {
        initialRouteName: 'TodoScreens'
      }
    );

    return (
      <RootNavigator ref={(nav) => NavigationService.setNavigator(nav)} />
    )
  }
}
