import React from "react";
// expo install @react-navigation/native
// expo install react-native-screens react-native-safe-area-context
// expo install @react-navigation/native-stack
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignIn from "../pages/SignIn";

const Stack = createNativeStackNavigator();

// rotas para usuários não logados
function AuthRoutes() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="SignIn" component={ SignIn } options={{headerShown: false}} />
        </Stack.Navigator>
    )
}

export default AuthRoutes;