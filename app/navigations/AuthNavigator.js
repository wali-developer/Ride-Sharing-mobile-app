import { createNativeStackNavigator } from "@react-navigation/native-stack";
import colors from "../config/colors";
import Register from "../screens/auth/Register";
import Signin from "../screens/auth/Signin";
import WelcomeScreen from "../screens/WelcomeScreen";

const Stack = createNativeStackNavigator();
const AuthNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Signin} />
        <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
)

export default AuthNavigator;