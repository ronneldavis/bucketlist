import { createBottomTabNavigator } from 'react-navigation';
import DiscoverScreen from './DiscoverScreen.js';
import ListScreen from './ListScreen.js';

export default createBottomTabNavigator({
  Discover: DiscoverScreen,
  List: ListScreen,
});