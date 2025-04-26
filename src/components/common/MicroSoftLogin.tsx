"use client";
import { useMsal } from '@azure/msal-react';
import Image from 'next/image';
import Images from "../../constants/images"
const MicroSoftLogin = () => {
  const { instance, accounts } = useMsal();
  const handleLogin = () => {
    instance.loginPopup()
      .then(response => {
        console.log('Logged in:', response);
      })
      .catch(error => {
        console.error('Login failed:', error);
      });
  };

  return (
    <div>
     <button onClick={handleLogin} className='microsoftBtn'>
      <Image src={Images.microsoftLogo}   alt="Microsoft Logo" style={{ width: '20px', height:'20px',        objectFit: 'cover'}} />
      <span>Sign in with Microsoft</span>
      </button>
    </div>
  );
};

export default MicroSoftLogin;
