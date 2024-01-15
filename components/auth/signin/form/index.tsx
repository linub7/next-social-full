'use client';

import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from 'react';

import CommonAuthButton from '@/components/common/buttons/auth';
import CommonAuthInput from '@/components/common/inputs/auth';
import AuthFormHeaderComponent from '@/components/common/auth/form/header';
import AuthFormComponent from '@/components/common/auth/form';

interface Props {}

const SigninFromComponent = (props: Props) => {
  const [values, setValues] = useState({
    username: '',
    password: '',
  });
  const { username, password } = values;

  const router = useRouter();
  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;

    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/auth/signin', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
    if (res.ok) {
      router.push('/feed');
    } else {
      alert('sign in failed');
    }
  };
  return (
    <AuthFormComponent onSubmit={handleSubmit}>
      <AuthFormHeaderComponent header="Sign in" />
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
      </div>
      <CommonAuthButton btnTitle="Signin" />
    </AuthFormComponent>
  );
};

export default SigninFromComponent;
