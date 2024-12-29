import React, { useState } from 'react';
import { View, Button, StyleSheet, Alert, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Formik } from 'formik';
import * as Yup from 'yup';
import FormField from '../components/FormField';
import PasswordStrengthMeter from '../components/PasswordStrengthMeter';
import { calculatePasswordStrength } from '../utils/passwordStrength';

const SignUpScreen = ({ navigation }: { navigation: any }) => {
  const [passwordStrength, setPasswordStrength] = useState(0);

  const saveCredentials = async (email: string, password: string) => {
    try {
      const storedUsers = await AsyncStorage.getItem('users');
      const users = storedUsers ? JSON.parse(storedUsers) : [];
      users.push({ email, password });
      await AsyncStorage.setItem('users', JSON.stringify(users));
    } catch (error) {
      Alert.alert('Error', 'Failed to save user credentials');
    }
  };

  return (<View style={styles.container}>
    <Formik
      initialValues={{ name: '', email: '', password: '' }}
      validationSchema={Yup.object({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().required('Password is required'),
      })}
      onSubmit={(values) => {
        saveCredentials(values.email, values.password);
        Alert.alert('Success', 'Sign Up Successful');
        navigation.navigate('Login');
      }}
    >
      {({ handleSubmit, setFieldValue }) => (
        <View >
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
    </View>
  );

};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20 , backgroundColor: '#80EF80'},
  link: { color: 'blue', marginTop: 15, textAlign: 'center' },
});

export default SignUpScreen;
