import './button.styles.scss';

export enum BUTTON_TYPES_CLASSES {
  google = 'google-sign-in',
  inverted = 'inverted'
}

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
  return (
    <button
      className={`button-container ${buttonType}`}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default Button;
