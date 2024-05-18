import {
  SafeAreaView,
  Text,
  View,
  Platform,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import global from "../const/url";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons"; // Importa los íconos de AntDesign desde '@expo/vector-icons'

var url = global.url_api + "projects";

export default function StartScreen({ navigation }) {
  const [userData, setUserData] = useState(null);
  const [userRolData, setUserRolData] = useState(null);
  const [projectsData, setProjecsData] = useState([]);
  var user_id;

  const getData = async () => {
    const params = {
      user_id: user_id,
    };
    const response = await axios.get(url, { params });

    console.log(response.data);
    setProjecsData(response.data);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("user");
        const jsonValueRol = await AsyncStorage.getItem("roles");
        const parsedData = JSON.parse(jsonValue);

        user_id = parsedData.id;

        if (jsonValue !== null) {
          const parsedData = JSON.parse(jsonValue);
          const parsedRolData = JSON.parse(jsonValueRol);
          setUserData(parsedData);
          setUserRolData(parsedRolData);

          getData();
        }
      } catch (error) {
        console.error("Error al recuperar y parsear los datos:", error);
      }
    };

    fetchData(); // Llama a la función fetchData al cargar el componente
  }, []); // Ejecuta solo una vez al montar el componente

  const handleLogout = async () => {
    try {
      // Borrar los datos del AsyncStorage
      await AsyncStorage.removeItem("user");
      await AsyncStorage.removeItem("roles");
      // Redirigir a la pantalla de inicio de sesión
      navigation.navigate("LoginScreen");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <SafeAreaView style={Style.container}>
      <View style={Style.statusBarBackground} />
      <View style={Style.header}>
        <Text style={Style.headerText}>Administracion de proyectos</Text>
        <Text style={Style.headerText}>Bienvenido {userData?.name}</Text>
        {userData?.roles && (
          <Text style={Style.headerText}>
            Roles: {userData?.roles.map((role) => role.name).join(", ")}
          </Text>
        )}

        <TouchableOpacity
          style={Style.logoutButton}
          onPress={() => handleLogout()}
        >
          <AntDesign name="poweroff" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={Style.content_project}>
        <View style={Style.content_project}>
          <Text style={Style.heading}>Dashboard</Text>
          <View style={Style.projectInfo}>
            {projectsData?.length === 0 ? (
              <Text style={Style.noProjectText}>
                No hay ningún proyecto creado
              </Text>
            ) : (
              <>
                <Text
                  style={Style.projectCount}
                >{`Número de proyectos: ${projectsData?.length}`}</Text>
                <View style={Style.projectList}>
                  {projectsData.map((project) => (
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
        </View>
      </View>
    </SafeAreaView>
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
    backgroundColor: "#4d66c0",
    width: "100%",
    height: "20%",
    borderBottomEndRadius: 50,
    borderBottomStartRadius: 50,
    alignItems: "left",
    justifyContent: "center",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
    color: "#fff",
  },
  logoutButton: {
    position: "absolute",
    top: 20,
    right: 20,
    padding: 10,
  },
  logoutButtonText: {
    color: "#fff",
    fontWeight: "bold",
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
});
