import { ButtonHTMLAttributes, FC } from 'react';
import {
  BaseButton,
  GoogleSighnInButton,
  InvertedButton
} from './button.styles';

export type BUTTON_TYPES_CLASSES =
  | 'inverted'
  | 'google-sign-in'
  | 'base';
export enum BUTTON_TYPE_CLASSES {
  inverted = 'inverted',
  'google-sign-in' = 'google-sign-in',
  base = 'base'
}
const getButton = (
  buttonType: BUTTON_TYPES_CLASSES = 'base'
): typeof BaseButton =>
  ({
    ['base']: BaseButton,
    ['inverted']: InvertedButton,
    ['google-sign-in']: GoogleSighnInButton
  }[buttonType]);

export type ButtonProps = {
  buttonType?: BUTTON_TYPES_CLASSES;
  isLoading?: boolean;
  onClick?: () => void;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonProps> = ({
  children,
  buttonType,
  ...otherProps
}: ButtonProps) => {
  const CustomButton = getButton(buttonType);
  return (
    <CustomButton {...otherProps}>{children}</CustomButton>
  );
};

export default Button;
