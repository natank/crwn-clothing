import './form-input.styles.scss';
const FormInput = ({
  label,
  ...otherProps
}: {
  label: string;
  type: string;
  required: boolean;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  name: string;
  value: string;
}) => {
  return (
    <div className="group">
      <input className="form-input" {...otherProps} />
      {label && (
        <label
          className={`${
            otherProps.value.length ? 'shrink' : ''
          } form-input-label`}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default FormInput;
