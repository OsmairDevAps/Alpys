import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Controller, Control, FieldError } from 'react-hook-form';
import { Picker } from '@react-native-picker/picker';

interface SelectProps {
  control: Control<any>;
  name: string;
  label: string;
  options: { label: string; value: string }[];
  rules?: any;
  error?: FieldError;
}

const SelectInput: React.FC<SelectProps> = ({ control, name, label, options, rules, error }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <Picker
            selectedValue={value}
            onValueChange={(itemValue) => onChange(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Selecione uma opção..." value="" />
            {options.map((option) => (
              <Picker.Item key={option.value} label={option.label} value={option.value} />
            ))}
          </Picker>
        )}
        name={name}
        rules={rules}
        defaultValue=""
      />
      {error && <Text style={styles.errorText}>{error.message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 4,
  },
});

// export default SelectInput;