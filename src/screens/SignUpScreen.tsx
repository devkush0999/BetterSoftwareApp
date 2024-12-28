// src/screens/SignUpScreen.tsx
import React, { useState } from 'react';
import { View, Button, StyleSheet, Alert, Text } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import FormField from '../components/FormField';
import PasswordStrengthMeter from '../components/PasswordStrengthMeter';
import { calculatePasswordStrength } from '../utils/passwordStrength';

const SignUpScreen = ({ navigation }: { navigation: any }) => {
  const [passwordStrength, setPasswordStrength] = useState(0);

  return (
    <Formik
      initialValues={{ name: '', email: '', password: '' }}
      validationSchema={Yup.object({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().required('Password is required'),
      })}
      onSubmit={(values) => {
        Alert.alert('Success', 'Sign Up Successful');
        navigation.navigate('Login');
      }}
    >
      {({ handleSubmit, values, setFieldValue }) => (
        <View style={styles.container}>
          <FormField name="name" placeholder="Name" />
          <FormField name="email" placeholder="Email" />
          <FormField
            name="password"
            placeholder="Password"
            secureTextEntry
            onChangeText={(text: string) => {
              setFieldValue('password', text);
              setPasswordStrength(calculatePasswordStrength(text));
            }}
          />
          <PasswordStrengthMeter strength={passwordStrength} />
          <Button title="Sign Up" onPress={handleSubmit} />
          <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
            Already have an account? Login
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

export default SignUpScreen;
