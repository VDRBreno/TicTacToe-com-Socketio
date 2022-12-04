import { CSSProperties, ReactNode } from 'react';

import { Container } from './styles';

interface CustomButtonProps {
  onClick?: () => void;
  children?: ReactNode;
  type?: 'submit';
  style?: CSSProperties;
  disabled?: boolean;
}

export default function CustomButton({
  onClick,
  children,
  type,
  style,
  disabled
}: CustomButtonProps) {

  function handleClick() {
    if(disabled) return;
    if(onClick) onClick();
  }

  return (
    <Container
      onClick={handleClick}
      type={type}
      style={{...{
        backgroundColor: style?.backgroundColor,
        width: style?.width || 'auto',
        height: style?.height || 'auto',
        color: style?.color,
        fontWeight: style?.fontWeight || 'normal',
        margin: style?.margin || 0,
        border: style?.border || 'none'
      }, ...style}}
      className={`${disabled ?'disabled' :''}`}
    >
      {children}
    </Container>
  );
}