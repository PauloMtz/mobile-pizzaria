import React from "react";
// expo install @react-navigation/native
// expo install react-native-screens react-native-safe-area-context
// expo install @react-navigation/native-stack
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Dashboard from "../pages/Dashboard";

const Stack = createNativeStackNavigator();

// rotas para usuários logados
function AppRoutes() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Dashboard" component={ Dashboard } />
        </Stack.Navigator>
    )
}

export default AppRoutes;