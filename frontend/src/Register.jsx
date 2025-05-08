import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import bannerLogo from './assets/banner-logo.png'
import bannerTagline from './assets/banner-tagline.png'
import bgImg from './assets/register-bg.png'
import {HSTogglePassword} from 'flyonui/flyonui'
import useFormValidation from './useFormValidation';
import { useConfig } from './util/ConfigContext';

const Register = () => {
    const {serverUrl} = useConfig();
    const [loading, setLoading] = useState(false);
    const genderSelect = useRef(null);
    const genderInput = useRef(null);
    const genderInputContainer = useRef(null);
    const [countries, setCountries] = useState([]);
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    useFormValidation();
    
    const handleGenderSelectChange = () => {
        if (genderSelect.current.value === 'other') {
            genderInput.current.value = ''
            genderInput.current.readonly = false;
            genderInputContainer.current.style.display = 'block';
            genderInput.current.focus();
        } else {
            genderInput.current.readonly = true;
            genderInputContainer.current.style.display = 'none';
            genderInput.current.value = genderSelect.current?.value;
        }
    }

    useEffect(() => {
        if (!serverUrl) return;
        setLoading(true);

        HSTogglePassword.autoInit();

        fetch(`${serverUrl}/reference-data/countries`)
        .then(res => res.json())
        .then(data => {
            setCountries(data);
        }).catch(err => {
            console.error('Error fetching countries:', err);
        });
      }, [serverUrl]);

    const RegisterClick = async (e) => {
        const form = e.target;
        const payload = {
            email: form.elements.email.value,
            password: form.elements.password.value,
            displayName: form.elements.displayName.value,
            gender: form.elements.gender.value,
            country: form.elements.country.value
        };

        try {
            const response = await fetch(`${serverUrl}/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },        
                credentials: 'include',
                body: JSON.stringify(payload)
            });
            if (response.ok) {
                const data = await response.json();
                alert('Registration successful!');
                navigate('/');
            } else {
                const data = await response.json();
                setErrors(data);
                console.log(data.message)
                alert(`Registration failed! ${data.message}`);
            }
        } catch (err) {
            console.error("Error during registration:", err);
            alert('An error occurred, please try again.',);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        RegisterClick(e); // Trigger the registration logic
    }
      
    return (
        <div className="w-screen h-screen bg-guessr-register flex flex-col items-center " data-theme="light"
            style={{backgroundImage: `url(${bgImg})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}>
            <div className='w-full pr-5 pt-5 flex justify-end opacity-90'>                
                <a href="/" className="btn rounded-full transition-all duration-300 ease-in-out transform hover:scale-105">Log In</a>
            </div>
            <div className="max-w-[450px] mt-[-80px] mb-[50px]">
                <img src={bannerLogo} alt="logo" style={{marginBottom: '-100px'}}/>
                <img src={bannerTagline} alt="logo" className="mt-2" />
            </div>
            <form onSubmit={handleSubmit} id="form-container" className="w-[540px] p-6 rounded-2xl gap-4 flex flex-col needs-validation" noValidate
                style={{background: '#1A1A2E', boxShadow: '0px 0px 10px 4px #7751DE'}}>
                <h2 className='text-3xl my-[0.82em] font-bold italic text-center' style={{color: '#FFE100'}}>Sign Up to Play!</h2>
                <div className='w-full flex gap-4'>
                    <div className='w-1/2 flex flex-col gap-3'>
                        <div className='w-full'>
                            <label className="label-text text-white mb-1" htmlFor="email-input">Email</label>
                            <input type="email" className="input" id="email-input" name="email" required />
                            <span className="error-message">Please enter a valid email</span>
                        </div>

                        <div className='w-full'>
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
                        </div>                        

                        <div className='w-full'>                            
                            <label className="label-text text-white mb-1" htmlFor="country-select">Country</label>
                            <select className="select" id="country-select" name="country" required >
                                <option value="" disabled selected>Select your country</option>
                                {countries.map(country => (
                                    <option value={country.id}>{country.name}</option>
                                ))}
                            </select>
                            <span className="error-message">Please enter your country</span>
                        </div>
                    </div>
                    <div className='w-1/2 flex flex-col gap-3'>
                        <div className='w-full'>
                            <label className="label-text text-white mb-1" htmlFor="display-name">Display Name</label>
                            <input type="text" className="input" id="display-name" name="displayName" required />
                            <span className="error-message">Please enter your display name</span>
                        </div>

                        <div className='w-full'>                            
                            <label className="label-text text-white mb-1" htmlFor="gender-select">Gender</label>
                            <select className="select" id="gender-select" ref={genderSelect} onChange={handleGenderSelectChange} required >
                                <option value="" disabled selected>Select your gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                                <option value="omit">Prefer not to say</option>
                            </select>
                            <span className="error-message">Please enter your gender</span>
                        </div>
                        
                        <div className='w-full' ref={genderInputContainer} style={{display: 'none'}}>
                            <label className="label-text text-white mb-1" htmlFor="gender-other">Enter your preferred Gender</label>
                            <input type="text" className="input" id="gender-other" name="gender" ref={genderInput} required />
                            <span className="error-message">Please enter your preferred gender</span>
                        </div>
                    </div>                    
                </div>
                <button type="submit" className="mt-4 btn btn-primary btn-lg rounded-full
                    transition-all duration-300 ease-in-out transform hover:scale-105"
                    style={{background: '#FFE100', color: '#1a1a2e'}}>Create an Account</button>
            </form>
        </div>
    );
}

export default Register;