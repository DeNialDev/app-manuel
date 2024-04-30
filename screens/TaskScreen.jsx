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
import AsyncStorage from "@react-native-async-storage/async-storage";
import global from "../const/url";
import ProjectForm from "../components/ProjectForm";
import axios from "axios";
var url = global.url_api + "tasks";

export default function TaskScreen() {
  const [tasksData, setTasksData] = useState([]);
  const getData = async () => {
    const response = await axios.get(url);
    console.log(response.data);
    setTasksData(response.data);
  };
  const handleReloadProjects = () => {
    getData();
  };
  useEffect(() => {
    getData(); // Llama a la función fetchData al cargar el componente
  }, []); // Ejecuta solo una vez al montar el componente

  return (
    <KeyboardAvoidingView style={Style.container}>
      <View style={Style.statusBarBackground} />
      <View style={Style.header}>
        <Text style={Style.headerText}>Tareas</Text>
      </View>
      <View style={Style.content_project}>
        <TouchableOpacity onPress={handleReloadProjects}>
          <Text style={Style.reloadButton}>Recargar información</Text>
        </TouchableOpacity>
        <View style={Style.content_project}>
          <ScrollView style={Style.projectScrollView}>
            <View style={Style.projectInfo}>
              {tasksData?.length === 0 ? (
                <Text style={Style.noProjectText}>
                  No hay ninguna tarea creado
                </Text>
              ) : (
                <>
                  <Text
                    style={Style.projectCount}
                  >{`Número de proyectos: ${tasksData?.length}`}</Text>
                  <View style={Style.projectList}>
                    {tasksData.map((project) => (
                      <View style={Style.projectItem} key={project.id}>
                        <Text style={Style.projectName}>{project.name}</Text>
                        <Text style={Style.projectDates}>
                          {`Inicio: ${project.start_date} - Fin: ${project.end_date}`}
                        </Text>
                      </View>
                    ))}
                  </View>
                </>
              )}
            </View>
          </ScrollView>
        </View>
        <ProjectForm />
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
