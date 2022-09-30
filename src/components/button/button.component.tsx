import {BaseButton, GoogleSighnInButton, InvertedButton} from './button.styles';

export type BUTTON_TYPES_CLASSES = 'inverted' | 'google-sign-in' | 'base';

const getButton = (buttonType:BUTTON_TYPES_CLASSES = 'base') => ({
  ['base']: BaseButton,
  ['inverted']: InvertedButton,
  ['google-sign-in']: GoogleSighnInButton
})[buttonType];

const Button = ({
  children,
  buttonType,
  ...otherProps
}: {
  children: string;
  buttonType?: BUTTON_TYPES_CLASSES;
  type: 'button' | 'submit' | 'reset' | undefined;
  onClick?: () => void;
}) => {
  const CustomButton = getButton(buttonType)
  return (
    <CustomButton
      {...otherProps}
    >
      {children}
    </CustomButton>
  );
};

export default Button;
