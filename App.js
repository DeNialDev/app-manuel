import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import RegisterScreen from "./screens/RegisterScreen";
import EditProjectScreen from "./screens/EditProjectScreen";
import NewProjectScreen from "./screens/NewProjectScreen";
import NewTaskScreen from "./screens/NewTaskScreen";
import EditTaskScreen from "./screens/EditTaskScreen";
import TaskScreen from "./screens/TaskScreen";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="EditProjectScreen" component={EditProjectScreen} options={{ title: "Editar Proyecto" }} />
        <Stack.Screen name="NewProjectScreen" component={NewProjectScreen} options={{ title: "Nuevo Proyecto" }} />
        <Stack.Screen name="NewTaskScreen" component={NewTaskScreen} options={{ title: "Nueva tarea" }} />
        <Stack.Screen name="EditTaskScreen" component={EditTaskScreen} options={{ title: "Editar tarea" }} />
        <Stack.Screen name="TaskScreen" component={TaskScreen} options={{ title: "Tareas", }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

