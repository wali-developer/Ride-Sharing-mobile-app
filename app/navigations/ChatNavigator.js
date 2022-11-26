import { createNativeStackNavigator } from "@react-navigation/native-stack";
import colors from "../config/colors";
import AvailableRides from "../screens/AvailableRides";
import HomeScreen from "../screens/HomeScreen";
import { Button, View } from 'react-native';
import Screen from "../components/Screen";
import Chat from "../screens/auth/Chats";
import MessagesScreen from "../screens/Chats/MessagesScreen";

const Stack = createNativeStackNavigator();

const HeaderBackground = () => {
    return (
        <Screen style={{ backgroundColor: '#EDF0F8', flex: 1 }}></Screen>
    )
}

const ChatNavigator = () => (
    <Stack.Navigator initialRouteName="Search">
        <Stack.Screen name="Chat" component={Chat} options={{ headerShown: false }} />
        <Stack.Screen
            name="Messages"
            component={MessagesScreen}
            options={{
                headerTintColor: '#5C6373',
                headerShadowVisible: false,
                headerBackground: () => <HeaderBackground />,
                // headerBackImageSource: '',
                // headerBackTitle: 'Wali Ullah'
            }}
        />
    </Stack.Navigator>
)

export default ChatNavigator;