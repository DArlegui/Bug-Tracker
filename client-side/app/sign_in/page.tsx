'use client';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import Form from '../components/Form';

const SignIn = () => {
  const [userName, setUsername] = useState('');
  const [userPassword, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleUsernameChange = (e: any) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const handleLoginClick = async () => {
    if (!userName || !userPassword) {
      setError('Please fill in all fields');
      return;
    }

    console.log('Loggin in');

    try {
      await signIn('credentials', {
        username: userName,
        password: userPassword,
        redirect: true,
        callbackUrl: '/issues/list',
      });
    } catch (error) {
      setError('Failed to log in. Please try again.');
      console.error('Login error:', error);
    }
  };

  return (
    <div className="w-full pt-16 flex justify-center items-center ">
      <Form
        handleUsernameChange={handleUsernameChange}
        handlePasswordChange={handlePasswordChange}
        handleConfirmPassword={() => {}}
        handleLoginClick={handleLoginClick}
        error={error}
        title="Login"
        isRegister={false}
        linkURL="/new_user"
      />
    </div>
  );
};

export default SignIn;
