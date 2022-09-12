import React from "react";
// expo install @react-navigation/native
// expo install react-native-screens react-native-safe-area-context
// expo install @react-navigation/native-stack
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Dashboard from "../pages/Dashboard";
import Order from "../pages/Order";

export type StackParamsList = {
    Dashboard: undefined;
    Order: {
        number: number | string;
        order_id: string;
    };
};

const Stack = createNativeStackNavigator<StackParamsList>();

// rotas para usuários logados
function AppRoutes() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Dashboard" component={ Dashboard }
                options={{ headerShown: false }} />
            
        <Stack.Screen name="Order" component={ Order }
            options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

export default AppRoutes;