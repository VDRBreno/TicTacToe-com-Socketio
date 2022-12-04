import { InputHTMLAttributes, LegacyRef, useState } from 'react';

import { FiEye, FiEyeOff } from 'react-icons/fi';
import { CSSProperties } from 'styled-components';

import { Container, Label } from './styles';

type CustomInputRefProps = InputHTMLAttributes<HTMLInputElement> & {
  refr: LegacyRef<HTMLInputElement>;
  type: string;
  maxLength?: number;
  placeholder?: string;
  visibilityButton?: boolean;
  disabled?: boolean;
  label?: string;
  style?: CSSProperties;
}

export default function CustomInputRef({
  refr,
  type,
  defaultValue,
  maxLength,
  placeholder = '',
  visibilityButton = false,
  disabled = false,
  label = '',
  style,
  ...rest
}: CustomInputRefProps) {

  const [textVisibility, setTextVisibility] = useState(false);

  function toggleTextVisibility() {
    setTextVisibility(!textVisibility);
  }

  return (
    <Container style={style}>
      {label && <Label>{label}</Label>}
      <input
        ref={refr}
        autoComplete='false'
        spellCheck='false'
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        {...rest}
      />

      {visibilityButton ? (
        !textVisibility
          ? <FiEye onClick={toggleTextVisibility} color='#c4c4c4' size={20} />
          : <FiEyeOff onClick={toggleTextVisibility} color='#c4c4c4' size={20} />
      ) :null}
    </Container>
  );
}