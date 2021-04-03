import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Content from './components/Content'

import {Provider} from 'react-redux';
import store from './redux/store';
import DispCategory from './components/DispCategory';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Directory" component={Content}/>
          <Stack.Screen name="layer" component={DispCategory} options={({ route }) => ({ title: route.params.title })}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;