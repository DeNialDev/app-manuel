import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import axios from "axios";
import global from "../const/url";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function NewProjectScreen() {
  const [userData, setUserData] = useState(null);
  var user_id;
  const navigation = useNavigation();
  const url = `${global.url_api}projects`;
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    start_date: "",
    end_date: "",
    user_id: user_id,
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("user");

        const parsedData = JSON.parse(jsonValue);
        user_id = parsedData.id;
        setUserData(parsedData.id);
        console.log(user_id);
      } catch (error) {
        console.error("Error al recuperar y parsear los datos:", error);
      }
    };

    fetchData(); // Llama a la función fetchData al cargar el componente
  }, []); // Ejecuta solo una vez al montar el componente

  const [isStartDatePickerVisible, setStartDatePickerVisibility] =
    useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
  const [errors, setErrors] = useState({});

  const showStartDatePicker = () => {
    setStartDatePickerVisibility(true);
  };

  const hideStartDatePicker = () => {
    setStartDatePickerVisibility(false);
  };

  const showEndDatePicker = () => {
    setEndDatePickerVisibility(true);
  };

  const hideEndDatePicker = () => {
    setEndDatePickerVisibility(false);
  };

  const handleConfirmStartDate = (date) => {
    setFormData({
      ...formData,
      start_date: date.toISOString().split("T")[0],
    });
    hideStartDatePicker();
  };

  const handleConfirmEndDate = (date) => {
    setFormData({
      ...formData,
      end_date: date.toISOString().split("T")[0],
    });
    hideEndDatePicker();
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(url, formData);
      alert("Proyecto Creado:");
      navigation.navigate("Home");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        console.error("Error al crear el proyecto:", error);
      }
    }
  };

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nombre del proyecto"
        value={formData.name}
        onChangeText={(text) => handleChange("name", text)}
      />
      {errors.name && <Text style={styles.error}>{errors.name[0]}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Descripción del proyecto"
        value={formData.description}
        onChangeText={(text) => handleChange("description", text)}
      />
      {errors.description && (
        <Text style={styles.error}>{errors.description[0]}</Text>
      )}
      <TouchableOpacity style={styles.button} onPress={showStartDatePicker}>
        <Text style={styles.textButton}>Seleccionar Fecha de Inicio</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={showEndDatePicker}>
        <Text style={styles.textButton}>Seleccionar Fecha de Fin</Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isStartDatePickerVisible}
        mode="date"
        onConfirm={handleConfirmStartDate}
        onCancel={hideStartDatePicker}
      />
      <DateTimePickerModal
        isVisible={isEndDatePickerVisible}
        mode="date"
        onConfirm={handleConfirmEndDate}
        onCancel={hideEndDatePicker}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.textButton}>Crear proyecto</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    borderRadius: 5,
    backgroundColor: "#4d66c0",
    marginTop: 12,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  textButton: {
    color: "#ffffff",
    textAlign: "center",
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
});
