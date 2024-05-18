import {
  KeyboardAvoidingView,
  Text,
  View,
  Platform,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import global from "../const/url";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons"; // Importa los íconos de AntDesign desde '@expo/vector-icons'

export default function TaskScreen({ route }) {
  const navigation = useNavigation();
  const { project_id } = route.params;
  console.log(project_id);
  const [tasksData, setTasksData] = useState([]);
  var url = global.url_api + "projects/" + project_id;
  const params = {
    columns: JSON.stringify(["tasks_own"]),
  };
  const getData = async () => {
    const response = await axios.get(url, { params });
    console.log(response.data);
    setTasksData(response.data.tasks_own);
  };
  const handleReloadTasks = () => {
    getData();
  };
  const handleNewTaskPress = () => {
    navigation.navigate("NewTaskScreen");
  };
  const handleProjectPress = (task) => {
    console.log(task);
    navigation.navigate("EditTaskScreen", { task: task });
  };
  const handleDeleteTask = async (id) => {
    const delete_url = `${global.url_api}tasks/${id}`;
    try {
      const response = await axios.delete(delete_url);
      alert("Registro Eliminado");
      getData();
    } catch (error) {
      console.error("Error al cargar la información de los proyectos:", error);
    }
  };
  useEffect(() => {
    getData(); // Llama a la función fetchData al cargar el componente
  }, []); // Ejecuta solo una vez al montar el componente

  return (
    <KeyboardAvoidingView style={Style.container}>
      <TouchableOpacity onPress={handleReloadTasks}>
        <Text style={Style.reloadButton}>Recargar información</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ marginTop: 10 }} onPress={handleNewTaskPress}>
        <Text style={Style.reloadButton}>Nueva Tarea</Text>
      </TouchableOpacity>
      <View style={Style.content_project}>
        <ScrollView style={Style.projectScrollView}>
          <View style={Style.projectInfo}>
            {tasksData?.length === 0 ? (
              <Text style={Style.noProjectText}>
                No hay ninguna tarea creada
              </Text>
            ) : (
              <>
                <Text
                  style={Style.projectCount}
                >{`Número de tareas: ${tasksData?.length}`}</Text>
                <View style={Style.projectList}>
                  {tasksData.map((task) => (
                    <TouchableOpacity
                      key={task.id}
                      style={Style.projectItem}
                      onPress={() => handleProjectPress(task)}
                    >
                      <Text style={Style.taskName}>{task.name}</Text>
                      <Text style={Style.taskName}>{task.status}</Text>
                      <Text style={Style.taskDates}>
                        {`Inicio: ${task.start_date} - Fin: ${task.end_date}`}
                      </Text>
                      <TouchableOpacity
                        onPress={() => handleDeleteTask(task.id)}
                      >
                        <AntDesign name="delete" size={24} color="red" />
                      </TouchableOpacity>
                    </TouchableOpacity>
                  ))}
                </View>
              </>
            )}
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

const Style = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBarBackground: {
    height: Platform.OS === "android" ? StatusBar.currentHeight : 0, // Ajusta la altura de la barra de estado para Android
    backgroundColor: "#4d66c0", // Color de fondo de la barra de estado
  },
  header: {
    alignItems: "center",
    backgroundColor: "#4d66c0",
    width: "100%",
    height: "10%",
    borderBottomEndRadius: 50,
    borderBottomStartRadius: 50,
    alignItems: "left",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
    color: "#fff",
  },
  content_project: {
    paddingTop: 20,
    paddingHorizontal: 30,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  projectInfo: {
    backgroundColor: "#f0f0f0",
    padding: 20,
    borderRadius: 10,
  },
  noProjectText: {
    fontSize: 16,
    textAlign: "center",
  },
  projectCount: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  projectList: {
    marginTop: 10,
  },
  projectItem: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  projectName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  projectDates: {
    fontSize: 14,
    color: "#888888",
  },
  reloadButton: {
    backgroundColor: "#4d66c0",
    color: "#ffffff",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
    textAlign: "center",
    fontSize: 16,
  },
});
