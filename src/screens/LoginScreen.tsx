// src/screens/LoginScreen.tsx
import React, { useEffect } from 'react';
import { View, Button, StyleSheet, Alert, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Formik } from 'formik';
import * as Yup from 'yup';
import FormField from '../components/FormField';

const LoginScreen = ({ navigation }: { navigation: any }) => {
  const [savedEmail, setSavedEmail] = React.useState('');

  useEffect(() => {
    AsyncStorage.getItem('rememberedEmail').then((email) => {
      if (email) setSavedEmail(email);
    });
  }, []);

  return (
    <Formik
      initialValues={{ email: savedEmail, password: '', rememberMe: false }}
      validationSchema={Yup.object({
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().required('Password is required'),
      })}
      onSubmit={async (values) => {
        if (values.rememberMe) {
          await AsyncStorage.setItem('rememberedEmail', values.email);
        } else {
          await AsyncStorage.removeItem('rememberedEmail');
        }
        Alert.alert('Success', 'Login Successful');
      }}
    >
      {({ handleSubmit }) => (
        <View style={styles.container}>
          <FormField name="email" placeholder="Email" />
          <FormField name="password" placeholder="Password" secureTextEntry />
          <Button title="Login" onPress={handleSubmit} />
          <Text style={styles.link} onPress={() => navigation.navigate('SignUp')}>
            Don’t have an account? Sign Up
          </Text>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  link: { color: 'blue', marginTop: 15, textAlign: 'center' },
});

export default LoginScreen;
