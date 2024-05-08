import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import global from "../const/url";

var url = global.url_api + "register";

export default function RegisterScreen({ navigation }) {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [disableRegister, setDisableRegister] = useState(false);

  const register = async (user, name, password) => {
    if (password !== confirmPassword) {
      console.log("Las contraseñas no coinciden");
      return;
    }

    axios
      .post(url, {
        email: user,
        name: name,
        password: password,
      })
      .then((response) => {
        console.log(response.data);
        let user = response.data;
        navigation.navigate("LoginScreen");
      })
      .catch((error) => console.log(error));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.head}>
        <Text style={styles.textHead}>Register</Text>
      </View>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Employe Name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Employe email"
          value={user}
          onChangeText={(text) => setUser(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
        />
        <TouchableOpacity
          onPress={() => {
            register(user, name, password);
          }}
          style={[styles.button, disableRegister && styles.disabledButton]}
          disabled={disableRegister}
        >
          <Text style={styles.textButton}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("LoginScreen");
          }}
        >
          <Text style={styles.textAccount}>Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 50,
  },
  head: {
    marginTop: 20,
  },
  textHead: {
    color: "#000",
    fontSize: 20,
    fontWeight: "bold",
  },
  form: {
    width: 300,
    rowGap: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "#b3bcc9",
    borderRadius: 5,
    paddingHorizontal: 14,
    height: 50,
  },
  button: {
    borderRadius: 5,
    backgroundColor: "#4d66c0",
    marginTop: 12,
    height: 40,
    color: "#ffffff",
    textAlign: "center",
    paddingTop: 10,
  },
  disabledButton: {
    backgroundColor: "#999",
  },
  textButton: {
    color: "#ffffff",
    textAlign: "center",
    textShadowColor: "#000",
  },
  textAccount: {
    color: "#4d66c0",
    textAlign: "center",
    fontWeight: "bold",
    textShadowColor: "#000",
  },
});
