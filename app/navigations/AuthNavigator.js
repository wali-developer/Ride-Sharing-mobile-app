import { createNativeStackNavigator } from "@react-navigation/native-stack";
import colors from "../config/colors";
import ForgotPassword from "../screens/auth/ForgotPassword";
import Register from "../screens/auth/Register";
import ResetPassword from "../screens/auth/ResetPassword";
import Signin from "../screens/auth/Signin";
import VerifyEmail from "../screens/auth/VerifyEmail";
import WelcomeScreen from "../screens/WelcomeScreen";

const Stack = createNativeStackNavigator();
const AuthNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Signin} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="VerifyEmail" component={VerifyEmail} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
    </Stack.Navigator>
)

export default AuthNavigator;