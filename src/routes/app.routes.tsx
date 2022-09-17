import React from "react";
// expo install @react-navigation/native
// expo install react-native-screens react-native-safe-area-context
// expo install @react-navigation/native-stack
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Dashboard from "../pages/Dashboard";
import Order from "../pages/Order";
import FinishOrder from "../pages/FinishOrder";

export type StackParamsList = {
    Dashboard: undefined;
    Order: {
        number: number | string;
        order_id: string;
    };
    FinishOrder: undefined;
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

            <Stack.Screen name="FinishOrder" component={ FinishOrder }
                options={{ 
                    title: 'Finalizando',
                    headerStyle: {
                        backgroundColor: '#1d1d2e'
                    },
                    headerTintColor: '#FFF'
                }} />

        </Stack.Navigator>
    )
}

export default AppRoutes;