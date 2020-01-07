
import React from 'react';
import { StatusBar, SafeAreaView } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation-stack';
// import component
import Splash from './src/screens/Splash';
import Login from './src/screens/Login';
import Signup from './src/screens/Signup';
import Engineers from './src/screens/Engineers';
import EngineersMenu from './src/screens/EngineersMenu';
import DetailEngineers from './src/screens/DetailEngineers'
import MyProfile from './src/screens/EngineersProfile'
import EditEngineers from './src/screens/EditEngineer'
import EditPhotoEngineers from './src/screens/EditPhotoEngineers'
import Companies from './src/screens/Companies'
import CompaniesMenu from './src/screens/CompaniesMenu'
import CompanyProfile from './src/screens/CompanyProfile'
import DetailCompanies from './src/screens/DetailCompanies'
import EditCompanies from './src/screens/EditCompanies'
import EditPhotoCompanies from './src/screens/EditPhotoCompanies'
import DetailEngineersOfCompany from './src/screens/DetailEngineersOfCompany'
import DetailCompanyOfEngineers from './src/screens/DetailCompanyOfEngineers'
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
    },
    EditEngineers:
    {
      screen: EditEngineers
    },
    EditPhotoEngineers:
    {
      screen: EditPhotoEngineers
    },
    Companies:
    {
      screen: Companies
    },
    CompaniesMenu:
    {
      screen: CompaniesMenu
    }, CompanyProfile:
    {
      screen: CompanyProfile
    },
    DetailCompanies:
    {
      screen: DetailCompanies
    },
    EditCompanies:
    {
      screen: EditCompanies
    },
    EditPhotoCompanies:
    {
      screen: EditPhotoCompanies
    },
    EngineersMenu:
    {
      screen: EngineersMenu
    },
    DetailEngineersOfCompany:
    {
      screen: DetailEngineersOfCompany
    },
    DetailCompanyOfEngineers:
    {
      screen: DetailCompanyOfEngineers
    }

  },

  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: 'false'
    }
  }
);

AppContainer = createAppContainer(AppNavigator);
function Root() {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  )
}
export default Root;