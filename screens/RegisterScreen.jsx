import {
  SafeAreaView,
  Text,
  View,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";
import React, { useState, useContext } from "react";
import axios from "axios";
import global from "../const/url";

var url = global.url_api + "register";

export default function RegisterScreen({ navigation }) {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const register = async (user, name, password) => {
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
    <SafeAreaView style={Style.container}>
      <View style={Style.head}>
        <Text style={Style.textHead}>Register</Text>
      </View>
      <View style={Style.form}>
        <TextInput
          style={Style.input}
          placeholder="Employe Name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          style={Style.input}
          placeholder="Employe email"
          value={user}
          onChangeText={(text) => setUser(text)}
        />
        <TextInput
          style={Style.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity
          onPress={() => {
            register(user, name, password);
          }}
          style={Style.button}
        >
          <Text style={Style.textButton}>register</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("LoginScreen");
          }}
        >
          <Text style={Style.textAccount}>Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const Style = StyleSheet.create({
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
