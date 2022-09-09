import React, { useState, useContext } from 'react';
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import './sign-up-form.styles.scss';

import {UserContext} from '../../context/user.context'

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
};
function SignUpForm() {
  const [formFields, setFormFields] = useState(
    defaultFormFields
  );
  const { displayName, email, password, confirmPassword } =
    formFields;

  const { setCurrentUser } = useContext(UserContext)

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert('passwords do not match');
      return;
    }

    try {
      resetFormFields();
      const userCredential = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      const { user } = userCredential || {user: null};

      setCurrentUser(user);

      user && await createUserDocumentFromAuth(user)
    } catch (error) {
      console.log(
        `user creation encountered an error, ${JSON.stringify(
          error
        )}`
      );
    }
  };
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />
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
        <FormInput
          label="Confirm Password"
          type="password"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
