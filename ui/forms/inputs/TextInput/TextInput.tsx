'use client';

import { useState } from 'react';
import styles from './TextInput.module.css';

interface TextInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

const TextInput: React.FC<TextInputProps> = ({ label, name, value, onChange, type = 'text' }) => {
  const [focused, setFocused] = useState(false);

  const shouldFloat = focused || value.length > 0;

  return (
    <div className={styles.inputWrapper}>
      <label
        htmlFor={name}
        className={`${styles.label} ${shouldFloat ? styles.labelFloat : ''}`}
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={onChange}
        className={styles.input}
      />
    </div>
  );
};

export default TextInput;
