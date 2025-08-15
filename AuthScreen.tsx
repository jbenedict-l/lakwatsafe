import * as Google from "expo-auth-session/providers/google";
import * as Facebook from "expo-facebook";
import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Alert, Button, Text, TextInput, TouchableOpacity, View } from "react-native";
import { auth } from "./firebaseConfig";

export default function AuthScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  // Google Sign-In
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: "YOUR_EXPO_GOOGLE_CLIENT_ID",
    iosClientId: "YOUR_IOS_GOOGLE_CLIENT_ID",
    androidClientId: "YOUR_ANDROID_GOOGLE_CLIENT_ID",
    webClientId: "YOUR_WEB_GOOGLE_CLIENT_ID",
  });

  React.useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      // Handle Google sign-in with Firebase here
      // See: https://firebase.google.com/docs/auth/web/google-signin
    }
  }, [response]);

  // Facebook Sign-In
  const handleFacebookLogin = async () => {
    try {
      await Facebook.initializeAsync({ appId: "YOUR_FACEBOOK_APP_ID" });
      const result = await Facebook.logInWithReadPermissionsAsync({ permissions: ["public_profile", "email"] });
      if (result.type === "success") {
        // Handle Facebook sign-in with Firebase here
        // See: https://firebase.google.com/docs/auth/web/facebook-login
      }
    } catch (error) {
      Alert.alert("Facebook Login Error", error.message);
    }
  };

  // Email Login/Register
  const handleAuth = async () => {
    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, password);
        Alert.alert("Registered", "Account created successfully!");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        Alert.alert("Welcome", "Logged in successfully!");
      }
    } catch (error: any) {
      Alert.alert("Auth Error", error.message);
    }
  };

  // Forgot Password
  const handleForgotPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert("Password Reset", "Check your email for reset instructions.");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 24 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 24 }}>
        {isRegister ? "Sign Up" : "Sign In"}
      </Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        style={{ borderWidth: 1, marginBottom: 12, padding: 8 }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, marginBottom: 12, padding: 8 }}
      />
      <Button title={isRegister ? "Register" : "Login"} onPress={handleAuth} />
      <TouchableOpacity onPress={() => setIsRegister(!isRegister)} style={{ marginTop: 12 }}>
        <Text style={{ color: "blue" }}>
          {isRegister ? "Already have an account? Sign In" : "New user? Register"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleForgotPassword} style={{ marginTop: 12 }}>
        <Text style={{ color: "blue" }}>Forgot your password?</Text>
      </TouchableOpacity>
      <View style={{ marginTop: 24 }}>
        <Button title="Sign in with Google" onPress={() => promptAsync()} disabled={!request} />
        <View style={{ height: 12 }} />
        <Button title="Sign in with Facebook" onPress={handleFacebookLogin} />
      </View>
    </View>
  );
}
