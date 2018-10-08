import { NavigationActions } from "react-navigation";

class NavigationService {
  setNavigator(navigator){
    this.navigator = navigator;
  }

  navigate(routeName, params) {
    if (this.navigator) {
      this.navigator.dispatch(NavigationActions.navigate({routeName, params}));
    } else {
      throw new Error("Navigator is not initialized");
    }
  }
}

const navigatorService = new NavigationService();
export default navigatorService;
