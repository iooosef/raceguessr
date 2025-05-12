import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ProfileHeader from './components/ProfileHeader';
import SVGBack from './components/SVGBack';
import IsaacImg from './assets/about-isaac.png'
import TJImg from './assets/about-tristian.png'
import JMImg from './assets/about-john.png'
import JCImg from './assets/about-joseph.png'

const About = () => {    
    const navigate = useNavigate();


    return (
        <div className="w-screen h-screen p-6 flex flex-col items-center " >            
            <header className='w-full fixed top-0 flex justify-between p-4'>
                <ProfileHeader headerText={'About Us'} />
                <div>
                    <a onClick={() => navigate('/menu')} type="button">
                        <SVGBack className='h-[50px] text-white font-bold text-4xl cursor-pointer
                            transition-all duration-300 ease-in-out transform hover:scale-110' />
                    </a>
                </div>
            </header>
            <main className='w-full h-full mt-16 p-4
                flex flex-col gap-8 text-white'>
                <div className='flex flex-col'>
                    <p className='text-center font-guessr text-xl' style={{fontWeight: '700'}}>
                        Is a game that allows the player to guess the ethnicity of the corresponding image given to the user whether it be of a celebrity, politician, influencer and many more. We aspire to promote culture and disproving stereotypes based on the outlook of people. The game “RaceGuessr” is inspired by the gameplay mechanic of “GeoGuessr” by clicking on the world map to guess the correct answer. The scoring system will be based on how close the country you clicked to the ethnicity of the person. Points varies from neighboring country, region and overall closeness.
                    </p>
                </div>
                <div className='flex flex-col gap-4'>
                    <h1 className='font-guessr font-black text-5xl text-center'>CREATORS</h1>
                    <div className='flex justify-center gap-4 h-full'>

                        <div className='relative h-full'>
                            <div className='absolute w-full h-full flex justify-center items-center z-20
                                bg-black/65 font-guessr text-center text-xl
                                opacity-0 hover:opacity-100 transition-opacity duration-300'>
                                Isaac Marcus Santos
                            </div>
                            <img src={IsaacImg} className='z-0 dev-imgs' />
                        </div>
                        <div className='relative h-full'>
                            <div className='absolute w-full h-full flex justify-center items-center z-20
                                bg-black/65 font-guessr text-center text-xl
                                opacity-0 hover:opacity-100 transition-opacity duration-300'>
                                Joseph Clarence Parayaoan
                            </div>
                            <img src={JCImg} className='z-0 dev-imgs' />
                        </div>
                        <div className='relative h-full'>
                            <div className='absolute w-full h-full flex justify-center items-center z-20
                                bg-black/65 font-guessr text-center text-xl
                                opacity-0 hover:opacity-100 transition-opacity duration-300'>
                                John Michael Palaganas
                            </div>
                            <img src={JMImg} className='z-0 dev-imgs' />
                        </div>
                        <div className='relative h-full'>
                            <div className='absolute w-full h-full flex justify-center items-center z-20
                                bg-black/65 font-guessr text-center text-xl
                                opacity-0 hover:opacity-100 transition-opacity duration-300'>
                                Tristian James Cabalar
                            </div>
                            <img src={TJImg} className='z-0 dev-imgs' />
                        </div>

                    </div>
                </div>
            </main>
        </div>
    )
}

export default About;