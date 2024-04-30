import React, { useState } from "react";
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
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

export default function EditProjectScreen() {
  const route = useRoute();
  const navigation = useNavigation();

  const { project } = route.params;
  console.log(project);
  const url = `${global.url_api}projects/${project.id}`;
  console.log(url);
  const [formData, setFormData] = useState({
    name: project?.name,
    description: project?.description,
    start_date: project?.start_date,
    end_date: project?.end_date,
  });

  const [isStartDatePickerVisible, setStartDatePickerVisibility] =
    useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);

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
    console.warn("A start date has been picked: ", date);
    setFormData({
      ...formData,
      start_date: date.toISOString().split("T")[0], // Formatea la fecha y actualiza el estado
    });
    hideStartDatePicker();
  };

  const handleConfirmEndDate = (date) => {
    console.warn("An end date has been picked: ", date);
    setFormData({
      ...formData,
      end_date: date.toISOString().split("T")[0], // Formatea la fecha y actualiza el estado
    });
    hideEndDatePicker();
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.put(url, formData);
      alert("Proyecto actualizado:", response.data);
      navigation.navigate("Home");

      // Aquí podrías realizar alguna acción adicional después de crear el proyecto
    } catch (error) {
      console.error("Error al crear el proyecto:", error);
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
      <TextInput
        style={styles.input}
        placeholder="Descripción del proyecto"
        value={formData.description}
        onChangeText={(text) => handleChange("description", text)}
      />
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
        <Text style={styles.textButton}>
          {project ? "Actualizar proyecto" : "Crear proyecto"}
        </Text>
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
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
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
});
