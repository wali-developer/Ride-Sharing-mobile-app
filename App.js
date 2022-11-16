import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import Register from './app/screens/auth/Register';
import HomeScreen from './app/screens/HomeScreen';
import AuthNavigator from './app/navigations/AuthNavigator';
import NavigationTheme from './app/navigations/NavigationTheme';
import AppNavigator from './app/navigations/AppNavigator';
import authStorage from './app/auth/storage';
import AppLoading from 'expo-app-loading';
import AuthContext from './app/auth/context';

export default function App() {
  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false);

  const restoreUser = async () => {
    const user = await authStorage.getUser();
    if (user) setUser(user);
  };

  if (!isReady) {
    return (
      <AppLoading
        startAsync={restoreUser}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <NavigationContainer theme={NavigationTheme}>
        {user ? <AppNavigator /> : <AuthNavigator />}
        {/* <AuthNavigator /> */}
      </NavigationContainer>

    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({});
