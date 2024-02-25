import React from 'react';
import Link from 'next/link';
import Input from './Input';
import { signIn } from 'next-auth/react';
import { FaHome } from 'react-icons/fa';
import { redirect } from 'next/navigation';

interface Props {
  // handlefirstNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  // handlelastNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleUsernameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleConfirmPassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleLoginClick: () => void;
  error: string;
  title: string;
  isRegister: boolean;
  linkURL: string;
}

const Form: React.FC<Props> = ({
  handleUsernameChange,
  handlePasswordChange,
  handleConfirmPassword,
  handleLoginClick,
  error,
  title,
  isRegister,
  linkURL,
}) => {
  return (
    <form className="relative inline-flex flex-col items-center min-w-[350px] min-h-[400px] gap-6 border shadow-[0px_4px_8px_0px_rgba(0,0,0,0.25)] p-8 rounded-2xl border-[solid] bg-white">
      <Link href="/" className="absolute right-4 top-4 ">
        <FaHome size={24} />
      </Link>
      <div className="text-2xl font-bold">{title}</div>
      <div
        className="inline-flex items-center self-stretch h-12 rounded text-lg continueWithGoogle border justify-center text-[black] gap-3 border-[solid] bg-white hover:cursor-pointer "
        onClick={() => signIn('google', { callbackUrl: '/' })}>
        <img src="google_logo.png" className="w-5 h-5" />
        {title} with Google
      </div>
      <div className="text-base font-bold text-[#9e9e9e]">OR</div>
      <div className="flex flex-col self-stretch gap-3">
        {/* {isRegister && (
          <div className="flex justify-evenly space-x-2">
            <Input type="text" name="First" placeholder="First Name" handleUsernameChange={handleUsernameChange} />
            <Input type="text" name="Last" placeholder="Last Name" handleUsernameChange={handleUsernameChange} />
          </div>
        )} */}
        <Input type="text" name="Username" placeholder="Username" handleUsernameChange={handleUsernameChange} />
        <Input type="password" name="password" placeholder="Password" handleUsernameChange={handlePasswordChange} />
        {isRegister && (
          <Input
            type="password"
            name="password"
            placeholder="Confirm Password"
            handleUsernameChange={handleConfirmPassword}
          />
        )}
      </div>
      {error && <div className="text-red-500">{error}</div>}
      <button
        type="button"
        className="justify-center text-[white] font-bold cursor-pointer border-0 inline-flex items-center self-stretch h-12 text-lg relative top-0.5 bg-blue-400 rounded-lg w-full"
        onClick={() => handleLoginClick()}>
        {isRegister ? 'Create Account' : 'Login'}
      </button>
      <div className="inline-flex justify-start items-start gap-3">
        <div className="text-[#9e9e9e] text-base">{isRegister ? 'Have an account?' : 'No account?'}</div>
        <Link href={`${linkURL}`} className="text-base">
          {isRegister ? 'Login Here' : 'Register Here'}
        </Link>
      </div>
    </form>
  );
};

export default Form;
