import './button.styles.scss';

export type BUTTON_TYPES_CLASSES = 'inverted' | 'google-sign-in';

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
