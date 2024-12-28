// src/components/PasswordStrengthMeter.tsx
import React from 'react';
import { View, Text} from 'react-native';

const getStrengthColor = (strength: number) => {
  if (strength <= 2) return 'red';
  if (strength === 3) return 'orange';
  return 'green';
};

interface PasswordStrengthMeterProps {
  strength: number;
}

const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({ strength }) => {
  const strengthText = ['Weak', 'Medium', 'Strong'][strength - 1] || 'Weak';
  const color = getStrengthColor(strength);

  return (
    <View>
      <Text style={{ color }}>{strengthText}</Text>
    </View>
  );
};

export default PasswordStrengthMeter;
