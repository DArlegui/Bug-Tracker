'use client';
import { useState } from 'react';
import Form from '../components/Form';
import { API_URL } from '@/environment';
import { useRouter } from 'next/navigation';

const NewUser = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleUsernameChange = (e: any) => {
    setUsername(e.target.value);
  };

  const handleConfirmPassword = (e: any) => {
    setConfirmPassword(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const handleRegisterClick = async () => {
    if (!username || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      const res = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (res.status === 400) {
        setError('Username already exists');
        return;
      }

      const data = await res.json();
      console.log(data);
      router.push('/sign_in');
      router.refresh();
    } catch {
      setError('An error occurred');
    }
  };

  return (
    <div className="w-full pt-16 flex justify-center items-center bg-custom-bg-1 bg-background">
      <Form
        handleUsernameChange={handleUsernameChange}
        handlePasswordChange={handlePasswordChange}
        handleConfirmPassword={handleConfirmPassword}
        handleLoginClick={handleRegisterClick}
        error={error}
        title="Register"
        isRegister={true}
        linkURL="/sign_in"
      />
    </div>
  );
};

export default NewUser;
