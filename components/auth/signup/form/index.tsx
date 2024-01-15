'use client';

import { ChangeEvent, FormEvent, useState } from 'react';

import CommonAuthButton from '@/components/common/buttons/auth';
import CommonAuthInput from '@/components/common/inputs/auth';
import AuthFormHeaderComponent from '@/components/common/auth/form/header';
import AuthFormComponent from '@/components/common/auth/form';
import AuthLinkComponent from '@/components/common/auth/link';

interface Props {}

const SignupFromComponent = (props: Props) => {
  const [values, setValues] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });
  const { username, password, confirmPassword } = values;

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;

    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return alert('Password mismatch');
    }
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ username, password, confirmPassword }),
    });
    if (res.ok) {
      window.location.href = '/signin';
    } else {
      alert('sign up failed');
    }
  };
  return (
    <AuthFormComponent onSubmit={handleSubmit}>
      <AuthFormHeaderComponent header="Sign up" />
      <div className="flex flex-col gap-3 items-center">
        <CommonAuthInput
          id="username"
          placeholder="Enter your username"
          label="Username"
          type="text"
          name="username"
          value={username}
          onChange={handleChangeInput}
        />
        <CommonAuthInput
          id="password"
          placeholder="Enter your password"
          label="Password"
          type="password"
          name="password"
          value={password}
          onChange={handleChangeInput}
        />
        <CommonAuthInput
          id="confirmPassword"
          placeholder="Please confirm your password"
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChangeInput}
        />
      </div>
      <CommonAuthButton btnTitle="Signup" />
      <AuthLinkComponent href="/signin" label="Have an account?" />
    </AuthFormComponent>
  );
};

export default SignupFromComponent;
