import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Alert,
  StatusBar
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import firebase from "../Fire";

export function SigninScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const toChat = (user: signedInUser) => {
    navigation.navigate("Chat", { user: user });
  };

  const toSignup = () => {
    navigation.navigate("SignUp");
  };

  const pressedSignIn = (email: string, password: string) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        // userがnullかもしれない対策(firebaseモジュールの仕様？)
        if (!user) throw new Error("user is empty");
        if (!user.user) throw new Error("user.user is empty");
        if (!user.user.email) throw new Error("user.user.email is empty");

        Alert.alert("サインイン成功！", "正常にサインインできました。");

        const currentUser: signedInUser = {
          email: user.user.email,
          uid: user.user.uid,
        };
        toChat(currentUser);
      })
      .catch((error) => {
        console.log(error);
        Alert.alert("エラー！", `${error}`);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.titleAndFieldView}>
          <Text style={styles.screenTitle}>Sign In!</Text>
          <TextInput
            style={styles.inputField}
            placeholder="^メールアドレスを入力"
            onChangeText={email => {
              setEmail(email);
            }}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.inputField}
            placeholder="^パスワードを入力"
            onChangeText={password => {
              setPassword(password);
            }}
            keyboardType="visible-password"
            secureTextEntry={true}
          />
          <ExpoStatusBar style="auto" />
        </View>
        <View style={styles.includeButtons}>
          <Button
            title="Sign In"
            onPress={() => {
              pressedSignIn(email, password);
            }}
          />
          <View style={styles.spacer}></View>
          <Button
            title="Sign Up"
            onPress={() => {
              toSignup();
            }}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  titleAndFieldView: {
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    flex: 3
  },
  screenTitle: {
    fontSize: 30,
    marginBottom: 50
  },
  inputField: {
    width: "80%",
    marginBottom: 20,
    height: 35,
    backgroundColor: "lightgray"
  },
  includeButtons: {
    flex: 4,
    marginVertical: 10
  },
  spacer: {
    height: 30
  }
});
