import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Screen from "../components/Screen";
import colors from "../config/colors";
import Account from "../screens/Account";
import EditProfile from "../screens/EditProfile";

const Stack = createNativeStackNavigator();

const HeaderBackground = () => {
    return (
        <Screen style={{ backgroundColor: colors.primary }}></Screen>
    )
}

const AccountNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen name="Account" component={Account} options={{ headerShown: false }} />
        <Stack.Screen
            name="Profile"
            component={EditProfile}
            options={{
                // headerShown: false,
                headerTintColor: colors.white,
                headerShadowVisible: false,
                headerBackground: () => <HeaderBackground />,
            }}
        />
    </Stack.Navigator>
)

export default AccountNavigator;