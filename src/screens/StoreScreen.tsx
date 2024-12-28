import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const StoreScreen = ({ navigation }: { navigation: any }) => {
  const [users, setUsers] = useState<{ email: string; password: string }[]>([]);

  const loadStoredUsers = async () => {
    try {
      const storedUsers = await AsyncStorage.getItem('users');
      const users = storedUsers ? JSON.parse(storedUsers) : [];
      setUsers(users);
    } catch (error) {
      Alert.alert('Error', 'Failed to load stored users');
    }
  };

  useEffect(() => {
    loadStoredUsers();
  }, []);

  const clearUsers = async () => {
    try {
      await AsyncStorage.removeItem('users');
      setUsers([]);
      Alert.alert('Success', 'All users cleared!');
    } catch (error) {
      Alert.alert('Error', 'Failed to clear users');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={(item, index) => `${item.email}-${index}`}
        renderItem={({ item }) => (
          <View style={styles.userItem}>
            <Text>Email: {item.email}</Text>
            <Text>Password: {item.password}</Text>
          </View>
        )}
        ListEmptyComponent={<Text>No users stored yet.</Text>}
      />
      <Button title="Clear Users" onPress={clearUsers} />
      <Button title="Back to Login" onPress={() => navigation.navigate('Login')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  userItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default StoreScreen;
