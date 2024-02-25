'use client';
import { useState } from 'react';
import Form from '../components/Form';

const NewUser = () => {
  // const [firstName, setFirstName] = useState('');
  // const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  // const navigate = useNavigate();

  // const handlefirstNameChange = (e: any) => {
  //   setFirstName(e.target.value);
  // }

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
    // if (!username || !password || !confirmPassword) {
    //   setError('Please fill in all fields');
    //   return;
    // }
    // if (password !== confirmPassword) {
    //   setError('Passwords do not match');
    //   return;
    // }
    // const { jwt, success } = await register({ username, password });
    // if (success) {
    //   localStorage.setItem('book-app-jwt', jwt);
    //   navigate('/home');
    // } else {
    //   setError('Username already taken');
    // }
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
