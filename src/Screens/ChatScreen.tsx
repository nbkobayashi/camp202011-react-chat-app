import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  FlatList,
  Platform,
  StatusBar, } from "react-native";
import { useNavigation, RouteProp } from "@react-navigation/native";
import firebase from "firebase";

type ChatScreenRouteProps = RouteProp<RootStackParamList, "Chat">;
type Props = {
  route: ChatScreenRouteProps;
};

export function ChatScreen(props: Props) {
  const [text, setText] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);

  // DBから読み込む
  const getMessageDocRef = async () => {
    return await firebase.firestore().collection("messages").doc();
  };

  // send押した時CloudFirestoreに保存しつつ画面に追加
  const sendMessage = async (value: string, user: signedInUser) => {
    if (value != "") {
      const docRef = await getMessageDocRef();
      const newMessage = {
        text: value,
        createdAt: firebase.firestore.Timestamp.now(),
        userId: user.uid,
      } as Message;
      await docRef.set(newMessage);
      setText("");
    } else {
      Alert.alert("エラー", "メッセージを入力してください！");
    }
  };

  // CloudFirestoreからメッセージをとってくる(常時監視)
  const getMessages = async () => {
    const messages = [] as Message[];
    await firebase
      .firestore()
      .collection("messages")
      .orderBy("createdAt")
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          //変化の種類が"added"だったときの処理
          if (change.type === "added") {
            //今アプリにもっているmessagesに取得した差分を追加
            messages.unshift(change.doc.data() as Message);
            // } else if (change.type === "removed") {
            //   console.log("【modified data】");
            // } else if (change.type === "modified") {
            //   console.log("【deleted some data】");
          }
          setMessages(messages);
        });
      });
  };

  useEffect(() => {
    getMessages();
  }, []);

  const currentUser = props.route.params.user;
  const navigation = useNavigation();

  const back = () => {
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView style={styles.keyboardAvoidingView} >
      <SafeAreaView style={styles.container}>
        <Text style={{ fontSize: 20, height: 40, width: "98%" }}>
          {`${currentUser.email}`}でログイン中
        </Text>
        <View style={styles.flatlistCotainer}>
          <FlatList
            style={styles.messagesContainer}
            data={messages}
            inverted={true}
            renderItem={({ item }: { item: Message }) => (
              <Text>{item.text}</Text>
            )}
            keyExtractor={(_, index) => index.toString()}
          />
        </View>

        <View style={styles.inputTextContainer}>
          <TextInput
            style={styles.inputText}
            onChangeText={(value) => {
              setText(value);
            }}
            value={text}
            placeholder="なにか文字を入力してね"
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="done"
          />
          <TouchableOpacity
            style={styles.sendButtonContainer}
            onPress={() => {
              sendMessage(text, currentUser);
            }}
          >
            <Text style={styles.sendButton}>Send!</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
    width: "100%",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  flatlistCotainer: {
    flex: 14,
  },
  messagesContainer: {
    minWidth: "100%",
    padding: 10,
  },
  inputTextContainer: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  inputText: {
    flex: 4,
    borderWidth: 1,
    borderColor: "#999",
    height: 32,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  sendButtonContainer: {
    flex: 1,
    marginLeft: 10,
  },
  sendButton: {
    backgroundColor: "purple",
    color: "#ffff",
    textAlign: "center",
    padding: 5,
    borderRadius: 5,
    overflow: "hidden",
  },
});
