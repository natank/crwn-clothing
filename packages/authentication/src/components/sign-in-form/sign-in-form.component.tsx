import React, { useState, useContext } from 'react';
import { 
  UserContext, 
  FormInput, 
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup, 
  Button, 
  BUTTON_TYPES_CLASSES
 } from 'shared';

  import './sign-in-form.styles.scss';

const defaultFormFields = {
  email: '',
  password: ''
};
const SignInForm = () => {
  const [formFields, setFormFields] = useState(
    defaultFormFields
  );
  const { email, password } = formFields;

  const { setCurrentUser } = useContext(UserContext);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
  };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response =
        await signInAuthUserWithEmailAndPassword(
          email,
          password
        );
      
      const user = response ? response.user : null;
      user && setCurrentUser(user);
      resetFormFields();
    } catch (error: any) {
      switch (error.code) {
        case 'auth/wrong-password':
          alert('incorrect password form email');
          break;
        case 'auth/user-not-found':
          alert('no user associated with this email');
          break;
        default:
          console.log(error);
      }
    }
  };
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-in-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />
        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button
            buttonType={BUTTON_TYPES_CLASSES.google}
            onClick={signInWithGoogle}
            type="button"
          >
            Google sign in
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
