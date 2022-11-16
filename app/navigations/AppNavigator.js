import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

import colors from "../config/colors";
import HistoryScreen from "../screens/HistoryScreen";
import HomeScreen from "../screens/HomeScreen";
const Tab = createBottomTabNavigator();

const AppNavigator = () => (
    <Tab.Navigator>
        <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
                headerShown: false,
                headerTintColor: colors.gray,
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.gray,
                // tabBarLabelPosition:
                tabBarIcon: ({ color, size }) =>
                    <MaterialCommunityIcons name="home" color={color} size={size} />
            }}
        />
        <Tab.Screen
            name="History"
            component={HistoryScreen}
            options={{
                tabBarIcon: ({ color, size }) =>
                    <FontAwesome5 name="history" color={color} size={size} />
            }}
        />
        <Tab.Screen
            name="Chats"
            component={HomeScreen}
            options={{
                tabBarIcon: ({ color, size }) =>
                    <Ionicons name="chatbubbles-outline" color={color} size={size} />
            }}
        />
        <Tab.Screen
            name="Profile"
            component={HomeScreen}
            options={{
                tabBarIcon: ({ color, size }) =>
                    <AntDesign name="user" color={color} size={size} />
            }}
        />
    </Tab.Navigator>
)

export default AppNavigator;