/**
 * @format
 */

import { AppRegistry } from 'react-native';
import Root from './App';
import 'react-native-gesture-handler'
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => Root);
