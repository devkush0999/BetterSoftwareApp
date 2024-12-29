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

    return (< View style={styles.container}>
        <Formik
            initialValues={{ email: savedEmail, password: '', rememberMe: false }}
            validationSchema={Yup.object({
                email: Yup.string().email('Invalid email').required('Email is required'),
                password: Yup.string().required('Password is required'),
            })}
            onSubmit={(values) => {
                AsyncStorage.getItem('users').then((storedUsers) => {
                    const usersList = storedUsers ? JSON.parse(storedUsers) : [];
                    const filterUser = usersList.filter((user: { email: string; password: string }) => user.email === values.email && user.password === values.password);
                    console.log({ usersList, filterUser });
                    if (filterUser.length > 0) {
                        Alert.alert('Success', 'Login Successful');
                    } else {
                        Alert.alert('Success', 'User not exist');
                    }
                })
            }}
        >
            {({ handleSubmit }) => (
                <View style={styles.container}>
                    <FormField name="email" placeholder="Email" />
                    <FormField name="password" placeholder="Password" secureTextEntry />
                    <Button style={styles.Btn} title="Login" onPress={handleSubmit} />
                    <Text style={styles.link} onPress={() => navigation.navigate('SignUp')}>
                        Don’t have an account? Sign Up
                    </Text>
                    <Text style={styles.Btn} onPress={() => navigation.navigate('Store')}>
                        View Stored Users
                    </Text>
                </View>
            )}
        </Formik>

    </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#80EF80' },
    link: { color: 'blue', marginTop: 15, textAlign: 'center' },
    Btn: { padding: 10, margin: 25, backgroundColor: '#fff', borderRadius: 10, textAlign: 'center' },
});

export default LoginScreen;
