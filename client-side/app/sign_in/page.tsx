'use client';
import React, { useState } from 'react';
import Form from '../components/Form';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleUsernameChange = (e: any) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const handleLoginClick = async () => {};

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
