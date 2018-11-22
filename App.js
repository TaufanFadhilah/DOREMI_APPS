/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import { createStackNavigator } from 'react-navigation';
import Splash from './screen/splash'
import Login from './screen/login'
import Register from './screen/register'
import Home from './screen/home'
import DetailRestaurant from './screen/detailRestaurant'
import History from './screen/history'
import Profile from './screen/profile'
import EditProfile from './screen/editProfile'
import TopUp from './screen/topUp'

const App = createStackNavigator({
  Splash,
  Login,
  Register,
  Home,
  DetailRestaurant,
  History,
  Profile,
  EditProfile,
  TopUp
},
  {
    initialRouteName: 'Splash',
    headerMode: "none"
  });

export default App;