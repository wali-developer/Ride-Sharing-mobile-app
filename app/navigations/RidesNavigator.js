import { createNativeStackNavigator } from "@react-navigation/native-stack";
import colors from "../config/colors";
import AvailableRides from "../screens/AvailableRides";
import HomeScreen from "../screens/HomeScreen";
import { View } from 'react-native';
import Screen from "../components/Screen";

const Stack = createNativeStackNavigator();

const HeaderBackground = () => {
    return (
        <Screen style={{ backgroundColor: colors.primary, flex: 1 }}></Screen>
    )
}

const RidesNavigator = () => (
    <Stack.Navigator initialRouteName="Search">
        <Stack.Screen name="Search" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen
            name="AvailableRides"
            component={AvailableRides}
            options={{
                headerTintColor: colors.white,
                // headerBackground: colors.primary
                headerShadowVisible: false,
                headerBackground: () => <HeaderBackground />
            }}
        />
    </Stack.Navigator>
)

export default RidesNavigator;