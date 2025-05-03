import React, { useEffect } from 'react'
import bannerLogo from './assets/banner-logo.png'
import bannerTagline from './assets/banner-tagline.png'
import btnGreen from './assets/btn-green.png'
import btnLoginTxt from './assets/login-text.png'
import {HSTogglePassword} from 'flyonui/flyonui'
import useFormValidation from './useFormValidation';

const Login = () => {
    useFormValidation();
    useEffect(() => {
        HSTogglePassword.autoInit();
      }, []);
      
    return (
        <div className="w-screen h-screen bg-guessr flex flex-col items-center " data-theme="light">
            <div className='w-full pr-5 pt-5 flex justify-end opacity-90'>                
                <button className="btn rounded-full transition-all duration-300 ease-in-out transform hover:scale-105">Sign Up</button>
            </div>
            <div className="logo-banner-container mb-[50px]">
                <img src={bannerLogo} alt="logo" className="" style={{marginBottom: '-100px'}}/>
                <img src={bannerTagline} alt="logo" className="" />
            </div>
            <form id="form-container" className="gap-4 flex flex-col needs-validation" noValidate>
                <div className="w-[300px]">
                    <label className="label-text text-white mb-1" htmlFor="email-input">Email</label>
                    <input type="email" className="input" id="email-input" name="email" required />
                    <span className="error-message">Please enter your email.</span>
                    <span className="success-message">Looks good!</span>
                </div>
                <div className="w-[300px]">
                    <label className="label-text text-white mb-1" htmlFor="password-input">Password</label>
                    <div className='flex relative'>
                        <input type="password" className="w-full grow input" id="password-input" name="password" required minLength={6} />
                        <button type="button" data-toggle-password='{ "target": "#password-input" }' 
                                className="block absolute right-0 p-2 cursor-pointer" aria-label="password toggle" >
                            <span className="icon-[tabler--eye] text-base-content/80 password-active:block hidden size-5 shrink-0"></span>
                            <span className="icon-[tabler--eye-off] text-base-content/80 password-active:hidden block size-5 shrink-0"></span>
                        </button>
                    </div>
                    <span className="error-message">Please enter your password.</span>
                    <span className="success-message">Looks good!</span>
                </div>
                <div id="login-btn-container" className="flex flex-col items-center justify-center mt-4">
                    <button type="submit" className="relative w-full flex justify-center items-center
                        transition-all duration-300 ease-in-out transform hover:scale-105">
                        <img src={btnGreen} className="w-40 absolute z-0" />
                        <img src={btnLoginTxt} className="w-[55px] h-full z-10"/>
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Login;