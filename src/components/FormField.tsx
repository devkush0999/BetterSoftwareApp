// src/components/FormField.tsx
import React from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';
import { useField } from 'formik';

interface FormFieldProps {
  name: string;
  placeholder: string;
  secureTextEntry?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({ name, placeholder, secureTextEntry }) => {
  const [field, meta] = useField(name);

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, meta.touched && meta.error ? styles.errorInput : null]}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        onChangeText={field.onChange(name)}
        onBlur={field.onBlur(name)}
        value={field.value}
      />
      {meta.touched && meta.error && <Text style={styles.errorText}>{meta.error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginVertical: 10 ,  },
  input: { borderWidth: 1,  padding: 10, borderRadius: 15 , backgroundColor: '#fff' ,borderColor: 'black',},
  errorInput: { borderColor: 'red' },
  errorText: { color: 'red', fontSize: 12 },
});

export default FormField;
