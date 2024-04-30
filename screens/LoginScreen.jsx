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
import AsyncStorage from "@react-native-async-storage/async-storage";

var url = global.url_api + "login";
export default function LoginScreen({ navigation }) {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const storeData = async (user_data, token) => {
    try {
      console.log(token);
      const jsonValue = JSON.stringify(user_data);
      await AsyncStorage.setItem("user", jsonValue);
      await AsyncStorage.setItem("access_token", token);
    } catch (e) {
      console.log(e);
    }
  };
  const login = async (username, password) => {
    console.log(url);

    axios
      .post(url, {
        email: username,
        password: password,
      })
      .then((response) => {
        let user = response.data.user;

        if (response.status == "200") {
          console.log(response.data.access_token);
          storeData(response.data.user, response.data.acces_token);
          navigation.navigate("Home");
        } else {
          alert("No existe cuenta");
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <SafeAreaView style={Style.container}>
      <View style={Style.head}>
        <Text style={Style.textHead}>Login</Text>
      </View>
      <View style={Style.form}>
        <TextInput
          style={Style.input}
          placeholder="Employe id"
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
            login(user, password);
          }}
          style={Style.button}
        >
          <Text style={Style.textButton}>Enter</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("RegisterScreen");
          }}
        >
          <Text style={Style.textAccount}>Register account</Text>
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
