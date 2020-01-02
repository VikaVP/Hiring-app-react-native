
import React from 'react';
import { StatusBar, SafeAreaView } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation-stack';

// import component
import Splash from './src/screens/Splash';
import Login from './src/screens/Login';
import Signup from './src/screens/Signup';
import Engineers from './src/screens/Engineers';
import DetailEngineers from './src/screens/DetailEngineers'
import MyProfile from './src/screens/EngineersProfile'
import { Provider } from 'react-redux'
import store from './src/public/redux/store'
const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: Splash,
    },
    Main: {
      screen: Login,
    },
    Signup: {
      screen: Signup,
    },
    Engineers: {
      screen: Engineers,
    },
    DetailEngineers:
    {
      screen: DetailEngineers
    },
    MyProfile:
    {
      screen: MyProfile
    }
  },

  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: 'false'
    }
  }
);
// const SwitchNavigator = createSwitchNavigator(
//   {
//     Home: {
//       screen: Splash,
//     },
//     Main: {
//       screen: Login,
//     },
//   },
//   {
//     initialRouteName: 'Main'
//   },
//   {
//     headerMode: 'none',
//     navigationOptions: {
//       headerVisible: 'false'
//     }
//   });
AppContainer = createAppContainer(AppNavigator);
function Root() {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  )
}
export default Root;