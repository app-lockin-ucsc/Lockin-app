import React, {useState, useEffect} from 'react';
import {Button, StyleSheet, TextInput, Text} from 'react-native';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';

export default function LoginScreen() {
  function PhoneSignIn() {
    // If null, no SMS has been sent
    const [confirm, setConfirm] = useState<FirebaseAuthTypes.ConfirmationResult | null>(null);
    const [loggedIn, setLoggedIn] = useState<boolean>(false);

    firebase.auth().settings.appVerificationDisabledForTesting = true; // README: This is for development only, disable on production

    // Phone Number
    const [number, setNumber] = useState<string>('');
    // Verification code (OTP - One-Time-Passcode)
    const [code, setCode] = useState<string>('');

    // Handle (login)
    function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
      if (user) {
        // Some Android devices can automatically process the verification code (OTP) message, and the user would NOT need to enter the code.
        // Actually, if they try to enter it, they will get an error message because the code was already used in the background.
        // In this function, make sure you hide the component(s) for entering the code and/or navigate away from this screen.
        // It is also recommended to display a message to the user informing them that they have successfully logged in.
        setLoggedIn(true);
      }
    }

    useEffect(() => {
      const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
      return subscriber; // unsubscribe on unmount
    }, []);

    // Handle the button press
    async function signInWithPhoneNumber(phoneNumber: string): Promise<void> {
      try {
        const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
        setConfirm(confirmation);
      } catch (error) {
        console.error(error); // Most likely this is because of billing
      }
    }

    async function confirmCode(): Promise<void> {
      if (!confirm) return;

      try {
        await confirm.confirm(code);
      } catch (error) {
        console.log('Invalid code.');
      }
    }

    if (!confirm) {
      return (
        <>
          <TextInput
            value={number}
            onChangeText={(text: string) => setNumber(text)}
            placeholder="+1 650-555-3434"
            style={styles.textBox}
          />
          <Button
            title="Phone Number Sign In"
            onPress={() => signInWithPhoneNumber(number)}
          />
        </>

      );
    }

    return (
      <>
        <TextInput
          value={code}
          onChangeText={(text: string) => setCode(text)}
          placeholder="Enter verification code"
          keyboardType="numeric"
          style={styles.textBox}
        />
        <Button title={"Cancel"} onPress={() => setConfirm(null)}/>
        <Button title="Confirm Code" onPress={() => confirmCode()}/>
        {loggedIn && <Text>You are logged in!</Text>}
      </>
    );
  }

  return <PhoneSignIn/>;
}

const styles = StyleSheet.create({
  textBox: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10
  }
});