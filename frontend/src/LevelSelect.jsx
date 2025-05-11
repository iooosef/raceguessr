import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ProfileHeader from './components/ProfileHeader';
import SVGBack from './components/SVGBack';

const LevelSelect = () => {    
    const navigate = useNavigate();


    return (
        <div className="w-screen h-screen p-6 bg-guessr flex flex-col items-center " data-theme="light">            
            <header className='w-full fixed top-0 flex justify-between p-4'>
                <ProfileHeader headerText={'Select a game mode'} />
                <div>
                    <a onClick={() => navigate('/menu')} type="button">
                        <SVGBack className='h-[50px] text-white font-bold text-4xl cursor-pointer
                            transition-all duration-300 ease-in-out transform hover:scale-110' />
                    </a>
                </div>
            </header>
            <div className='w-full h-full mt-16 p-4 grid gap-8 grid-cols-3'>
                <a onClick={() => navigate('/raceguessr', { state: { levelUrl: '/levels/quickplay' } })} className='row-span-2 p-4 flex items-center inset-px rounded-lg bg-success text-center cursor-pointer
                    transition-all duration-300 ease-in-out transform hover:scale-105'>
                    <h1 className='w-full font-guessr text-6xl'>Quick Play</h1>
                </a>
                <a onClick={() => navigate('/levels/tags')}  
                    className='row-span-2 p-4 flex items-center inset-px rounded-lg bg-success text-center cursor-pointer
                    transition-all duration-300 ease-in-out transform hover:scale-105'>
                    <h1 className='w-full font-guessr text-6xl'>Play by Category</h1>
                </a>
                <a onClick={() => navigate('/raceguessr', { state: { levelUrl: '/levels/quickplay', endlessMode: true } })} className='row-span-2 p-4 flex items-center inset-px rounded-lg bg-success text-center cursor-pointer
                    transition-all duration-300 ease-in-out transform hover:scale-105'>
                    <h1 className='w-full font-guessr text-6xl'>Endless Mode</h1>
                </a>
            </div>
        </div>
    )
}

export default LevelSelect;