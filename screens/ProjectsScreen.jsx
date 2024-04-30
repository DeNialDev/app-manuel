import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
  StatusBar,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import global from "../const/url";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons"; // Importa los íconos de AntDesign desde '@expo/vector-icons'

const url = `${global.url_api}projects`;

export default function ProjectsScreen() {
  const [projectsData, setProjectsData] = React.useState([]);
  const navigation = useNavigation();

  const getData = async () => {
    try {
      const response = await axios.get(url);
      setProjectsData(response.data);
    } catch (error) {
      console.error("Error al cargar la información de los proyectos:", error);
    }
  };
  const handleDeleteProject = async (id) => {
    const delete_url = `${global.url_api}projects/${id}`;
    try {
      const response = await axios.delete(delete_url);
      alert("Registro Eliminado");
      getData();
    } catch (error) {
      console.error("Error al cargar la información de los proyectos:", error);
    }
  };

  React.useEffect(() => {
    getData();
  }, []);

  const handleReloadProjects = () => {
    getData();
  };

  const handleProjectPress = (project) => {
    console.log(project);
    navigation.navigate("EditProjectScreen", { project: project });
  };
  const handleNewProjectPress = () => {
    navigation.navigate("NewProjectScreen");
  };
  return (
    <View style={styles.container}>
      <View style={styles.statusBarBackground} />
      <View style={styles.header}>
        <Text style={styles.headerText}>Proyectos</Text>
      </View>
      <View style={styles.content_project}>
        <TouchableOpacity onPress={handleReloadProjects}>
          <Text style={styles.reloadButton}>Recargar información</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ marginTop: 10 }}
          onPress={handleNewProjectPress}
        >
          <Text style={styles.reloadButton}>Nuevo Proyecto</Text>
        </TouchableOpacity>
        <ScrollView style={styles.projectScrollView}>
          {projectsData?.length === 0 ? (
            <Text style={styles.noProjectText}>
              No hay ningún proyecto creado
            </Text>
          ) : (
            <>
              {projectsData.map((project) => (
                <TouchableOpacity
                  key={project.id}
                  style={styles.projectItem}
                  onPress={() => handleProjectPress(project)}
                >
                  <Text style={styles.projectName}>{project.name}</Text>
                  <Text style={styles.projectDates}>
                    {`Inicio: ${project.start_date} - Fin: ${project.end_date}`}
                  </Text>
                  <TouchableOpacity
                    onPress={() => handleDeleteProject(project.id)}
                  >
                    <AntDesign name="delete" size={24} color="red" />
                  </TouchableOpacity>
                </TouchableOpacity>
              ))}
            </>
          )}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBarBackground: {
    height: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#4d66c0",
  },
  header: {
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
    flex: 1,
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
  projectScrollView: {
    flex: 1,
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
  noProjectText: {
    fontSize: 16,
    textAlign: "center",
  },
});
